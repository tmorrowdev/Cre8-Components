/**
 * Browser half of the brand audit. Served by scripts/brand-audit.mjs next to
 * the CDN bundle; never shipped. Exposes window.__audit for Playwright.
 *
 * Renders every spec from /__audit/specs.json with the same prop-application
 * rules as the A2UI renderer (applyProp), but without validateSpec: the
 * catalog-synthesised specs are deliberately minimal and need not satisfy the
 * slot-eligibility rules to be worth looking at.
 */
import '/cdn/cre8-wc.esm.js';
import { applyProp } from '/a2ui/renderer.js';

const state = { errors: [], rendered: 0, cells: [] };
let currentCell = null;
window.addEventListener('error', (e) => {
  state.errors.push({ cell: currentCell, message: String(e.message || e.error).slice(0, 200) });
});
window.addEventListener('unhandledrejection', (e) => {
  state.errors.push({ cell: currentCell, message: String(e.reason?.message ?? e.reason).slice(0, 200) });
});

function build(spec, defs) {
  if (typeof spec === 'string') return document.createTextNode(spec);
  const el = document.createElement(spec.component);
  const propDefs = defs[spec.component]?.properties?.props?.properties ?? {};
  for (const [k, v] of Object.entries(spec.props ?? {})) {
    try {
      applyProp(el, k, v, propDefs[k]);
    } catch (err) {
      state.errors.push({ cell: currentCell, message: `prop ${spec.component}.${k}: ${err.message}` });
    }
  }
  for (const child of spec.children ?? []) el.appendChild(build(child, defs));
  for (const [slot, children] of Object.entries(spec.slots ?? {})) {
    for (const child of children) {
      let node = build(child, defs);
      if (slot !== 'default') {
        if (node.nodeType === Node.TEXT_NODE) {
          const span = document.createElement('span');
          span.appendChild(node);
          node = span;
        }
        node.setAttribute('slot', slot);
      }
      el.appendChild(node);
    }
  }
  return el;
}

function* deep(root) {
  // Every element under root, descending into open shadow roots.
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node.nodeType === Node.ELEMENT_NODE) yield node;
    if (node.shadowRoot) stack.push(...[...node.shadowRoot.children].reverse());
    if (node.children) stack.push(...[...node.children].reverse());
  }
}

async function settle() {
  for (let pass = 0; pass < 3; pass++) {
    const pending = [];
    for (const el of deep(document.getElementById('root'))) if (el.updateComplete) pending.push(el.updateComplete.catch(() => {}));
    await Promise.all(pending);
  }
  await document.fonts?.ready;
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await new Promise((r) => setTimeout(r, 50));
}

/** The cre8 component that owns an element's styling: its shadow host, or itself. */
function ownerTag(el) {
  const root = el.getRootNode();
  if (root instanceof ShadowRoot && root.host.localName.startsWith('cre8-')) return root.host.localName;
  if (el.localName.startsWith('cre8-')) return el.localName;
  return null;
}

// ─── colour ────────────────────────────────────────────────────────────────
const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
const colourCache = new Map();
/** Any CSS colour (oklch, color(), rgb…) → [r,g,b,a] in sRGB bytes, or null. */
function toRgba(value) {
  if (!value || value === 'none') return null;
  if (colourCache.has(value)) return colourCache.get(value);
  let out = null;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = '#010203';
  const sentinel = ctx.fillStyle;
  ctx.fillStyle = value;
  if (ctx.fillStyle !== sentinel || /^#010203$/i.test(value)) {
    ctx.fillRect(0, 0, 1, 1);
    out = [...ctx.getImageData(0, 0, 1, 1).data];
  }
  colourCache.set(value, out);
  return out;
}
function hsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}
function hslToHex(h, s, l) {
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
const hueDistance = (a, b) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));

const COLOUR_PROPS = ['color', 'background-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'fill', 'stroke'];

/** One sample per (element, property) that is actually painted. Order is deterministic. */
function sampleColours() {
  const samples = [];
  for (const el of deep(document.getElementById('root'))) {
    const owner = ownerTag(el);
    if (!owner) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0 && el.localName !== 'slot') continue;
    const hasText = [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    const isSvg = el instanceof SVGElement;
    for (const prop of COLOUR_PROPS) {
      if (prop === 'color' && !hasText) continue;
      if ((prop === 'fill' || prop === 'stroke') && !isSvg) continue;
      if (prop.startsWith('border-') && parseFloat(cs.getPropertyValue(prop.replace('-color', '-width'))) === 0) continue;
      const raw = cs.getPropertyValue(prop);
      const rgba = toRgba(raw);
      if (!rgba || rgba[3] === 0) continue;
      samples.push({ owner, prop, rgba });
    }
  }
  return samples;
}

function seedPrimary() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--cre8-seed-primary').trim();
  const rgba = toRgba(raw);
  return rgba ? { raw, rgba } : null;
}

function setSeedOverride(value) {
  let style = document.getElementById('audit-seed');
  if (!value) {
    style?.remove();
    return;
  }
  if (!style) {
    style = document.createElement('style');
    style.id = 'audit-seed';
    document.head.appendChild(style);
  }
  style.textContent = `:root, [data-cre8-theme], [data-mode] { --cre8-seed-primary: ${value} !important; }`;
}

