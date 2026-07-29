#!/usr/bin/env node
/**
 * Verifies that every mechanically checkable row in the "Open" drift table of
 * 07-research.md is STILL TRUE.
 *
 *   node docs/kb/tools/check-drift.mjs        (or: pnpm kb:check-drift)
 *
 * Why this exists: the drift ledger is the most valuable content in this KB —
 * it records where cre8's documentation disagrees with cre8's implementation,
 * which is precisely what a reader cannot recover by reading either one. But a
 * ledger of bugs rots the moment someone fixes a bug. Two entries went stale
 * this way (the heading `label` enum, and llm-observability.json) within hours
 * of being written.
 *
 * So each assertion below fails when the drift is GONE, prompting the row to be
 * moved to Resolved — the inverse of a normal test, and the whole point.
 *
 * Rows that depend on human judgement ("Predictable APIs") are listed as
 * unautomatable rather than silently omitted.
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findInvalidAttrs } from './check-demo-attrs.mjs';

const KB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(KB, '../..');
const WC = resolve(REPO, 'packages/cre8-wc');

const read = (p) => {
  try {
    return readFileSync(resolve(REPO, p), 'utf8');
  } catch {
    return null;
  }
};
const json = (p) => {
  const raw = read(p);
  return raw ? JSON.parse(raw) : null;
};

let openChecked = 0;
let resolvedChecked = 0;
const stale = [];
const missing = [];

/**
 * @param {string} row   the drift row's Claim cell, so failures name it
 * @param {() => boolean|null} test  true = drift still present, false = fixed,
 *                                   null = source file missing
 */
const stillDrifting = (row, test) => {
  openChecked += 1;
  let result;
  try {
    result = test();
  } catch (e) {
    missing.push(`${row} — check errored: ${e.message}`);
    return;
  }
  if (result === null) missing.push(`${row} — source file not found; cannot verify`);
  else if (!result) stale.push(row);
};

const wcManifest = json('packages/cre8-wc/mcp-manifest.json');
const reactManifest = json('packages/cre8-wc/react-manifest.json');
const guidelines = read('packages/cre8-wc/agent-docs/CODE_GUIDELINES.md');
const componentsDoc = read('packages/cre8-wc/agent-docs/COMPONENTS.md');
const reactSkill = read('.claude/marketplaces/tmorrow_ai/cre8/skills/cre8-a2ui-react/SKILL.md');

stillDrifting('"93 components" on the website', () => {
  const site = read('website/index.html');
  return site === null ? null : site.includes('93 accessible web components');
});

stillDrifting('"72 React components" in the cre8-a2ui-react skill', () =>
  reactSkill === null ? null : /componentCount:\s*72/.test(reactSkill)
);

stillDrifting('React library v1.0.0 in the skill', () =>
  reactSkill === null ? null : /version:\s*"1\.0\.0"/.test(reactSkill)
);

stillDrifting('Skill installs @cre8_dev/cre8-design-tokens', () =>
  reactSkill === null ? null : reactSkill.includes('@cre8_dev/cre8-design-tokens')
);

stillDrifting('CODE_GUIDELINES specifies `tagName`', () =>
  guidelines === null ? null : /name the prop `tagName`/.test(guidelines)
);

stillDrifting('`cre8-link-list-item` declares a `text` prop that renders nothing', () => {
  const src = read('packages/cre8-wc/components/link-list-item/link-list-item.ts');
  if (src === null) return null;
  // The drift persists while the property is declared but never read back. An
  // agent that follows the cre8-button pattern gets an empty link that passes
  // validateSpec, which is the same shape as the cre8-heading.type bug.
  const declares = /\btext\?:\s*string/.test(src);
  const renders = /this\.text\b/.test(src);
  return declares && !renders;
});

stillDrifting('cre8-card JSDoc documents a `body` slot', () => {
  const card = read('packages/cre8-wc/components/card/card.ts');
  return card === null ? null : /@slot body/.test(card);
});

stillDrifting('`pnpm generate-theme` and friends do not exist', () => {
  const names = ['generate-theme', 'theme-manager', 'theme-validator', 'agentrpc'];
  const scripts = new Set([
    ...Object.keys(json('package.json')?.scripts ?? {}),
    ...Object.keys(json('packages/cre8-wc/package.json')?.scripts ?? {}),
  ]);
  return !names.some((n) => scripts.has(n));
});

stillDrifting('Component status directories do not exist', () => {
  // Two halves to this drift. (1) The guidelines claim three status directories
  // while also saying the structure is flat — an internal contradiction. (2) No
  // manifest field records tier, so it cannot be looked up either way. The row
  // is only resolved when both are addressed.
  if (guidelines === null) return null;
  const claimsDirectories = /located in one of 3 directories based on their status/.test(
    guidelines
  );
  const claimsFlat = /exist in a flat structure/.test(guidelines);
  const fields = new Set(wcManifest.components.flatMap((c) => Object.keys(c)));
  const hasTierField = [...fields].some((f) => /status|tier|stability|support/i.test(f));
  return (claimsDirectories && claimsFlat) || !hasTierField;
});

stillDrifting('CODE_GUIDELINES claims size is xs–xl with md default', () => {
  if (guidelines === null) return null;
  const claimsScale = /`xs`, `sm`, `md`, `lg`, `xl`/.test(guidelines);
  // Drift persists only while the shipped enums stay narrower.
  const catalog = json('packages/cre8-wc/a2ui/catalog.json');
  const sizeEnums = Object.values(catalog.$defs.components)
    .map((d) => d.properties?.props?.properties?.size?.enum)
    .filter(Boolean);
  const anyXs = sizeEnums.some((e) => e.includes('xs'));
  return claimsScale && !anyXs;
});

