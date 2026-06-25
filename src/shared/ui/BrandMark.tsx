// Hand-built brand mark — a route node + heading chevron. No stock glyph.
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="9" stroke="var(--bf-border-strong)" />
      <path d="M9 21L16 9l7 12" stroke="var(--bf-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="22.5" r="2.4" fill="var(--bf-accent)" />
    </svg>
  );
}
