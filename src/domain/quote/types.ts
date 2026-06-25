// Pure types for the instant-quote domain. No I/O, no React.

export type VehicleClass = "sedan" | "suv" | "truck" | "luxury";
export type Transport = "open" | "enclosed";
export type Timing = "standard" | "expedite";

export type QuoteInput = {
  pickupId: string;
  deliveryId: string;
  vehicleClass: VehicleClass;
  transport: Transport;
  operable: boolean;
  timing: Timing;
  // contact
  name: string;
  email: string;
  phone: string;
  vehicleLabel?: string; // free text e.g. "2024 Mercedes G 580"
  shipDate?: string;
};

export type Confidence = "high" | "medium" | "low";

export type BreakdownLine = { label: string; value: string };

export type QuoteResult = {
  distanceMi: number;
  perMile: number;
  low: number;
  high: number;
  point: number;
  confidence: Confidence;
  carrierPay: number; // broker-side suggestion (dashboard only)
  breakdown: BreakdownLine[];
  pickupName: string;
  deliveryName: string;
};

export type MessageRole = "assistant" | "customer";
export type Channel = "sms" | "email";

export type Message = {
  id: string;
  role: MessageRole;
  channel: Channel;
  body: string;
  createdAt: string;
};

export type LeadStatus = "quoted" | "booked" | "in_transit" | "delivered";

export type Lead = {
  id: string;
  reference: string;
  createdAt: string;
  input: QuoteInput;
  quote: QuoteResult;
  responseSeconds: number;
  status: LeadStatus;
  messages: Message[];
};
