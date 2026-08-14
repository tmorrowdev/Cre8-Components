/**
 * Vercel function entrypoint.
 *
 * The whole server is one Hono app (src/app.ts), so there is nothing to port:
 * Vercel hands us a web `Request` and wants a `Response`, which is exactly
 * `app.fetch`. `vercel.json` rewrites every path here, so the routes an agent
 * sees are the same ones `cre8-mcp-api` serves locally — `/mcp`, `/components`,
 * `/surfaces/:id`, and the rest — with no `/api` prefix leaking into them.
 */

import { handle } from 'hono/vercel';
import { createApp } from '../dist/app.js';

// Viewer URLs are built from this, and the default (`http://localhost:$PORT`)
// is meaningless in a lambda — an agent would hand a human a dead link. Vercel
// gives us the production hostname; `VERCEL_URL` is the per-deployment one, so
// it is only a fallback for previews. An explicit env var still wins, which is
// how a custom domain gets used.
if (!process.env.CRE8_MCP_PUBLIC_URL) {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (host) process.env.CRE8_MCP_PUBLIC_URL = `https://${host}`;
}

const app = createApp();

export default handle(app);
