/**
 * The viewer page for a streaming surface.
 *
 * It is deliberately dumb: it registers the catalog, opens an EventSource, and
 * feeds every message straight into the same `SurfaceModel` the server is
 * running. No spec interpretation happens here that does not also happen on the
 * server, and no code from the agent is ever executed — a handler stays a name,
 * and this page's only response to one is to POST it back.
 */
export function renderSurfacePage(options) {
    const { surfaceId, runtimeBase = '/a2ui/runtime' } = options;
    const origin = (options.origin ?? '').replace(/\/$/, '');
    const title = escapeHtml(options.title ?? 'cre8 surface');
    const id = JSON.stringify(surfaceId);
    const base = JSON.stringify(origin + runtimeBase);
    const root = JSON.stringify(origin);
    const theme = encodeURIComponent(options.theme ?? 'cre8');
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="${origin}/themes/${theme}/fonts.css">
<link rel="stylesheet" href="${origin}/themes/${theme}/tokens.css">
<style>
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
  #cre8-surface-root:empty::after {
    content: "Waiting for the agent…";
    display: block; padding: 48px; text-align: center; opacity: .55; font-size: 14px;
  }
</style>
</head>
<body>
<div id="cre8-surface-root"></div>
<div id="cre8-surface-status" data-state="connecting"><span class="dot"></span><span class="label">connecting</span></div>
<script type="module">
const SURFACE_ID = ${id};
const RUNTIME = ${base};
const ORIGIN = ${root};

const statusEl = document.getElementById('cre8-surface-status');
const rootEl = document.getElementById('cre8-surface-root');

function setStatus(state, label) {
  statusEl.dataset.state = state;
  statusEl.querySelector('.label').textContent = label ?? state;
}

// The design system itself, then the A2UI runtime. Both are served by this same
// server, so a surface works offline and pins to the library the catalog
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

  source.onerror = () => {
    if (source.readyState === EventSource.CLOSED) {
      setStatus('error', 'reconnecting');
      setTimeout(connect, backoff);
      backoff = Math.min(backoff * 2, 10000);
    }
  };
}

connect();
</script>
</body>
</html>
`;
}
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
