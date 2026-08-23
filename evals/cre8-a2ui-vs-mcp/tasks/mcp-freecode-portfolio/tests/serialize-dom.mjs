#!/usr/bin/env node
// Builds /app with the agent's own vite build, then loads the built page in
// real Chromium and walks the rendered light DOM to reconstruct an
// A2UI-shaped node tree - so the exact same oracle.score_spec() that scores
// a hand-authored A2UI JSON file scores real rendered React too, unchanged.
//
// This replaced a jsdom implementation. jsdom cost two workarounds that a
// real browser simply doesn't need: it implements form-associated custom
// elements only partially (attachInternals() returns an ElementInternals
// with no setValidity, so every cre8 field component threw mid-update and
// killed the run), and it has no layout engine at all, so nothing about the
// rendered result could be checked beyond the tree itself. Chromium runs the
// same code the design system actually ships to, which is the point.
//
// Run as `node serialize-dom.mjs <catalog.compact.json> <app dir>`; prints
// the node tree as JSON on stdout, or {"error": "..."} if the app never
// built or never rendered (scores like an empty spec, not a crash).
//
// Two divergences from the A2UI schema, both because this is real code with
// real DOM semantics rather than a JSON tree someone hand-wrote:
//
//   - Plain HTML wrapper elements (a `<div>` for layout, most commonly the
//     one carrying `slot="x"`) have no A2UI equivalent. They're walked
//     through rather than treated as nodes: a cre8-* element inside one
//     attaches to the nearest real cre8-* ancestor as if the wrapper weren't
//     there, and a `slot` attribute met on the way down is inherited by the
//     cre8-* descendants it reaches, so `<div slot="header"><Cre8Heading/>`
//     scores the same as slotting the heading directly.
//   - Property values are read off the live element, which is what
//     @lit/react's createComponent assigns from the JSX literal - the actual
//     value for every type, not just what survives as a string attribute.
//     The gap: a prop whose class default is already non-undefined can't be
//     told apart from one the agent set explicitly. Documented, not fixed;
//     the alternative (patching React.createElement to capture literal JSX
//     props) can't reliably tie a prop set back to the DOM node it produced
//     once Suspense and conditionals are involved.

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import http from 'node:http';
import path from 'node:path';

const [, , catalogPath, appDir] = process.argv;
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
// name -> declared prop names, the only props worth reading back.
const knownProps = Object.fromEntries(
  catalog.components.map((c) => [c.name, Object.keys(c.props || {})]),
);

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
};

function build() {
  const result = spawnSync('npx', ['vite', 'build'], { cwd: appDir, encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`vite build failed:\n${result.stdout}\n${result.stderr}`);
  }
}

// The built index.html references /assets/... absolutely, so file:// can't
// resolve it - it needs an origin. A throwaway static server over the dist
// directory is the smallest thing that gives it one.
function serve(root) {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(root, rel === '/' ? 'index.html' : rel);
    if (!path.resolve(file).startsWith(path.resolve(root))) {
      res.statusCode = 403;
      return res.end();
    }
    try {
      const body = readFileSync(file);
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(body);
    } catch {
      res.statusCode = 404;
      res.end();
    }
  });
  return new Promise((resolve) => server.listen(0, () => resolve(server)));
}

// Runs inside the page. Returns {root} or {empty:true}; everything it hands
// back has to survive structured cloning, which is why props are filtered to
// scalars - reading a live property can return an internal Lit object, and
// those are circular (a template result's renderOptions.host points back at
// the element it rendered into).
function walk(knownProps) {
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
    const declared = tag ? knownProps[tag] : undefined;
    const ownSlot = el.getAttribute ? el.getAttribute('slot') : null;
    const slot = ownSlot || inheritedSlot || null;

    if (!declared) {
      // Not a cre8-* element: walk through it rather than emitting a node.
      return collectChildren(el, slot);
    }

    const props = {};
    for (const name of declared) {
      const value = el[name];
      if (value === undefined || value === null || value === false) continue;
      if (typeof value === 'object' || typeof value === 'function') continue;
      props[name] = value;
    }

    const children = [];
    const slots = {};
    for (const item of collectChildren(el, null)) {
      if (item.slot) (slots[item.slot] ||= []).push(item.node);
      else children.push(item.node);
    }

    const node = { component: tag, props };
    if (children.length) node.children = children;
    if (Object.keys(slots).length) node.slots = slots;
    return [{ node, slot }];
  }

  const container = document.getElementById('root');
  if (!container) return { empty: true, reason: 'no #root element' };
  const results = collectChildren(container, null).filter((r) => typeof r.node === 'object');
  if (!results.length) return { empty: true, reason: 'App rendered no content' };
  // score_spec needs a single root. Multiple top-level cre8-* siblings (a
  // header and a main, say) get wrapped in cre8-main: inventing a component
  // name would score as an invalid name, and cre8-main is the only real
  // component in this catalog that accepts free children, isn't a restricted
  // family child of anything, and has no required props.
  const root = results.length === 1
    ? results[0].node
    : { component: 'cre8-main', props: {}, children: results.map((r) => r.node) };
  return { root };
}

async function main() {
  let server;
  let browser;
  const renderErrors = [];
  try {
    build();
    server = await serve(path.join(appDir, 'dist'));
    const { port } = server.address();

    browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
    const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
    // A component that throws while rendering is reported, not fatal: what
    // gets serialized is the light DOM, which React has already placed and
    // which a failed update doesn't remove.
    page.on('pageerror', (err) => renderErrors.push(String(err).split('\n')[0]));

    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle', timeout: 60000 });
    // Let custom elements upgrade and Lit flush its first update.
    await page.waitForTimeout(1500);

    const result = await page.evaluate(walk, knownProps);
    if (result.empty) throw new Error(result.reason);

    const out = { root: result.root };
    if (renderErrors.length) out.render_errors = [...new Set(renderErrors)].slice(0, 10);
    process.stdout.write(JSON.stringify(out));
  } catch (err) {
    process.stdout.write(JSON.stringify({
      error: `${err.message}\n${err.stack || ''}`,
      ...(renderErrors.length ? { render_errors: [...new Set(renderErrors)].slice(0, 10) } : {}),
    }));
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (server) server.close();
  }
}

main();
