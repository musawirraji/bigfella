// Live lane map — plots pickup/delivery on a continental-US box and draws
// the route arc with the mileage. Render-only; geometry comes from domain.
import { project, roadMiles, type City } from "@/domain/quote/places";

export function LaneMap({ pickup, delivery }: { pickup?: City; delivery?: City }) {
  const a = pickup ? project(pickup) : null;
  const b = delivery ? project(delivery) : null;
  const miles = pickup && delivery ? roadMiles(pickup, delivery) : null;

  // arc control point — lift the midpoint perpendicular to the line
  let arc = "";
  if (a && b) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const lift = Math.min(14, Math.hypot(b.x - a.x, b.y - a.y) * 0.22);
    arc = `M ${a.x} ${a.y} Q ${mx} ${my - lift} ${b.x} ${b.y}`;
  }

  return (
    <div className="bf-lanemap">
      <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <rect x="0.5" y="0.5" width="99" height="59" rx="4" fill="none" stroke="var(--bf-hairline)" />
        {/* faint lat/long grid */}
        {[20, 40, 60, 80].map((x) => <line key={`v${x}`} x1={x} y1="2" x2={x} y2="58" stroke="var(--bf-hairline)" strokeWidth="0.3" />)}
        {[15, 30, 45].map((y) => <line key={`h${y}`} x1="2" y1={y} x2="98" y2={y} stroke="var(--bf-hairline)" strokeWidth="0.3" />)}

        {arc && <path className="bf-route__line" d={arc} strokeWidth="1.2" pathLength={1} />}

        {a && (
          <g>
            <circle className="bf-route__pin-ring" cx={a.x} cy={a.y} r="3" />
            <circle className="bf-route__pin" cx={a.x} cy={a.y} r="1.6" />
          </g>
        )}
        {b && (
          <g>
            <circle className="bf-route__pin-ring" cx={b.x} cy={b.y} r="3" />
            <circle className="bf-route__pin" cx={b.x} cy={b.y} r="1.6" />
          </g>
        )}
      </svg>

      <div className="bf-lanemap__foot">
        {miles != null ? (
          <>
            <span className="bf-num bf-accent" style={{ fontSize: "1.25rem" }}>{miles.toLocaleString()}</span>
            <span className="bf-t-xs"> mi · {pickup!.name} → {delivery!.name}</span>
          </>
        ) : (
          <span className="bf-t-xs" style={{ color: "var(--bf-text-faint)" }}>Pick an origin and destination to map the lane.</span>
        )}
      </div>
    </div>
  );
}
