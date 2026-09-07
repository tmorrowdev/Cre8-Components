/**
 * Static server for `www/`, for developing outside a simulator.
 *
 * Deliberately tiny and dependency-free: the app is plain ES modules and needs
 * nothing more than correct MIME types over http, which is also all Capacitor
 * gives it on the device.
 */

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(dirname(fileURLToPath(import.meta.url))), 'www');
const port = Number(process.env.PORT ?? 4310);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
};

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  // normalize collapses `..`, and the prefix check rejects anything that still
  // escapes the root — this serves a directory, not the filesystem.
  const target = normalize(join(root, decodeURIComponent(url.pathname)));
  if (!target.startsWith(root)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  const file =
    existsSync(target) && statSync(target).isDirectory() ? join(target, 'index.html') : target;

  if (!existsSync(file)) {
    res.writeHead(404).end('Not found');
    return;
  }

  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`cre8-diet on http://localhost:${port}`);
  if (!existsSync(join(root, 'vendor', 'cre8-wc.esm.js'))) {
    console.warn('www/vendor is missing — run `pnpm sync-assets` or the page will be unstyled.');
  }
});
