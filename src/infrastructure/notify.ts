// SMS (Twilio) + email (Resend) over their REST APIs via fetch — no SDKs.
// Each degrades gracefully: when unconfigured it SIMULATES (logs + returns
// simulated:true) so the demo runs end-to-end with no keys.

import { env } from "@/lib/env";

export type SendResult = { sent: boolean; simulated: boolean };

export async function sendSms(to: string, body: string): Promise<SendResult> {
  const sid = env.server.TWILIO_ACCOUNT_SID;
  const token = env.server.TWILIO_AUTH_TOKEN;
  const from = env.server.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) {
    console.info("[twilio] not configured — simulating SMS to", to);
    return { sent: false, simulated: true };
  }
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }),
    });
    if (!res.ok) {
      console.warn("[twilio] send failed:", res.status, await res.text().catch(() => ""));
      return { sent: false, simulated: false };
    }
    return { sent: true, simulated: false };
  } catch (e) {
    console.warn("[twilio] error:", e);
    return { sent: false, simulated: false };
  }
}

export async function sendEmail(to: string, subject: string, text: string): Promise<SendResult> {
  const key = env.server.RESEND_API_KEY;
  if (!key) {
    console.info("[resend] not configured — simulating email to", to);
    return { sent: false, simulated: true };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "Bigfella Auto Express <quotes@bigfellaautoexpress.com>", to, subject, text }),
    });
    if (!res.ok) {
      console.warn("[resend] send failed:", res.status);
      return { sent: false, simulated: false };
    }
    return { sent: true, simulated: false };
  } catch (e) {
    console.warn("[resend] error:", e);
    return { sent: false, simulated: false };
  }
}
