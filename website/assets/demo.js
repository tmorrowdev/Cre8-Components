/**
 * demo.js — drives the live "brand in, UI out" demo.
 *
 * Loaded as a module because the site's CSP is `script-src 'self'` with no
 * 'unsafe-inline'. For the same reason the schema and the brand manifest are
 * imported as modules rather than fetched (`connect-src 'none'`).
 */

import { render, renderNode, topLevelSections } from './a2ui-render.js';
import { schema } from './regal-home.schema.js';
import { brands } from './brands.js';
import { stats } from './demo-stats.js';

const $ = sel => document.querySelector(sel);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const preview = $('#preview');
const canvas = $('#canvas');
const fit = $('#fit');
const runBtn = $('#run');
const resetBtn = $('#replay');
const urlBar = $('#url');

let playing = false;
let token = 0;              // invalidates an in-flight run when reset/re-run

// ── the brand definition, shown as the thing being consumed ──────────
// Mirrors design-tokens/brands/regal/brand.json. Kept short on purpose: the
// point of the demo is that this much input is enough.
const BRAND_DEF = [
  ['{', ''],
  ['  "displayName"', ' "Regal Bank",'],
  ['  "basedOn"', ' "minimalist",'],
  ['  "identity"', ' {'],
  ['    "geometry"', ' { "cornerStyle": "square" },'],
  ['    "palette"', ' {'],
  ['      "ink"', ' "#132342",'],
  ['      "surface"', ' "#FFFFFF",'],
  ['      "line"', ' "#B9BCC0"'],
  ['    },', ''],
  ['    "type"', ' { "family": "Aeonik" }'],
  ['  }', ''],
  ['}', ''],
];

/** Lay the generated page out at desktop width, scaled to the column. */
function applyScale() {
  const avail = preview.clientWidth;
  const scale = Math.min(1, avail / canvas.offsetWidth);
  canvas.style.transform = `scale(${scale})`;
  // The transform doesn't affect layout, so #fit has to carry the scaled height
  // or the scrollbar would describe the unscaled page.
  fit.style.height = `${canvas.scrollHeight * scale}px`;
  return scale;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function markStep(n) {
  for (let i = 1; i <= 4; i++) $('#s' + i).classList.toggle('on', i === n);
}

function chips(target, pairs) {
  target.innerHTML = pairs
    .map(([v, l]) => `<div class="chip"><div class="v">${esc(v)}</div><div class="l">${esc(l)}</div></div>`)
    .join('');
}

/** Count the custom properties a brand sheet actually declares. */
function countTokens(scope) {
  const names = new Set();
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of rules || []) {
      if (!rule.style || !rule.selectorText) continue;
      if (!rule.selectorText.includes(`[data-brand="${scope}"]`)) continue;
      for (const prop of rule.style) if (prop.startsWith('--')) names.add(prop);
    }
  }
  return names.size;
}

// ── brand switcher ──────────────────────────────────────────────────
function buildSwitcher() {
  const host = document.querySelector('.switcher');
  for (const b of brands) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ghost';
    btn.textContent = b.label;
    btn.setAttribute('aria-pressed', String(b.scope === preview.dataset.brand));
    btn.addEventListener('click', () => setBrand(b));
    host.appendChild(btn);
  }
}

function setBrand(b) {
  preview.dataset.brand = b.scope;
  urlBar.textContent = `ui://cre8-mcp-ui/${b.brand}-home`;
  for (const btn of document.querySelectorAll('.switcher .ghost')) {
    btn.setAttribute('aria-pressed', String(btn.textContent === b.label));
  }
  // Same schema, same components, different tokens — nothing re-renders.
  const n = countTokens(b.scope);
  if (n) chips($('#tokenOut'), [[n, 'tokens'], [3, 'layers']]);
}

