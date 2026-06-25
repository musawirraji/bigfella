import { Reveal } from "./Reveal";

const STEPS = [
  { n: "01", t: "Quote", d: "Tell us the lane and the vehicle. A defensible estimate lands in seconds." },
  { n: "02", t: "Vetted carrier", d: "We match an insured, authority-checked carrier for your lane and equipment." },
  { n: "03", t: "Picked up", d: "Digital condition report and photos at the curb — your record, not a guess." },
  { n: "04", t: "Tracked", d: "Milestone updates by text and email. No more “where’s my car?” calls." },
  { n: "05", t: "Delivered", d: "White-glove handoff, inspection signed, done." },
];

// The journey as a self-drawing timeline.
export function HowItWorks() {
  return (
    <section className="bf-section" id="how">
      <div className="bf-container">
        <Reveal>
          <p className="bf-up bf-t-xs bf-accent">From request to driveway</p>
          <h2 className="bf-t-display-l" style={{ marginTop: ".75rem" }}>How the line moves.</h2>
        </Reveal>
        <Reveal delay={120}>
          <ol className="bf-timeline">
            <span className="bf-timeline__line" aria-hidden />
            {STEPS.map((s) => (
              <li className="bf-timeline__step" key={s.n}>
                <span className="bf-timeline__node" aria-hidden />
                <span className="bf-card__tag">{s.n}</span>
                <h3 className="bf-t-h3" style={{ marginTop: ".4rem" }}>{s.t}</h3>
                <p className="bf-t-sm" style={{ marginTop: ".35rem" }}>{s.d}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
