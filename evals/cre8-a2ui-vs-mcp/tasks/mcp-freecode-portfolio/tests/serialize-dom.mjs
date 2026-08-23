#!/usr/bin/env node
// Builds /app for real with the agent's own `npm run build` (vite), then
// imports the built bundle under jsdom and walks the resulting light DOM to
// reconstruct an A2UI-shaped node tree from it - so the exact same
// oracle.score_spec()/check_requirements() that scores a hand-authored A2UI
// JSON file can score real rendered React code too, unchanged. Building
// first rather than importing src/App.tsx directly is deliberate: plain
// Node's ESM loader (even through tsx) doesn't know what to do with the
// `.svg` imports and other bundler-only asset syntax @tmorrow/cre8-wc's own
// components use internally, and vite already resolves every one of those
// into plain, inlined JS the same way it would for a real deployed page - a
// build failure is also exactly the failure a real "ship this" check would
// hit, which the task's own instructions already tell the agent to run.
//
// Run as `node --import tsx serialize-dom.mjs <catalog.compact.json path>
// <app dir>`; prints the node tree as JSON on stdout, or `{"error": "..."}`
// if the app never built or never rendered (scores like an empty spec, not
// a crash).
//
// Two divergences from the A2UI schema, both because this is real code with
// real DOM semantics instead of a JSON tree someone hand-wrote:
//
//   - Plain HTML wrapper elements (a `<div>` for layout, most commonly the
//     one carrying `slot="x"` - see instruction.md's own example) have no
//     A2UI equivalent. They're walked through rather than treated as nodes:
//     a cre8-* element nested inside one is attached to the nearest real
//     cre8-* ancestor exactly as if the wrapper weren't there, and a `slot`
//     attribute encountered on the way down is inherited by whatever cre8-*
//     descendants it reaches, so `<div slot="header"><Cre8Heading/></div>`
//     scores identically to slotting the heading directly.
//   - Property values are read back from the live DOM node
//     (`element[propName]`), which is exactly what @lit/react's
//     `createComponent` sets `node[name] = value` from - the same value the
//     JSX literal passed, for every type, not just what happens to survive
//     as a string attribute. The one gap: a prop whose class default is
//     already non-undefined (rare - `cre8-layout-section`'s `top` is the one
//     in this catalog) can't be told apart from the agent having set it
//     explicitly. Documented, not fixed - the alternative (patching
//     React.createElement to capture literal JSX props) can't reliably
//     re-associate a prop set with the DOM node it produced once
//     Suspense/conditionals are in play, which real code uses far more than
//     hand-authored JSON does.

import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const [, , catalogPath, appDir] = process.argv;
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const knownProps = new Map(catalog.components.map((c) => [c.name, Object.keys(c.props || {})]));

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
});
// Copy jsdom's whole window onto the Node global object rather than
// enumerate every browser API a Lit component or React might touch by
// name - that list turned out to be long (Document, MutationObserver,
// Element, ... - one ReferenceError at a time). Node's own globals
// (process, Buffer, require, console, the Node-native `navigator`, ...)
// win on conflict, same as `global-jsdom` and similar setup packages do.
const RESERVED = new Set(['undefined', 'eval', 'Function', 'GLOBAL', 'global', 'globalThis']);
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (RESERVED.has(key) || key in globalThis) continue;
  try {
    globalThis[key] = dom.window[key];
  } catch {
    // A handful of window accessors throw outside a real browser (e.g.
    // `localStorage` under some jsdom configs) - not needed for this.
  }
}
globalThis.window = dom.window;
globalThis.document = dom.window.document;
// Node has its own read-only `navigator` global since v21; only a
// defineProperty can override it, a plain assignment throws.
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });
// jsdom doesn't implement these (no real layout engine to observe) but some
// components reference the constructors even when nothing is ever observed.
globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} };
globalThis.IntersectionObserver ??= class { observe() {} unobserve() {} disconnect() {} };
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);

