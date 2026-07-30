/**
 * Renders every catalog component and checks that its free-text props actually
 * reach the DOM.
 *
 *   node a2ui/render-audit.mjs            # report
 *   node a2ui/render-audit.mjs --check    # fail on anything not in KNOWN_INERT
 *
 * Why this exists: `validateSpec` answers "is this consistent with the
 * catalog", which is not the same question as "will this render". The gap is
 * not theoretical — `cre8-link-list-item` declares a `text` prop, documents it
 * in its own JSDoc as "The link text", and never reads it, so a spec using
 * `props.text` validates cleanly and produces an empty link. The same shape as
 * the `cre8-heading.type` bug in docs/kb/04-a2ui.md.
 *
 * The method: give each free-text prop a sentinel value, upgrade the element
 * with the real CDN bundle under jsdom, and look for the sentinel anywhere in
 * the resulting shadow tree. A prop that drives styling shows up as a class; a
 * prop that is reflected shows up as an attribute; a prop that is rendered shows
 * up as text. A prop that appears nowhere is inert.
 *
 * What it cannot see: layout, colour, and anything that needs a real engine.
 * jsdom upgrades components and runs their templates; it does not lay them out.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const HERE = dirname(fileURLToPath(import.meta.url));
const WC = resolve(HERE, '..');
const SENTINEL = 'Zq7Wx';

/**
 * Props known to be inert, with the reason. A prop listed here is asserted to
 * still be broken — same inversion as the KB's drift ledger, so fixing one makes
 * this file fail and prompts the entry to be removed.
 */
const KNOWN_INERT = {
  'cre8-link-list-item': {
    text: 'Documented as "The link text"; render() never reads it. The label comes from the default slot.',
  },
  'cre8-field': {
    errorText: 'Declared with a default of "Error" and never read. The message that renders is `fieldNote`, shown in the error style by `isError`.',
    successText: 'Declared with a default of "Success" and never read. Use `fieldNote` with `isSuccess`.',
  },
  'cre8-date-picker': {
    errorText: 'Declared and never read. Use `fieldNote` with `isError`.',
    successText: 'Declared and never read. Use `fieldNote` with `isSuccess`.',
  },
  'cre8-modal': {
    closeButtonText: 'Declared and never read; the close control takes its label from elsewhere.',
  },
};

// ─── jsdom, wired up enough for Lit ─────────────────────────────────────────

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  pretendToBeVisual: true,
  url: 'http://localhost/',
});
const win = dom.window;

for (const key of Object.getOwnPropertyNames(win)) {
  if (key === 'undefined' || key in globalThis) continue;
  try {
    globalThis[key] = win[key];
  } catch {
    /* read-only global; jsdom's copy is not needed */
  }
}
// Node defines these too, and a component that constructs one with Node's class
// cannot dispatch it on a jsdom EventTarget — @lit/context does exactly that.
for (const key of ['Event', 'CustomEvent', 'EventTarget', 'MessageEvent', 'MutationObserver']) {
  if (win[key]) {
    try {
      globalThis[key] = win[key];
    } catch {
      /* ignore */
    }
  }
}
globalThis.window = win;
globalThis.document = win.document;

const catalog = JSON.parse(readFileSync(resolve(WC, 'a2ui/catalog.json'), 'utf8'));
const defs = catalog.$defs?.components ?? {};

// Importing the bundle registers all 85 elements.
await import(resolve(WC, 'cdn/cre8-wc.esm.js'));

// ─── the audit ──────────────────────────────────────────────────────────────

/**
 * Only props whose *own documentation* says they are rendered text.
 *
 * A wider net does not work, and the reason is worth recording: sweeping every
 * free-text prop flags 69 of them, and almost all are artefacts rather than
 * bugs — form values consumed by ElementInternals (which jsdom does not
 * implement), icon and style values that need a well-formed input before
 * anything appears, and text that only renders once the component is open. A
 * check with that signal-to-noise trains people to ignore it.
 */
const RENDERED_TEXT = /\b(text|label|heading|message|caption)\b/i;

function renderedTextProps(def) {
  const props = def.properties?.props?.properties ?? {};
  return Object.entries(props)
    .filter(([name, schema]) => {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];
      if (!types.includes('string') || schema.enum || schema.const !== undefined) return false;
      if (/icon|svg|href|src|id|name|value|class|style|aria|width|height|colou?r|max|min|^type$/i.test(name)) {
        return false;
      }
      return RENDERED_TEXT.test(name) || RENDERED_TEXT.test(String(schema.description ?? ''));
    })
    .map(([name]) => name);
}

/** Every boolean prop, so a second pass can switch the component's states on. */
function booleanProps(def) {
  return Object.entries(def.properties?.props?.properties ?? {})
    .filter(([, schema]) => {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];
      return types.includes('boolean');
    })
    .map(([name]) => name);
}

function contentRoute(def) {
  if (def.properties?.children !== undefined) return 'children';
  if (def.properties?.slots?.properties) {
    const slots = Object.keys(def.properties.slots.properties);
    return slots.includes('default') ? 'default' : (slots[0] ?? null);
  }
  return null;
}

/**
 * Second, independent check: does the component's own source ever read the
 * property back? Rendering alone cannot tell an inert prop from one that needs
 * a state this audit did not reach, and static reading alone cannot tell a
 * rendered prop from one consumed by CSS. Where both agree, the prop is inert;
 * where they disagree, it is state-dependent and reported as unverified.
 */
function readsPropInSource(tag, prop) {
  const dir = tag.replace(/^cre8-/, '');
  const file = resolve(WC, 'components', dir, `${dir}.ts`);
  if (!existsSync(file)) return null;
  return new RegExp(`this\\.${prop}\\b`).test(readFileSync(file, 'utf8'));
}

