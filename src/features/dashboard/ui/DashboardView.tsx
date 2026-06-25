"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lead } from "@/domain/quote/types";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const STATUS_LABEL: Record<Lead["status"], string> = { quoted: "Quoted", booked: "Booked", in_transit: "In transit", delivered: "Delivered" };

export function DashboardView({ leads, stats }: { leads: Lead[]; stats: { count: number; avgResponseSeconds: number; fastestSeconds: number } }) {
  const [selectedId, setSelectedId] = useState<string | null>(leads[0]?.id ?? null);
  const selected = leads.find((l) => l.id === selectedId) ?? null;

  if (leads.length === 0) {
    return (
      <div className="bf-dash__empty">
        <h2 className="bf-t-h1">No leads yet</h2>
        <p className="bf-t-body" style={{ marginTop: ".5rem" }}>Run a quote on the site and it shows up here instantly.</p>
        <Link className="bf-btn bf-btn--primary" href="/#dispatch" style={{ marginTop: "1.5rem" }}>Create a quote →</Link>
      </div>
    );
  }

  return (
    <>
      <div className="bf-dash__stats">
        <div className="bf-sg__panel bf-dash__hero">
          <p className="bf-up bf-t-xs">Average first-reply</p>
          <span className="bf-stat__num" style={{ fontSize: "clamp(3rem,8vw,6rem)" }}>{stats.avgResponseSeconds}<span className="bf-stat__unit">s</span></span>
          <div className="bf-bars" style={{ marginTop: "1.5rem" }}>
            <div className="bf-bar"><span className="bf-bar__label bf-accent">You</span><span className="bf-bar__track"><span className="bf-bar__fill bf-bar__fill--you" style={{ width: "100%" }} /></span><span className="bf-bar__val bf-accent">{stats.avgResponseSeconds}s</span></div>
            <div className="bf-bar"><span className="bf-bar__label">Industry</span><span className="bf-bar__track"><span className="bf-bar__fill bf-bar__fill--them" style={{ width: "6%" }} /></span><span className="bf-bar__val" style={{ color: "var(--bf-text-dim)" }}>15+ hrs</span></div>
          </div>
        </div>
        <div className="bf-dash__kpis">
          <div className="bf-sg__panel"><p className="bf-up bf-t-xs">Leads</p><span className="bf-num" style={{ fontSize: "2rem" }}>{stats.count}</span></div>
          <div className="bf-sg__panel"><p className="bf-up bf-t-xs">Fastest</p><span className="bf-num bf-accent" style={{ fontSize: "2rem" }}>{stats.fastestSeconds}s</span></div>
        </div>
      </div>

      <div className="bf-dash__grid">
        <div className="bf-dash__list">
          {leads.map((l) => (
            <button key={l.id} className={`bf-row bf-dash__row ${l.id === selectedId ? "is-active" : ""}`} onClick={() => setSelectedId(l.id)}>
              <span className="bf-row__lane">
                <span className="bf-dot" style={{ color: "var(--bf-accent)" }} />
                <span>
                  <span style={{ display: "block" }}>{l.quote.pickupName} → {l.quote.deliveryName}</span>
                  <span className="bf-t-xs" style={{ color: "var(--bf-text-dim)" }}>{l.input.name} · {l.input.transport}</span>
                </span>
              </span>
              <span className="bf-row__metric">{l.responseSeconds}s</span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="bf-dash__detail">
            <div className="bf-sg__panel">
              <div className="bf-cluster" style={{ justifyContent: "space-between" }}>
                <span className="bf-num bf-accent">{selected.reference}</span>
                <span className="bf-badge bf-badge--accent"><span className="bf-dot" /> {STATUS_LABEL[selected.status]}</span>
              </div>
              <h3 className="bf-t-h1" style={{ marginTop: ".75rem" }}>{selected.quote.pickupName} → {selected.quote.deliveryName}</h3>
              <p className="bf-t-sm">{selected.input.vehicleLabel || selected.input.vehicleClass} · {selected.quote.distanceMi.toLocaleString()} mi · {selected.input.transport}{selected.input.operable ? "" : " · non-running"}</p>

              <div className="bf-breakdown">
                {selected.quote.breakdown.map((b, i) => (
                  <div className="bf-breakdown__row" key={i}><span>{b.label}</span><span className="bf-num">{b.value}</span></div>
                ))}
                <div className="bf-breakdown__row bf-breakdown__total"><span>Customer estimate</span><span className="bf-num bf-accent">{usd(selected.quote.low)}–{usd(selected.quote.high)}</span></div>
                <div className="bf-breakdown__row"><span className="bf-t-xs" style={{ color: "var(--bf-text-dim)" }}>Suggested carrier pay (broker)</span><span className="bf-num bf-t-sm">{usd(selected.quote.carrierPay)}</span></div>
              </div>
            </div>

            <div className="bf-sg__panel">
              <p className="bf-up bf-t-xs" style={{ marginBottom: "1rem" }}>Conversation</p>
              <div className="bf-thread">
                {selected.messages.map((m) => (
                  <div key={m.id} className="bf-msg">
                    <span className="bf-msg__meta"><span className="bf-up bf-t-xs">{m.channel}</span> · {m.role}</span>
                    <p className="bf-msg__body">{m.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
