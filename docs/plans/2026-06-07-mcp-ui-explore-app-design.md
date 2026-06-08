# mcp-ui Database Exploration App — Design

**Date:** 2026-06-07
**Status:** Validated, ready for implementation planning

## Goal

A no-chat database exploration app that demonstrates what mcp-ui could become: the
agent runs in the background and generates the entire UI as sandboxed iframes. The
user explores a bundled dataset through agent-generated visualizations, drilling in
via clicks (progressive disclosure on a free-form canvas), flags the visualizations
worth keeping, and generates a final report — viewable in-app and downloadable as a
self-contained HTML file.

## Decisions (from brainstorming)

| Question | Decision |
|---|---|
| Data source | **Bundled demo dataset(s)** — canned JSON, self-contained, portable |
| Render model | **a2ui spec → server-rendered HTML in sandboxed iframe**, clicks via postMessage bridge |
| Flow shape | **Free-form canvas** — overview → click to expand into new panels → accumulate → flag → report |
| Report output | **Both** — composed a2ui report rendered in-app + downloadable self-contained HTML |
| Chat | **None** — the entire interface is agent-generated iframes + canvas chrome |

## Section 1 — Architecture & placement

**New page:** `/explore` in cre8-studio (alongside `/data`, `/build`, `/stack`).

**Three layers, reusing what exists:**
- **Agent (cre8-data-agent)** — already emits validated a2ui specs via `render_ui` and
  streams `ui_ready`. Gains a bundled-dataset tool, an explore system prompt, and a
  report-composition mode. Runs in the background: every user gesture is an HTTP
  request answered with a spec. No conversational text shown.
- **Studio (Next.js)** — `/explore` owns a canvas of panels. Each panel is a sandboxed
  `<iframe>` whose content is an agent spec wrapped in HTML. Studio owns the report
  tray, the postMessage listener, and report download.
- **Iframe runtime** — a served module (CDN + a2ui `render` + catalog + postMessage
  bridge). The iframe renders the spec and forwards every `EmittedEvent` to the parent.

**The loop (no chat):**
1. Page load → POST `{dataset, action:"overview"}` → agent returns overview spec → first iframe panel.
2. User clicks inside an iframe → bridge `postMessage`s `{handler, component, detail}` to parent.
3. Parent POSTs `{dataset, action, context}` → agent returns next spec → new panel appended.
4. Each panel has parent-rendered chrome (a "★ Add to report" button outside the iframe).
5. "Generate report" → POST flagged context → agent returns one composed report spec →
   full-width iframe + "Download HTML".

## Section 2 — The iframe render pipeline

Turn an agent a2ui spec into a sandboxed iframe that renders real cre8 components and
reports clicks back out.

**Runtime delivery (resolves the CORS/sandbox question):**
- Two studio API routes serve the runtime with `Access-Control-Allow-Origin: *`:
  - `/api/cre8-wc-cdn` (exists) — self-contained CDN bundle, auto-registers all cre8 components. *Add CORS header.*
  - `/api/a2ui-runtime` (new) — compiled a2ui `render`/`registerCatalog` + `catalog.json` as one ESM module.
- The iframe uses `sandbox="allow-scripts"` only (opaque origin — cannot touch the
  parent). It loads both runtime modules by absolute URL.

**Why postMessage for the spec (not srcDoc-inlined):** the parent creates the iframe
with a small static `srcDoc` bootstrap. The bootstrap imports the runtime, then signals
`ready`. The parent replies with `{type:"render", spec}` via `postMessage`. Avoids
HTML-escaping a JSON spec into srcDoc, and lets a panel re-render in place.

**The bridge (injected in the bootstrap):**
```js
import { render, registerCatalog } from "<runtime-url>";
const catalog = registerCatalog(CATALOG);
addEventListener("message", (e) => {
  if (e.data?.type !== "render") return;
  render(e.data.spec, catalog, {
    root: document.getElementById("root"),
    onEvent: (evt) => parent.postMessage(
      { type: "a2ui-event", handler: evt.handler, component: evt.component, detail: evt.detail },
      "*"
    ),
  });
  parent.postMessage({ type: "resize", height: document.body.scrollHeight }, "*");
});
parent.postMessage({ type: "ready" }, "*");
```

**Parent side:** a `specToIframeSrcDoc()` helper builds the bootstrap; an `<ExploreIframe>`
React component manages the ready→render handshake, auto-resizes (bridge posts
`scrollHeight`), and surfaces events via an `onEvent` prop.

## Section 3 — The canvas loop & report tray

**Canvas state (React):**
```ts
type Panel = {
  id: string;
  title: string;          // agent-provided caption
  spec: ComponentSpec;
  status: "loading" | "ready" | "error";
  flagged: boolean;       // in the report?
  origin?: string;        // id of panel this drilled from
};
```
Ordered list of `Panel`s in a responsive grid, each in `<ExploreIframe>` with parent
chrome: title bar + "★ Add to report" toggle + close ✕.

**Interaction loop:**
1. **Overview on load** — POST `action:"overview"` → first panel.
2. **Expand** — iframe `a2ui-event` with handler `agent:*` → append a `loading` panel
   optimistically, POST `{dataset, action:intent, detail, context}`, swap in the spec.
   `local:*` handlers (sort/filter) re-render the same panel with no agent call —
   reusing `ui-events.ts` (`classifyHandler`, `sortRows`).
