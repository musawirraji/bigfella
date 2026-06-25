import { Reveal } from "./Reveal";

// The line arrives at the destination pin.
export function FinalCta() {
  return (
    <section className="bf-section bf-final">
      <div className="bf-container">
        <Reveal>
          <svg className="bf-route bf-final__route" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden>
            <circle className="bf-route__pin" cx="6" cy="20" r="3" />
            <path className="bf-route__line bf-route__line--ghost" d="M6 20 H 594" />
            <circle className="bf-route__pin-ring" cx="594" cy="20" r="7" />
            <circle className="bf-route__pin" cx="594" cy="20" r="3.5" />
          </svg>
          <h2 className="bf-t-display-xl bf-final__title">Your car&rsquo;s next mile starts here.</h2>
          <div className="bf-hero__cta" style={{ justifyContent: "center", marginTop: "2rem" }}>
            <a className="bf-btn bf-btn--primary" href="#dispatch">
              <span className="bf-btn__label">Get your instant quote</span>
              <span className="bf-btn__arrow" aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