/**
 * Leak candidates: painted colours that look like the brand primary (hue within
 * ±30° of it, saturated, not near black/white) and do not move at all when the
 * primary seed is swapped for its complement. A token-driven colour moves.
 */
async function detectLeaks() {
  const seed = seedPrimary();
  if (!seed) return { skipped: 'brand declares no --cre8-seed-primary', candidates: [], changed: 0, sampled: 0 };
  const [h, s, l] = hsl(seed.rgba);
  const altHex = hslToHex((h + 180) % 360, Math.max(s, 0.6), Math.min(Math.max(l, 0.35), 0.6));

  const a = sampleColours();
  setSeedOverride(altHex);
  await settle();
  const b = sampleColours();
  setSeedOverride(null);
  await settle();

  if (a.length !== b.length) {
    return { skipped: `sample mismatch (${a.length} vs ${b.length}) — rendering is not deterministic`, candidates: [], changed: 0, sampled: a.length };
  }
  let changed = 0;
  const groups = new Map();
  for (let i = 0; i < a.length; i++) {
    const same = a[i].rgba.every((v, j) => Math.abs(v - b[i].rgba[j]) <= 1);
    if (!same) {
      changed++;
      continue;
    }
    const [ch, cs, cl] = hsl(a[i].rgba);
    if (cs < 0.25 || cl < 0.12 || cl > 0.92 || hueDistance(ch, h) > 30) continue;
    const hex = '#' + a[i].rgba.slice(0, 3).map((v) => v.toString(16).padStart(2, '0')).join('');
    const key = `${a[i].owner}|${a[i].prop}|${hex}`;
    const g = groups.get(key) ?? { component: a[i].owner, property: a[i].prop, value: hex, elements: 0 };
    g.elements++;
    groups.set(key, g);
  }
  return { seed: seed.raw, alternate: altHex, sampled: a.length, changed, candidates: [...groups.values()] };
}

async function contrast() {
  const result = await window.axe.run(
    { include: [['#root']], exclude: [['.cell-label']] },
    { runOnly: { type: 'rule', values: ['color-contrast'] }, resultTypes: ['violations', 'incomplete'] },
  );
  const resolveTarget = (target) => {
    let el = null;
    let scope = document;
    for (const sel of target) {
      const s = Array.isArray(sel) ? sel : [sel];
      for (const part of s) {
        el = scope.querySelector(part);
        if (!el) return null;
        scope = el.shadowRoot ?? el;
      }
    }
    return el;
  };
  const nodes = [];
  for (const v of result.violations) {
    for (const n of v.nodes) {
      const el = resolveTarget(n.target);
      const cell = el?.closest?.('[data-audit-cell]') ?? el?.getRootNode()?.host?.closest?.('[data-audit-cell]');
      nodes.push({
        component: (el && ownerTag(el)) ?? 'unknown',
        cell: cell?.dataset.auditCell ?? null,
        target: n.target.flat().join(' >> ').slice(0, 300),
        summary: (n.any?.[0]?.message ?? n.failureSummary ?? '').slice(0, 300),
        data: n.any?.[0]?.data
          ? { fg: n.any[0].data.fgColor, bg: n.any[0].data.bgColor, ratio: n.any[0].data.contrastRatio, expected: n.any[0].data.expectedContrastRatio }
          : null,
      });
    }
  }
  const incomplete = result.incomplete.reduce((sum, v) => sum + v.nodes.length, 0);
  return { violations: nodes, incomplete };
}

async function setMode(mode) {
  if (mode === 'inverse') document.documentElement.setAttribute('data-mode', 'inverse');
  else document.documentElement.removeAttribute('data-mode');
  await settle();
}

async function main() {
  const [specs, catalog] = await Promise.all([
    fetch('/__audit/specs.json').then((r) => r.json()),
    fetch('/a2ui/catalog.json').then((r) => r.json()),
  ]);
  const defs = catalog.$defs?.components ?? {};
  const root = document.getElementById('root');
  for (const { id, kind, spec } of specs) {
    currentCell = id;
    const cell = document.createElement('section');
    cell.className = 'cell';
    cell.dataset.auditCell = id;
    const label = document.createElement('div');
    label.className = 'cell-label';
    label.textContent = `${kind}: ${id}`;
    const stage = document.createElement('div');
    stage.className = 'stage';
    cell.append(label, stage);
    root.appendChild(cell);
    try {
      stage.appendChild(build(spec, defs));
      state.rendered++;
    } catch (err) {
      state.errors.push({ cell: id, message: String(err.message).slice(0, 200) });
    }
    state.cells.push(id);
  }
  currentCell = null;
  await settle();
  const present = new Set();
  for (const el of deep(root)) if (el.localName.startsWith('cre8-') && customElements.get(el.localName)) present.add(el.localName);
  state.componentsPresent = [...present].sort();
  state.ready = true;
}

window.__audit = { state, setMode, detectLeaks, contrast, settle };
main().catch((err) => {
  state.errors.push({ cell: null, message: `main: ${err.message}` });
  state.ready = true;
});
