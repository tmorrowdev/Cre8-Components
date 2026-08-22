#!/usr/bin/env node
/**
 * Deployment-drift check for the knowledge graph.
 *
 * Generation keeps catalog-kg.json honest with the library it was built from.
 * It does nothing about a copy of that file that was deployed and then left
 * behind — which is how the Claude plugin served 1.0.27 (via the unscoped
 * `cre8-mcp` package) while the checkout was on 2.3.x. This script compares the local graph against every other place
 * one is served from and exits non-zero if any of them differ.
 *
 * Targets, each optional:
 *   --url <base>         a running cre8-mcp API (a Vercel deployment, a local
 *                        dev server).
 *                        Fetches <base>/a2ui/runtime/catalog-kg.json.
 *                        Repeatable. Also read from CRE8_MCP_URLS (comma-separated).
 *   --file <path>        another checkout or bundle's catalog-kg.json
 *                        (a plugin's vendored copy, an npm tarball). Repeatable.
 *   --npm [<version>]    the published @tmorrow/cre8-wc package (latest by
 *                        default) — what anyone installing the connector gets.
 *   --plugin <.mcp.json> a Claude plugin's server config. Resolves the npm
 *                        package its `npx` line runs, then checks the
 *                        @tmorrow/cre8-wc that package depends on. This is
 *                        the surface that drifted furthest: the plugin ran
 *                        the unscoped `cre8-mcp` (0.5.0, Feb 2026), which
 *                        bundles its own 1.0.27 manifest and depends on no
 *                        design-system package at all.
 *
 *   pnpm --filter @tmorrow/cre8-wc check:deploy-drift -- --npm --plugin .claude/marketplaces/tmorrow_ai/cre8/.mcp.json
 */
import { createHash } from 'node:crypto';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const localPath = resolve(__dirname, 'catalog-kg.json');

const args = process.argv.slice(2);
const urls = (process.env.CRE8_MCP_URLS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const files = [];
const plugins = [];
let npm = null;
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url') urls.push(args[++i]);
    else if (args[i] === '--file') files.push(args[++i]);
    else if (args[i] === '--plugin') plugins.push(args[++i]);
    else if (args[i] === '--npm') npm = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : 'latest';
    else { console.error(`unknown argument ${args[i]}`); process.exit(2); }
}
if (!urls.length && !files.length && !npm && !plugins.length) {
    console.error('nothing to compare against: pass --url, --file or --npm (or set CRE8_MCP_URLS)');
    process.exit(2);
}

const fingerprint = (kg) => ({
    library_version: kg.meta?.library_version ?? null,
    components: kg.nodes?.filter((n) => n.type === 'component').length ?? 0,
    categories: kg.nodes?.filter((n) => n.type === 'category').length ?? 0,
    contains_edges: kg.meta?.contains_edges ?? kg.edges?.filter((e) => e.rel === 'CONTAINS').length ?? 0,
    patterns: kg.nodes?.filter((n) => n.type === 'pattern').length ?? 0,
    sha256: createHash('sha256').update(JSON.stringify({ nodes: kg.nodes, edges: kg.edges })).digest('hex').slice(0, 12),
});

const local = fingerprint(JSON.parse(readFileSync(localPath, 'utf8')));
const targets = [];

for (const url of urls) {
    const endpoint = `${url.replace(/\/$/, '')}/a2ui/runtime/catalog-kg.json`;
    try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        targets.push({ name: endpoint, fp: fingerprint(await res.json()) });
    } catch (err) {
        targets.push({ name: endpoint, error: err?.message ?? String(err) });
    }
}
for (const file of files) {
    try {
        targets.push({ name: file, fp: fingerprint(JSON.parse(readFileSync(resolve(file), 'utf8'))) });
    } catch (err) {
        targets.push({ name: file, error: err?.message ?? String(err) });
    }
}
/** The catalog-kg.json inside a published @tmorrow/cre8-wc, or an error. */
function fromNpm(spec) {
    const dir = mkdtempSync(join(tmpdir(), 'cre8-kg-'));
    try {
        const tgz = execSync(`npm pack ${spec} --pack-destination ${dir} --silent`, { encoding: 'utf8' }).trim().split('\n').pop();
        execSync(`tar -xzf ${join(dir, tgz)} -C ${dir} package/a2ui/catalog-kg.json`);
        return { fp: fingerprint(JSON.parse(readFileSync(join(dir, 'package', 'a2ui', 'catalog-kg.json'), 'utf8'))) };
    } catch (err) {
        return { error: `no catalog-kg.json in the published package (${err?.message?.split('\n')[0] ?? err})` };
    } finally {
        rmSync(dir, { recursive: true, force: true });
    }
}

if (npm) {
    const name = `@tmorrow/cre8-wc@${npm}`;
    targets.push({ name, ...fromNpm(name) });
}

for (const file of plugins) {
    let label = file;
    try {
        const cfg = JSON.parse(readFileSync(resolve(file), 'utf8'));
        const servers = Object.values(cfg.mcpServers ?? {});
        const server = servers.find((s) => s.command === 'npx') ?? servers[0];
        const pkg = (server?.args ?? []).find((a) => !a.startsWith('-'));
        if (!pkg) throw new Error('no npx package in mcpServers');
        label = `plugin → ${pkg}`;
        const view = JSON.parse(execSync(`npm view ${pkg} version dependencies --json`, { encoding: 'utf8' }));
        const wcRange = view.dependencies?.['@tmorrow/cre8-wc'];
        if (!wcRange) {
            targets.push({ name: `${label}@${view.version}`, error: 'does not depend on @tmorrow/cre8-wc — it bundles its own catalog and can never be graph-backed' });
            continue;
        }
        const wcVersion = JSON.parse(execSync(`npm view "@tmorrow/cre8-wc@${wcRange}" version --json`, { encoding: 'utf8' }));
        const resolved = Array.isArray(wcVersion) ? wcVersion.at(-1) : wcVersion;
        targets.push({ name: `${label}@${view.version} (wc ${resolved})`, ...fromNpm(`@tmorrow/cre8-wc@${resolved}`) });
    } catch (err) {
        targets.push({ name: label, error: err?.message?.split('\n')[0] ?? String(err) });
    }
}

const keys = Object.keys(local);
const pad = (s, n) => String(s).padEnd(n);
console.log(pad('', 34) + keys.map((k) => pad(k, 17)).join(''));
console.log(pad('local checkout', 34) + keys.map((k) => pad(local[k], 17)).join(''));
let drifted = 0;
for (const t of targets) {
    if (t.error) {
        drifted++;
        console.log(`${pad(t.name.slice(0, 33), 34)}DRIFTED: ${t.error}`);
        continue;
    }
    const same = t.fp.sha256 === local.sha256;
    if (!same) drifted++;
    console.log(pad(t.name.slice(0, 33), 34) + keys.map((k) => pad(t.fp[k] === local[k] ? t.fp[k] : `${t.fp[k]} !!`, 17)).join(''));
}
if (drifted) {
    console.error(`\n${drifted} deployment(s) do not serve the graph this checkout builds. Redeploy them with the library.`);
    process.exit(1);
}
console.log('\nall deployments serve the same knowledge graph as this checkout');
