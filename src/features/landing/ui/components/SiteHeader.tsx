import { BrandMark } from "@/shared/ui/BrandMark";

export function SiteHeader() {
  return (
    <nav className="bf-nav">
      <a className="bf-nav__brand" href="#top">
        <BrandMark className="bf-nav__mark" />
        <span>Bigfella<span className="bf-nav__sub"> Auto Express</span></span>
      </a>
      <div className="bf-nav__links">
        <a href="#speed">Speed</a>
        <a href="#who">Who we serve</a>
        <a href="#how">How it works</a>
      </div>
      <a className="bf-btn bf-btn--primary bf-nav__cta" href="#dispatch">
        <span className="bf-btn__label">Get a quote</span>
        <span className="bf-btn__arrow" aria-hidden>→</span>
      </a>
    </nav>
  );
}