// ── the run ─────────────────────────────────────────────────────────
async function play() {
  if (playing) return;
  playing = true;
  const mine = ++token;
  runBtn.disabled = true;
  const alive = () => mine === token;

  // 1 — brand definition types in
  markStep(1);
  const brandOut = $('#brandOut');
  brandOut.innerHTML = '';
  for (const [key, rest] of BRAND_DEF) {
    if (!alive()) return finish();
    brandOut.innerHTML +=
      `<span class="k">${esc(key)}</span><span class="s">${esc(rest)}</span>\n`;
    brandOut.scrollTop = brandOut.scrollHeight;
    await sleep(reduceMotion ? 0 : 105);
  }
  await sleep(reduceMotion ? 0 : 420);

  // 2 — tokens resolve
  if (!alive()) return finish();
  markStep(2);
  const total = countTokens(preview.dataset.brand);
  for (const v of [Math.round(total * 0.3), Math.round(total * 0.7), total]) {
    if (!alive()) return finish();
    chips($('#tokenOut'), [[v, 'tokens'], [3, 'layers']]);
    await sleep(reduceMotion ? 0 : 170);
  }
  await sleep(reduceMotion ? 0 : 380);

  // 3 — the model's schema streams, section by section
  if (!alive()) return finish();
  markStep(3);
  const sections = topLevelSections(schema);
  const schemaOut = $('#schemaOut');
  schemaOut.innerHTML = '';
  canvas.innerHTML = '';

  for (const [i, node] of sections.entries()) {
    if (!alive()) return finish();
    const label = describe(node);
    schemaOut.innerHTML +=
      `<span class="c">${String(i + 1).padStart(2, '0')}</span> ` +
      `<span class="k">${esc(label.tag)}</span> ` +
      `<span class="n">${esc(label.detail)}</span>\n`;
    schemaOut.scrollTop = schemaOut.scrollHeight;

    // 4 — render it immediately, so schema and UI advance together
    const el = renderNode(node);
    const host = document.createElement('div');
    host.setAttribute('data-reveal', '');
    host.appendChild(el);
    canvas.appendChild(host);
    requestAnimationFrame(() => host.setAttribute('data-reveal', 'in'));
    applyScale();
    preview.scrollTo({ top: preview.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
    await sleep(reduceMotion ? 0 : 520);
  }

  if (!alive()) return finish();
  markStep(4);
  applyScale();
  preview.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  chips($('#statOut'), [
    [stats.components, 'components'],
    [stats.nodes, 'schema nodes'],
    [0, 'lines of CSS written'],
    [stats.toolEvents, 'wired actions'],
  ]);
  finish();
}

/** A short, honest label for a top-level section node. */
function describe(node) {
  if (node.component) {
    const kids = (node.children || (node.slots && node.slots.default) || []);
    const first = deepText(node);
    return { tag: node.component, detail: first ? `“${first.slice(0, 30)}”` : `${kids.length} children` };
  }
  return { tag: node.html ? 'html' : 'text', detail: '' };
}

function deepText(node, depth = 0) {
  if (depth > 6 || !node || typeof node !== 'object') return '';
  if (typeof node.text === 'string') return node.text;
  const pool = [
    ...(node.children ? (Array.isArray(node.children) ? node.children : [node.children]) : []),
    ...Object.values(node.slots || {}).flat(),
  ];
  if (node.props && typeof node.props.text === 'string') return node.props.text;
  for (const child of pool) {
    const t = deepText(child, depth + 1);
    if (t) return t;
  }
  return '';
}

function finish() {
  playing = false;
  runBtn.disabled = false;
}

function reset() {
  token++;                              // cancel any in-flight run
  playing = false;
  runBtn.disabled = false;
  markStep(0);
  $('#brandOut').innerHTML = '<span class="c">// press Run</span>';
  $('#schemaOut').innerHTML = '<span class="c">// waiting</span>';
  chips($('#tokenOut'), [['—', 'tokens'], ['—', 'layers']]);
  $('#statOut').innerHTML = '';
  canvas.innerHTML = '<div class="placeholder">The generated UI renders here.</div>';
  canvas.style.transform = '';
  fit.style.height = '';
}

// ── the host half of the mcp-ui protocol ────────────────────────────
// The generated UI carries data-cre8-action attributes. There is no iframe here
// (the CSP forbids one), so the demo wires them directly and reports the tool
// call it would have sent — same payload the bridge posts to a real host.
function wireActions() {
  for (const el of canvas.querySelectorAll('[data-cre8-action]:not([data-wired])')) {
    el.setAttribute('data-wired', '');
    el.addEventListener('click', () => {
      const action = el.getAttribute('data-cre8-action') || '';
      let params = {};
      try { params = JSON.parse(el.getAttribute('data-cre8-params') || '{}'); } catch {}
      const scope = el.closest('[data-cre8-form-scope], cre8-form, form');
      if (scope) {
        for (const f of scope.querySelectorAll('[name]')) {
          const v = 'value' in f ? f.value : f.getAttribute('value');
          if (v) params[f.getAttribute('name')] = v;
        }
      }
      urlBar.textContent = `→ ${action}  ${JSON.stringify(params)}`.slice(0, 96);
    });
  }
}

buildSwitcher();
reset();
runBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);
new MutationObserver(wireActions).observe(canvas, { childList: true, subtree: true });
window.addEventListener('resize', applyScale);