3. **Flag** — "★" toggles `panel.flagged`; flagged panels show in the report tray.
4. **De-dupe** — key by `action+detail`; same drill twice doesn't stack duplicates.

**Context sent each request** (stateless agent stays coherent without chat):
```ts
{ dataset: "ecommerce",
  action: "drilldown",
  detail: { category: "Electronics" },
  context: { path: ["overview","category:Electronics"],
             flagged: [{ title, action, detail }] } }
```

**Report tray → generate:** persistent footer "N visualizations selected" +
**Generate report**, disabled until ≥1 flagged.

## Section 4 — The agent side

**Bundled datasets** — JSON in the agent package, e.g.
`cre8_data_agent/datasets/ecommerce.json` (orders: date, category, region, revenue,
units) plus `manifest.json` (id, title, description, row count, column types). One
dataset for MVP; loader handles N.

**New tools (data-agent):**
- `list_datasets()` → the manifest.
- `query_dataset(dataset, select, where, group_by, aggregate, order_by, limit)` →
  in-memory query over bundled rows (filter/group/aggregate). Keeps the agent from
  passing raw rows; it asks for exactly the slice a chart needs. Returns compact records.
- Existing `render_ui` (validated spec emit) stays the output path.

**New endpoint:** `POST /api/explore` → `{dataset, action, detail?, context?}`. Builds an
explore prompt and streams `ui_ready` (one spec) + `done`. Reuses streaming plumbing;
no chat text surfaced (stray `text` events ignored by the canvas).

**Explore system prompt** teaches the agent to:
- Produce one focused visualization per call (chart/table/cards) with a short caption —
  never a wall of prose.
- Use `query_dataset` to get the slice, then `render_ui`.
- Declare interactions: `agent:drilldown`/`agent:breakdown` on chart clicks for deeper
  views; `local:sort` where cheap. Drill targets obvious (clickable categories, time buckets).
- Respect `context.path` (don't re-show what's up) and `context.flagged`.

**Report mode:** `action:"report"` with `context.flagged` → a different prompt branch:
the agent composes one long a2ui document — title, executive summary (narrative text
blocks), each flagged visualization recreated via `query_dataset`, a short insight under
each. This single spec is rendered + downloaded.

## Section 5 — Report rendering & download

**In-app view:** the report spec returns one composed a2ui spec. The canvas swaps to a
report view — a single full-width `<ExploreIframe>` rendering it. "← Back to canvas"
returns with the canvas intact.

**Download — self-contained HTML:** new studio route `POST /api/explore-report` takes
the report spec and returns a single fully-inlined `.html` as a file attachment:
- Inlines the CDN bundle (read from `../cre8-wc/cdn/cre8-wc.esm.js`), the compiled a2ui
  `render`/`registerCatalog`, `catalog.json`, and the spec.
- A tiny inline bootstrap renders on load. No network, no bridge — opens and prints anywhere.
- Filename `report-<dataset>-<date>.html`.

Frontend "Download HTML" button POSTs the spec, gets the blob, triggers `a.download`.

**Why two render paths:** in-app iframe uses the shared served runtime (cached, light
srcDoc); download uses a fully-inlined document for portability. Spec identical — only
the wrapper differs. Both funnel through one `assembleReportHtml(spec, { inline })`
helper (single source of truth for the HTML shell).

## Section 6 — Testing strategy

**Pure/unit (Vitest — studio):**
- `specToIframeSrcDoc()` — valid bootstrap HTML, references runtime URLs, contains the bridge.
- `assembleReportHtml(spec, {inline})` — both modes produce a single `<html>`; inline
  mode contains the CDN marker + catalog + spec; served mode references the routes.
- Canvas reducers — `addPanel`, `flagPanel`, `dedupeByActionDetail`,
  `buildExploreRequest(action, detail, context)`. Reuses `classifyHandler` for the
  local-vs-agent split.

**Unit (pytest — data-agent):**
- `query_dataset` — filter/group/aggregate/order/limit over a fixture; numeric
  aggregation, empty-result, bad-column handling.
- `list_datasets` — manifest shape.
- `build_explore_prompt(action, detail, context)` and `build_report_prompt(flagged)` —
  include dataset id, path, flagged titles; report branch lists each flagged viz;
  untrusted detail wrapped.
- Endpoint contract: `/api/explore` accepts the request model, rejects unknown dataset (422).

**Integration / live (the demo):** Docker stack + studio, drive `/explore` via Playwright:
1. Overview panel renders (iframe → real `<canvas>`).
2. Chart-click postMessage spawns a new panel.
3. "★" flags it; tray count increments.
4. "Generate report" renders a full-width report iframe with the flagged viz.
5. "Download HTML" returns a self-contained doc (contains CDN marker + spec, opens standalone).

**TDD order:** pure helpers → tools → wire the page → live E2E.

## Reuse from prior work (2026-06-07 interactive A2UI events)

- `ui-events.ts` (`classifyHandler`, `sortRows`, `buildUiEvent`) — the local-vs-agent
  dispatch split applies directly to iframe postMessage events.
- The `ui_event` / `build_agent_prompt` server contract is the template for
  `/api/explore`'s prompt builder.
- A2UI renderer + catalog + validation (`render`, `registerCatalog`, `validateSpec`)
  power the iframe runtime.
- Vitest setup in cre8-studio already exists.
