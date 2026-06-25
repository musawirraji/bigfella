import { Reveal } from "./Reveal";

// The speed-to-lead proof — a race the competition never finishes.
export function SpeedProof() {
  return (
    <section className="bf-section" id="speed">
      <div className="bf-container">
        <Reveal>
          <p className="bf-up bf-t-xs bf-accent">The first credible quote wins the load</p>
          <h2 className="bf-t-display-l" style={{ marginTop: ".75rem", maxWidth: "18ch" }}>
            While they sleep on it, you&rsquo;ve already replied.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="bf-proof">
            <div className="bf-bars">
              <div className="bf-bar">
                <span className="bf-bar__label bf-accent">Bigfella</span>
                <span className="bf-bar__track"><span className="bf-bar__fill bf-bar__fill--you" style={{ "--w": "100%" } as React.CSSProperties} /></span>
                <span className="bf-bar__val bf-accent">seconds</span>
              </div>
              <div className="bf-bar">
                <span className="bf-bar__label">Industry avg</span>
                <span className="bf-bar__track"><span className="bf-bar__fill bf-bar__fill--them" style={{ "--w": "7%" } as React.CSSProperties} /></span>
                <span className="bf-bar__val" style={{ color: "var(--bf-text-dim)" }}>15+ hrs</span>
              </div>
            </div>
            <p className="bf-t-body" style={{ marginTop: "2rem", maxWidth: "52ch" }}>
              Customers shop three to five brokers at once — and the first real answer takes
              the deal roughly half the time. Bigfella replies the instant the request lands,
              with a price that holds up, not a lowball teaser.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
