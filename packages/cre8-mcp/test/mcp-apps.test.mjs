/**
 * Locks in the MCP Apps (SEP-1865) contract: the surface view is a predeclared
 * `ui://` resource a host can list and read, `ui_open_surface` names it via
 * `_meta.ui.resourceUri` and returns the structuredContent its view boots
 * from, and the view bridge is servable from this server's own origin.
 *
 *   npx tsx test/mcp-apps.test.mjs
 *
 * Everything here runs in-process over linked transports — the failure this
 * suite exists to catch is drift between what the tool advertises and what
 * resources/read actually serves, which no HTTP round-trip is needed to see.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { Hono } from 'hono';

import { createMcpServer } from '../src/mcp-server.ts';
import { SURFACE_APP_URI } from '../src/ui-tools.ts';
import { mountSurfaceViewer } from '../src/surface-routes.ts';

const BASE = 'http://127.0.0.1:65500';
const MIME = 'text/html;profile=mcp-app';

let passed = 0;
const failures = [];

function assert(cond, message) {
  if (!cond) throw new Error(message ?? 'assertion failed');
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message ?? 'not equal'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures.push(name);
    console.log(`FAIL  ${name}\n      ${err.message}`);
  }
}

async function connectedClient() {
  const server = createMcpServer({ publicBase: BASE });
  const client = new Client({ name: 'mcp-apps-test', version: '0.0.0' });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

const client = await connectedClient();

await test('resources/list predeclares the surface view template', async () => {
  const { resources } = await client.listResources();
  const view = resources.find((r) => r.uri === SURFACE_APP_URI);
  assert(view, `no resource with uri ${SURFACE_APP_URI}`);
  assertEqual(view.mimeType, MIME, 'mimeType');
  const csp = view._meta?.ui?.csp;
  assert(csp, 'resource _meta.ui.csp missing');
  assert(csp.connectDomains?.includes(BASE), `connectDomains should name ${BASE}`);
  assert(csp.resourceDomains?.includes(BASE), `resourceDomains should name ${BASE}`);
});

await test('resources/read serves the app template against this origin', async () => {
  const { contents } = await client.readResource({ uri: SURFACE_APP_URI });
  assertEqual(contents.length, 1, 'one content item');
  assertEqual(contents[0].mimeType, MIME, 'mimeType');
  const html = contents[0].text;
  assert(html.includes('startSurfaceViewer'), 'template must carry the viewer bootstrap');
  assert(html.includes(JSON.stringify(BASE)), 'template must bake this origin in');
  assert(html.includes("'/mcp-app/app.js'"), 'template must load the bridge from the origin');
  assert(html.includes('ontoolresult'), 'template must boot from the tool result');
  assert(!html.includes('cdn.jsdelivr'), 'template must not reach for a CDN');
});

await test('ui_open_surface advertises the template via _meta.ui.resourceUri', async () => {
  const { tools } = await client.listTools();
  const open = tools.find((t) => t.name === 'ui_open_surface');
  assert(open, 'ui_open_surface missing');
  assertEqual(open._meta?.ui?.resourceUri, SURFACE_APP_URI, '_meta.ui.resourceUri');
});

await test('ui_open_surface returns the structuredContent its view boots from', async () => {
  const result = await client.callTool({ name: 'ui_open_surface', arguments: { title: 'apps test' } });
  const sc = result.structuredContent;
  assert(sc && typeof sc.surfaceId === 'string' && sc.surfaceId.length > 0, 'structuredContent.surfaceId');
  assertEqual(typeof sc.theme, 'string', 'structuredContent.theme');
  assert(String(sc.url).startsWith(`${BASE}/surfaces/`), 'structuredContent.url');

  // The pre-SEP embedded resource still rides along for mcp-ui hosts, and its
  // per-surface URI stays readable.
  const embedded = result.content.find((b) => b.type === 'resource');
  assert(embedded, 'embedded resource block missing');
  assertEqual(embedded.resource.uri, `${SURFACE_APP_URI}/${sc.surfaceId}`, 'embedded uri');
  const { contents } = await client.readResource({ uri: embedded.resource.uri });
  assert(contents[0].text.includes(sc.surfaceId), 'per-surface read must bake the id in');
});

await test('the viewer serves the app bridge from /mcp-app/app.js', async () => {
  const app = new Hono();
  mountSurfaceViewer(app);
  const res = await app.request('/mcp-app/app.js');
  assertEqual(res.status, 200, 'status');
  assert((res.headers.get('content-type') ?? '').includes('javascript'), 'content-type');
  const body = await res.text();
  assert(body.length > 10_000, 'bridge bundle should be substantial');
  assert(!/^import .* from ["'][^./]/m.test(body), 'bridge must be self-contained (no bare imports)');
});

console.log(failures.length ? `\n${passed} passed, ${failures.length} FAILED` : `\n${passed} passed`);
if (failures.length) process.exit(1);
