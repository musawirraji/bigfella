# Bigfella — Cinematic Landing Brief

**Concept: "The Line."** The whole site is one continuous luminous route,
Houston (top) → the customer's door (footer). A faceted hauler travels it
section to section; the quote is staged as "dispatch." Motion = meaning =
product.

**Mood:** cinematic · concierge · bold/commanding. Dark obsidian, rich/layered
(not sparse), one champagne accent. **Tech:** Lenis · GSAP
ScrollTrigger/SplitText/DrawSVG/MotionPath · pre-rendered hauler frames ·
magnetic buttons. Reduced-motion + mobile frame-sequence fallbacks throughout.

## Section choreography

0. **Loader — "laying the road"** (~1.8s, skippable): headlight in black →
   `BIGFELLA` clip-rises (blur→sharp) → a road line draws L→R with a tabular %
   counter → at 100% it ignites and the curtain lifts to the hero.
1. **Hero:** faceted hauler (slow idle, mouse-parallax) · masked-line headline
   reveal ("Every mile, handled.") · Houston origin pin where the route is born
   · magnetic "Get your instant quote" CTA.
2. **Dispatch (pinned):** hauler drives into a bay, the full quote form
   assembles; typing pickup/delivery draws the lane live + counts miles. Submit
   → drawn checkmark → a phone mockup receives the SMS live with a 0→8.2s timer
   → reference ID + single CTA.
3. **Speed proof:** a race — your bar fills instantly, the competitor crawls and
   never finishes; giant tabular `0→8s` counter.
4. **The Route (signature):** scroll scrubs the hauler along the national route;
   waypoints ignite (athletes · dealers · auctions). MotionPath + scrub.
5. **Concierge:** dispatch-ticket cards (who we serve) assemble on scroll —
   hand-drawn SVG, no stock photos.
6. **How it works / trust:** a self-drawing vertical timeline (Quote → vetted
   enclosed carrier → picked up → tracked → delivered).
7. **Final CTA:** the line reaches the destination pin; big magnetic CTA; footer.

**Payoff screens:** `/confirmation/[id]` (drawn check, reference ID, 8s stamp,
what-happens-next) · `/dashboard` (Mercury-grade dark: 8s-vs-15hr hero, lead
list, quote breakdown, SMS thread).

## Motion rules
One easing language (reveals expo.out, scrubs linear, counters power2.out).
Animate once, then rest. Everything has a reduced-motion fallback. Perf budget:
lazy-load heavy media, mobile gets the frame sequence, hold 60fps,
`overflow-x: clip`, mobile-first then layer motion up. No AI clichés.

## Don'ts
No stock truck/highway photos · no bright corporate blue/red · never sparse ·
never Fraunces/ornate serif · no dot-pip carousels / stock icon glyphs.
