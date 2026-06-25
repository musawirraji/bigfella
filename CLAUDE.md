# CLAUDE.md

Project notes for Bigfella Auto Express. Inherits all of Oba's global build
conventions (see `~/.claude/CLAUDE.md`): layered architecture, render-only
components, SCSS-only, zod env, service-role Supabase, style-guide-first.
**Class/token prefix here is `bf-`** (e.g. `--bf-accent`).

## What this is

A demo + proposal for **Andre Bramwell / Bigfella Auto Express**, a Houston
auto-transport brokerage. First demo = **Instant Quote + 8-second reply**
(speed-to-lead): a customer requests a quote on a cinematic branded site and
gets a real, branded SMS quote in seconds; an internal dashboard shows that
response time against the 15+ hr industry benchmark. Everything else he asked
for (carrier matching, status updates, CRM sync, ops assistant) is sold via
the plan — see `docs/PLAN.md`.

Design concept: **"The Line"** — one continuous route, Houston → the customer's
door; a faceted hauler travels it; the quote is staged as "dispatch". Mood:
cinematic · concierge · bold. Dark-luxury, rich (not sparse). See
`docs/landing-cinematic-brief.md` and `docs/reference-board.md`.

## Commands

```bash
npm run dev        # next dev (styleguide at /styleguide)
npm run build      # next build
npm run typecheck  # tsc --noEmit — must be clean
```
No test framework — `typecheck` + `build` are the gates.

## Status

- ✅ Scaffold + SCSS token pipeline + zod env.
- ✅ **Style-guide specimen** at `/styleguide` (the sign-off gate).
- ⏳ Next: approve the system → build the demo screens (landing + quote flow +
  confirmation + dashboard), then the instant-quote API, then the n8n layer.

## Layer map

- `app/` — routes. `/` placeholder, `/styleguide` specimen. Globals in `app/globals.scss`.
- `src/domain/design/tokens.ts` — token DATA for the specimen (UI stays render-only).
- `src/features/styleguide/ui/{screens,components}` — `StyleGuideScreen` + `HeroSpecimen` (client/GSAP), `HaulerArt`, `BrandMark`.
- `src/lib/env.ts` — zod, defensive.
- `src/shared/design/_tokens.scss` — `$`-var source of truth (mapped to `:root --bf-*` in globals).

## Design system

- Type: **Clash Display** (display) · **Satoshi** (text/UI) · **JetBrains Mono**
  (numbers) — via Fontshare/Google CDN. Never Inter, never an ornate serif.
- Colour: obsidian ink ramp · warm "headlight" neutrals · ONE champagne/brass
  accent · signal good/bad reserved for the dashboard.
- Motion: GSAP **core only** (no club plugins) — masked line reveal, route draw
  via stroke-dashoffset, magnetic CTA. Honors `prefers-reduced-motion`.

## 3D / hero asset

Stylized / faceted, **$0**. `HaulerArt.tsx` is an SVG placeholder; the real
hero is a **pre-rendered frame sequence** from a free CC0 model (or one scripted
in Blender at `/Applications/Blender.app`), scroll-scrubbed. No live WebGL.
