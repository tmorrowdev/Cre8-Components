/**
 * Colour math for the brand generator: sRGB <-> OKLab <-> OKLCH, CSS Color 4
 * gamut mapping, CSS relative-colour evaluation and WCAG 2.x contrast.
 *
 * Implemented here (≈150 lines) rather than pulled from a library so the
 * generator stays dependency-free apart from ajv. Matrices are the ones
 * published in CSS Color 4 / Björn Ottosson's OKLab reference.
 */

const clamp01 = (x) => Math.min(1, Math.max(0, x));

export function parseHex(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(h)) throw new Error(`Not a hex colour: ${hex}`);
  const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
  return { r: n(0), g: n(2), b: n(4), alpha: h.length === 8 ? n(6) : 1 };
}

export function toHex({ r, g, b }) {
  const c = (x) => Math.round(clamp01(x) * 255).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

const toLinear = (c) => (Math.abs(c) <= 0.04045 ? c / 12.92 : Math.sign(c) * ((Math.abs(c) + 0.055) / 1.055) ** 2.4);
const fromLinear = (c) => (Math.abs(c) <= 0.0031308 ? c * 12.92 : Math.sign(c) * (1.055 * Math.abs(c) ** (1 / 2.4) - 0.055));

export function srgbToOklab({ r, g, b }) {
  const lr = toLinear(r); const lg = toLinear(g); const lb = toLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

export function oklabToSrgb({ L, a, b }) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return {
    r: fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  };
}

export function oklabToOklch({ L, a, b }) {
  const C = Math.sqrt(a * a + b * b);
  let H = (Math.atan2(b, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H: C < 1e-7 ? 0 : H };
}

export function oklchToOklab({ L, C, H }) {
  const rad = (H * Math.PI) / 180;
  return { L, a: C * Math.cos(rad), b: C * Math.sin(rad) };
}

export const hexToOklch = (hex) => ({ ...oklabToOklch(srgbToOklab(parseHex(hex))), alpha: parseHex(hex).alpha });

const inGamut = ({ r, g, b }, eps = 1e-6) => [r, g, b].every((c) => c >= -eps && c <= 1 + eps);
const deltaEOK = (x, y) => Math.hypot(x.L - y.L, x.a - y.a, x.b - y.b);

/** CSS Color 4 §13.2 gamut mapping (OKLCH chroma reduction, JND 0.02). */
export function oklchToSrgbMapped({ L, C, H }) {
  if (L >= 1) return { r: 1, g: 1, b: 1 };
  if (L <= 0) return { r: 0, g: 0, b: 0 };
  const direct = oklabToSrgb(oklchToOklab({ L, C, H }));
  if (inGamut(direct)) return direct;
  const clip = (rgb) => ({ r: clamp01(rgb.r), g: clamp01(rgb.g), b: clamp01(rgb.b) });
  const JND = 0.02; const EPS = 0.0001;
  let clipped = clip(direct);
  if (deltaEOK(srgbToOklab(clipped), oklchToOklab({ L, C, H })) < JND) return clipped;
  let min = 0; let max = C; let minInGamut = true;
  while (max - min > EPS) {
    const chroma = (min + max) / 2;
    const current = oklabToSrgb(oklchToOklab({ L, C: chroma, H }));
    if (minInGamut && inGamut(current)) { min = chroma; continue; }
    clipped = clip(current);
    const E = deltaEOK(srgbToOklab(clipped), srgbToOklab(current));
    if (E < JND) {
      if (JND - E < EPS) return clipped;
      minInGamut = false; min = chroma;
    } else {
      max = chroma;
    }
  }
  return clip(oklabToSrgb(oklchToOklab({ L, C: min, H })));
}

/** Parse a concrete colour (hex, oklch(L C H [/ a]), rgb()/rgba()) to { L, C, H, alpha }. */
export function parseColor(str) {
  const s = str.trim();
  if (s.startsWith('#')) return hexToOklch(s);
  let m = s.match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+%?))?\s*\)$/i);
  if (m) {
    const L = m[1].endsWith('%') ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
    const alpha = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { L, C: parseFloat(m[2]), H: parseFloat(m[3]), alpha };
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+))?\s*\)$/i);
  if (m) {
    const lch = oklabToOklch(srgbToOklab({ r: m[1] / 255, g: m[2] / 255, b: m[3] / 255 }));
    return { ...lch, alpha: m[4] === undefined ? 1 : parseFloat(m[4]) };
  }
  if (/^(white)$/i.test(s)) return parseColor('#ffffff');
  if (/^(black)$/i.test(s)) return parseColor('#000000');
  if (/^transparent$/i.test(s)) return { L: 0, C: 0, H: 0, alpha: 0 };
  throw new Error(`Cannot parse colour: ${str}`);
}

