"use client";

import { useEffect, useRef, useState } from "react";

// Custom preloader: our own SVG car drives left→right along a track while a
// 0→100 counter ticks up; at 100% the car zooms in and the curtain lifts to
// reveal the site (our take on Lusion's logo-zoom).
export function Loader() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"load" | "zoom" | "gone">("load");
  const raf = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const dur = 3200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = p * p * (3 - 2 * p); // smoothstep — counts up deliberately
      setPct(Math.round(eased * 100));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else {
        setPhase("zoom");
        setTimeout(() => { setPhase("gone"); document.body.style.overflow = ""; }, 850);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf.current); document.body.style.overflow = ""; };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`bf-load ${phase === "zoom" ? "is-zoom" : ""}`} aria-hidden>
      <span className="bf-load__brand">BIGFELLA<span> AUTO EXPRESS</span></span>

      <div className="bf-load__stage">
        <div className="bf-load__track"><div style={{ width: `${pct}%` }} /></div>
        <svg className="bf-load__car" viewBox="0 0 122 48" style={{ left: `${pct}%` }} aria-hidden>
          <path d="M6 33 C7 24 14 22 24 22 L33 22 C37 13 46 11 58 11 L74 11 C85 11 92 15 99 23 L110 26 C116 27 117 30 117 33 L117 36 C117 38 115 39 113 39 L10 39 C7 39 6 37 6 35 Z" fill="var(--bf-brand)" />
          <path d="M41 22 C43 16 49 14 57 14 L65 14 L65 22 Z" fill="#fff" opacity="0.9" />
          <path d="M69 14 L74 14 C82 14 88 17 93 22 L69 22 Z" fill="#fff" opacity="0.9" />
          <circle cx="111" cy="32" r="2.6" fill="#fff" opacity="0.85" />
          <g className="bf-load__wheel" style={{ transformOrigin: "33px 39px" }}>
            <circle cx="33" cy="39" r="8.6" fill="#0a0b0d" />
            <circle cx="33" cy="39" r="2.8" fill="#fff" />
            <rect x="32" y="31" width="2" height="16" rx="1" fill="#fff" opacity="0.5" />
          </g>
          <g className="bf-load__wheel" style={{ transformOrigin: "95px 39px" }}>
            <circle cx="95" cy="39" r="8.6" fill="#0a0b0d" />
            <circle cx="95" cy="39" r="2.8" fill="#fff" />
            <rect x="94" y="31" width="2" height="16" rx="1" fill="#fff" opacity="0.5" />
          </g>
        </svg>
      </div>

      <span className="bf-load__num bf-num">{pct}</span>
    </div>
  );
}
