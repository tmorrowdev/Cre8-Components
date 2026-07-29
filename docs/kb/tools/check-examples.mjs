#!/usr/bin/env node
/**
 * Validates the knowledge base's own code examples against the shipped A2UI
 * catalog, plus the example specs that ship with the library. Run from the repo
 * root:
 *
 *   node docs/kb/tools/check-examples.mjs
 *
 * Checks, in order of what actually catches mistakes:
 *   1. Every ```json block in the KB that looks like an A2UI spec → validateSpec
 *      (with `$bind` values resolved away first, as a live surface would)
 *   2. Every <cre8-*> tag in ```html/```jsx/```vue/```svelte blocks →
 *      component exists, attributes are declared props, enum values are legal,
 *      and event bindings name an event the component actually emits
 *   3. Every --cre8-* design token named in prose → defined in a token source,
 *      and every cre8-x::part(y) → y is emitted by that component's source
 *   4. Every `pnpm <script>` and @tmorrow/cre8-wc import path named in prose →
 *      the script exists, the subpath matches the package exports map
 *   5. Every spec in packages/cre8-wc/a2ui/examples/ → validateSpec, compared
 *      against the expected results recorded below so the KB's table stays true
 *
 * The point: this KB documents a system whose central lesson is "validate
 * against the implementation, because prose drifts." A KB whose own examples
 * are unchecked would be the joke telling itself.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { registerCatalog, validateSpec } from '../../../packages/cre8-wc/a2ui/registry.js';
import { resolveNode } from '../../../packages/cre8-wc/a2ui/stream/model.js';

const KB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(KB, '../..');
const WC = resolve(REPO, 'packages/cre8-wc');

const catalog = registerCatalog(JSON.parse(readFileSync(resolve(WC, 'a2ui/catalog.json'), 'utf8')));

/**
 * Examples known to fail, with the reason. Documented in the KB rather than
 * silently skipped — if one starts passing, this checker fails so the KB's
 * table gets corrected rather than quietly going stale.
 */
const KNOWN_FAILING = {};

const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return entry === 'tools' ? [] : walk(full);
    return full.endsWith('.md') ? [full] : [];
  });

const kebabToCamel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

/** Attributes that are valid on any element and are not component props. */
const GLOBAL_ATTRS = new Set([
  'slot', 'id', 'class', 'style', 'hidden', 'title', 'role', 'part', 'is',
  'tabindex', 'draggable', 'lang', 'dir', 'key', 'ref',
]);

/** Native DOM events are legal on any element and are not cre8-specific. */
const NATIVE_EVENTS = new Set([
  'click', 'dblclick', 'input', 'change', 'submit', 'reset', 'focus', 'blur',
  'focusin', 'focusout', 'keydown', 'keyup', 'keypress', 'mouseenter',
  'mouseleave', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'pointerdown',
  'pointerup', 'scroll', 'wheel', 'drag', 'drop', 'invalid',
]);

const propsFor = (tag) =>
  catalog.components.get(tag)?.properties?.props?.properties ?? {};

let specsChecked = 0;
let tagsChecked = 0;
let eventsChecked = 0;

