/**
 * Evidence readers for generate-catalog-kg.mjs.
 *
 * Each reader walks one kind of shipped, authored artifact and reports the
 * component nestings it actually contains. Nothing here infers nesting from
 * names — composition.ts documents why a synthesized skeleton is confidently
 * wrong. A nesting exists in the graph only because some artifact in this
 * repo demonstrates it, and every CONTAINS edge carries the files that do.
 *
 *   stories   components/<name>/<name>.stories.ts — lit `html` templates.
 *             The widest corpus: every component ships at least one story,
 *             and compound families (table, tabs, nav) are exercised in full.
 *   sources   components/<name>/<name>.ts — a component's own render()
 *             template. When cre8-table-object renders cre8-table-row itself,
 *             that is the library asserting the nesting, not an example.
 *   examples  a2ui/examples/*.json — authored A2UI specs. The only source
 *             that speaks the spec's own children-vs-slots vocabulary, so it
 *             is also where exemplar subtrees come from.
 *   graphify  graphify-out/graph.json — the AST graph. It does not know
 *             which tag renders inside which, so it contributes no CONTAINS
 *             edges. It does know class inheritance (Cre8FormElement) and
 *             module imports, which become EXTENDS and IMPORTS edges.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/** parent -> slot|null -> child -> { count, files:Set } */
export function newContainment() {
    return new Map();
}

export function note(containment, parent, slot, child, file) {
    const bySlot = containment.get(parent) ?? new Map();
    const byChild = bySlot.get(slot) ?? new Map();
    const rec = byChild.get(child) ?? { count: 0, files: new Set() };
    rec.count += 1;
    rec.files.add(file);
    byChild.set(child, rec);
    bySlot.set(slot, byChild);
    containment.set(parent, bySlot);
}

// ─── lit / HTML templates ────────────────────────────────────────────────────

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const TAG_RE = /<(\/)?([a-zA-Z][\w-]*)((?:\s+[^<>]*?)?)\s*(\/)?>/g;

/**
 * Walks every tag in a template string and records, for each cre8-* element,
 * its nearest cre8-* ancestor and the `slot="…"` attribute it carries.
 * Interpolations (`${…}`) are left in place; they never contain a literal
 * `<tag` in this codebase and a stray one only costs a spurious pair.
 */
export function scanTemplate(text, file, containment, tagPrefix = 'cre8-', implicitParent = null) {
    // A story whose args literal already places the root itself (an item
    // story that renders `<cre8-radio-field><cre8-radio-field-item>…`) is
    // not slotting that literal into the root; the explicit nesting wins.
    if (implicitParent && new RegExp(`<${implicitParent}[\\s>]`).test(text)) implicitParent = null;
    const stack = [];
    let m;
    TAG_RE.lastIndex = 0;
    while ((m = TAG_RE.exec(text))) {
        const [, closing, rawName, attrs, selfClosing] = m;
        const name = rawName.toLowerCase();
        if (name === 'style' || name === 'script') continue;
        if (closing) {
            // Pop to the matching open tag; tolerate sloppy markup in stories.
            const i = stack.map((s) => s.name).lastIndexOf(name);
            if (i >= 0) stack.length = i;
            continue;
        }
        if (name.startsWith(tagPrefix)) {
            const explicit = [...stack].reverse().find((s) => s.name.startsWith(tagPrefix))?.name;
            // Implicit attribution never runs upward in a family: an item
            // story that renders its own parent as context is not evidence
            // that cre8-dropdown-item contains cre8-dropdown.
            const parent = explicit ?? (implicitParent && !implicitParent.startsWith(`${name}-`) ? implicitParent : null);
            if (parent && parent !== name) {
                const slotMatch = /\bslot\s*=\s*["']([^"']+)["']/.exec(attrs ?? '');
                note(containment, parent, slotMatch ? slotMatch[1] : null, name, file);
            }
        }
        if (!selfClosing && !VOID.has(name)) stack.push({ name });
    }
}

