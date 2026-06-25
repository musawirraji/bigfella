"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { HaulerArt } from "@/shared/ui/HaulerArt";

// Landing hero — masked line reveal, self-drawing route, magnetic CTA.
// GSAP core only; honors prefers-reduced-motion.
export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const magnet = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set("[data-reveal] > span, .bf-hero__origin, .bf-hero__lede, .bf-hero__cta, .bf-hero__truck, .bf-hero__trust", { opacity: 1, y: 0 });
        gsap.set(".bf-hero .bf-route__line", { strokeDashoffset: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".bf-hero__origin", { y: 14, opacity: 0, duration: 0.6 })
        .from("[data-reveal] > span", { yPercent: 115, duration: 1, stagger: 0.1 }, "-=0.2")
        .from(".bf-hero__lede", { y: 18, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".bf-hero__cta", { y: 18, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".bf-hero__trust", { y: 12, opacity: 0, duration: 0.7 }, "-=0.6")
        .from(".bf-hero__truck", { x: 60, opacity: 0, duration: 1.4 }, "-=1.2");

      const line = root.current?.querySelector<SVGPathElement>(".bf-route__line");
      if (line) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(line, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, "-=1.2");
      }

      const btn = magnet.current;
      if (btn) {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
        };
        const leave = () => { xTo(0); yTo(0); };
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        return () => { btn.removeEventListener("pointermove", move); btn.removeEventListener("pointerleave", leave); };
      }
    },
    { scope: root }
  );

  return (
    <header className="bf-hero" ref={root}>
      <div className="bf-hero__truck"><HaulerArt className="bf-hauler" /></div>
      <div className="bf-hero__grid bf-container">
        <div className="bf-stack">
          <span className="bf-hero__origin"><span className="bf-dot" /> HOUSTON, TX — ORIGIN</span>
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
              <a className="bf-btn bf-btn--primary" href="#dispatch" ref={magnet}>
                <span className="bf-btn__label">Get your instant quote</span>
                <span className="bf-btn__arrow" aria-hidden>→</span>
              </a>
            </span>
            <a className="bf-btn bf-btn--ghost" href="#how">See how it works</a>
          </div>
          <p className="bf-hero__trust bf-t-xs" style={{ color: "var(--bf-text-dim)" }}>
            Vetted, insured carriers · enclosed &amp; open · real-time tracking · Houston to anywhere
          </p>
          <svg className="bf-route" viewBox="0 0 420 40" preserveAspectRatio="none" aria-hidden>
            <circle className="bf-route__pin-ring" cx="8" cy="20" r="7" />
            <circle className="bf-route__pin" cx="8" cy="20" r="3.2" />
            <path className="bf-route__line" d="M8 20 C 120 20, 160 10, 260 14 S 380 28, 416 18" />
          </svg>
        </div>
      </div>
    </header>
  );
}