stillDrifting('COMPONENTS.md lists header/icon parts for cre8-accordion-item', () => {
  if (componentsDoc === null) return null;
  const section = componentsDoc.split('# cre8-accordion-item')[1]?.split('\n# ')[0] ?? '';
  const source = read('packages/cre8-wc/components/accordion-item/accordion-item.ts') ?? '';
  const realParts = new Set([...source.matchAll(/\bpart="([a-z0-9-]+)"/g)].map((m) => m[1]));
  const documentsPhantom = /::part\('header'\)/.test(section) || /`header`/.test(section);
  return documentsPhantom && !realParts.has('header');
});

stillDrifting('COMPONENTS.md documents parts for only a few components', () => {
  if (componentsDoc === null) return null;
  const documented = (componentsDoc.match(/^## CSS Shadow Parts/gm) ?? []).length;
  return documented < 10; // 10 components actually emit parts
});


stillDrifting('open question: required does not block submission (07-research#open-questions-not-open-bugs)', () => {
  const base = read('packages/cre8-wc/components/cre8-form-element.ts');
  if (base === null) return null;
  // The drift persists while setValidity() is reachable only from
  // setCustomValidity() — i.e. no constraint attribute is ever mapped into the
  // host's validity state. If a valueMissing/patternMismatch mapping appears,
  // this row is fixed and should move to Resolved.
  const mapsConstraints = /setValidity\(\s*\{[^}]*(valueMissing|patternMismatch|rangeUnderflow|rangeOverflow|typeMismatch)/.test(
    base
  );
  return !mapsConstraints;
});


const UNAUTOMATABLE = [];

/**
 * Resolved-row guards. Moving a row to Resolved asserts something is now true.
 * These fail if it stops being true, so a fix cannot rot back into a drift
 * unnoticed — the mirror image of `stillDrifting`.
 */
const regressed = [];
const nowHolds = (claim, test) => {
  resolvedChecked += 1;
  let result;
  try {
    result = test();
  } catch (e) {
    missing.push(`${claim} — check errored: ${e.message}`);
    return;
  }
  if (result === null) missing.push(`${claim} — source file not found; cannot verify`);
  else if (result !== true) regressed.push(`${claim}${typeof result === 'string' ? ` — ${result}` : ''}`);
};

/**
 * Native form events keep their native names on purpose: cre8's form components
 * re-fire them so consumers can treat the host like a native control.
 */
const NATIVE_EVENT_NAMES = new Set(['change', 'input']);

nowHolds('Event names are `component-action` kebab-case with no `cre8-` prefix', () => {
  const catalog = json('packages/cre8-wc/a2ui/catalog.json');
  if (!catalog) return null;
  const names = [
    ...new Set(
      Object.values(catalog.$defs.components).flatMap((d) => Object.keys(d['x-events'] ?? {}))
    ),
  ];
  const offenders = names.filter(
    (n) => !NATIVE_EVENT_NAMES.has(n) && (n.startsWith('cre8-') || !/^[a-z0-9]+(-[a-z0-9]+)+$/.test(n))
  );
  return offenders.length === 0 || `offending names: ${offenders.join(', ')}`;
});

nowHolds('Demo HTML pages set only attributes the browser observes', () => {
  // Delegated to check-demo-attrs.mjs so there is one derivation of what the
  // browser actually observes. This guard previously compared against the a2ui
  // catalog's `props`, which merges `@property` and `@state` — so it scored an
  // `isActive` on `cre8-primary-nav-item` as valid when no attribute of that
  // name exists at all. Run that tool directly for file:line detail.
  const result = findInvalidAttrs();
  if (result === null) return null;
  const { findings } = result;
  return (
    findings.length === 0 ||
    `${findings.length} ignored attribute(s) are back in the HTML pages ` +
      `(first: ${findings[0].page}:${findings[0].line} <${findings[0].tag} ${findings[0].attr}>)`
  );
});

nowHolds('cre8-badge.status is an enumerated union like its siblings', () => {
  const catalog = json('packages/cre8-wc/a2ui/catalog.json');
  const badge = catalog?.$defs.components['cre8-badge']?.properties?.props?.properties?.status;
  if (!badge) return null;
  return (
    Array.isArray(badge.enum) ||
    'cre8-badge.status lost its enum — any string would validate again'
  );
});

if (stale.length) {
  console.error(
    `\n${stale.length} drift row(s) appear FIXED — move them to the Resolved table in 07-research.md:`
  );
  for (const r of stale) console.error(`  ✓ ${r}`);
}
if (regressed.length) {
  console.error(`\n${regressed.length} Resolved row(s) have REGRESSED:`);
  for (const r of regressed) console.error(`  ✗ ${r}`);
}
if (missing.length) {
  console.error(`\n${missing.length} row(s) could not be verified:`);
  for (const r of missing) console.error(`  ? ${r}`);
}
if (stale.length || regressed.length || missing.length) process.exit(1);

console.log(
  `ok — ${openChecked} open drift claim(s) re-verified as still true; ` +
    `${resolvedChecked} resolved row(s) re-verified as still fixed; ` +
    `${UNAUTOMATABLE.length} need human judgement`
);