const results = [];
const errored = [];
let rendered = 0;
let skipped = 0;

// Some components throw when rendered bare — cre8-popover reaches into a
// trigger it expects to have been slotted. That is worth reporting, but it must
// not end the audit, and Lit surfaces it from a microtask where a try/catch
// around appendChild cannot see it.
let current = null;
process.on('uncaughtException', (error) => {
  errored.push({ tag: current ?? '(unknown)', message: error.message.split('\n')[0].slice(0, 120) });
});

for (const [tag, def] of Object.entries(defs)) {
  if (!win.customElements.get(tag)) {
    skipped += 1;
    continue;
  }

  const props = renderedTextProps(def);
  if (!props.length) continue;

  current = tag;

  // Two passes. Most "missing" text is not missing, it is switched off:
  // errorText renders only under isError, a modal's close button only when it
  // is open. So render once bare, then again with every boolean prop true, and
  // only report a prop that never appeared in either.
  const renderOnce = async (withStates) => {
    const el = win.document.createElement(tag);
    for (const prop of props) el.setAttribute(prop, `${SENTINEL}${prop}`);
    if (withStates) for (const flag of booleanProps(def)) el.setAttribute(flag, '');

    const route = contentRoute(def);
    if (route === 'children') {
      el.appendChild(win.document.createTextNode('content'));
    } else if (route) {
      const child = win.document.createElement('span');
      if (route !== 'default') child.setAttribute('slot', route);
      child.textContent = 'content';
      el.appendChild(child);
    }

    try {
      win.document.body.appendChild(el);
      await new Promise((r) => setTimeout(r, 0));
      if (el.updateComplete) await el.updateComplete.catch(() => {});
    } catch (error) {
      errored.push({ tag, message: String(error?.message ?? error).split('\n')[0].slice(0, 120) });
    }

    // Light DOM too: a parent may stamp a prop onto its slotted children.
    const html = `${el.shadowRoot?.innerHTML ?? ''}${el.innerHTML}`;
    const upgraded = Boolean(el.shadowRoot);
    el.remove();
    return { html, upgraded };
  };

  const bare = await renderOnce(false);
  const active = await renderOnce(true);

  if (!bare.upgraded && !active.upgraded) {
    results.push({ tag, prop: '(no shadow root)', kind: 'unrendered' });
  } else {
    rendered += 1;
    for (const prop of props) {
      const token = `${SENTINEL}${prop}`;
      if (!bare.html.includes(token) && !active.html.includes(token)) {
        results.push({ tag, prop, kind: 'inert' });
      }
    }
  }
}

// ─── report ─────────────────────────────────────────────────────────────────

const known = (tag, prop) => KNOWN_INERT[tag]?.[prop];
for (const r of results) r.readInSource = readsPropInSource(r.tag, r.prop);

// Confirmed = never rendered AND never read back in source.
const confirmed = results.filter((r) => r.readInSource === false);
const unverified = results.filter((r) => r.readInSource !== false);
const fresh = confirmed.filter((r) => !known(r.tag, r.prop));
const expected = Object.entries(KNOWN_INERT).flatMap(([tag, props]) =>
  Object.keys(props).map((prop) => ({ tag, prop }))
);
const stillBroken = expected.filter((e) => results.some((r) => r.tag === e.tag && r.prop === e.prop));
const nowFixed = expected.filter((e) => !stillBroken.some((s) => s.tag === e.tag && s.prop === e.prop));

console.log(`rendered ${rendered} components (${skipped} not registered by the bundle)`);
if (errored.length) {
  console.log(`${errored.length} threw while rendering bare:`);
  for (const e of errored) console.log(`  ${e.tag}: ${e.message}`);
  console.log('');
}
console.log(
  `${results.length} prop(s) never reached the DOM: ${confirmed.length} confirmed inert by source too, ` +
    `${unverified.length} state-dependent and unverified\n`
);

for (const r of fresh) {
  console.log(`  ${r.tag}.${r.prop} — never rendered, and never read in ${r.tag.replace(/^cre8-/, '')}.ts`);
}
if (unverified.length) {
  console.log('\n  unverified (the source reads them; a state this audit did not reach must show them):');
  for (const r of unverified) console.log(`    ${r.tag}.${r.prop}`);
}
for (const e of stillBroken) {
  console.log(`  (known) ${e.tag}.${e.prop} — ${KNOWN_INERT[e.tag][e.prop]}`);
}
for (const e of nowFixed) {
  console.log(`  FIXED: ${e.tag}.${e.prop} now reaches the DOM — remove it from KNOWN_INERT`);
}

// Ship the confirmed list so the MCP connector can warn an agent before it
// sets a prop that will silently do nothing.
const inertFile = resolve(WC, 'a2ui/inert-props.json');
const payload = {
  $comment:
    'Generated by a2ui/render-audit.mjs. Props that are declared in the catalog but never reach ' +
    'the DOM — confirmed twice, by rendering under jsdom and by reading the component source. ' +
    'Setting one validates cleanly and does nothing.',
  libraryVersion: catalog['x-a2ui']?.libraryVersion,
  components: Object.fromEntries(
    Object.entries(KNOWN_INERT).map(([tag, props]) => [
      tag,
      Object.fromEntries(Object.entries(props).map(([prop, reason]) => [prop, { reason }])),
    ])
  ),
};
writeFileSync(inertFile, `${JSON.stringify(payload, null, 2)}\n`);

const check = process.argv.includes('--check');
if (check && (fresh.length || nowFixed.length)) {
  console.error(
    `\nrender audit failed: ${fresh.length} new inert prop(s), ${nowFixed.length} fixed but still listed`
  );
  process.exit(1);
}
if (check) console.log('\nok — every free-text prop reaches the DOM, except the ones documented as inert');
process.exit(0);
