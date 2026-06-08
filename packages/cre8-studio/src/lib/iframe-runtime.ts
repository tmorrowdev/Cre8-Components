import type { ComponentSpec } from "@tmorrow/cre8-wc/a2ui";

interface SrcDocOpts {
  runtimeUrl: string;
  cdnUrl: string;
}

const BRIDGE = `
  let catalog;
  function boot(render, registerCatalog, CATALOG) {
    catalog = registerCatalog(CATALOG);
    addEventListener("message", (e) => {
      if (e.data?.type !== "render") return;
      render(e.data.spec, catalog, {
        root: document.getElementById("root"),
        onEvent: (evt) => parent.postMessage(
          { type: "a2ui-event", handler: evt.handler, component: evt.component, detail: evt.detail }, "*"),
      });
      requestAnimationFrame(() =>
        parent.postMessage({ type: "resize", height: document.body.scrollHeight }, "*"));
    });
    parent.postMessage({ type: "ready" }, "*");
  }
`;

export function specToIframeSrcDoc({ runtimeUrl, cdnUrl }: SrcDocOpts): string {
  return `<!doctype html><html><head><meta charset="utf-8">
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
  cdnText?: string;
  runtimeText?: string;
}

export function assembleReportHtml(spec: ComponentSpec, opts: ReportOpts): string {
  const specJson = JSON.stringify(spec);
  if (opts.inline) {
    return `<!doctype html><html><head><meta charset="utf-8">
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
<style>body{margin:0;font-family:system-ui}#root{padding:24px;max-width:960px;margin:auto}</style></head>
<body><div id="root"></div>
<script type="module">
import "${opts.cdnUrl}";
import { render, registerCatalog, CATALOG } from "${opts.runtimeUrl}";
const c = registerCatalog(CATALOG);
render(${specJson}, c, { root: document.getElementById("root") });
</script></body></html>`;
}
