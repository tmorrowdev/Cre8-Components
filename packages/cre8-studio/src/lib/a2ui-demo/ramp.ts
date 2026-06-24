// Color ramp utilities shared by the brand-extract API route and the client.
//
// The cre8-a2ui token set is built on a Tailwind-style "blue" ramp. To retheme
// the whole system from a single brand color we generate a parallel ramp at the
// same lightness positions and substitute it for the original blue ramp wherever
// those exact hex values appear in the token CSS. This retints every surface
// (buttons, bands, headers, links, focus rings) consistently.

export type Hsl = { h: number; s: number; l: number };

// Tailwind "blue" ramp — these are the literal hex values used throughout the
// cre8-a2ui brand token CSS. Order: 50,100,200,300,400,500,600,700,800,900,950.
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

// Target lightness (%) for each ramp step. Anchored so step 500 (index 5) is the
// brand's own lightness; the rest fan out to light tints and dark shades.
const RAMP_LIGHTNESS = [97, 93, 86, 75, 65, 55, 47, 40, 33, 27, 18];

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

// Build an 11-step ramp from a single brand color, holding its hue/saturation and
// walking the canonical lightness positions. Saturation tapers slightly at the
// extremes so the lightest tints don't look neon and the darkest shades stay rich.
export function buildRamp(primary: string): string[] {
  const hsl = hexToHsl(primary);
  if (!hsl) return [...BLUE_RAMP];
  const baseSat = Math.max(20, Math.min(95, hsl.s));
  return RAMP_LIGHTNESS.map((l, i) => {
    const dist = Math.abs(i - 5) / 5; // 0 at anchor, 1 at extremes
    const sat = i <= 5 ? baseSat * (1 - dist * 0.2) : baseSat * (1 - dist * 0.1);
    return hslToHex(hsl.h, sat, l);
  });
}

// Map original blue ramp hex -> brand ramp hex (case-insensitive keys).
export function buildSubstitution(primary: string): Record<string, string> {
  const ramp = buildRamp(primary);
  const map: Record<string, string> = {};
  BLUE_RAMP.forEach((blue, i) => {
    map[blue.toUpperCase()] = ramp[i];
  });
  return map;
}
