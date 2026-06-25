"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type ComboOption = { id: string; label: string; sub?: string };

// Searchable city select — premium combobox (filter as you type, click to
// pick, click-outside to close). Keyboard: ↑/↓/Enter/Esc.
export function Combobox({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabledId,
}: {
  label: string;
  placeholder: string;
  options: ComboOption[];
  value: string | null;
  onChange: (id: string) => void;
  disabledId?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.id === value) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = options.filter((o) => o.id !== disabledId);
    if (!q) return base.slice(0, 60);
    return base.filter((o) => o.label.toLowerCase().includes(q)).slice(0, 60);
  }, [query, options, disabledId]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (o: ComboOption) => {
    onChange(o.id);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="bf-field bf-combo" ref={rootRef}>
      <span className="bf-label">{label}</span>
      <button
        type="button"
        className={`bf-input bf-combo__control ${open ? "is-focus" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? "" : "bf-combo__ph"}>{selected ? selected.label : placeholder}</span>
        <span className="bf-combo__chev" aria-hidden>▾</span>
      </button>

      {open && (
        <div className="bf-combo__pop" data-lenis-prevent>
          <input
            autoFocus
            className="bf-input bf-combo__search"
            placeholder="Search city…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              else if (e.key === "Enter") { e.preventDefault(); if (filtered[active]) pick(filtered[active]); }
              else if (e.key === "Escape") setOpen(false);
            }}
          />
          <ul className="bf-combo__list" role="listbox">
            {filtered.length === 0 && <li className="bf-combo__empty">No match</li>}
            {filtered.map((o, i) => (
              <li
                key={o.id}
                role="option"
                aria-selected={o.id === value}
                className={`bf-combo__opt ${i === active ? "is-active" : ""} ${o.id === value ? "is-selected" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(o)}
              >
                <span>{o.label}</span>
                {o.sub ? <span className="bf-combo__sub">{o.sub}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
