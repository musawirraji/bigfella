// Token DATA for the style-guide specimen. Lives in domain so the UI
// components stay render-only (they map over this, compute nothing).

export type Swatch = { name: string; varName: string; hex: string; note?: string };
export type SwatchGroup = { title: string; swatches: Swatch[] };

export const colorGroups: SwatchGroup[] = [
  {
    title: "Ink — obsidian surfaces",
    swatches: [
      { name: "base", varName: "--bf-bg", hex: "#050609", note: "page void" },
      { name: "surface", varName: "--bf-surface", hex: "#0c0e13" },
      { name: "surface-2", varName: "--bf-surface-2", hex: "#171b22", note: "raised" },
      { name: "border", varName: "--bf-border", hex: "#2a313d" },
      { name: "border-strong", varName: "--bf-border-strong", hex: "#3b4453" },
    ],
  },
  {
    title: "Paper — warm neutrals (headlight)",
    swatches: [
      { name: "text", varName: "--bf-text", hex: "#f6f3ec", note: "primary" },
      { name: "text-muted", varName: "--bf-text-muted", hex: "#b4afa3" },
      { name: "text-dim", varName: "--bf-text-dim", hex: "#8b867b" },
      { name: "text-faint", varName: "--bf-text-faint", hex: "#66625a" },
    ],
  },
  {
    title: "Brass — the one accent (champagne)",
    swatches: [
      { name: "accent-light", varName: "--bf-accent-light", hex: "#ecd199" },
      { name: "accent", varName: "--bf-accent", hex: "#dcb46a", note: "base" },
      { name: "accent-strong", varName: "--bf-accent-strong", hex: "#c79a4c" },
      { name: "accent-deep", varName: "--bf-accent-deep", hex: "#a67c39" },
    ],
  },
  {
    title: "Signal — dashboard good/bad only",
    swatches: [
      { name: "good", varName: "--bf-good", hex: "#5cc08c" },
      { name: "bad", varName: "--bf-bad", hex: "#e0594d" },
      { name: "warn", varName: "--bf-warn", hex: "#e0a23c" },
    ],
  },
];

export type TypeSpec = { label: string; cls: string; sample: string; meta: string };

export const typeScale: TypeSpec[] = [
  { label: "Display XL", cls: "bf-t-display-xl", sample: "Every mile, handled.", meta: "Clash Display · clamp(3.25–7.5rem)" },
  { label: "Display L", cls: "bf-t-display-l", sample: "Houston to anywhere", meta: "Clash Display · clamp(2.5–4.5rem)" },
  { label: "Display M", cls: "bf-t-display-m", sample: "Dispatch in seconds", meta: "Clash Display · clamp(2–3rem)" },
  { label: "Heading 1", cls: "bf-t-h1", sample: "White-glove, coast to coast", meta: "Satoshi 700" },
  { label: "Heading 2", cls: "bf-t-h2", sample: "Vetted, enclosed, tracked", meta: "Satoshi 700" },
  { label: "Body Large", cls: "bf-t-body-l", sample: "A defensible quote in your hands before the competition picks up the phone.", meta: "Satoshi 400 · 1.125rem" },
  { label: "Body", cls: "bf-t-body", sample: "Open or enclosed. Running or not. We price the real lane, not a guess.", meta: "Satoshi 400 · 1rem" },
  { label: "Caption", cls: "bf-t-xs bf-up", sample: "Reference · BF-4821", meta: "Satoshi 500 · uppercase · tracked" },
];

export const radii = [
  { name: "sm", varName: "--bf-radius-sm", px: "6px" },
  { name: "md", varName: "--bf-radius-md", px: "10px" },
  { name: "lg", varName: "--bf-radius-lg", px: "16px" },
  { name: "xl", varName: "--bf-radius-xl", px: "24px" },
  { name: "pill", varName: "--bf-radius-pill", px: "999px" },
];

export const spacing = [
  { step: "1", px: "4" }, { step: "2", px: "8" }, { step: "3", px: "12" },
  { step: "4", px: "16" }, { step: "5", px: "24" }, { step: "6", px: "32" },
  { step: "7", px: "48" }, { step: "8", px: "64" },
];

export const motionTokens = [
  { name: "fast", value: "160ms", use: "hovers, micro-states" },
  { name: "base", value: "280ms", use: "reveals, transitions" },
  { name: "slow", value: "600ms", use: "scene / scroll beats" },
  { name: "ease-out", value: "cubic-bezier(.16,1,.3,1)", use: "entrances (expo-ish)" },
];

// The people Bigfella serves — used in the concierge specimen cards.
export const audiences = [
  { tag: "01", title: "Athletes", body: "Enclosed, discreet, on their schedule — not a load board afterthought." },
  { tag: "02", title: "Agents & managers", body: "One dispatcher, every client's vehicle, one thread." },
  { tag: "03", title: "Dealerships", body: "Lane-priced moves and auction runs with tracked delivery." },
  { tag: "04", title: "Retail", body: "The white-glove experience, for one car or a collection." },
];