/**
 * Every string literal in a file that contains markup: html`…` templates,
 * and the plain template/quoted strings stories keep their slotted markup
 * in (`args: { default: \`<cre8-tab>…</cre8-tab>\` }`, rendered through
 * unsafeHTML inside the story's root component).
 */
function readMarkupLiterals(src) {
    const out = [];
    for (let i = 0; i < src.length; i++) {
        const ch = src[i];
        if (ch === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i < 0) break; continue; }
        if (ch === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2); if (i < 0) break; i += 1; continue; }
        if (ch === '`') {
            let depth = 0;
            let j = i + 1;
            for (; j < src.length; j++) {
                const c = src[j];
                if (c === '\\') { j++; continue; }
                if (c === '`' && depth === 0) break;
                if (c === '$' && src[j + 1] === '{') { depth++; j++; continue; }
                if (c === '}' && depth > 0) depth--;
            }
            const body = src.slice(i + 1, j);
            if (body.includes('<')) out.push(body);
            i = j;
        } else if (ch === '"' || ch === "'") {
            let j = i + 1;
            for (; j < src.length && src[j] !== ch && src[j] !== '\n'; j++) if (src[j] === '\\') j++;
            const body = src.slice(i + 1, j);
            if (body.includes('<')) out.push(body);
            i = j;
        }
    }
    return out;
}