for (const file of walk(KB)) {
  const rel = relative(KB, file);
  const body = readFileSync(file, 'utf8');

  // ---- 1. A2UI specs in ```json blocks -------------------------------------
  for (const m of body.matchAll(/```json\n([\s\S]*?)```/g)) {
    const raw = m[1].trim();
    let spec;
    try {
      spec = JSON.parse(raw);
    } catch {
      continue; // Not valid JSON on its own (fragment, elided with "…") — skip.
    }
    if (!spec || typeof spec !== 'object' || typeof spec.component !== 'string') continue;
    specsChecked += 1;
    try {
      // Resolve `{ "$bind": "/pointer" }` prop values first. Against an empty
      // data model a binding drops out entirely, which is exactly what the
      // streaming renderer does — so a spec written for a live surface is
      // checked on everything except the values only the surface knows.
      validateSpec(resolveNode(spec, {}), catalog);
    } catch (e) {
      fail(rel, `embedded A2UI spec is invalid → ${e.message}`);
    }
  }

  // ---- 2. cre8-* tags in markup blocks -------------------------------------
  for (const block of body.matchAll(/```(?:html|jsx|tsx|vue|svelte|ts)\n([\s\S]*?)```/g)) {
    const code = block[1];
    for (const tagMatch of code.matchAll(/<(cre8-[a-z0-9-]+)((?:\s+[^>]*?)?)\/?>/g)) {
      const [, tag, attrString] = tagMatch;

      // Deliberate counterexamples — markup shown in order to say "not this".
      // Marked per line so the surrounding block still gets checked normally.
      // Same idea as TOKEN_COUNTEREXAMPLES / ASSERTED_ABSENT / KNOWN_FAILING.
      const lineStart = code.lastIndexOf('\n', tagMatch.index) + 1;
      let lineEnd = code.indexOf('\n', tagMatch.index);
      if (lineEnd === -1) lineEnd = code.length;
      if (/<!--\s*kb-check:\s*counterexample/.test(code.slice(lineStart, lineEnd))) continue;

      tagsChecked += 1;

      if (!catalog.components.has(tag)) {
        fail(rel, `<${tag}> is not in the catalog`);
        continue;
      }
      const declared = propsFor(tag);

      // Capture the binding punctuation too — it distinguishes an event binding
      // (skip) from a property binding (still a prop, still worth checking).
      for (const attrMatch of attrString.matchAll(
        /(?:^|\s)([@:(\[{]?[a-zA-Z][a-zA-Z0-9:.-]*[)\]}]?)(?:=(?:"([^"]*)"|\{[^}]*\}))?/g
      )) {
        const [, token, value] = attrMatch;
        if (!token) continue;

        // Event bindings: Vue @x / v-on:x, Angular (x), Svelte on:x, React onX.
        const isEvent =
          token.startsWith('@') ||
          token.startsWith('(') ||
          /^v-on:/.test(token) ||
          /^on:/.test(token) ||
          /^on[A-Z]/.test(token);
        if (isEvent) {
          // cre8 event names follow no convention, so a plausible-looking guess
          // (`cre8-change` for what is really `change`) is an easy and silent
          // mistake. Check anything that is not a native DOM event.
          const evtName = token
            .replace(/^@/, '')
            .replace(/^\(/, '')
            .replace(/\)$/, '')
            .replace(/^v-on:/, '')
            .replace(/^on:/, '')
            .replace(/^on(?=[A-Z])/, (m, o, s) => '')
            .replace(/^[A-Z]/, (c) => c.toLowerCase());
          if (!NATIVE_EVENTS.has(evtName)) {
            eventsChecked += 1;
            const declared = Object.keys(catalog.components.get(tag)?.['x-events'] ?? {});
            if (!declared.includes(evtName)) {
              fail(
                rel,
                `<${tag}> does not emit "${evtName}" — declared events: ${
                  declared.length ? declared.join(', ') : 'none'
                }`
              );
            }
          }
          continue;
        }

        // Property bindings: Vue :x / v-bind:x, Angular [x], Svelte {x}.
        const rawName = token
          .replace(/^[:[{]/, '')
          .replace(/[\]}]$/, '')
          .replace(/^v-bind:/, '');
        if (!/^[a-zA-Z]/.test(rawName)) continue;

        const name = rawName.toLowerCase();
        if (GLOBAL_ATTRS.has(name) || name.startsWith('aria-') || name.startsWith('data-')) continue;
        if (name.includes(':') || name.includes('.')) continue; // other directives

        // Lit derives an observed attribute by LOWERCASING the property name, not
        // by kebab-casing it, and no cre8 component overrides that with
        // `attribute:`. So `full-width` is an unrecognized attribute that Lit
        // ignores — the prop keeps its default and nothing errors. Match props
        // case-insensitively, and treat "only resolves after kebab→camel" as the
        // failure it is rather than quietly accepting it.
        const byLower = Object.fromEntries(Object.keys(declared).map((k) => [k.toLowerCase(), k]));
        const direct = byLower[name];
        if (!direct) {
          const camel = kebabToCamel(name);
          if (declared[camel]) {
            fail(
              rel,
              `<${tag} ${rawName}> is kebab-cased — Lit observes "${camel.toLowerCase()}", so this ` +
                `attribute is ignored and "${camel}" silently keeps its default. Write "${camel}"`
            );
          } else {
            fail(rel, `<${tag}> has no prop "${rawName}"`);
          }
          continue;
        }
        const schema = declared[direct];
        if (value !== undefined && Array.isArray(schema.enum) && !schema.enum.includes(value)) {
          fail(
            rel,
            `<${tag} ${rawName}="${value}"> not in enum [${schema.enum.join(', ')}]`
          );
        }
      }
    }
  }
}

// ---- 3. Design tokens referenced in prose ---------------------------------
// Token names are the other large body of hand-typed identifiers in the KB, and
// they fail the same way component props do: a plausible-sounding name that was
// never defined resolves to nothing and renders silently wrong.
const TOKEN_SOURCES = [
  resolve(REPO, 'packages/1-primitives.css'),
  resolve(REPO, 'packages/2-semantic.css'),
  resolve(REPO, 'packages/3-components.css'),
  resolve(WC, 'design-tokens/brands/cre8/css/tokens_cre8.css'),
  resolve(WC, 'design-tokens/brands/cre8/css/tokens_brand.css'),
];

