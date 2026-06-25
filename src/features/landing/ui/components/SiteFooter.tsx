import { BrandMark } from "@/shared/ui/BrandMark";

export function SiteFooter() {
  return (
    <footer className="bf-sitefoot">
      <div className="bf-container bf-sitefoot__grid">
        <div>
          <a className="bf-nav__brand" href="#top"><BrandMark className="bf-nav__mark" /><span>Bigfella Auto Express</span></a>
          <p className="bf-t-sm" style={{ marginTop: "1rem", maxWidth: "34ch" }}>
            White-glove auto transport out of Houston, Texas. Vetted, insured carriers — for athletes,
            dealerships, and anyone who treats their vehicle like it matters.
          </p>
        </div>
        <div className="bf-sitefoot__col">
          <p className="bf-up bf-t-xs">Transport</p>
          <a href="#dispatch">Instant quote</a>
          <a href="#how">How it works</a>
          <a href="#who">Who we serve</a>
        </div>
        <div className="bf-sitefoot__col">
          <p className="bf-up bf-t-xs">Company</p>
          <span>Houston, TX</span>
          <span>Mon–Sat · 7am–9pm CT</span>
          <span>dispatch@bigfellaautoexpress.com</span>
        </div>
      </div>
      <div className="bf-container bf-sitefoot__legal">
        <span>© Bigfella Auto Express</span>
        <span className="bf-t-xs" style={{ color: "var(--bf-text-faint)" }}>Estimates are lane-based ranges; final price locks when a vetted carrier accepts.</span>
      </div>
    </footer>
  );
}
