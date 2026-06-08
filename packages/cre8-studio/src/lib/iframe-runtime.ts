import type { ComponentSpec } from "@tmorrow/cre8-wc/a2ui";

interface SrcDocOpts {
  runtimeUrl: string;
  cdnUrl: string;
  tokensUrl: string;
}

const BRIDGE = `
  let catalog;
  // Event detail from components (e.g. Chart.js) can hold functions, DOM nodes,
  // and circular refs that structured-clone (postMessage) cannot serialize.
  // Reduce it to a plain JSON-safe value before sending it to the parent.
  function safeDetail(value) {
    const seen = new WeakSet();
    function clean(v) {
      if (v === null) return null;
      const t = typeof v;
      if (t === "function" || t === "undefined" || t === "symbol") return undefined;
      if (t !== "object") return v;
      if (seen.has(v)) return undefined;
      seen.add(v);
      if (typeof Node !== "undefined" && v instanceof Node) return undefined;
      if (Array.isArray(v)) return v.map(clean).filter((x) => x !== undefined);
      const out = {};
      for (const k in v) {
        try { const c = clean(v[k]); if (c !== undefined) out[k] = c; } catch (_) {}
      }
      return out;
    }
    try { return clean(value); } catch (_) { return undefined; }
  }
  function boot(render, registerCatalog, CATALOG) {
    catalog = registerCatalog(CATALOG);
    addEventListener("message", (e) => {
      if (e.data?.type !== "render") return;
      render(e.data.spec, catalog, {
        root: document.getElementById("root"),
        onEvent: (evt) => parent.postMessage(
          { type: "a2ui-event", handler: evt.handler, component: evt.component, detail: safeDetail(evt.detail) }, "*"),
      });
      requestAnimationFrame(() =>
        parent.postMessage({ type: "resize", height: document.body.scrollHeight }, "*"));
    });
    parent.postMessage({ type: "ready" }, "*");
  }
`;

export function specToIframeSrcDoc({ runtimeUrl, cdnUrl, tokensUrl }: SrcDocOpts): string {
  // The design tokens stylesheet must load at :root so cre8 components' shadow
  // styles resolve their var(--cre8-*) custom properties — otherwise everything
  // but canvas-based charts renders unstyled.
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${tokensUrl}">
<style>body{margin:0;font-family:system-ui}#root{padding:12px}</style></head>
<body><div id="root"></div>
<script type="module">
import "${cdnUrl}";
import { render, registerCatalog, CATALOG } from "${runtimeUrl}";
${BRIDGE}
boot(render, registerCatalog, CATALOG);
</script></body></html>`;
}

interface ReportOpts {
  inline: boolean;
  runtimeUrl?: string;
  cdnUrl?: string;
  tokensUrl?: string;
  cdnText?: string;
  runtimeText?: string;
  tokensText?: string;
}

export function assembleReportHtml(spec: ComponentSpec, opts: ReportOpts): string {
  const specJson = JSON.stringify(spec);
  if (opts.inline) {
    return `<!doctype html><html><head><meta charset="utf-8">
<style>${opts.tokensText ?? ""}</style>
<style>body{margin:0;font-family:system-ui}#root{padding:24px;max-width:960px;margin:auto}</style></head>
<body><div id="root"></div>
<script type="module">
${opts.cdnText}
</script>
<script type="module">
${opts.runtimeText}
const c = registerCatalog(CATALOG);
render(${specJson}, c, { root: document.getElementById("root") });
</script></body></html>`;
  }
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${opts.tokensUrl}">
<style>body{margin:0;font-family:system-ui}#root{padding:24px;max-width:960px;margin:auto}</style></head>
<body><div id="root"></div>
<script type="module">
import "${opts.cdnUrl}";
import { render, registerCatalog, CATALOG } from "${opts.runtimeUrl}";
const c = registerCatalog(CATALOG);
render(${specJson}, c, { root: document.getElementById("root") });
</script></body></html>`;
}
