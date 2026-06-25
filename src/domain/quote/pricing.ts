// Transparent, tunable pricing heuristic. Returns a RANGE, never a
// guaranteed price — the real number only locks when a carrier accepts.
// Uses zero private data on purpose. Pure: no I/O.

import { cityLabel, getCity, roadMiles, type City } from "./places";
import type { BreakdownLine, Confidence, QuoteInput, QuoteResult } from "./types";

const round5 = (n: number) => Math.round(n / 5) * 5;
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function basePerMile(mi: number): number {
  if (mi <= 200) return 2.1;
  if (mi <= 500) return 1.55;
  if (mi <= 1000) return 1.05;
  if (mi <= 1500) return 0.82;
  if (mi <= 2500) return 0.64;
  return 0.52;
}

const VEHICLE_MULT: Record<QuoteInput["vehicleClass"], number> = {
  sedan: 1.0,
  suv: 1.18,
  truck: 1.3,
  luxury: 1.12,
};
const VEHICLE_LABEL: Record<QuoteInput["vehicleClass"], string> = {
  sedan: "Sedan / coupe",
  suv: "SUV / crossover",
  truck: "Truck / van",
  luxury: "Luxury / exotic",
};

export class QuoteError extends Error {}

export function priceQuote(input: QuoteInput): QuoteResult {
  const pickup = getCity(input.pickupId);
  const delivery = getCity(input.deliveryId);
  if (!pickup || !delivery) throw new QuoteError("Unknown pickup or delivery city.");
  if (pickup.id === delivery.id) throw new QuoteError("Pickup and delivery must differ.");

  const mi = roadMiles(pickup, delivery);
  const base = mi * basePerMile(mi);

  const vMult = VEHICLE_MULT[input.vehicleClass];
  const tMult = input.transport === "enclosed" ? 1.55 : 1.0;
  const xMult = input.timing === "expedite" ? 1.35 : 1.0;
  const inopFee = input.operable ? 0 : 200;
  const rural = pickup.density === "rural" || delivery.density === "rural";
  const ruralFee = rural ? 175 : 0;

  let point = base * vMult * tMult * xMult + inopFee + ruralFee;
  point = Math.max(350, round5(point));

  const low = round5(point * 0.93);
  const high = round5(point * 1.09);

  let confidence: Confidence = "high";
  if (mi > 1800) confidence = "medium";
  if (rural) confidence = confidence === "high" ? "medium" : "low";
  if (mi > 2600) confidence = "low";

  const breakdown: BreakdownLine[] = [
    { label: `${cityLabel(pickup)} → ${cityLabel(delivery)}`, value: `${mi.toLocaleString()} mi` },
    { label: `Base rate · ${(basePerMile(mi)).toFixed(2)}/mi`, value: usd(base) },
  ];
  if (input.transport === "enclosed") breakdown.push({ label: "Enclosed transport", value: "+55%" });
  if (input.vehicleClass !== "sedan") breakdown.push({ label: VEHICLE_LABEL[input.vehicleClass], value: `+${Math.round((vMult - 1) * 100)}%` });
  if (input.timing === "expedite") breakdown.push({ label: "Expedited pickup", value: "+35%" });
  if (!input.operable) breakdown.push({ label: "Non-running (winch load)", value: "+$200" });
  if (ruralFee) breakdown.push({ label: "Rural last-mile", value: "+$175" });

  return {
    distanceMi: mi,
    perMile: Math.round((point / mi) * 100) / 100,
    low,
    high,
    point,
    confidence,
    carrierPay: round5(point * 0.8),
    breakdown,
    pickupName: cityLabel(pickup),
    deliveryName: cityLabel(delivery),
  };
}

export const vehicleClassLabel = (c: QuoteInput["vehicleClass"]): string => VEHICLE_LABEL[c];
export type { City };
