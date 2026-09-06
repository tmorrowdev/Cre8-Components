/**
 * The viewer pages for a streaming surface.
 *
 * Two pages share one bootstrap. `renderSurfacePage` is the standalone viewer a
 * browser loads at `/surfaces/:id` — the surface id is baked in and it boots
 * immediately. `renderSurfaceAppPage` is the MCP Apps (SEP-1865) template a
 * host predeclares at `ui://cre8/surface`: it learns which surface to show from
 * the `ui_open_surface` tool result the host delivers over the view bridge, so
 * one static resource serves every surface.
 *
 * Both are deliberately dumb: they register the catalog, open an EventSource,
 * and feed every message straight into the same `SurfaceModel` the server is
 * running. No spec interpretation happens here that does not also happen on the
 * server, and no code from the agent is ever executed — a handler stays a name,
 * and this page's only response to one is to POST it back.
 */

export interface SurfacePageOptions {
  surfaceId: string;
  title?: string;
  /** Base path the runtime assets are served from. */
  runtimeBase?: string;
  /**
   * Absolute origin to prefix every URL with. Leave empty for the page served
   * at `/surfaces/:id` (same origin). Set it when the page is embedded
   * somewhere else — an mcp-ui host renders it inside a sandboxed iframe with
   * no origin of its own, so relative URLs there resolve to nothing.
   */
  origin?: string;
  /** Brand whose token sheet the page links. */
  theme?: string;
}

export interface SurfaceAppPageOptions {
  /**
   * Absolute origin of the cre8-mcp server. Required: an MCP Apps host renders
   * this template in a sandboxed iframe with no origin of its own, so every
   * asset and stream URL must be absolute.
   */
  origin: string;
  /** Base path the runtime assets are served from. */
  runtimeBase?: string;
  title?: string;
}

const PAGE_STYLE = `
  :root { color-scheme: light dark; }
  body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
  #cre8-surface-status {
    position: fixed; inset: auto auto 12px 12px; z-index: 9999;
    display: flex; align-items: center; gap: 8px;
    padding: 6px 12px; border-radius: 999px;
    font-size: 12px; line-height: 1;
    background: rgba(20,20,22,.82); color: #fff;
    transition: opacity .4s ease; opacity: .9;
  }
  #cre8-surface-status[data-state="done"] { opacity: 0; pointer-events: none; }
  #cre8-surface-status .dot {
    width: 7px; height: 7px; border-radius: 50%; background: #6ee7a8;
  }
  #cre8-surface-status[data-state="streaming"] .dot { animation: pulse 1.1s ease-in-out infinite; }
  #cre8-surface-status[data-state="error"] .dot { background: #ff6b6b; }
  @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: .25 } }
  #cre8-surface-root[data-ended]::after {
    content: "This surface has ended.";
    display: block; padding: 24px; text-align: center; opacity: .5; font-size: 13px;
  }
  #cre8-surface-root:empty::after {
    content: "Waiting for the agent…";
    display: block; padding: 48px; text-align: center; opacity: .55; font-size: 14px;
  }
`;

const PAGE_BODY = `<div id="cre8-surface-root"></div>
<div id="cre8-surface-status" data-state="connecting"><span class="dot"></span><span class="label">connecting</span></div>`;

/**
 * The shared viewer, as a script fragment defining `setStatus` and
 * `startSurfaceViewer(cfg)` with cfg = { surfaceId, origin, runtime, theme }.
 * Both pages embed it; only how cfg is obtained differs. Theme stylesheets are
 * injected here rather than in the head because the app template does not know
 * the theme until the tool result arrives.
 */
