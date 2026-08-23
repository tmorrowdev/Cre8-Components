#!/usr/bin/env node
/**
 * Audits agent skills against the shipped catalog.
 *
 *   node a2ui/check-skill-fidelity.mjs [--json] [path ...]
 *
 * Skills are documentation that agents act on directly, so a skill that names
 * a component the library no longer ships doesn't degrade gracefully - the
 * agent writes it, and it renders nothing. Nothing regenerates skills at
 * release, and nothing checked them, so drift accumulated invisibly across
 * releases: by 2.3.6 the cre8-a2ui skill documented 83 components of which 38
 * (46%) did not exist, plus 27 undeclared props and 16 out-of-range enum
 * values, every one of them written out with a confident-looking example.
 *
 * A three-arm eval measured agents carrying that skill as *worse* than agents
 * given no CRE8 knowledge at all (component_validity 0.865 against 0.922),
 * because it taught them to reach for cre8-toast, cre8-toggle, cre8-avatar and
 * 35 others that had been removed or never shipped.
 *
 * This does not fix skills; it makes the drift visible on every release, and
 * exits non-zero when a skill claims something the catalog contradicts.
 *
 * Both syntaxes are read, since skills exist for the web components and for
 * the React wrappers:
 *
 *   <cre8-button variant="primary">      web component, kebab tag
 *   <Cre8Button variant="primary">       React wrapper, PascalCase
 *
 * Only claims that can be checked are checked. Prose is left alone; a skill
 * that carries judgment rather than API tables is expected to report zero of
 * everything here, and that is the intended end state - the catalog is the
 * catalog's job, and restating it anywhere else guarantees exactly this drift.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const CATALOG = path.join(HERE, 'catalog.compact.json');

// Attributes that belong to HTML/JSX rather than to a component's own API.
const NOT_PROPS = new Set([
  'slot', 'class', 'className', 'id', 'style', 'key', 'ref', 'children',
  'hidden', 'title', 'role', 'tabindex', 'tabIndex', 'draggable', 'dir', 'lang',
]);

const pascalToKebab = (name) =>
  'cre8-' + name.slice(4).replace(/(?<!^)(?=[A-Z])/g, '-').toLowerCase();

function collectMarkdown(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  const out = [];
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    const full = path.join(target, entry.name);
    if (entry.isDirectory()) out.push(...collectMarkdown(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out.sort();
}

function auditSkill(target, catalog) {
  const components = new Map(catalog.components.map((c) => [c.name, c]));
  const files = collectMarkdown(target);
  const text = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');

  const unknownComponents = new Set();
  const knownUsed = new Set();
  const undeclaredProps = new Map();   // "component.prop" -> count
  const invalidEnums = new Map();      // "component.prop=value" -> {allowed, count}

  // One pass over every opening tag in either syntax, capturing its attributes.
  const tag = /<(cre8-[a-z0-9-]+|Cre8[A-Za-z0-9]*)((?:\s+[a-zA-Z][\w-]*(?:=(?:"[^"]*"|'[^']*'|\{[^}]*\}))?)*)\s*\/?>/g;
  for (const match of text.matchAll(tag)) {
    const raw = match[1];
    const name = raw.startsWith('Cre8') ? pascalToKebab(raw) : raw;
    const component = components.get(name);
    if (!component) {
      unknownComponents.add(name);
      continue;
    }
    knownUsed.add(name);

    const declared = component.props || {};
    // Match declared props case-insensitively: the same prop is `fullHeight`
    // in JSX and `fullheight` once the browser lowercases the attribute.
    const byLower = new Map(Object.keys(declared).map((p) => [p.toLowerCase(), p]));

    const attr = /\s([a-zA-Z][\w-]*)(?:="([^"]*)")?/g;
    for (const a of match[2].matchAll(attr)) {
      const [, prop, value] = a;
      if (NOT_PROPS.has(prop) || prop.startsWith('data-') || prop.startsWith('aria-') || prop.startsWith('on')) continue;
      const real = byLower.get(prop.toLowerCase());
      if (!real) {
        const key = `${name}.${prop}`;
        undeclaredProps.set(key, (undeclaredProps.get(key) || 0) + 1);
        continue;
      }
      const allowed = (declared[real] || {}).enum;
      if (allowed && value !== undefined && !allowed.includes(value)) {
        const key = `${name}.${real}="${value}"`;
        const prev = invalidEnums.get(key);
        invalidEnums.set(key, { allowed, count: (prev?.count || 0) + 1 });
      }
    }
  }

  const taught = unknownComponents.size + knownUsed.size;
  return {
    skill: path.basename(target),
    path: target,
    files: files.length,
    componentsTaught: taught,
    unknownComponents: [...unknownComponents].sort(),
    undeclaredProps: [...undeclaredProps.entries()].sort(),
    invalidEnums: [...invalidEnums.entries()].sort(),
    neverMentioned: catalog.components.map((c) => c.name).filter((n) => !knownUsed.has(n)).length,
  };
}

function report(result, catalog) {
  const { unknownComponents: unknown, undeclaredProps: props, invalidEnums: enums } = result;
  const defects = unknown.length + props.length + enums.length;
  const pct = result.componentsTaught
    ? Math.round((unknown.length / result.componentsTaught) * 100)
    : 0;

  console.log(`\n${result.skill}  (${result.files} file${result.files === 1 ? '' : 's'})`);
  if (!result.componentsTaught) {
    console.log('  no component API claims - nothing to contradict');
    return 0;
  }
  console.log(`  components named: ${result.componentsTaught}   not in catalog: ${unknown.length} (${pct}%)`);
  if (unknown.length) console.log(`    ${unknown.join(', ')}`);
  if (props.length) {
    console.log(`  props no component declares: ${props.length}`);
    for (const [key, count] of props) console.log(`    ${key}${count > 1 ? `  (×${count})` : ''}`);
  }
  if (enums.length) {
    console.log(`  values outside the declared enum: ${enums.length}`);
    for (const [key, { allowed }] of enums) console.log(`    ${key}  allowed: ${allowed.join(', ')}`);
  }
  console.log(`  catalog components it never mentions: ${result.neverMentioned} of ${catalog.components.length}`);
  return defects;
}

function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const targets = args.filter((a) => !a.startsWith('--'));

  if (!fs.existsSync(CATALOG)) {
    console.error(`catalog not found at ${CATALOG} - run \`pnpm run build:a2ui\` first`);
    return 1;
  }
  const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));

  // Default to wherever skills actually live on this machine. Account-synced
  // skills are included deliberately: they are the ones that drifted, and the
  // ones no build step here can regenerate.
  const candidates = targets.length ? targets : [
    path.join(HERE, '..', '..', '..', '.claude', 'skills'),
    path.join(process.env.HOME || '', '.claude', 'skills', 'synced'),
  ];

  const skillDirs = [];
  for (const c of candidates) {
    if (!fs.existsSync(c)) continue;
    if (fs.existsSync(path.join(c, 'SKILL.md'))) { skillDirs.push(c); continue; }
    for (const entry of fs.readdirSync(c, { withFileTypes: true })) {
      if (entry.isDirectory() && fs.existsSync(path.join(c, entry.name, 'SKILL.md'))) {
        skillDirs.push(path.join(c, entry.name));
      }
    }
  }
  if (!skillDirs.length) {
    console.log('no skills found to audit');
    return 0;
  }

  const results = skillDirs.map((d) => auditSkill(d, catalog));
  // Only skills that make catalog claims are interesting either way.
  const claiming = results.filter((r) => r.componentsTaught > 0);

  if (asJson) {
    console.log(JSON.stringify({ libraryVersion: catalog.libraryVersion, results: claiming }, null, 2));
  } else {
    console.log(`skill fidelity vs @tmorrow/cre8-wc ${catalog.libraryVersion} (${catalog.components.length} components)`);
    if (!claiming.length) console.log('\nno skill makes checkable component API claims');
    for (const r of claiming) report(r, catalog);
  }

  const total = claiming.reduce(
    (sum, r) => sum + r.unknownComponents.length + r.undeclaredProps.length + r.invalidEnums.length,
    0,
  );
  if (total && !asJson) {
    console.log(`\n${total} claim${total === 1 ? '' : 's'} the catalog contradicts.`);
    console.log('Skills are acted on verbatim: an agent writes what they say, and a component that');
    console.log('does not exist fails silently at runtime. Either correct the claims, or move the');
    console.log('API surface out of the skill and let the MCP answer it.');
  }
  return total ? 1 : 0;
}

process.exit(main());
