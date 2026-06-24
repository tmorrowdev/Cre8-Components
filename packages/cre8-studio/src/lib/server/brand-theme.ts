import { readFile } from "fs/promises";
import path from "path";
import { BLUE_RAMP, buildRamp, buildSubstitution } from "../a2ui-demo/ramp";

// Server helpers for the brand-extract route: build the cre8 token override CSS
// from a brand color, and best-effort extract a brand color + font from a URL.

const BRAND_CSS = "../cre8-wc/design-tokens/brands/cre8-a2ui/css/tokens_brand.css";

let cachedTokenLines: { prop: string; value: string }[] | null = null;

// Parse the brand token CSS once into (custom-property, value) pairs.
async function tokenLines(): Promise<{ prop: string; value: string }[]> {
  if (cachedTokenLines) return cachedTokenLines;
  const file = path.resolve(process.cwd(), BRAND_CSS);
  const css = await readFile(file, "utf8");
  const lines: { prop: string; value: string }[] = [];
  const re = /(--cre8-[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    lines.push({ prop: m[1], value: m[2].trim() });
  }
  cachedTokenLines = lines;
  return lines;
}

// Produce a :root override block that substitutes the brand ramp for every token
// whose value references a blue-ramp hex. Returns the CSS string.
export async function buildThemeCss(primary: string): Promise<string> {
  const sub = buildSubstitution(primary);
  const blueSet = new Set(BLUE_RAMP.map((h) => h.toUpperCase()));
  const lines = await tokenLines();
  const out: string[] = [];
  for (const { prop, value } of lines) {
    // Substitute any blue-ramp hex appearing in the value (covers solid fills,
    // gradients and multi-stop values).
    let replaced = value;
    let touched = false;
    replaced = replaced.replace(/#[0-9a-fA-F]{6}/g, (hex) => {
      const up = hex.toUpperCase();
      if (blueSet.has(up)) {
        touched = true;
        return sub[up];
      }
      return hex;
    });
    if (touched) out.push(`  ${prop}: ${replaced};`);
  }
  return `:root {\n${out.join("\n")}\n}`;
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
