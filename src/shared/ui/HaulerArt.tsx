// Stylized / faceted enclosed car-hauler — placeholder for the pre-rendered
// frame sequence. Built from geometry (not stock art).
export function HaulerArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 620 280" fill="none" aria-hidden>
      <ellipse cx="310" cy="250" rx="280" ry="16" fill="url(#bf-ground)" />
      <defs>
        <linearGradient id="bf-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(220,180,106,0.18)" />
          <stop offset="1" stopColor="rgba(220,180,106,0)" />
        </linearGradient>
      </defs>
      <polygon className="bf-hauler__body" points="24,96 360,96 360,206 24,206" />
      <polygon className="bf-hauler__panel" points="24,96 360,96 348,112 36,112" />
      <polygon className="bf-hauler__panel" points="60,120 150,120 150,196 60,196" />
      <polygon className="bf-hauler__panel" points="166,120 256,120 256,196 166,196" />
      <polygon className="bf-hauler__panel" points="272,120 344,120 344,196 272,196" />
      <polygon className="bf-hauler__body" points="372,118 470,118 506,150 506,206 372,206" />
      <polygon className="bf-hauler__panel" points="430,126 466,126 496,152 430,152" />
      <polygon className="bf-hauler__body" points="506,168 566,178 566,206 506,206" />
      <polyline className="bf-hauler__edge" points="24,96 360,96 372,118 470,118 506,150 506,168 566,178" />
      <circle className="bf-hauler__light" cx="558" cy="190" r="5" />
      <circle cx="558" cy="190" r="11" fill="none" stroke="var(--bf-accent)" strokeWidth="1" opacity="0.4" />
      <g>
        <circle className="bf-hauler__wheel" cx="110" cy="214" r="26" />
        <circle className="bf-hauler__hub" cx="110" cy="214" r="6" />
        <circle className="bf-hauler__wheel" cx="178" cy="214" r="26" />
        <circle className="bf-hauler__hub" cx="178" cy="214" r="6" />
        <circle className="bf-hauler__wheel" cx="520" cy="214" r="26" />
        <circle className="bf-hauler__hub" cx="520" cy="214" r="6" />
      </g>
    </svg>
  );
}