function viewerBootstrap(): string {
  return `
const statusEl = document.getElementById('cre8-surface-status');
const rootEl = document.getElementById('cre8-surface-root');

function setStatus(state, label) {
  statusEl.dataset.state = state;
  statusEl.querySelector('.label').textContent = label ?? state;
}

function linkStylesheet(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

async function startSurfaceViewer(cfg) {
  const SURFACE_ID = cfg.surfaceId;
  const ORIGIN = (cfg.origin ?? '').replace(/\\/$/, '');
  const RUNTIME = cfg.runtime;
  const theme = encodeURIComponent(cfg.theme ?? 'cre8');

  // The standalone page links its brand sheets statically in the head; the app
  // template cannot, because the theme only arrives with the tool result.
  if (!cfg.stylesLinked) {
    linkStylesheet(ORIGIN + '/themes/' + theme + '/fonts.css');
    linkStylesheet(ORIGIN + '/themes/' + theme + '/tokens.css');
  }

  // The design system itself, then the A2UI runtime. Both are served by this
  // same server, so a surface works offline and pins to the library the catalog
  // describes rather than to whatever a CDN is serving today.
  await import(ORIGIN + '/cre8-wc.esm.js');
  const { registerCatalog } = await import(RUNTIME + '/index.js');
  const { SurfaceModel, SurfaceRenderer } = await import(RUNTIME + '/stream/index.js');

  const catalogSchema = await (await fetch(RUNTIME + '/catalog.json')).json();
  const catalog = registerCatalog(catalogSchema);

  let model = new SurfaceModel(catalog, { surfaceId: SURFACE_ID });
  let renderer = new SurfaceRenderer(model, { root: rootEl, onEvent: sendEvent });

  function sendEvent(evt) {
    // detail may hold anything a component chose to emit; drop what will not
    // serialise rather than failing the POST.
    let detail;
    try {
      detail = JSON.parse(JSON.stringify(evt.detail ?? null));
    } catch {
      detail = String(evt.detail);
    }
    // text/plain keeps this a CORS-simple request, so a surface embedded in a
    // sandboxed iframe does not need a preflight to report a click.
    navigator.sendBeacon?.(
      ORIGIN + '/surfaces/' + SURFACE_ID + '/events',
      new Blob(
        [JSON.stringify({ component: evt.component, path: evt.path, event: evt.event, handler: evt.handler, detail })],
        { type: 'text/plain' }
      )
    );
  }

  function reset() {
    model = new SurfaceModel(catalog, { surfaceId: SURFACE_ID });
    renderer = new SurfaceRenderer(model, { root: rootEl, onEvent: sendEvent });
  }

  let source;
  let backoff = 500;

  function connect() {
    source = new EventSource(ORIGIN + '/surfaces/' + SURFACE_ID + '/stream');

    source.onopen = () => {
      backoff = 500;
      setStatus('streaming', 'live');
    };

    source.onmessage = (e) => {
      let message;
      try {
        message = JSON.parse(e.data);
      } catch {
        return;
      }
      try {
        // A create message is always a full resync — a fresh viewer and a
        // reconnecting one take the same path.
        if (message.type === 'surface.create') reset();
        renderer.apply(message);
        if (message.type === 'surface.status') setStatus(message.state, message.message ?? message.state);
        if (message.type === 'surface.delete') { setStatus('done', 'closed'); source.close(); }
      } catch (err) {
        // An out-of-order or rejected message means this viewer's model no longer
        // matches the server's. Reconnecting replays current state.
        console.warn('[cre8 surface]', err.message);
        setStatus('error', 'resyncing');
        source.close();
        setTimeout(connect, 250);
      }
    };

    source.onerror = async () => {
      if (source.readyState !== EventSource.CLOSED) return;
      setStatus('error', 'reconnecting');
      // Distinguish "the surface is gone" from "the network hiccuped". Retrying
      // into a 404 forever leaves a spinner that never explains itself, and
      // surfaces do not survive a server restart.
      try {
        const probe = await fetch(ORIGIN + '/surfaces/' + SURFACE_ID + '/alive');
        if (probe.status === 404) {
          setStatus('done', 'this surface has ended');
          rootEl.dataset.ended = 'true';
          return;
        }
      } catch {
        // Unreachable server: that is a blip, so fall through and retry.
      }
      setTimeout(connect, backoff);
      backoff = Math.min(backoff * 2, 10000);
    };
  }

  connect();
}
`;
}

function pageShell(title: string, script: string, headExtra = ''): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
${headExtra}<style>${PAGE_STYLE}</style>
</head>
<body>
${PAGE_BODY}
<script type="module">
${script}
</script>
</body>
</html>
`;
}

export function renderSurfacePage(options: SurfacePageOptions): string {
  const { surfaceId, runtimeBase = '/a2ui/runtime' } = options;
  const origin = (options.origin ?? '').replace(/\/$/, '');
  const theme = encodeURIComponent(options.theme ?? 'cre8');
  const links = `<link rel="stylesheet" href="${origin}/themes/${theme}/fonts.css">
<link rel="stylesheet" href="${origin}/themes/${theme}/tokens.css">
`;
  return pageShell(
    options.title ?? 'cre8 surface',
    `${viewerBootstrap()}
const SURFACE_ID = ${JSON.stringify(surfaceId)};
const ORIGIN = ${JSON.stringify(origin)};
const RUNTIME = ${JSON.stringify(origin + runtimeBase)};

startSurfaceViewer({ surfaceId: SURFACE_ID, origin: ORIGIN, runtime: RUNTIME, stylesLinked: true });
`,
    links
  );
}

/**
 * The MCP Apps template. The host renders it, then delivers the
 * `ui_open_surface` result over the view bridge; the surface id and theme ride
 * in the result's `structuredContent`. The bridge itself
 * (`@modelcontextprotocol/ext-apps`) is served by this server at
 * `/mcp-app/app.js`, so the template stays self-contained under the CSP the
 * resource declares — no third-party origin ever loads.
 */
export function renderSurfaceAppPage(options: SurfaceAppPageOptions): string {
  const origin = options.origin.replace(/\/$/, '');
  const originJson = JSON.stringify(origin);
  const runtimeJson = JSON.stringify(origin + (options.runtimeBase ?? '/a2ui/runtime'));
  return pageShell(options.title ?? 'cre8 surface', `${viewerBootstrap()}
const ORIGIN = ${originJson};
const RUNTIME = ${runtimeJson};

setStatus('connecting', 'waiting for host');

const { App } = await import(ORIGIN + '/mcp-app/app.js');
const app = new App({ name: 'cre8-surface', version: '1.0.0' });

let booted = null;
app.ontoolresult = (result) => {
  const sc = result?.structuredContent;
  if (!sc || typeof sc.surfaceId !== 'string') return;
  // The host replays the result on reconnect; booting twice would tear down a
  // live EventSource for no reason.
  if (booted === sc.surfaceId) return;
  booted = sc.surfaceId;
  startSurfaceViewer({
    surfaceId: sc.surfaceId,
    origin: ORIGIN,
    runtime: RUNTIME,
    theme: typeof sc.theme === 'string' ? sc.theme : 'cre8',
  });
};

await app.connect();
`);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
