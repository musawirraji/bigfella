"use client";

import { useEffect, useState } from "react";
import { DASHBOARD_DEMO_KEY } from "@/shared/config";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "What we move", href: "#cargo" },
  { label: "The standard", href: "#standard" },
  { label: "Instant quote", href: "#dispatch" },
];

// Pill nav. The Menu pill slide-swaps to "Close" (book-leaf), and the panel
// opens on the right ONLY — it never grays out the page.
export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Mark = (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
      <path d="M3 16c3 0 3-8 6-8s3 8 6 8 3-8 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <>
      <nav className="bf-nav2">
        <a className="bf-nav2__brand" href="#top">BIGFELLA<span className="bf-nav2__sub"> AUTO EXPRESS</span></a>
        <div className="bf-nav2__cluster">
          <button className="bf-nav2__round" aria-label="Bigfella" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{Mark}</button>
          <a className="bf-pill bf-pill--dark" href="#dispatch"><span>Get a quote</span><span className="bf-pill__dot" /></a>
          <button className={`bf-pill bf-pill--ghost bf-toggle ${open ? "is-open" : ""}`} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span className="bf-toggle__swap">
              <span className="bf-toggle__inner">
                <span className="bf-toggle__row">Menu<span className="bf-pill__dots">••</span></span>
                <span className="bf-toggle__row">Close<span className="bf-pill__dots">✕</span></span>
              </span>
            </span>
          </button>
        </div>
      </nav>

      {open && <div className="bf-menu2__catch" onClick={() => setOpen(false)} aria-hidden />}

      <div className={`bf-menu2 ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="bf-menu2__panels">
          <div className="bf-menu2__card bf-menu2__links">
            {LINKS.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}{i === 0 ? <span className="bf-menu2__dot" /> : null}
              </a>
            ))}
          </div>

          <div className="bf-menu2__card">
            <h3 className="bf-t-h2">Talk to a dispatcher</h3>
            <p className="bf-t-sm" style={{ marginTop: ".5rem", color: "#6a655c" }}>Houston, TX · Mon–Sat, 7am–9pm CT</p>
            <a className="bf-menu2__mail" href="mailto:dispatch@bigfellaautoexpress.com">dispatch@bigfellaautoexpress.com<span aria-hidden>→</span></a>
          </div>

          <a className="bf-menu2__labs" href={`/dashboard?k=${DASHBOARD_DEMO_KEY}`}>
            <span className="bf-menu2__labsmark">◍</span> Ops dashboard <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </>
  );
}
