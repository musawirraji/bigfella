import Link from "next/link";
import { getLead } from "@/infrastructure/store";
import { DASHBOARD_DEMO_KEY } from "@/shared/config";

export const dynamic = "force-dynamic";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default async function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = getLead(id);

  if (!lead) {
    return (
      <div className="bf-conf">
        <main className="bf-container" style={{ minHeight: "100vh", display: "grid", placeContent: "center", textAlign: "center", gap: "1rem" }}>
          <h1 className="bf-t-h1">Quote not found</h1>
          <p className="bf-t-body">This confirmation link isn&rsquo;t active anymore.</p>
          <Link className="bf-btn bf-btn--brand" href="/#dispatch" style={{ justifySelf: "center" }}>Get a new quote →</Link>
        </main>
      </div>
    );
  }

  const sms = lead.messages.find((m) => m.channel === "sms");

  return (
    <div className="bf-conf">
    <main className="bf-container" style={{ minHeight: "100vh", display: "grid", placeContent: "center", paddingBlock: "4rem" }}>
      <div className="bf-confirm bf-confirm--live" style={{ maxWidth: 560, marginInline: "auto" }}>
        <svg className="bf-check" viewBox="0 0 52 52" aria-hidden><circle cx="26" cy="26" r="24" /><path d="M16 27l7 7 14-15" /></svg>
        <span className="bf-up bf-t-xs">Replied in <span className="bf-num bf-accent">{lead.responseSeconds.toFixed(1)}s</span></span>
        <h1 className="bf-t-display-m">Quote on its way</h1>
        <p className="bf-t-body">{lead.quote.pickupName} → {lead.quote.deliveryName} · {lead.quote.distanceMi.toLocaleString()} mi</p>
        <div className="bf-estimate">
          <span className="bf-num bf-estimate__range">{usd(lead.quote.low)}<span className="bf-estimate__dash"> – </span>{usd(lead.quote.high)}</span>
          <span className="bf-t-xs">estimated · locks when a vetted carrier accepts</span>
        </div>
        {sms && (
          <div className="bf-sms">
            <div className="bf-sms__head"><span className="bf-up bf-t-xs">SMS</span><span className="bf-num bf-t-xs bf-accent">{lead.reference}</span></div>
            <p className="bf-sms__body">{sms.body}</p>
          </div>
        )}
        <div className="bf-cluster" style={{ justifyContent: "center" }}>
          <Link className="bf-btn bf-btn--secondary" href={`/dashboard?k=${DASHBOARD_DEMO_KEY}`}>See the ops dashboard</Link>
          <Link className="bf-btn bf-btn--ghost" href="/#dispatch">New quote</Link>
        </div>
      </div>
    </main>
    </div>
  );
}
