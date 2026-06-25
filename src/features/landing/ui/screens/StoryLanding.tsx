"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ReactLenis, useLenis } from "lenis/react";
import { scroll } from "@/features/studio/ui/scrollStore";
import { DispatchForm } from "../components/DispatchForm";
import { SiteNav } from "../components/SiteNav";
import { Loader } from "../components/Loader";

const Scene = dynamic(() => import("@/features/studio/ui/Scene").then((m) => m.Scene), { ssr: false });

// the rope: enters from the LEFT EDGE (a bit above middle), curls into a loop
// on the left, then sweeps right. Hidden until scrolling starts.
function ropeD(p: number): string {
  const s = Math.sin(p * Math.PI) * 28;
  return `M -60 360 C 160 ${340 + s}, 300 380, 300 520 C 300 660, 150 705, 115 560 C 88 455, 225 438, 305 500 C 565 600, 825 520, 1085 542 C 1325 562, 1392 800, 1205 1020`;
}

function StoryFX() {
  const pathRef = useRef<SVGPathElement>(null);
  const lenRef = useRef(0);
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    lenRef.current = el.getTotalLength();
    el.style.strokeDasharray = `${lenRef.current}`;
    el.style.strokeDashoffset = `${lenRef.current}`; // fully hidden before scrolling
  }, []);
  useLenis((lenis) => {
    scroll.progress = lenis.progress;
    const el = pathRef.current;
    if (el) {
      el.setAttribute("d", ropeD(lenis.progress));
      // hidden through the hero; starts drawing from the left as section 2 enters
      const drawn = Math.min(1, Math.max(0, (lenis.progress - 0.12) / 0.88));
      el.style.strokeDashoffset = `${lenRef.current * (1 - drawn)}`;
    }
  });
  return (
    <svg className="bf-h3__rope" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path ref={pathRef} className="bf-h3__ropepath" d={ropeD(0)} />
    </svg>
  );
}

