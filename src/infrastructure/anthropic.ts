// Optional Claude drafting via the Vercel AI SDK. Returns null when no key
// is set or on any error, so the caller falls back to the domain template.
// Grounded in an XML <quote> block so it never invents a number.

import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { env } from "@/lib/env";
import { vehiclePhrase } from "@/domain/quote/reply";
import type { QuoteInput, QuoteResult } from "@/domain/quote/types";

export async function draftSms(input: QuoteInput, quote: QuoteResult, reference: string): Promise<string | null> {
  const apiKey = env.server.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const facts =
    `<quote>\n` +
    `  <firstName>${input.name.split(/\s+/)[0] ?? ""}</firstName>\n` +
    `  <vehicle>${vehiclePhrase(input)}</vehicle>\n` +
    `  <route>${quote.pickupName} to ${quote.deliveryName}</route>\n` +
    `  <miles>${quote.distanceMi}</miles>\n` +
    `  <transport>${input.transport}</transport>\n` +
    `  <low>$${quote.low}</low>\n  <high>$${quote.high}</high>\n` +
    `  <reference>${reference}</reference>\n` +
    `</quote>`;

  try {
    const anthropic = createAnthropic({ apiKey });
    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5"),
      system:
        "You write the instant SMS reply for Bigfella Auto Express, a premium Houston auto-transport brokerage. " +
        "Warm, concise, confident concierge tone. Use ONLY the facts in the <quote> block — never invent a price, " +
        "city, or number. One SMS, max 320 characters. Always state the estimate is a range that locks when a " +
        "vetted carrier accepts, and include the reference. No emojis.",
      prompt: `${facts}\n\nWrite the SMS.`,
      maxOutputTokens: 200,
      temperature: 0.5,
    });
    const out = text.trim();
    return out.length > 0 ? out : null;
  } catch (e) {
    console.warn("[anthropic] draft failed — falling back to template:", e);
    return null;
  }
}
