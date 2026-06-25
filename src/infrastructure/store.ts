// Lead store. In-memory by default so the whole demo runs with no external
// services; swap to a Supabase service-role repo (same interface) when keys
// land. Survives dev HMR via globalThis. Degrades gracefully — never throws.

import type { Lead, Message, QuoteInput, QuoteResult } from "@/domain/quote/types";

type DB = { leads: Lead[]; seq: number };
const g = globalThis as unknown as { __bfStore?: DB };
const db: DB = (g.__bfStore ??= { leads: [], seq: 0 });

const now = () => new Date().toISOString();
const id = (p: string, n: number) => `${p}_${n}`;

export function createLead(args: {
  input: QuoteInput;
  quote: QuoteResult;
  responseSeconds: number;
}): Lead {
  const n = ++db.seq;
  const lead: Lead = {
    id: id("ld", n),
    reference: `BF-${1000 + n}`,
    createdAt: now(),
    input: args.input,
    quote: args.quote,
    responseSeconds: args.responseSeconds,
    status: "quoted",
    messages: [],
  };
  db.leads.unshift(lead);
  return lead;
}

export function addMessage(leadId: string, msg: Omit<Message, "id" | "createdAt">): Message | null {
  const lead = db.leads.find((l) => l.id === leadId);
  if (!lead) return null;
  const message: Message = { ...msg, id: id("msg", lead.messages.length + 1) + `_${lead.id}`, createdAt: now() };
  lead.messages.push(message);
  return message;
}

export const listLeads = (): Lead[] => db.leads;
export const getLead = (leadId: string): Lead | undefined => db.leads.find((l) => l.id === leadId);

export function getStats(): { count: number; avgResponseSeconds: number; fastestSeconds: number } {
  const ls = db.leads;
  if (ls.length === 0) return { count: 0, avgResponseSeconds: 0, fastestSeconds: 0 };
  const times = ls.map((l) => l.responseSeconds);
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  return {
    count: ls.length,
    avgResponseSeconds: Math.round(avg * 10) / 10,
    fastestSeconds: Math.round(Math.min(...times) * 10) / 10,
  };
}
