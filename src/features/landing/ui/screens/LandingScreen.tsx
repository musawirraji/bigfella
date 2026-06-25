import { SiteHeader } from "../components/SiteHeader";
import { Hero } from "../components/Hero";
import { DispatchForm } from "../components/DispatchForm";
import { SpeedProof } from "../components/SpeedProof";
import { Concierge } from "../components/Concierge";
import { HowItWorks } from "../components/HowItWorks";
import { FinalCta } from "../components/FinalCta";
import { SiteFooter } from "../components/SiteFooter";
import { Reveal } from "../components/Reveal";

export function LandingScreen() {
  return (
    <div id="top">
      <SiteHeader />
      <Hero />

      <section className="bf-section bf-dispatch-section" id="dispatch">
        <div className="bf-container">
          <Reveal>
            <div className="bf-dispatch-head">
              <p className="bf-up bf-t-xs bf-accent">Dispatch</p>
              <h2 className="bf-t-display-l" style={{ marginTop: ".75rem" }}>A quote in seconds, not tomorrow.</h2>
              <p className="bf-t-body-l" style={{ marginTop: "1rem", maxWidth: "44ch" }}>
                Real lane pricing — open or enclosed, running or not. You&rsquo;ll have a number
                before the next broker even calls back.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="bf-dispatch-shell">
              <DispatchForm />
            </div>
          </Reveal>
        </div>
      </section>

      <SpeedProof />
      <Concierge />
      <HowItWorks />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}
