import { buildRamp } from "../a2ui-demo/ramp";

// Server helpers for the brand-extract route: build the cre8 token override CSS
// from a brand color, and best-effort extract a brand color + font from a URL.

// The brand token file is tiered: every colour resolves, through the semantic
// and component layers, back to `--cre8-seed-primary`. Retheming is therefore a
// single declaration — we no longer parse the token CSS and rewrite the ~160
// literals that used to carry a blue-ramp hex.
//
// The tier-1 primitives use `oklch(from …)`, which needs Chrome 119+,
// Safari 16.4+ or Firefox 128+. Where that is unsupported the derived ramp is
// invalid at parse time and the seed alone would leave the primary ramp unset,
// so we emit the pre-resolved hexes behind a feature query. On engines that do
// support relative colour the seed drives everything and this block never
// applies — which is what keeps the neutral/success/error ramps derived too.
export async function buildThemeCss(primary: string): Promise<string> {
  const ramp = buildRamp(primary);
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const fallback = steps
    .map((step, i) => `    --cre8-primary-${step}: ${ramp[i]};`)
    .join("\n");
  return [
    `:root { --cre8-seed-primary: ${primary}; }`,
    `@supports not (color: oklch(from #000 l c h)) {`,
    `  :root {`,
    fallback,
    `  }`,
    `}`,
  ].join("\n");
}

// ---- URL extraction --------------------------------------------------------

export interface ExtractResult {
  primary: string;
  fontFamily?: string;
  candidates: string[];
}

const NEUTRALS = (hex: string): boolean => {
  const h = hex.replace("#", "");
  if (h.length !== 6) return true;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const lum = (max + min) / 2 / 255;
  // Reject near-grayscale, near-white and near-black.
  return sat < 0.18 || lum > 0.93 || lum < 0.07;
};

export async function extractFromUrl(rawUrl: string): Promise<ExtractResult> {
  const url = normalizeUrl(rawUrl);
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (cre8-a2ui brand extractor)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Fetch failed: HTTP ${res.status}`);
  const html = await res.text();

  // 1. Explicit signals first: <meta name="theme-color"> and brand-ish CSS vars.
  const themeColor = matchFirst(html, /<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["']/i);
  const explicit = normalizeColor(themeColor);

  // 2. Collect all hex colors and a few rgb()s, weight by frequency.
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/#[0-9a-fA-F]{6}\b/g)) {
    const hex = m[0].toUpperCase();
    if (!NEUTRALS(hex)) counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }
  for (const m of html.matchAll(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi)) {
    const hex = rgbStrToHex(m[1], m[2], m[3]);
    if (hex && !NEUTRALS(hex)) counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([h]) => h);

  const primary = explicit ?? ranked[0] ?? "#3B82F6";
  const fontFamily = extractFont(html);

  return { primary, fontFamily, candidates: ranked.slice(0, 8) };
}

function extractFont(html: string): string | undefined {
  // Prefer an explicit body/font-family declaration; fall back to a Google Fonts
  // family reference in a <link>.
  const decl = matchFirst(html, /font-family\s*:\s*([^;}"']+)/i);
  if (decl) {
    const first = decl.split(",")[0].replace(/['"]/g, "").trim();
    if (first && !/inherit|var\(|initial/i.test(first)) return first;
  }
  const gf = matchFirst(html, /fonts\.googleapis\.com\/css2?\?family=([^:&"']+)/i);
  if (gf) return decodeURIComponent(gf).replace(/\+/g, " ");
  return undefined;
}

function matchFirst(s: string, re: RegExp): string | undefined {
  const m = s.match(re);
  return m ? m[1] : undefined;
}

function rgbStrToHex(r: string, g: string, b: string): string | null {
  const n = [r, g, b].map((x) => Math.max(0, Math.min(255, parseInt(x, 10))));
  if (n.some((x) => Number.isNaN(x))) return null;
  return `#${n.map((x) => x.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function normalizeColor(c?: string): string | undefined {
  if (!c) return undefined;
  const t = c.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(t)) return t.toUpperCase();
  if (/^#[0-9a-fA-F]{3}$/.test(t)) {
    const h = t.slice(1);
    return `#${h.split("").map((x) => x + x).join("")}`.toUpperCase();
  }
  const rgb = t.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (rgb) return rgbStrToHex(rgb[1], rgb[2], rgb[3]) ?? undefined;
  return undefined;
}

function normalizeUrl(u: string): string {
  const t = u.trim();
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

export { buildRamp };
