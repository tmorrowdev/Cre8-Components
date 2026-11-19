/**
 * A small resolver for the generated token sheets: parses the custom
 * properties out of tokens_brand.css (per mode) and resolves var() chains,
 * relative OKLCH colours and calc() dimensions to concrete values.
 *
 * It understands exactly the CSS the generator emits; it is not a general CSS
 * engine.
 */
import { evalRelativeOklch, parseColor, splitTop } from './color.mjs';

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Parse custom-property declarations by context.
 * Returns { base, inverse, auto, reducedMotion, scoped } where each is a Map.
 * `scoped` collects rules on selectors other than the theme scope (e.g.
 * component-host overrides) and is informational only.
 */
export function parseSheet(css, scope = null) {
  const src = stripComments(css);
  const out = { base: new Map(), inverse: new Map(), auto: new Map(), reducedMotion: new Map(), scoped: new Map() };
  const stack = []; let buf = '';
  const bucketFor = (sels) => {
    const joined = sels.join(' | ');
    if (/prefers-reduced-motion/.test(joined)) return out.reducedMotion;
    if (/prefers-color-scheme:\s*dark/.test(joined)) return out.auto;
    if (/data-mode="inverse"/.test(joined)) return out.inverse;
    const last = sels[sels.length - 1] || '';
    if (/:root/.test(last) || /\[data-cre8-theme\]/.test(last) || (scope && last.includes(scope))) return out.base;
    return out.scoped;
  };
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') { stack.push(buf.trim()); buf = ''; continue; }
    if (ch === '}') { flush(); stack.pop(); buf = ''; continue; }
    if (ch === ';') { flush(); buf = ''; continue; }
    buf += ch;
  }
  function flush() {
    const m = buf.trim().match(/^(--[a-z0-9-]+)\s*:\s*([\s\S]*)$/i);
    if (m && stack.length) bucketFor(stack).set(m[1], m[2].trim());
  }
  return out;
}

const UNIT_PX = { px: 1, rem: 16 };

/** Evaluate a calc() body that contains only numbers with units and + - * / ( ). */
export function evalCalc(body) {
  const toks = body.match(/-?\d*\.?\d+(?:px|rem|ms|s|%|deg)?|[-+*/()]/g) || [];
  let i = 0;
  const num = (t) => {
    const m = t.match(/^(-?\d*\.?\d+)([a-z%]*)$/);
    return { v: parseFloat(m[1]), u: m[2] || '' };
  };
  const combineAdd = (a, b, sign) => {
    if (a.u === b.u || !b.u || !a.u) return { v: a.v + sign * b.v, u: a.u || b.u };
    const ap = a.v * (UNIT_PX[a.u] ?? 1); const bp = b.v * (UNIT_PX[b.u] ?? 1);
    return { v: ap + sign * bp, u: 'px' };
  };
  function factor() {
    const t = toks[i++];
    if (t === '(') { const v = expr(); i++; return v; }
    if (t === '-' ) { const f = factor(); return { v: -f.v, u: f.u }; }
    return num(t);
  }
  function term() {
    let a = factor();
    while (toks[i] === '*' || toks[i] === '/') {
      const op = toks[i++]; const b = factor();
      if (op === '*') a = { v: a.v * b.v, u: a.u || b.u };
      else a = { v: a.v / b.v, u: a.u && b.u ? '' : a.u };
    }
    return a;
  }
  function expr() {
    let a = term();
    while (toks[i] === '+' || toks[i] === '-') {
      const op = toks[i++]; const b = term();
      a = combineAdd(a, b, op === '+' ? 1 : -1);
    }
    return a;
  }
  const r = expr();
  const v = Number(r.v.toFixed(4));
  return `${v}${r.u}`;
}

const fmt = (x) => Number(x.toFixed(6));
const colourString = ({ L, C, H, alpha }) => `oklch(${fmt(L)} ${fmt(C)} ${fmt(H)}${alpha < 1 ? ` / ${fmt(alpha)}` : ''})`;

/** Find the matching close paren for the open paren at index `open`. */
function matchParen(str, open) {
  let d = 0;
  for (let j = open; j < str.length; j++) {
    if (str[j] === '(') d++;
    else if (str[j] === ')') { d--; if (d === 0) return j; }
  }
  throw new Error(`Unbalanced parens in ${str}`);
}

export function createResolver(maps) {
  const cache = new Map();
  function lookup(name, mode) {
    if (mode === 'inverse' && maps.inverse.has(name)) return maps.inverse.get(name);
    if (mode === 'reduced-motion' && maps.reducedMotion.has(name)) return maps.reducedMotion.get(name);
    return maps.base.get(name);
  }
  function resolveName(name, mode, seen = new Set()) {
    const key = `${mode}|${name}`;
    if (cache.has(key)) return cache.get(key);
    if (seen.has(name)) throw new Error(`Cycle resolving ${name}`);
    seen.add(name);
    const raw = lookup(name, mode);
    if (raw === undefined) return undefined;
    const v = evaluate(raw, mode, seen);
    seen.delete(name);
    cache.set(key, v);
    return v;
  }
  function substituteVars(str, mode, seen) {
    let out = ''; let idx = 0;
    while (true) {
      const at = str.indexOf('var(', idx);
      if (at < 0) { out += str.slice(idx); break; }
      out += str.slice(idx, at);
      const close = matchParen(str, at + 3);
      const inner = str.slice(at + 4, close);
      const comma = inner.indexOf(',');
      const name = (comma < 0 ? inner : inner.slice(0, comma)).trim();
      let val = resolveName(name, mode, seen);
      if (val === undefined && comma >= 0) val = evaluate(inner.slice(comma + 1).trim(), mode, seen);
      if (val === undefined) throw new Error(`Unresolved ${name}`);
      out += val;
      idx = close + 1;
    }
    return out;
  }
  function evalFunctions(str) {
    let s = str;
    // Relative colours first, innermost (= last occurrence) first. Their
    // channel calc()s are evaluated as part of the colour.
    for (let at = s.lastIndexOf('oklch(from '); at >= 0; at = s.lastIndexOf('oklch(from ')) {
      const close = matchParen(s, at + 5);
      const parts = splitTop(s.slice(at + 'oklch(from '.length, close));
      const origin = parts.shift();
      s = s.slice(0, at) + colourString(evalRelativeOklch(origin, parts.join(' '))) + s.slice(close + 1);
    }
    for (let at = s.lastIndexOf('calc('); at >= 0; at = s.lastIndexOf('calc(')) {
      const close = matchParen(s, at + 4);
      s = s.slice(0, at) + evalCalc(s.slice(at + 5, close)) + s.slice(close + 1);
    }
    return s;
  }
  function evaluate(raw, mode, seen = new Set()) {
    return evalFunctions(substituteVars(raw, mode, seen));
  }
  return { resolveName: (n, mode = 'light') => resolveName(n, mode), evaluate: (s, mode = 'light') => evaluate(s, mode) };
}

/** Resolve a token to a concrete colour object { L, C, H, alpha }. */
export function resolveColour(resolver, name, mode) {
  const v = resolver.resolveName(name, mode);
  if (v === undefined) throw new Error(`Unknown token ${name}`);
  return parseColor(v);
}