/**
 * Evaluate one channel of relative colour syntax: a number, a channel keyword
 * (l/c/h/alpha), or calc(<keyword|number> <op> <number> ...).
 */
function evalChannel(expr, ch) {
  const e = expr.trim();
  const inner = e.startsWith('calc(') && e.endsWith(')') ? e.slice(5, -1) : e;
  const tokens = inner.match(/[a-z]+|-?\d*\.?\d+%?|[-+*/]/gi);
  if (!tokens) throw new Error(`Bad channel: ${expr}`);
  const val = (t) => (t in ch ? ch[t] : t.endsWith('%') ? parseFloat(t) / 100 : parseFloat(t));
  // left-to-right with * / precedence
  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === '*' || t === '/') {
      const a = out.pop(); const b = val(tokens[++i]);
      out.push(t === '*' ? a * b : a / b);
    } else if (t === '+' || t === '-') {
      out.push(t);
    } else {
      out.push(val(t));
    }
  }
  let acc = out[0];
  for (let i = 1; i < out.length; i += 2) acc = out[i] === '+' ? acc + out[i + 1] : acc - out[i + 1];
  return acc;
}

/** Split "a b calc(x y) d" at top-level whitespace. */
export function splitTop(str) {
  const parts = []; let depth = 0; let cur = '';
  for (const ch of str.trim()) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (/\s/.test(ch) && depth === 0) { if (cur) parts.push(cur); cur = ''; } else cur += ch;
  }
  if (cur) parts.push(cur);
  return parts;
}

/**
 * Evaluate `oklch(from <origin> L C H [/ A])` where <origin> is already a
 * concrete colour string. Returns { L, C, H, alpha }.
 */
export function evalRelativeOklch(originStr, channelStr) {
  const o = parseColor(originStr);
  const ch = { l: o.L, c: o.C, h: o.H, alpha: o.alpha };
  const [main, alphaPart] = channelStr.split('/');
  const [Lx, Cx, Hx] = splitTop(main);
  let H = evalChannel(Hx, ch) % 360; if (H < 0) H += 360;
  return {
    L: evalChannel(Lx, ch),
    C: Math.max(0, evalChannel(Cx, ch)),
    H,
    alpha: alphaPart === undefined ? o.alpha : evalChannel(alphaPart, ch),
  };
}

export function oklchString({ L, C, H, alpha = 1 }) {
  const r = (x, d) => Number(x.toFixed(d));
  return `oklch(${r(L, 4)} ${r(C, 4)} ${r(H, 2)}${alpha < 1 ? ` / ${r(alpha, 3)}` : ''})`;
}

export const oklchToHex = (lch) => toHex(oklchToSrgbMapped(lch));

export function relativeLuminance(rgb) {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => toLinear(clamp01(c)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Composite fg (with alpha) over an opaque bg, both { L, C, H, alpha }. */
function toRgbOver(fg, bgRgb) {
  const rgb = oklchToSrgbMapped(fg);
  const a = fg.alpha ?? 1;
  if (a >= 1 || !bgRgb) return rgb;
  return { r: rgb.r * a + bgRgb.r * (1 - a), g: rgb.g * a + bgRgb.g * (1 - a), b: rgb.b * a + bgRgb.b * (1 - a) };
}

/** WCAG 2.x contrast ratio between two colours ({ L, C, H, alpha } or strings). */
export function contrastRatio(fg, bg) {
  const F = typeof fg === 'string' ? parseColor(fg) : fg;
  const B = typeof bg === 'string' ? parseColor(bg) : bg;
  const bgRgb = toRgbOver(B, { r: 1, g: 1, b: 1 });
  const fgRgb = toRgbOver(F, bgRgb);
  const l1 = relativeLuminance(fgRgb); const l2 = relativeLuminance(bgRgb);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}