// Walks one element's childNodes, returning a flat list of {node, slot}
// items - `node` is either a text string or a nested component object.
// Plain HTML children are walked through rather than becoming nodes
// themselves: their own text and cre8-* descendants surface directly into
// this list, carrying the wrapper's `slot` attribute down if it had one and
// nothing closer inside it already set one. This is what makes
// `<p>text</p>` inside a cre8-text-passage register as text content, and
// `<div slot="header"><Cre8Heading/></div>` (this task's own instruction.md
// example) score identically to slotting the heading directly.
function collectChildren(el, inheritedSlot) {
  const out = [];
  for (const child of el.childNodes) {
    if (child.nodeType === 3) {
      const text = child.textContent.trim();
      if (text) out.push({ node: text, slot: inheritedSlot });
      continue;
    }
    if (child.nodeType !== 1) continue;
    out.push(...serialize(child, inheritedSlot));
  }
  return out;
}

function serialize(el, inheritedSlot) {
  const tag = el.tagName ? el.tagName.toLowerCase() : null;
  const isCre8 = tag && knownProps.has(tag);
  const ownSlot = el.getAttribute && el.getAttribute('slot');
  const slot = ownSlot || inheritedSlot || null;

  if (isCre8) {
    const props = {};
    for (const name of knownProps.get(tag)) {
      const value = el[name];
      if (value !== undefined && value !== null && value !== false) props[name] = value;
    }
    const children = [];
    const slots = {};
    for (const item of collectChildren(el, null)) {
      if (item.slot) {
        (slots[item.slot] ||= []).push(item.node);
      } else {
        children.push(item.node);
      }
    }
    const node = { component: tag, props };
    if (children.length) node.children = children;
    if (Object.keys(slots).length) node.slots = slots;
    return [{ node, slot }];
  }

  // Not a cre8-* element: walk through it rather than emitting a node.
  return collectChildren(el, slot);
}

function buildAndFindEntry() {
  const build = spawnSync('npx', ['vite', 'build'], { cwd: appDir, encoding: 'utf8' });
  if (build.status !== 0) {
    throw new Error(`vite build failed:\n${build.stdout}\n${build.stderr}`);
  }
  const indexHtml = readFileSync(path.join(appDir, 'dist', 'index.html'), 'utf8');
  const match = indexHtml.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/);
  if (!match) {
    throw new Error(`dist/index.html has no module script tag:\n${indexHtml}`);
  }
  return path.join(appDir, 'dist', match[1].replace(/^\//, ''));
}

async function main() {
  try {
    const entryPath = buildAndFindEntry();
    // The built entry's own top-level code is main.tsx's
    // `createRoot(...).render(<App/>)` - importing it mounts the app as a
    // side effect, into the `#root` div already sitting in the jsdom
    // document above.
    await import(pathToFileURL(entryPath).href);

    const container = document.getElementById('root');
    // Flush React's commit + any effects; jsdom has no real paint loop.
    await new Promise((resolve) => setTimeout(resolve, 300));

    const results = collectChildren(container, null).filter((r) => typeof r.node === 'object');
    if (!results.length) {
      throw new Error('App rendered no content');
    }
    // Multiple top-level cre8-* elements (a page with a header and a main as
    // siblings, say): score.py needs one root. Wrapping in a synthetic node
    // would either invent a fake component (scored as an invalid name, unfair)
    // or use a real one the agent never wrote (its own containment rules,
    // if any, then apply to children that never asked for them). `cre8-main`
    // is the least-bad real choice available: it accepts free children,
    // isn't a restricted family child of anything, and has no required props
    // - the only real component in this catalog with all three.
    const root_ = results.length === 1
      ? results[0].node
      : { component: 'cre8-main', props: {}, children: results.map((r) => r.node) };
    process.stdout.write(JSON.stringify({ root: root_ }));
  } catch (err) {
    process.stdout.write(JSON.stringify({ error: `${err.message}\n${err.stack || ''}` }));
  }
}

main();