export function StoryLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = root.querySelectorAll<HTMLElement>("[data-bg]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const bg = e.target.getAttribute("data-bg")!;
        const ink = e.target.getAttribute("data-ink")!;
        root.style.setProperty("--bg", bg);
        root.style.setProperty("--ink", ink);
        if (bgRef.current) bgRef.current.style.backgroundColor = bg;
      }),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
    <Loader />
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <div className="bf-h3" ref={rootRef} id="top">
        <div className="bf-h3__bg" ref={bgRef} />
        <StoryFX />
        <div className="bf-h3__canvas"><Scene /></div>

        <SiteNav />

        <div className="bf-h3__content">
          {/* ===== NEW HERO (Lusion-style, real truck image) ===== */}
          <section className="bf-herox" data-bg="#eeeef2" data-ink="#0a0b0d">
            <div className="bf-herox__top">
              <h1 className="bf-herox__title">Every mile,<br />handled.</h1>
              <ul className="bf-herox__trust">
                <li>Vetted carriers</li>
                <li>Fully insured</li>
                <li>Real-time tracking</li>
                <li>Houston → anywhere</li>
              </ul>
            </div>
            <div className="bf-herox__bottom">
              <figure className="bf-herox__image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/carrier.webp" alt="Bigfella Auto Express car hauler on the highway" width={1536} height={1024} loading="eager" />
              </figure>
              <div className="bf-herox__aside">
                <p className="bf-herox__para">White-glove auto transport — vetted, insured carriers, real-time tracking, and a quote that holds. For the cars people actually care about, Houston to anywhere.</p>
                <a className="bf-pill bf-pill--light" href="#dispatch"><span className="bf-pill__dot bf-pill__dot--ink" /><span>Get a quote</span></a>
              </div>
            </div>
            <p className="bf-herox__cue">Scroll to explore ↓</p>
          </section>

          {/* 01 — dark chapter (3D hauler enters) */}
          <section className="bf-h3__section bf-h3__right" id="cargo" data-bg="#101219" data-ink="#f4f1ea">
            <div className="bf-h3__col">
              <p className="bf-h3__kicker">01 — What we move</p>
              <h2 className="bf-t-display-l" style={{ marginTop: ".75rem" }}>Built for cars that can&rsquo;t just &ldquo;ship.&rdquo;</h2>
              <p className="bf-t-body-l bf-h3__lede">Exotics, classics, dealership inventory, an athlete&rsquo;s daily driver. Enclosed or open, running or not — we price the real lane and move it like it&rsquo;s the only car on the truck.</p>
            </div>
          </section>

          {/* 02 — emerald */}
          <section className="bf-h3__section" id="standard" data-bg="#0f3a2c" data-ink="#f1f5ee">
            <div className="bf-h3__col">
              <p className="bf-h3__kicker">02 — The standard</p>
              <h2 className="bf-t-display-l" style={{ marginTop: ".75rem" }}>Vetted. Insured.<br />Tracked.</h2>
              <p className="bf-t-body-l bf-h3__lede">Every carrier is authority- and insurance-checked against FMCSA before they touch your vehicle. Then you get milestone updates by text and email — so you never have to ask &ldquo;where&rsquo;s my car?&rdquo;</p>
            </div>
          </section>

          {/* 03 — the quote (white) */}
          <section className="bf-h3__dispatch" id="dispatch" data-bg="#ffffff" data-ink="#0a0b0d">
            <div className="bf-h3__dispatch-head">
              <p className="bf-h3__kicker">03 — Instant quote</p>
              <h2 className="bf-t-display-l" style={{ marginTop: ".75rem" }}>A real price in seconds.</h2>
              <p className="bf-t-body-l bf-h3__lede">The first honest quote usually wins the booking. Bigfella prices your exact lane — distance, vehicle, enclosed or open, timing — and replies before the competition picks up. No teaser rate that jumps after you commit.</p>
            </div>
            <div className="bf-h3__dispatchwrap"><DispatchForm /></div>
          </section>

          {/* 04 — plum */}
          <section className="bf-h3__section bf-h3__cta" data-bg="#2a1030" data-ink="#f4eef5">
            <p className="bf-h3__kicker">04 — Let&rsquo;s move</p>
            <h2 className="bf-t-display-xl bf-h3__title">Your car&rsquo;s next<br />mile starts here.</h2>
            <a className="bf-btn bf-btn--brand bf-h3__btn" href="#dispatch"><span className="bf-btn__label">Get your instant quote</span><span className="bf-btn__arrow" aria-hidden>→</span></a>
          </section>

          {/* mega footer */}
          <footer className="bf-megafoot" data-bg="#0b0b0e" data-ink="#f4f1ea">
            <div>
              <p className="bf-h3__kicker">Bigfella Auto Express</p>
              <h2 className="bf-megafoot__big" style={{ marginTop: "1.5rem" }}>Move it like it <em>matters.</em></h2>
              <a className="bf-btn bf-btn--brand bf-megafoot__cta" href="#dispatch"><span className="bf-btn__label">Get an instant quote</span><span className="bf-btn__arrow" aria-hidden>→</span></a>
            </div>
            <div className="bf-megafoot__row">
              <div className="bf-megafoot__cols">
                <div className="bf-megafoot__col">
                  <p className="bf-up bf-t-xs">Transport</p>
                  <a href="#dispatch">Instant quote</a><a href="#dispatch">Enclosed</a><a href="#dispatch">Open carrier</a><a href="#dispatch">Expedited</a>
                </div>
                <div className="bf-megafoot__col">
                  <p className="bf-up bf-t-xs">Company</p>
                  <span>Houston, TX</span><span>Mon–Sat · 7am–9pm CT</span><a href="mailto:dispatch@bigfellaautoexpress.com">dispatch@bigfellaautoexpress.com</a>
                </div>
              </div>
            </div>
            <div className="bf-megafoot__legal">
              <span>© Bigfella Auto Express</span>
              <span>Estimates are lane-based ranges; final price locks when a vetted carrier accepts.</span>
            </div>
          </footer>
        </div>
      </div>
    </ReactLenis>
    </>
  );
}
