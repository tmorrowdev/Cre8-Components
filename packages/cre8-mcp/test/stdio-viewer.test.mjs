/**
 * Proves the stdio transport hands back a URL that actually serves the surface.
 *
 *   npx tsx test/stdio-viewer.test.mjs
 *
 * This is the test the first cut of streaming needed and did not have. Surfaces
 * live in the process that created them; over stdio that process serves no HTTP
 * of its own, so `ui_open_surface` returned a URL pointing at a port with
 * nothing on it. Everything else passed. Only fetching the URL catches it.
 */

import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const entry = resolve(here, '../src/index.ts');

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

/** A minimal newline-delimited JSON-RPC client over a child process's stdio. */
function startServer() {
  const child = spawn('npx', ['tsx', entry], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, CRE8_MCP_VIEWER_PORT: '0' },
  });

  const pending = new Map();
  let buffer = '';
  let stderr = '';

  child.stdout.on('data', (chunk) => {
    buffer += chunk.toString();
    let index;
    while ((index = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, index).trim();
      buffer = buffer.slice(index + 1);
      if (!line) continue;
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        continue;
      }
      const waiter = pending.get(message.id);
      if (waiter) {
        pending.delete(message.id);
        waiter(message);
      }
    }
  });
  child.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  let nextId = 0;
  const request = (method, params) =>
    new Promise((resolveResponse, rejectResponse) => {
      const id = ++nextId;
      const timer = setTimeout(
        () => rejectResponse(new Error(`timed out waiting for ${method}\n--- stderr ---\n${stderr}`)),
        45_000
      );
      pending.set(id, (message) => {
        clearTimeout(timer);
        if (message.error) rejectResponse(new Error(message.error.message));
        else resolveResponse(message.result);
      });
      child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
    });

  const notify = (method, params) =>
    child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method, params })}\n`);

  return { child, request, notify, stderrText: () => stderr };
}

const server = startServer();

try {
  await test('the stdio server initializes and lists the streaming tools', async () => {
    const result = await server.request('initialize', {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: { name: 'stdio-test', version: '1' },
    });
    assertEqual(result.serverInfo.name, 'cre8-mcp');
    // The version a client is told has to be the version it is running. A
    // hardcoded second copy of it sat three minors behind the package for
    // several releases, and nothing failed.
    assertEqual(
      result.serverInfo.version,
      JSON.parse(readFileSync(resolve(here, '../package.json'), 'utf-8')).version,
      'serverInfo.version must track package.json'
    );
    server.notify('notifications/initialized', {});

    const { tools } = await server.request('tools/list', {});
    const names = tools.map((t) => t.name);
    assert(names.includes('ui_open_surface'), 'stdio must expose the same tools as HTTP');
    assert(names.includes('cre8_guide'));
  });

  await test('a surface opened over stdio is actually reachable at the URL it returns', async () => {
    const result = await server.request('tools/call', {
      name: 'ui_open_surface',
      arguments: { title: 'stdio surface', spec: { component: 'cre8-layout-container' } },
    });
    const payload = JSON.parse(result.content.find((c) => c.type === 'text').text);
    assert(payload.url, 'ui_open_surface should return a URL');

    const page = await fetch(payload.url);
    assertEqual(page.status, 200, `the returned URL must serve the surface (${payload.url})`);
    const html = await page.text();
    assert(html.includes(payload.surfaceId), 'the page should be for this surface');

    // And the runtime the page imports has to be there too, or it renders blank.
    const origin = new URL(payload.url).origin;
    assertEqual((await fetch(`${origin}/a2ui/runtime/stream/index.js`)).status, 200);
    assertEqual((await fetch(`${origin}/themes/cre8/tokens.css`)).status, 200);
  });

  await test('patches over stdio show up in the surface the URL serves', async () => {
    const opened = JSON.parse(
      (
        await server.request('tools/call', {
          name: 'ui_open_surface',
          arguments: { spec: { component: 'cre8-layout-container' } },
        })
      ).content.find((c) => c.type === 'text').text
    );

    await server.request('tools/call', {
      name: 'ui_stream',
      arguments: {
        surfaceId: opened.surfaceId,
        ops: [
          { op: 'append', path: '$', nodes: [{ component: 'cre8-heading', children: ['From stdio'] }] },
        ],
        status: 'done',
      },
    });

    const snapshot = JSON.parse(
      (
        await server.request('tools/call', {
          name: 'ui_get_surface',
          arguments: { surfaceId: opened.surfaceId },
        })
      ).content[0].text
    );
    assertEqual(snapshot.root.children[0].children[0], 'From stdio');
    assertEqual(snapshot.state, 'done');
  });

  await test('the viewer only boots once, however many surfaces are opened', async () => {
    const first = JSON.parse(
      (
        await server.request('tools/call', {
          name: 'ui_open_surface',
          arguments: { spec: { component: 'cre8-grid' } },
        })
      ).content.find((c) => c.type === 'text').text
    );
    const second = JSON.parse(
      (
        await server.request('tools/call', {
          name: 'ui_open_surface',
          arguments: { spec: { component: 'cre8-grid' } },
        })
      ).content.find((c) => c.type === 'text').text
    );
    assertEqual(new URL(first.url).origin, new URL(second.url).origin);
    const boots = (server.stderrText().match(/viewer listening/g) ?? []).length;
    assertEqual(boots, 1, 'a second surface must reuse the first viewer');
  });
} finally {
  server.child.kill();
}

console.log(`\n${passed} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
