// Deterministic, branded reply copy — grounded in the quote facts so it
// never invents a number. This is the fallback that always works; the
// Anthropic infra may draft a richer version when a key is present, using
// the same facts.

import type { QuoteInput, QuoteResult } from "./types";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const firstName = (name: string) => (name.trim().split(/\s+/)[0] || "there");

export function vehiclePhrase(input: QuoteInput): string {
  if (input.vehicleLabel && input.vehicleLabel.trim()) return input.vehicleLabel.trim();
  const map = { sedan: "sedan", suv: "SUV", truck: "truck", luxury: "vehicle" } as const;
  return map[input.vehicleClass];
}

export type DraftedReply = { sms: string; emailSubject: string; emailText: string };

export function buildReply(input: QuoteInput, quote: QuoteResult, reference: string): DraftedReply {
  const fn = firstName(input.name);
  const vehicle = vehiclePhrase(input);
  const transport = input.transport === "enclosed" ? "enclosed" : "open";

  const sms =
    `Bigfella Auto Express — Hi ${fn}! Your ${vehicle}, ${quote.pickupName} → ${quote.deliveryName} ` +
    `(${quote.distanceMi.toLocaleString()} mi, ${transport}): estimated ${usd(quote.low)}–${usd(quote.high)}. ` +
    `Price locks the moment a vetted carrier accepts. Your dispatcher will confirm shortly. Ref ${reference}.`;

  const emailSubject = `Your Bigfella quote — ${quote.pickupName} to ${quote.deliveryName} (Ref ${reference})`;

  const emailText =
    `Hi ${fn},\n\n` +
    `Thanks for choosing Bigfella Auto Express. Here's your estimate for moving your ${vehicle}:\n\n` +
    `  Route:      ${quote.pickupName} → ${quote.deliveryName} (${quote.distanceMi.toLocaleString()} mi)\n` +
    `  Transport:  ${transport === "enclosed" ? "Enclosed (white-glove)" : "Open carrier"}\n` +
    `  Estimate:   ${usd(quote.low)} – ${usd(quote.high)}\n` +
    `  Reference:  ${reference}\n\n` +
    `This is a real, lane-based estimate — not a lowball teaser. The final price locks the ` +
    `moment one of our vetted, insured carriers accepts the load. Your dedicated dispatcher ` +
    `will reach out shortly to confirm pickup.\n\n` +
    `— Bigfella Auto Express\n  Houston, TX · white-glove auto transport`;

  return { sms, emailSubject, emailText };
}
