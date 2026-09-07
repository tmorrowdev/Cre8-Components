// Color ramp utilities shared by the brand-extract API route and the client.
//
// The cre8-a2ui token set derives its primary ramp from a single seed with
// `oklch(from var(--cre8-seed-primary) …)` (see the brand's tokens_brand.css).
// Retheming is therefore just setting that seed — but the API route also shows
// the resulting ramp as swatches, so the math below MUST match the CSS
// coefficients exactly or the preview will not be what actually renders.

export type Hsl = { h: number; s: number; l: number };

// Tailwind "blue" ramp — the values the default seed (#3B82F6) reproduces.
// Order: 50,100,200,300,400,500,600,700,800,900,950.
export const BLUE_RAMP = [
  "#EFF6FF",
  "#DBEAFE",
  "#BFDBFE",
  "#93C5FD",
  "#60A5FA",
  "#3B82F6",
  "#2563EB",
  "#1D4ED8",
  "#1E40AF",
  "#1E3A8A",
  "#172554",
] as const;

// Per-step OKLCh channels, mirroring the `oklch(from …)` expressions in the
// brand's tier-1 primitives: absolute lightness, a chroma multiplier on the
// seed, and a hue delta in degrees. Fitted so the default seed reproduces
// BLUE_RAMP exactly. Keep in sync with tokens_brand.css.
//
// Index 5 (step 500) is the anchor: it is the seed verbatim, so the colour an
// integrator sets is the colour that renders. Its entry below is the seed's own
// position and is only used to keep the array aligned.
const ANCHOR_INDEX = 5;
const PRIMARY_STEPS: ReadonlyArray<{ l: number; c: number; dh: number }> = [
  { l: 0.9705, c: 0.0754, dh: -5.21 },
  { l: 0.9319, c: 0.168, dh: -4.23 },
  { l: 0.8823, c: 0.3035, dh: -5.69 },
  { l: 0.8091, c: 0.5085, dh: -8.0 },
  { l: 0.7137, c: 0.7626, dh: -5.19 },
  { l: 0.6231, c: 1, dh: 0 },
  { l: 0.5461, c: 1.1446, dh: 3.07 },
  { l: 0.4882, c: 1.155, dh: 4.56 },
  { l: 0.4244, c: 0.962, dh: 5.82 },
  { l: 0.3791, c: 0.7327, dh: 5.71 },
  { l: 0.2823, c: 0.4651, dh: 8.12 },
];

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase();
}

export function rgbToHsl(r: number, g: number, b: number): Hsl {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

export function hexToHsl(hex: string): Hsl | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

// Relative luminance (sRGB) — used to pick black/white content on a fill.
export function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const lin = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b);
}

export function readableOn(hex: string): "#ffffff" | "#0F172A" {
  return luminance(hex) > 0.45 ? "#0F172A" : "#ffffff";
}

// --- OKLab/OKLCh, matching the CSS Color 4 relative-color pipeline -----------

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const toSrgb = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

function hexToOklch(hex: string): [number, number, number] | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const R = toLinear(rgb.r / 255), G = toLinear(rgb.g / 255), B = toLinear(rgb.b / 255);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const b = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(a, b), (Math.atan2(b, a) * 180) / Math.PI];
}

function oklchToHex([L, C, H]: [number, number, number]): string {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return rgbToHex(
    toSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s) * 255,
    toSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s) * 255,
    toSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s) * 255,
  );
}

// Build the 11-step primary ramp the design system will derive from this seed.
// This mirrors tokens_brand.css tier 1, so what the caller previews is what the
// browser computes once `--cre8-seed-primary` is set.
export function buildRamp(primary: string): string[] {
  const seed = hexToOklch(primary);
  if (!seed) return [...BLUE_RAMP];
  return PRIMARY_STEPS.map(({ l, c, dh }, i) =>
    i === ANCHOR_INDEX
      ? primary.trim().toUpperCase()
      : oklchToHex([l, seed[1] * c, seed[2] + dh]),
  );
}