/** The tag a stories file is about: `component: 'cre8-tabs'` in its default export. */
function storyRoot(src) {
    const m = /^\s*component:\s*['"]([\w-]+)['"]/m.exec(src);
    if (!m) return null;
    return m[1].startsWith('cre8-') ? m[1] : `cre8-${m[1]}`;
}

export function scanComponentsDir(componentsDir, { stories, sources }) {
    if (!existsSync(componentsDir)) return { storyFiles: 0, sourceFiles: 0 };
    let storyFiles = 0;
    let sourceFiles = 0;
    for (const dir of readdirSync(componentsDir)) {
        const base = join(componentsDir, dir);
        const story = join(base, `${dir}.stories.ts`);
        const source = join(base, `${dir}.ts`);
        if (existsSync(story)) {
            storyFiles++;
            const rel = `components/${dir}/${dir}.stories.ts`;
            const src = readFileSync(story, 'utf8');
            // Markup in a story's args is rendered inside the story's root
            // component, so a literal with no cre8 ancestor of its own is
            // nested under that root.
            const root = storyRoot(src);
            for (const lit of readMarkupLiterals(src)) scanTemplate(lit, rel, stories, 'cre8-', root);
        }
        if (existsSync(source)) {
            sourceFiles++;
            const rel = `components/${dir}/${dir}.ts`;
            for (const lit of readMarkupLiterals(readFileSync(source, 'utf8'))) scanTemplate(lit, rel, sources);
        }
    }
    return { storyFiles, sourceFiles };
}

// ─── A2UI example specs ──────────────────────────────────────────────────────

function sizeOf(node) {
    if (typeof node === 'string') return 1;
    let total = 1;
    for (const c of node.children ?? []) total += sizeOf(c);
    for (const list of Object.values(node.slots ?? {})) for (const c of list) total += sizeOf(c);
    return total;
}

/**
 * Returns containment plus the smallest authored subtree rooted at each
 * component — the exemplar get_composition hands back.
 */
export function scanExamples(examplesDir) {
    const containment = newContainment();
    const exemplar = new Map();
    if (!existsSync(examplesDir)) return { containment, exemplar, files: [] };
    const files = readdirSync(examplesDir).filter((f) => f.endsWith('.json')).sort();

    const visit = (node, file, path) => {
        if (typeof node === 'string' || typeof node?.component !== 'string') return;
        const existing = exemplar.get(node.component);
        if (!existing || sizeOf(node) < existing.size) {
            exemplar.set(node.component, { source: `a2ui/examples/${file}`, path, spec: node, size: sizeOf(node) });
        }
        (node.children ?? []).forEach((c, i) => {
            if (typeof c !== 'string') note(containment, node.component, null, c.component, `a2ui/examples/${file}`);
            visit(c, file, `${path}.children[${i}]`);
        });
        for (const [slot, list] of Object.entries(node.slots ?? {})) {
            list.forEach((c, i) => {
                if (typeof c !== 'string') note(containment, node.component, slot, c.component, `a2ui/examples/${file}`);
                visit(c, file, `${path}.slots.${slot}[${i}]`);
            });
        }
    };
    for (const f of files) {
        try { visit(JSON.parse(readFileSync(join(examplesDir, f), 'utf8')), f, '$'); } catch { /* suite's problem */ }
    }
    return { containment, exemplar, files };
}

// ─── graphify AST graph ──────────────────────────────────────────────────────

/**
 * Class inheritance and module imports between component files, keyed by the
 * component *tag* so they join the catalog. Class names map to tags by the
 * library's convention (Cre8TableRow -> cre8-table-row); anything that does
 * not resolve to a catalog tag is dropped rather than guessed.
 */
export function scanGraphify(graphPath, knownTags) {
    const out = { extends: new Map(), imports: new Map(), commit: null, found: false };
    if (!existsSync(graphPath)) return out;
    const g = JSON.parse(readFileSync(graphPath, 'utf8'));
    out.found = true;
    out.commit = g.built_at_commit ?? null;
    const nodes = new Map(g.nodes.map((n) => [n.id, n]));

    const classToTag = (label) => {
        if (!/^Cre8[A-Z]/.test(label)) return null;
        const tag = 'cre8' + label.slice(4).replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        return knownTags.has(tag) ? tag : null;
    };
    const fileToTag = (file) => {
        const m = /components\/([^/]+)\/\1\.ts$/.exec(file ?? '');
        const tag = m ? `cre8-${m[1]}` : null;
        return tag && knownTags.has(tag) ? tag : null;
    };

    for (const l of g.links ?? []) {
        const s = nodes.get(l.source);
        const t = nodes.get(l.target);
        if (!s || !t) continue;
        if (l.relation === 'inherits') {
            const tag = classToTag(s.label);
            if (tag) out.extends.set(tag, t.label);
        } else if (l.relation === 'imports_from' || l.relation === 'imports') {
            const from = fileToTag(s.source_file);
            const to = fileToTag(t.source_file);
            if (from && to && from !== to) {
                const set = out.imports.get(from) ?? new Set();
                set.add(to);
                out.imports.set(from, set);
            }
        }
    }
    return out;
}

// ─── pattern specs ───────────────────────────────────────────────────────────

/**
 * Patterns are authored A2UI specs under a2ui/patterns/*.json:
 *   { name, description, spec }
 * They used to be HTML strings in scripts/mcp-static-data.json that nothing
 * validated and nothing else could read. As specs they validate against the
 * catalog at build time, render to web or React through generate_code, and
 * count as containment evidence like any other authored artifact.
 */
export function scanPatterns(patternsDir) {
    const containment = newContainment();
    const patterns = [];
    if (!existsSync(patternsDir)) return { containment, patterns };
    const files = readdirSync(patternsDir).filter((f) => f.endsWith('.json')).sort();

    const visit = (node, file, used) => {
        if (typeof node === 'string' || typeof node?.component !== 'string') return;
        used.add(node.component);
        for (const c of node.children ?? []) {
            if (typeof c !== 'string') note(containment, node.component, null, c.component, `a2ui/patterns/${file}`);
            visit(c, file, used);
        }
        for (const [slot, list] of Object.entries(node.slots ?? {})) {
            for (const c of list) {
                if (typeof c !== 'string') note(containment, node.component, slot, c.component, `a2ui/patterns/${file}`);
                visit(c, file, used);
            }
        }
    };
    for (const f of files) {
        const raw = JSON.parse(readFileSync(join(patternsDir, f), 'utf8'));
        const used = new Set();
        visit(raw.spec, f, used);
        patterns.push({
            slug: f.replace(/\.json$/, ''),
            name: raw.name,
            description: raw.description,
            source: `a2ui/patterns/${f}`,
            spec: raw.spec,
            components: [...used].sort(),
        });
    }
    return { containment, patterns };
}
