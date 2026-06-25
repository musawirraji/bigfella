"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ReactLenis, useLenis } from "lenis/react";
import { scroll } from "./scrollStore";

// Canvas is client + WebGL only → load with ssr:false from this client module.
const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), { ssr: false });

// The "rope": one continuous route line that DRAWS and writhes with scroll.
// viewBox 1440x900, sliced to cover the viewport; numbers animate with progress.
function ropeD(p: number): string {
  const sway = Math.sin(p * Math.PI * 1.5) * 150;
  const d2 = Math.cos(p * Math.PI) * 90;
  return `M ${130 + sway} -70 C 760 ${130 + d2}, 210 430, 790 560 S ${1330 - sway} ${800 - d2}, 1130 1010`;
}

// Lives INSIDE <ReactLenis> so useLenis works. Updates the shared scroll
// progress (for the 3D camera) and animates the rope directly on the DOM
// node (no React re-render per frame).
function StoryFX() {
  const pathRef = useRef<SVGPathElement>(null);
  const lenRef = useRef(0);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    lenRef.current = el.getTotalLength();
    el.style.strokeDasharray = `${lenRef.current}`;
    el.style.strokeDashoffset = `${lenRef.current}`;
  }, []);

  useLenis((lenis) => {
    scroll.progress = lenis.progress;
    const el = pathRef.current;
    if (el) {
      el.setAttribute("d", ropeD(lenis.progress));
      el.style.strokeDashoffset = `${lenRef.current * (1 - lenis.progress)}`;
    }
  });

  return (
    <svg className="bf-h3__rope" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path ref={pathRef} className="bf-h3__ropepath" d={ropeD(0)} />
    </svg>
  );
}

export function Hero3DScreen() {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <div className="bf-h3">
        <div className="bf-h3__bg" />
        <div className="bf-h3__canvas">
          <Scene />
        </div>
        <StoryFX />

        <div className="bf-h3__content">
          <nav className="bf-h3__nav">
            <span className="bf-h3__brand">BIGFELLA<span className="bf-h3__brandsub"> AUTO EXPRESS</span></span>
            <span className="bf-up bf-t-xs">Houston, TX</span>
          </nav>

          {/* 01 — origin (hauler far/small) */}
          <section className="bf-h3__section bf-h3__hero">
            <div>
              <p className="bf-up bf-t-xs">01 — White-glove auto transport</p>
              <h1 className="bf-t-display-xl bf-h3__title">Every mile,<br /><em className="bf-h3__em">handled.</em></h1>
            </div>
            <p className="bf-up bf-t-xs bf-h3__cue">Scroll — follow the route ↓</p>
          </section>

          {/* 02 */}
          <section className="bf-h3__section bf-h3__right">
            <div className="bf-h3__col">
              <p className="bf-up bf-t-xs">02 — What we move</p>
              <h2 className="bf-t-display-l">We move what matters.</h2>
              <p className="bf-t-body-l bf-h3__lede">Exotics, dealership inventory, an athlete&rsquo;s pride — loaded, strapped, and delivered like it&rsquo;s the only car on the road.</p>
            </div>
          </section>

          {/* 03 */}
          <section className="bf-h3__section">
            <div className="bf-h3__col">
              <p className="bf-up bf-t-xs">03 — How we move it</p>
              <h2 className="bf-t-display-l">Vetted. Insured.<br />Tracked.</h2>
              <p className="bf-t-body-l bf-h3__lede">Authority-checked carriers, real-time status, and a price that holds — not a teaser that jumps after you book.</p>
            </div>
          </section>

          {/* 04 — arrival (hauler big) */}
          <section className="bf-h3__section bf-h3__cta">
            <p className="bf-up bf-t-xs">04 — Delivered</p>
            <h2 className="bf-t-display-xl bf-h3__title">Your car&rsquo;s next mile<br />starts here.</h2>
            <a className="bf-btn bf-btn--dark bf-h3__btn" href="/#dispatch">
              <span className="bf-btn__label">Get your instant quote</span>
              <span className="bf-btn__arrow" aria-hidden>→</span>
            </a>
          </section>
        </div>
      </div>
    </ReactLenis>
  );
}