const definedTokens = new Set();
for (const src of TOKEN_SOURCES) {
  let css;
  try {
    css = readFileSync(src, 'utf8');
  } catch {
    fail('check-examples', `token source missing: ${relative(REPO, src)}`);
    continue;
  }
  for (const m of css.matchAll(/(--cre8-[a-z0-9-]+)\s*:/g)) definedTokens.add(m[1]);
}

/**
 * Tokens the KB names deliberately as counterexamples ("this one does not
 * exist"). Same inversion as ASSERTED_ABSENT below: if one becomes real, the
 * prose citing it as invented is now wrong, so the check fails.
 */
const TOKEN_COUNTEREXAMPLES = new Set(['--cre8-border-subtle']);

let tokensChecked = 0;
for (const file of walk(KB)) {
  const rel = relative(KB, file);
  for (const m of readFileSync(file, 'utf8').matchAll(/--cre8-[a-z0-9-]+/g)) {
    const token = m[0];
    // `--cre8-*` is used as a prefix wildcard in prose; not a real token.
    if (token === '--cre8-' || token.endsWith('-')) continue;
    if (TOKEN_COUNTEREXAMPLES.has(token)) {
      if (definedTokens.has(token)) {
        fail(rel, `${token} now exists, but the KB cites it as an invented token — update the prose`);
      }
      continue;
    }
    tokensChecked += 1;
    if (!definedTokens.has(token)) {
      fail(rel, `token ${token} is not defined in any token source`);
    }
  }
}

// ---- 2a. A documented <form> must contain a working submit button ----------
// `cre8-button` defaults to type="button" and only calls formSubmit() when
// type === "submit". A form example without one looks right, reviews fine, and
// cannot be submitted — which is exactly what this KB shipped for a while, and
// what the manifest's Login Form pattern still ships.
let formsChecked = 0;
for (const file of walk(KB)) {
  const rel = relative(KB, file);
  for (const block of readFileSync(file, 'utf8').matchAll(
    /```(?:html|jsx|tsx|vue|svelte)\n([\s\S]*?)```/g
  )) {
    for (const form of block[1].matchAll(/<form\b[\s\S]*?<\/form>/g)) {
      if (!/<cre8-button\b/.test(form[0])) continue;
      formsChecked += 1;
      if (!/<cre8-button[^>]*\btype="submit"/.test(form[0])) {
        fail(
          rel,
          'a <form> example contains cre8-button(s) but none has type="submit" — ' +
            'cre8-button defaults to type="button" and will not submit'
        );
      }
    }
  }
}

// ---- 2b. addEventListener('...') anywhere, fenced or inline ----------------
// The KB shipped `addEventListener('cre8-change', …)` in a markdown table for
// several revisions: it was an inline code span, so the fenced-block scan above
// never saw it. Event names are scanned across the whole document for that
// reason.
const allEventNames = new Set(
  [...catalog.components.values()].flatMap((d) => Object.keys(d['x-events'] ?? {}))
);

