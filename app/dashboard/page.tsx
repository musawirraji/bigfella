import Link from "next/link";
import { BrandMark } from "@/shared/ui/BrandMark";
import { DashboardView } from "@/features/dashboard/ui/DashboardView";
import { listLeads, getStats } from "@/infrastructure/store";
import { DASHBOARD_DEMO_KEY } from "@/shared/config";

export const dynamic = "force-dynamic";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams;

  if (k !== DASHBOARD_DEMO_KEY) {
    return (
      <div className="bf-ops">
        <main className="bf-container" style={{ minHeight: "100vh", display: "grid", placeContent: "center", textAlign: "center", gap: "1rem" }}>
          <p className="bf-up bf-t-xs bf-accent">Bigfella Operations</p>
          <h1 className="bf-t-h1">Restricted</h1>
          <p className="bf-t-body">This dashboard needs an access key. Open it from a quote confirmation.</p>
          <Link className="bf-btn bf-btn--secondary" href="/" style={{ justifySelf: "center" }}>← Back to site</Link>
        </main>
      </div>
    );
  }

  const leads = listLeads();
  const stats = getStats();

  return (
    <div className="bf-ops">
      <header className="bf-ops__top">
        <Link className="bf-ops__brand" href="/">
          <BrandMark className="bf-ops__mark" />
          Bigfella<span> / operations</span>
        </Link>
        <span className="bf-ops__badge">Live · in-memory demo</span>
      </header>
      <main className="bf-container" style={{ paddingBlock: "2.5rem" }}>
        <DashboardView leads={leads} stats={stats} />
      </main>
    </div>
  );
}
