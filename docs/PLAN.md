# Bigfella Auto Express — Build Plan

**Demo:** Instant Quote + 8-second reply (speed-to-lead).
**Principle:** instant + customer-facing → the app; over-time / cross-system / scheduled → n8n.

## 1. Architecture split — app vs n8n

**App (Next.js, synchronous):** the quote calculation + first reply (must be
instant — the whole value prop); landing, quote form, confirmation, dashboard;
Twilio inbound reply qualifier; Stripe checkout (later).

**n8n (over-time, cross-system):** follow-up drip cadence; shipment status
updates (Super Dispatch webhook → SMS/email); HubSpot CRM sync; carrier
matching (batch ranking on his private data); internal ops assistant + daily
digest; Stripe webhook → deal stage.

**Why:** the customer waits on-screen for the quote, so it's computed
synchronously in `/api/quote`; n8n (real cloud cold-start/queue latency) owns
only what happens over minutes–days, handed off via `after()` so it never
blocks. Central Dispatch has no open API — market rate comes from Super
Dispatch Pricing Insights, not CD.

## 2. Demo spec

**Experience:** Andre opens the cinematic site, requests a quote as a customer,
watches a branded SMS hit his phone in ~8s with a defensible range, then opens
the dashboard and sees the lead logged + the 8s-vs-15hr benchmark hero.

**Flow — `POST /api/quote`, synchronous, canonical order:** validate (zod) →
geocode ZIPs + lane miles → pricing engine `{low,high,point,confidence}` →
Claude drafts the reply grounded in an XML `<quote>` block → Twilio SMS +
Resend email → stamp `response_seconds` → persist (Supabase service-role) →
return `{quote, responseSeconds, reply}` for the live confirmation.

**Pricing engine (`domain/pricing`):** transparent heuristic — per-mile by
distance band × vehicle-size × open/enclosed × inop fee × seasonality ×
rural/metro × expedite, + margin → a **range, not a guaranteed price** (the UI
says so). Uses ZERO of Andre's private data on purpose; the real version swaps
in his actual method + a market-rate feed.

**Data model (Supabase, RLS on, no public policy):** `leads` (contact, route,
vehicle, `distance_mi`, `quote_low/high/point`, `confidence`,
**`response_seconds`**, `status`) · `quotes` (`lead_id`, inputs jsonb,
low/high/point, `model_version`) · `messages` (`lead_id`, role
assistant|customer, channel sms|email, body).

**Routes:** `/` landing · `/api/quote` · `/api/reply` (Twilio inbound) ·
`/confirmation/[id]` · `/dashboard?k=<secret>`.

## 3. n8n layer (trigger · steps · data · AI vs deterministic)

- **Quote-gen assist** — lead needs human re-quote → enrich (VIN, distance,
  SD Pricing Insights median) → suggest carrier-pay + price to broker. *AI:*
  rationale. *Det:* distance/multipliers/API.
- **Carrier matching** — load ready → lane+equipment → query his carrier roster
  → FMCSA QCMobile vetting → **AI ranks top 3 w/ reasoning** → broker approves
  (human-in-loop) → draft offer. *Needs his private data; plan, not demo.*
- **Status updates (SMS+email)** — Super Dispatch webhook
  (created→accepted→picked_up→delivered) → map milestone → AI drafts copy →
  Twilio+Resend → log HubSpot+Supabase. *Needs SD API + Twilio 10DLC.*
- **HubSpot CRM sync** — new lead / inbound msg / Stripe → upsert contact+deal,
  set stage, log, **parse inbound emails (AI) → fill fields**.
- **Ops assistant** — broker question / schedule → retrieve over
  Supabase+HubSpot+SD → AI answers / daily digest.

## 4. Readiness + questions for Andre

**Demo (now):** Supabase · Anthropic key · Twilio + 10DLC A2P · Resend domain ·
hero asset. *No Andre data needed.*
**Phase 1 (status/CRM/drip):** HubSpot private-app token · **Super Dispatch API
enabled + OAuth creds (gated — he must request)** · Twilio 10DLC live.
**Phase 2 (matching/ops):** his carrier data source · FMCSA QCMobile key (free).

**Questions:** 1) How do you price a quote *today* (tool + margin)? 2) Where
does your carrier data live? 3) Super Dispatch API access + plan? 4) HubSpot
token + pipeline/stages? 5) Twilio — number 10DLC-registered + volume? 6) Common
lanes & vehicle mix? 7) Lead sources & volume? 8) Brand assets + email domain.

**Assumptions to confirm:** no-truck spot-market broker · wants customer-facing
instant quoting · Houston base, national lanes · phased budget · demo pricing
is illustrative, not his real numbers.

**Phasing:** Demo (now, no data) → Phase 1 (his keys) → Phase 2 (his data).
