/**
 * The viewer server that stdio mode needs in order to be honest.
 *
 * Surfaces live in a module-level store, in the process that created them. Over
 * stdio that process serves no HTTP, so `ui_open_surface` used to hand back a
 * URL pointing at a port with nothing on it — or, worse, at a *different*
 * cre8-mcp process whose store had never heard of the surface.
 *
 * So stdio boots its own viewer, lazily, the first time a surface is opened. No
 * second process to run and no configuration to get wrong, which is what
 * "single connector" has to mean if it means anything.
 */

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { mountSurfaceViewer } from './surface-routes.js';

let booting: Promise<string> | null = null;

/**
 * Base URL for the embedded viewer, booting it on first call.
 *
 * Bound to loopback: the only routes mounted are the viewer ones, and a surface
 * id is already the capability, but there is no reason to offer them to the
 * network. `CRE8_MCP_PUBLIC_URL` overrides the *advertised* origin without
 * changing what is bound, which is what you want behind a tunnel.
 */
export function embeddedViewerBase(): Promise<string> {
  if (booting) return booting;

  booting = new Promise<string>((resolve, reject) => {
    const app = new Hono();
    app.use('*', cors({ origin: '*', allowMethods: ['GET', 'POST', 'OPTIONS'] }));
    mountSurfaceViewer(app);

    const requested = Number(process.env.CRE8_MCP_VIEWER_PORT ?? 0);
    const hostname = process.env.CRE8_MCP_VIEWER_HOST ?? '127.0.0.1';

    try {
      serve({ fetch: app.fetch, port: requested, hostname }, (info) => {
        const advertised =
          process.env.CRE8_MCP_PUBLIC_URL?.replace(/\/$/, '') ?? `http://${hostname}:${info.port}`;
        // stdout carries JSON-RPC on this transport; anything human goes to stderr.
        console.error(`cre8-mcp viewer listening on http://${hostname}:${info.port}`);
        resolve(advertised);
      });
    } catch (error) {
      booting = null;
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });

  return booting;
}
