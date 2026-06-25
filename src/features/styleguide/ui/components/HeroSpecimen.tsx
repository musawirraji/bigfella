"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { HaulerArt } from "@/shared/ui/HaulerArt";

// Assembled hero specimen — proves the cinematic motion language with
// GSAP CORE only (no club plugins): masked line reveal, self-drawing
// route via stroke-dashoffset, and a magnetic primary CTA. Honors
// prefers-reduced-motion.
export function HeroSpecimen() {
  const root = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set("[data-reveal] > span, .bf-hero__origin, .bf-hero__lede, .bf-hero__cta, .bf-hero__truck", { opacity: 1, y: 0 });
        gsap.set(".bf-route__line", { strokeDashoffset: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".bf-hero__origin", { y: 14, opacity: 0, duration: 0.6 })
        .from("[data-reveal] > span", { yPercent: 115, duration: 1, stagger: 0.1 }, "-=0.2")
        .from(".bf-hero__lede", { y: 18, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".bf-hero__cta", { y: 18, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".bf-hero__truck", { x: 60, opacity: 0, duration: 1.4 }, "-=1.1");

      // self-drawing route line
      const line = root.current?.querySelector<SVGPathElement>(".bf-route__line");
      if (line) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(line, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, "-=1.2");
      }

      // magnetic CTA
      const btn = magnetRef.current;
      if (btn) {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
        };
        const onLeave = () => { xTo(0); yTo(0); };
        btn.addEventListener("pointermove", onMove);
        btn.addEventListener("pointerleave", onLeave);
        return () => { btn.removeEventListener("pointermove", onMove); btn.removeEventListener("pointerleave", onLeave); };
      }
    },
    { scope: root }
  );

  return (
    <div className="bf-hero" ref={root}>
      <div className="bf-hero__truck">
        <HaulerArt className="bf-hauler" />
      </div>

      <div className="bf-hero__grid bf-container">
        <div className="bf-stack">
          <span className="bf-hero__origin">
            <span className="bf-dot" /> HOUSTON, TX — ORIGIN
          </span>

          <h1 className="bf-hero__title bf-t-display-xl">
            <span className="bf-line" data-reveal><span>Every mile,</span></span>
            <span className="bf-line" data-reveal><span className="bf-accent">handled.</span></span>
          </h1>

          <p className="bf-hero__lede bf-t-body-l">
            White-glove auto transport — a defensible quote in your hands before the
            competition picks up the phone.
          </p>

          <div className="bf-hero__cta">
            <span className="bf-magnetic">
              <a className="bf-btn bf-btn--primary" href="#dispatch" ref={magnetRef}>
                <span className="bf-btn__label">Get your instant quote</span>
                <span className="bf-btn__arrow" aria-hidden>→</span>
              </a>
            </span>
            <a className="bf-btn bf-btn--ghost" href="#how">See how it works</a>
          </div>

          {/* the route line is born here */}
          <svg className="bf-route" viewBox="0 0 420 40" preserveAspectRatio="none" aria-hidden>
            <circle className="bf-route__pin-ring" cx="8" cy="20" r="7" />
            <circle className="bf-route__pin" cx="8" cy="20" r="3.2" />
            <path className="bf-route__line" d="M8 20 C 120 20, 160 10, 260 14 S 380 28, 416 18" />
          </svg>
        </div>
      </div>
    </div>
  );
}
