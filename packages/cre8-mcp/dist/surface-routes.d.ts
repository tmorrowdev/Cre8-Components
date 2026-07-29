/**
 * HTTP surface for streaming UI, split into two halves on purpose.
 *
 * `mountSurfaceViewer` carries everything a *browser* needs — the page, the
 * runtime assets, the event stream, and the POST path events come back on. It
 * mounts above the bearer gate, because a browser cannot put an Authorization
 * header on a page load or an EventSource. What protects a surface instead is
 * that its id is 128 random bits: the URL is the capability.
 *
 * `mountSurfaceApi` carries everything an *agent* needs, and stays behind the
 * gate with the rest of the API. Nothing here lets a viewer mutate a surface;
 * the only write it can do is report an event that already happened.
 */
import type { Hono } from 'hono';
export declare function themeExists(brand: string): boolean;
export declare const DEFAULT_THEME: string;
export declare function mountSurfaceViewer(app: Hono): void;
export declare function mountSurfaceApi(app: Hono, publicBase: () => string): void;
