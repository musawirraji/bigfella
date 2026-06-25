import { Reveal } from "./Reveal";
import { audiences } from "@/domain/design/tokens";

// Who we serve — dispatch-ticket cards. No stock photos.
export function Concierge() {
  return (
    <section className="bf-section" id="who">
      <div className="bf-container">
        <Reveal>
          <p className="bf-up bf-t-xs bf-accent">Concierge by default</p>
          <h2 className="bf-t-display-l" style={{ marginTop: ".75rem", maxWidth: "20ch" }}>One dispatcher. Every vehicle. One thread.</h2>
        </Reveal>
        <div className="bf-cols bf-cols--4" style={{ marginTop: "2.5rem" }}>
          {audiences.map((a, i) => (
            <Reveal key={a.tag} delay={i * 90}>
              <article className="bf-card" style={{ height: "100%" }}>
                <span className="bf-card__tag">{a.tag}</span>
                <h3 className="bf-card__title bf-t-h2">{a.title}</h3>
                <p className="bf-card__body">{a.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
