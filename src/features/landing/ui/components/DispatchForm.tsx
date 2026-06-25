"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Combobox, type ComboOption } from "./Combobox";
import { LaneMap } from "./LaneMap";
import { CITIES, cityLabel, getCity } from "@/domain/quote/places";
import { DASHBOARD_DEMO_KEY } from "@/shared/config";
import type { Timing, Transport, VehicleClass } from "@/domain/quote/types";

const CITY_OPTIONS: ComboOption[] = CITIES.map((c) => ({ id: c.id, label: cityLabel(c) }));
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

type ApiOk = {
  id: string;
  reference: string;
  responseSeconds: number;
  quote: { low: number; high: number; distanceMi: number; pickupName: string; deliveryName: string; confidence: string };
  sms: string;
  delivery: { smsSimulated: boolean; emailSimulated: boolean };
};

export function DispatchForm() {
  const [pickupId, setPickupId] = useState<string | null>("hou");
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [vehicleLabel, setVehicleLabel] = useState("");
  const [vehicleClass, setVehicleClass] = useState<VehicleClass>("suv");
  const [transport, setTransport] = useState<Transport>("enclosed");
  const [operable, setOperable] = useState(true);
  const [timing, setTiming] = useState<Timing>("standard");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [result, setResult] = useState<ApiOk | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickup = pickupId ? getCity(pickupId) : undefined;
  const delivery = deliveryId ? getCity(deliveryId) : undefined;
  const ready = !!pickupId && !!deliveryId && name.trim() && email.trim() && phone.trim() && pickupId !== deliveryId;

  async function submit() {
    if (!ready || status === "submitting") return;
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickupId, deliveryId, vehicleClass, transport, operable, timing, name, email, phone, vehicleLabel }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); setStatus("error"); return; }
      setResult(data as ApiOk);
      setStatus("done");
    } catch {
      setError("Network error — please try again.");
      setStatus("error");
    }
  }

  if (status === "done" && result) {
    return <Confirmation result={result} onReset={() => { setStatus("idle"); setResult(null); setDeliveryId(null); }} />;
  }

  return (
    <div className="bf-dispatch">
      <div className="bf-dispatch__form">
        <div className="bf-grid2">
          <Combobox label="Pickup" placeholder="Where from?" options={CITY_OPTIONS} value={pickupId} onChange={setPickupId} disabledId={deliveryId} />
          <Combobox label="Delivery" placeholder="Where to?" options={CITY_OPTIONS} value={deliveryId} onChange={setDeliveryId} disabledId={pickupId} />
        </div>

        <div className="bf-grid2">
          <label className="bf-field">
            <span className="bf-label">Vehicle</span>
            <input className="bf-input" placeholder="2024 Mercedes G 580" value={vehicleLabel} onChange={(e) => setVehicleLabel(e.target.value)} />
          </label>
          <label className="bf-field">
            <span className="bf-label">Type</span>
            <select className="bf-input bf-select" value={vehicleClass} onChange={(e) => setVehicleClass(e.target.value as VehicleClass)}>
              <option value="sedan">Sedan / coupe</option>
              <option value="suv">SUV / crossover</option>
              <option value="truck">Truck / van</option>
              <option value="luxury">Luxury / exotic</option>
            </select>
          </label>
        </div>

        <div className="bf-grid3">
          <Seg label="Transport" value={transport} onChange={setTransport} options={[["enclosed", "Enclosed"], ["open", "Open"]]} />
          <Seg label="Condition" value={operable ? "y" : "n"} onChange={(v) => setOperable(v === "y")} options={[["y", "Running"], ["n", "Non-running"]]} />
          <Seg label="Timing" value={timing} onChange={setTiming} options={[["standard", "Standard"], ["expedite", "Expedited"]]} />
        </div>

        <div className="bf-grid3">
          <label className="bf-field"><span className="bf-label">Name</span><input className="bf-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" /></label>
          <label className="bf-field"><span className="bf-label">Email</span><input className="bf-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" /></label>
          <label className="bf-field"><span className="bf-label">Mobile</span><input className="bf-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(713) 555-0142" /></label>
        </div>

        {error && <p className="bf-help bf-help--error">{error}</p>}

        <button className={`bf-btn bf-btn--primary bf-dispatch__cta ${status === "submitting" ? "bf-btn--loading" : ""}`} disabled={!ready} onClick={submit}>
          {status === "submitting" ? <span className="bf-spinner" /> : null}
          <span className="bf-btn__label">{status === "submitting" ? "Dispatching…" : "Dispatch my quote"}</span>
          {status !== "submitting" && <span className="bf-btn__arrow" aria-hidden>→</span>}
        </button>
        <p className="bf-t-xs" style={{ color: "var(--bf-text-faint)" }}>A real, lane-based estimate in seconds. No spam, no obligation.</p>
      </div>

      <aside className="bf-dispatch__aside">
        <LaneMap pickup={pickup} delivery={delivery} />
      </aside>
    </div>
  );
}

function Seg<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: [T, string][] }) {
  return (
    <div className="bf-field">
      <span className="bf-label">{label}</span>
      <div className="bf-seg" role="group" aria-label={label}>
        {options.map(([v, l]) => (
          <button type="button" key={v} className={`bf-seg__opt ${value === v ? "is-active" : ""}`} onClick={() => onChange(v)}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function Confirmation({ result, onReset }: { result: ApiOk; onReset: () => void }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const target = result.responseSeconds;
    const start = performance.now();
    const dur = 700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setSecs(Math.round(target * p * 10) / 10);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [result.responseSeconds]);

  return (
    <div className="bf-dispatch bf-dispatch--done">
      <div className="bf-confirm bf-confirm--live">
        <svg className="bf-check bf-check--draw" viewBox="0 0 52 52" aria-hidden>
          <circle cx="26" cy="26" r="24" />
          <path d="M16 27l7 7 14-15" />
        </svg>
        <span className="bf-up bf-t-xs">Replied in <span className="bf-num bf-accent">{secs.toFixed(1)}s</span></span>
        <h3 className="bf-t-display-m">Quote on its way</h3>
        <p className="bf-t-body" style={{ maxWidth: "46ch" }}>
          {result.quote.pickupName} → {result.quote.deliveryName} · {result.quote.distanceMi.toLocaleString()} mi
        </p>
        <div className="bf-estimate">
          <span className="bf-num bf-estimate__range">{usd(result.quote.low)}<span className="bf-estimate__dash"> – </span>{usd(result.quote.high)}</span>
          <span className="bf-t-xs">estimated · locks when a vetted carrier accepts</span>
        </div>

        <div className="bf-sms">
          <div className="bf-sms__head">
            <span className="bf-up bf-t-xs">SMS{result.delivery.smsSimulated ? " · preview" : " · sent"}</span>
            <span className="bf-num bf-t-xs bf-accent">{result.reference}</span>
          </div>
          <p className="bf-sms__body">{result.sms}</p>
          {result.delivery.smsSimulated && <p className="bf-t-xs" style={{ color: "var(--bf-text-faint)" }}>Demo preview — add Twilio to deliver to a real phone.</p>}
        </div>

        <div className="bf-cluster" style={{ justifyContent: "center" }}>
          <Link className="bf-btn bf-btn--secondary" href={`/dashboard?k=${DASHBOARD_DEMO_KEY}`}>See the ops dashboard</Link>
          <button className="bf-btn bf-btn--ghost" onClick={onReset}>New quote</button>
        </div>
      </div>
    </div>
  );
}
