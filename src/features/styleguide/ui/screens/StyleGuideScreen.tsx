import { BrandMark } from "@/shared/ui/BrandMark";
import { HeroSpecimen } from "../components/HeroSpecimen";
import {
  audiences,
  colorGroups,
  motionTokens,
  radii,
  spacing,
  typeScale,
} from "@/domain/design/tokens";

function SectionHead({ num, title, lede }: { num: string; title: string; lede?: string }) {
  return (
    <div className="bf-sg__head">
      <span className="bf-sg__num">{num}</span>
      <div>
        <h2 className="bf-t-display-m">{title}</h2>
        {lede ? <p className="bf-t-body" style={{ marginTop: ".5rem" }}>{lede}</p> : null}
      </div>
    </div>
  );
}

export function StyleGuideScreen() {
  return (
    <div className="bf-sg">
      {/* top bar */}
      <header className="bf-sg__topbar">
        <span className="bf-sg__brand">
          <BrandMark className="bf-sg__mark" />
          Bigfella<span style={{ color: "var(--bf-text-faint)", fontWeight: 400 }}>/ style guide</span>
        </span>
        <span className="bf-badge bf-badge--accent"><span className="bf-dot" /> v0.1 · sign-off gate</span>
      </header>

      {/* 00 — assembled hero */}
      <section className="bf-sg__section" style={{ paddingTop: 0 }}>
        <HeroSpecimen />
        <div className="bf-container">
          <p className="bf-t-sm bf-sg__caption">
            ↑ Assembled hero — masked line reveal, self-drawing route, magnetic CTA. First pass of the
            cinematic direction; the faceted hauler is a placeholder for the pre-rendered frame sequence.
          </p>
        </div>
      </section>

      <main className="bf-container">
        {/* 01 — colour */}
        <section className="bf-sg__section">
          <SectionHead num="01" title="Colour" lede="Obsidian surfaces · warm headlight neutrals · one champagne accent. Signal colours are reserved for the dashboard only." />
          <div className="bf-stack">
            {colorGroups.map((group) => (
              <div key={group.title} className="bf-sg__panel">
                <p className="bf-up bf-t-xs" style={{ marginBottom: "1rem" }}>{group.title}</p>
                <div className="bf-swatches">
                  {group.swatches.map((s) => (
                    <div key={s.varName} className="bf-swatch">
                      <div className="bf-swatch__chip" style={{ background: s.hex }} />
                      <div className="bf-swatch__meta">
                        <div className="bf-swatch__name">{s.name}</div>
                        <div className="bf-swatch__hex">{s.hex}</div>
                        {s.note ? <div className="bf-swatch__note">{s.note}</div> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 02 — typography */}
        <section className="bf-sg__section">
          <SectionHead num="02" title="Typography" lede="Clash Display for commanding headlines · Satoshi for text & UI · JetBrains Mono for numbers. Never Inter, never an ornate serif." />
          <div className="bf-sg__panel">
            {typeScale.map((t) => (
              <div key={t.label} className="bf-type-row">
                <div className="bf-type-row__meta">
                  <span>{t.label}</span>
                  <span>·</span>
                  <span>{t.meta}</span>
                </div>
                <div className={t.cls}>{t.sample}</div>
              </div>
            ))}
            <div className="bf-type-row">
              <div className="bf-type-row__meta"><span>Tabular numerals</span><span>·</span><span>JetBrains Mono · tnum</span></div>
              <div className="bf-num" style={{ fontSize: "1.5rem" }}>$1,245.00 · 1,150 mi · 8.2s · #BF-4821</div>
            </div>
          </div>
        </section>

        {/* 03 — spacing, radii, motion */}
        <section className="bf-sg__section">
          <SectionHead num="03" title="Space · Radius · Motion" lede="A 4px base scale, five radii, and one easing language so every surface feels built by the same hand." />
          <div className="bf-cols bf-cols--3">
            <div className="bf-sg__panel">
              <p className="bf-up bf-t-xs" style={{ marginBottom: "1rem" }}>Spacing (4px base)</p>
              <div className="bf-stack">
                {spacing.map((s) => (
                  <div key={s.step} style={{ display: "grid", gridTemplateColumns: "3rem 1fr", alignItems: "center", gap: "1rem" }}>
                    <span className="bf-num bf-t-xs" style={{ color: "var(--bf-text-dim)" }}>{s.px}px</span>
                    <span className="bf-space-demo" style={{ width: `${Number(s.px)}px` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bf-sg__panel">
              <p className="bf-up bf-t-xs" style={{ marginBottom: "1rem" }}>Radii</p>
              <div className="bf-chips">
                {radii.map((r) => (
                  <div key={r.name} className="bf-chip">
                    <span className="bf-radius-demo" style={{ borderRadius: r.px }} />
                    <span className="bf-t-xs">{r.name} · {r.px}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bf-sg__panel">
              <p className="bf-up bf-t-xs" style={{ marginBottom: "1rem" }}>Motion</p>
              <div className="bf-stack">
                {motionTokens.map((m) => (
                  <div key={m.name}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="bf-t-sm" style={{ color: "var(--bf-text)" }}>{m.name}</span>
                      <span className="bf-num bf-t-xs" style={{ color: "var(--bf-accent)" }}>{m.value}</span>
                    </div>
                    <span className="bf-t-xs" style={{ color: "var(--bf-text-faint)" }}>{m.use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04 — components */}
        <section className="bf-sg__section">
          <SectionHead num="04" title="Components" lede="Core elements in every state — the parts the demo screens are assembled from." />

          {/* buttons */}
          <div className="bf-sg__panel" style={{ marginBottom: "1rem" }}>
            <p className="bf-up bf-t-xs" style={{ marginBottom: "1.25rem" }}>Buttons · all states</p>
            <div className="bf-cluster">
              <button className="bf-btn bf-btn--primary"><span className="bf-btn__label">Get instant quote</span><span className="bf-btn__arrow">→</span></button>
              <button className="bf-btn bf-btn--primary is-hover"><span className="bf-btn__label">Hover</span><span className="bf-btn__arrow">→</span></button>
              <button className="bf-btn bf-btn--primary is-focus"><span className="bf-btn__label">Focus</span></button>
              <button className="bf-btn bf-btn--primary bf-btn--loading"><span className="bf-spinner" /><span className="bf-btn__label">Dispatching</span></button>
              <button className="bf-btn bf-btn--primary is-disabled"><span className="bf-btn__label">Disabled</span></button>
            </div>
            <div className="bf-cluster" style={{ marginTop: "1rem" }}>
              <button className="bf-btn bf-btn--secondary">Secondary</button>
              <button className="bf-btn bf-btn--secondary is-hover">Hover</button>
              <button className="bf-btn bf-btn--ghost">Ghost</button>
              <button className="bf-btn bf-btn--ghost is-hover">Hover</button>
            </div>
          </div>

          {/* inputs + segmented */}
          <div className="bf-cols bf-cols--2" style={{ marginBottom: "1rem" }}>
            <div className="bf-sg__panel">
              <p className="bf-up bf-t-xs" style={{ marginBottom: "1.25rem" }}>Inputs · all states</p>
              <div className="bf-stack">
                <label className="bf-field"><span className="bf-label">Pickup ZIP</span><input className="bf-input" placeholder="77002" defaultValue="" /></label>
                <label className="bf-field"><span className="bf-label">Delivery ZIP · focus</span><input className="bf-input is-focus" defaultValue="75201" /></label>
                <label className="bf-field"><span className="bf-label">Vehicle · filled</span><input className="bf-input" defaultValue="2024 Mercedes G 580" /></label>
                <label className="bf-field"><span className="bf-label">Email · error</span><input className="bf-input is-error" defaultValue="not-an-email" /><span className="bf-help bf-help--error">Enter a valid email so we can send your quote.</span></label>
              </div>
            </div>
            <div className="bf-sg__panel">
              <p className="bf-up bf-t-xs" style={{ marginBottom: "1.25rem" }}>Segmented · badges</p>
              <div className="bf-stack">
                <div className="bf-seg" role="group" aria-label="Transport type">
                  <button className="bf-seg__opt is-active">Enclosed</button>
                  <button className="bf-seg__opt">Open</button>
                </div>
                <div className="bf-seg" role="group" aria-label="Operability">
                  <button className="bf-seg__opt is-active">Running</button>
                  <button className="bf-seg__opt">Non-running</button>
                </div>
                <div className="bf-cluster">
                  <span className="bf-badge bf-badge--accent"><span className="bf-dot" /> Instant</span>
                  <span className="bf-badge bf-badge--good"><span className="bf-dot" /> Delivered</span>
                  <span className="bf-badge">In transit</span>
                </div>
              </div>
            </div>
          </div>

          {/* dispatch-ticket cards (concierge audiences) */}
          <div className="bf-sg__panel" style={{ marginBottom: "1rem" }}>
            <p className="bf-up bf-t-xs" style={{ marginBottom: "1.25rem" }}>Dispatch-ticket cards · who we serve</p>
            <div className="bf-cols bf-cols--4">
              {audiences.map((a) => (
                <article key={a.tag} className="bf-card">
                  <span className="bf-card__tag">{a.tag}</span>
                  <h3 className="bf-card__title bf-t-h2">{a.title}</h3>
                  <p className="bf-card__body">{a.body}</p>
                </article>
              ))}
            </div>
          </div>

          {/* lead rows */}
          <div className="bf-sg__panel" style={{ marginBottom: "1rem" }}>
            <p className="bf-up bf-t-xs" style={{ marginBottom: "1.25rem" }}>Lead rows (dashboard)</p>
            <div className="bf-stack">
              <div className="bf-row">
                <span className="bf-row__lane"><span className="bf-dot" style={{ color: "var(--bf-accent)" }} /> Houston → Dallas · Enclosed</span>
                <span className="bf-row__metric">replied 8.2s</span>
              </div>
              <div className="bf-row">
                <span className="bf-row__lane"><span className="bf-dot" style={{ color: "var(--bf-accent)" }} /> Houston → Miami · Open</span>
                <span className="bf-row__metric">replied 6.9s</span>
              </div>
            </div>
          </div>

          {/* big metric + comparison + confirmation */}
          <div className="bf-cols bf-cols--2">
            <div className="bf-sg__panel">
              <p className="bf-up bf-t-xs" style={{ marginBottom: "1.25rem" }}>Hero metric · the proof</p>
              <div>
                <span className="bf-stat__num">8.2<span className="bf-stat__unit">s</span></span>
                <p className="bf-stat__label bf-t-body">Average first-reply time</p>
              </div>
              <div className="bf-bars">
                <div className="bf-bar">
                  <span className="bf-bar__label">You</span>
                  <span className="bf-bar__track"><span className="bf-bar__fill bf-bar__fill--you" style={{ width: "100%" }} /></span>
                  <span className="bf-bar__val" style={{ color: "var(--bf-accent)" }}>8.2s</span>
                </div>
                <div className="bf-bar">
                  <span className="bf-bar__label">Industry avg</span>
                  <span className="bf-bar__track"><span className="bf-bar__fill bf-bar__fill--them" style={{ width: "6%" }} /></span>
                  <span className="bf-bar__val" style={{ color: "var(--bf-text-dim)" }}>15+ hrs</span>
                </div>
              </div>
            </div>

            <div className="bf-sg__panel">
              <p className="bf-up bf-t-xs" style={{ marginBottom: "1.25rem" }}>Confirmation · the wow moment</p>
              <div className="bf-confirm">
                <svg className="bf-check" viewBox="0 0 52 52" aria-hidden>
                  <circle cx="26" cy="26" r="24" />
                  <path d="M16 27l7 7 14-15" />
                </svg>
                <h3 className="bf-t-h1">Quote on its way</h3>
                <p className="bf-t-body">A branded SMS just hit your phone. Reference <span className="bf-num bf-accent">#BF-4821</span>.</p>
                <p className="bf-t-sm">Your dedicated dispatcher is finalizing the carrier.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bf-footer">
        Bigfella Auto Express — design system v0.1 · cinematic · concierge · bold. Approve the system, then we build the screens.
      </footer>
    </div>
  );
}
