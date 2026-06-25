import { NextResponse } from "next/server";
import { z } from "zod";
import { priceQuote, QuoteError } from "@/domain/quote/pricing";
import { buildReply } from "@/domain/quote/reply";
import { createLead, addMessage } from "@/infrastructure/store";
import { draftSms } from "@/infrastructure/anthropic";
import { sendSms, sendEmail } from "@/infrastructure/notify";

export const runtime = "nodejs"; // Buffer + fetch to Twilio/Resend/Anthropic
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const Schema = z.object({
  pickupId: z.string().min(1),
  deliveryId: z.string().min(1),
  vehicleClass: z.enum(["sedan", "suv", "truck", "luxury"]),
  transport: z.enum(["open", "enclosed"]),
  operable: z.boolean(),
  timing: z.enum(["standard", "expedite"]),
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(40),
  vehicleLabel: z.string().max(120).optional(),
  shipDate: z.string().max(40).optional(),
});

// The instant first reply — synchronous. Order: validate → price → persist →
// draft (Claude or template) → send SMS+email → stamp response time → log.
export async function POST(req: Request) {
  const t0 = Date.now();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const input = parsed.data;

  let quote;
  try {
    quote = priceQuote(input);
  } catch (e) {
    const msg = e instanceof QuoteError ? e.message : "Could not price this lane.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const lead = createLead({ input, quote, responseSeconds: 0 });

  const reply = buildReply(input, quote, lead.reference);
  const smsBody = (await draftSms(input, quote, lead.reference)) ?? reply.sms;

  const [sms, email] = await Promise.all([
    sendSms(input.phone, smsBody),
    sendEmail(input.email, reply.emailSubject, reply.emailText),
  ]);

  lead.responseSeconds = Math.round(((Date.now() - t0) / 1000) * 10) / 10;
  addMessage(lead.id, { role: "assistant", channel: "sms", body: smsBody });
  addMessage(lead.id, { role: "assistant", channel: "email", body: reply.emailText });

  return NextResponse.json({
    id: lead.id,
    reference: lead.reference,
    responseSeconds: lead.responseSeconds,
    quote,
    sms: smsBody,
    delivery: { smsSimulated: sms.simulated, emailSimulated: email.simulated },
  });
}