let listenersChecked = 0;
for (const file of walk(KB)) {
  const rel = relative(KB, file);
  for (const m of readFileSync(file, 'utf8').matchAll(/addEventListener\(\s*['"]([a-zA-Z0-9._-]+)['"]/g)) {
    const evt = m[1];
    if (NATIVE_EVENTS.has(evt)) continue;
    listenersChecked += 1;
    if (!allEventNames.has(evt)) {
      fail(rel, `addEventListener("${evt}") — no cre8 component emits that event`);
    }
  }
}

// ---- 3b. ::part() names referenced in prose --------------------------------
// Read from component sources, not from agent-docs/COMPONENTS.md, which lists
// part names for cre8-accordion-item that the source does not emit.
const partsByTag = new Map();
for (const dir of readdirSync(resolve(WC, 'components'))) {
  let src;
  try {
    src = readFileSync(resolve(WC, 'components', dir, `${dir}.ts`), 'utf8');
  } catch {
    continue;
  }
  const parts = new Set([...src.matchAll(/\bpart="([a-z0-9-]+)"/g)].map((m) => m[1]));
  if (parts.size) partsByTag.set(`cre8-${dir}`, parts);
}

let partsChecked = 0;
for (const file of walk(KB)) {
  const rel = relative(KB, file);
  for (const m of readFileSync(file, 'utf8').matchAll(/(cre8-[a-z0-9-]+)::part\(([a-z0-9-]+)\)/g)) {
    const [, tag, part] = m;
    partsChecked += 1;
    const parts = partsByTag.get(tag);
    if (!parts) {
      fail(rel, `${tag} exposes no CSS shadow parts, but ::part(${part}) is used`);
    } else if (!parts.has(part)) {
      fail(rel, `${tag} has no part "${part}" — exposes: ${[...parts].sort().join(', ')}`);
    }
  }
}

// ---- 4. Commands and import paths the KB tells you to use ------------------
// "The docs say to run X and X does not exist" is a documented drift in this
// repo (pnpm generate-theme). Asserting it here stops the KB from growing its
// own version of the same problem.

/** Scripts referenced generically rather than as runnable commands. */
const GENERIC_COMMANDS = new Set(['add', 'install', 'run', 'dlx', 'exec', 'test']);

/**
 * Commands the KB asserts do NOT exist. If one appears, the KB's claim is stale
 * and this check fails so the prose gets corrected rather than quietly lying.
 */
const ASSERTED_ABSENT = new Set(['generate-theme', 'theme-manager', 'theme-validator', 'agentrpc']);

const scriptsIn = (pkgPath) => {
  try {
    return Object.keys(JSON.parse(readFileSync(pkgPath, 'utf8')).scripts ?? {});
  } catch {
    return [];
  }
};

const allScripts = new Set([
  ...scriptsIn(resolve(REPO, 'package.json')),
  ...scriptsIn(resolve(WC, 'package.json')),
  ...scriptsIn(resolve(REPO, 'packages/cre8-mcp/package.json')),
]);

const wcExports = JSON.parse(readFileSync(resolve(WC, 'package.json'), 'utf8')).exports ?? {};
/** Does a subpath match the package's exports map, including `*` patterns? */
const exportMatches = (subpath) =>
  Object.keys(wcExports).some((pattern) => {
    if (pattern === subpath) return true;
    if (!pattern.includes('*')) return false;
    const [head, tail] = pattern.split('*');
    return subpath.startsWith(head) && subpath.endsWith(tail) && subpath.length > head.length;
  });

let commandsChecked = 0;
let importsChecked = 0;

for (const file of walk(KB)) {
  const rel = relative(KB, file);
  const body = readFileSync(file, 'utf8');

  for (const m of body.matchAll(/\b(?:pnpm|npm run|yarn)\s+([a-z0-9:_-]+)/g)) {
    const script = m[1];
    if (GENERIC_COMMANDS.has(script)) continue;
    if (ASSERTED_ABSENT.has(script)) {
      if (allScripts.has(script)) {
        fail(rel, `"${script}" now exists, but the KB documents it as missing — update the prose`);
      }
      continue;
    }
    commandsChecked += 1;
    if (!allScripts.has(script)) {
      fail(rel, `"pnpm ${script}" is not a script in any workspace package.json`);
    }
  }

  for (const m of body.matchAll(/@tmorrow\/cre8-wc(\/[a-zA-Z0-9._/-]+)?/g)) {
    const subpath = m[1] ? `.${m[1]}` : '.';
    importsChecked += 1;
    if (!exportMatches(subpath)) {
      fail(rel, `import "@tmorrow/cre8-wc${m[1] ?? ''}" does not match the package exports map`);
    }
  }
}

// ---- 5. Shipped example specs ---------------------------------------------
const examplesDir = resolve(WC, 'a2ui/examples');
for (const f of readdirSync(examplesDir).filter((n) => n.endsWith('.json'))) {
  const spec = JSON.parse(readFileSync(join(examplesDir, f), 'utf8'));
  let error = null;
  try {
    validateSpec(spec, catalog);
  } catch (e) {
    error = e.message;
  }
  const expected = KNOWN_FAILING[f];
  if (error && !expected) {
    fail(`a2ui/examples/${f}`, `unexpectedly fails validation → ${error}`);
  } else if (!error && expected) {
    fail(
      `a2ui/examples/${f}`,
      `now PASSES but is documented as failing ("${expected}") — update 02-composition-patterns.md and KNOWN_FAILING`
    );
  }
}

if (failures.length) {
  console.error(
    `${failures.length} example problem(s):\n${failures.map((f) => `  ${f}`).join('\n')}`
  );
  process.exit(1);
}

const known = Object.keys(KNOWN_FAILING).length;
console.log(
  `ok — ${specsChecked} embedded A2UI spec(s) valid, ${tagsChecked} cre8 tag(s) checked, ` +
    `${eventsChecked} event binding(s), ${listenersChecked} listener(s), ` +
    `${formsChecked} form example(s), ` +
    `${tokensChecked} token(s), ${partsChecked} part(s), ` +
    `${commandsChecked} command(s), ${importsChecked} import path(s) resolve, ` +
    `shipped examples match documented status (${known} known-failing)`
);
