# Data Explorer Ragent + cre8-chart Preview Design

**Date:** 2026-05-11  
**Scope:** `cre8-apps` (Python ADK backend) + `cre8-studio` (Next.js frontend)

## Problem

The existing agent pipeline (orchestrator → ui_designer → code_generator) generates A2UI schemas without grounding in real data. When a user's request involves structured data — uploaded JSON, MCP tool results — there's no exploration step and no visual preview before UI generation begins.

## Solution

Add a **data explorer ragent** as a mandatory first step in the orchestration pipeline whenever the request involves structured data. The ragent explores the data, emits chart previews inline in the chat, and returns a findings object that the ui_designer uses as context when generating the A2UI schema.

---

## Architecture

```
User prompt (with data context or MCP tool results)
        │
        ▼
┌─────────────────────┐
│     orchestrator    │  ← detects data intent
└────────┬────────────┘
         │ runs first
         ▼
┌─────────────────────┐        SSE: { type: "ui_preview", html: "..." }
│   data_explorer     │  ──────────────────────────────────────────────▶  chat iframe
│     (ragent)        │
└────────┬────────────┘
         │ returns DataFindings
         ▼
┌─────────────────────┐
│     ui_designer     │  ← A2UI schema grounded in real data
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   code_generator    │
└─────────────────────┘
```

---

## Components

### 1. `cre8_apps/ui/data_preview.py` (new)

Utility for generating self-contained chart HTML. Copied dependencies from `cre8-mcp-ui` skill:
- `cre8_apps/ui/build_ui_resource.py` — `wrap_in_shell()`, `_render_node()`, HTML escaping
- `cre8_apps/ui/assets/page-shell.html` — cre8-wc CDN + postMessage bridge

**Public API:**

```python
def chart_preview_html(
    records: list[dict],
    *,
    title: str = "Data Preview",
    chart_type: str | None = None,   # None = auto-detect
    x_key: str | None = None,        # column to use as labels
    y_keys: list[str] | None = None, # columns to plot as datasets
) -> str:
    """Returns a full page-shell HTML string with an embedded cre8-chart."""

def detect_chart_type(records: list[dict]) -> str:
    """Heuristic: 'pie' for ≤6 rows summing to whole, 'line' for time-series,
    'bar' otherwise."""
```

**Chart body pattern** (matches `cre8-mcp-ui` skill's `chart-patterns.md`):
```html
<cre8-chart id="c" type="bar" title="..."></cre8-chart>
<script>
  (function(){
    var el = document.getElementById('c');
    var data = {...};
    function init(){ el.data = data; }
    customElements.get('cre8-chart') ? init()
      : customElements.whenDefined('cre8-chart').then(init);
  })();
</script>
```

**No new Python dependencies** — `json` stdlib only.

---

### 2. `cre8_apps/agents/data_explorer.py` (new)

Google ADK agent with focused data exploration system prompt.

**System prompt responsibilities:**
- Identify the most useful chart type and axes from in-context data
- Produce a structured `DataFindings` summary (column names, row count, key metrics, recommended chart type)
- Call `emit_chart_preview` to stream the chart to the frontend
- Return `DataFindings` to the orchestrator

**Tools available to this agent:**
- `emit_chart_preview(records, title, chart_type)` — calls `chart_preview_html()`, emits SSE `ui_preview` event, returns confirmation
- All MCP tools configured in the agent's session (passed through from orchestrator)

**Return schema (`DataFindings`):**
```python
@dataclass
class DataFindings:
    row_count: int
    columns: list[str]
    numeric_columns: list[str]
    sample: list[dict]          # first 3 rows
    chart_type: str             # what was rendered
    summary: str                # 1-2 sentence natural language summary
```

---

### 3. Orchestrator change (`cre8_apps/agents/orchestrator.py`)

Add intent classification: if the request contains structured data (detected by presence of JSON arrays, tabular content, or MCP tool calls returning records), route through `data_explorer` first.

```python
findings = None
if is_data_request(user_message, context):
    findings = await data_explorer.run(user_message, context)

ui_context = build_ui_context(user_message, findings)
schema = await ui_designer.run(ui_context)
```

`is_data_request()` checks for: JSON arrays in message, CSV-shaped text, explicit data words ("chart", "table", "query", "results", "rows", "dataset").

---

### 4. `stack-builder.tsx` change

Add `ui_preview` branch to the SSE event parser:

```tsx
if (event.type === 'ui_preview') {
  appendMessage({
    role: 'assistant',
    content: event.html,
    type: 'ui_preview',          // new message type
  });
}
```

Render in the message thread:

```tsx
{message.type === 'ui_preview' ? (
  <iframe
    srcdoc={message.content}
    style={{ width: '100%', height: 320, border: 'none', borderRadius: 8 }}
    sandbox="allow-scripts"
    title="Data preview"
  />
) : (
  <p>{message.content}</p>
)}
```

---

## Data flow (end-to-end)

1. User sends: *"Build a dashboard for this sales data: [{ month: 'Jan', revenue: 1.2 }, ...]"*
2. Orchestrator detects JSON array in message → `is_data_request = true`
3. `data_explorer` runs:
   - Parses the records, detects `bar` chart (monthly categories, single numeric)
   - Calls `emit_chart_preview` → emits SSE `{ type: "ui_preview", html: "..." }`
   - Frontend renders iframe inline in chat — user sees the chart immediately
   - Returns `DataFindings(row_count=12, columns=['month','revenue'], chart_type='bar', summary='Monthly revenue data...')`
4. Orchestrator passes findings to `ui_designer`
5. `ui_designer` generates A2UI schema with `cre8-stat`, `cre8-chart`, `cre8-grid` using actual column names and value ranges
6. Final component preview appears in the preview panel

---

## Files to create / modify

| File | Action |
|------|--------|
| `packages/cre8-apps/cre8_apps/ui/__init__.py` | Create (empty) |
| `packages/cre8-apps/cre8_apps/ui/data_preview.py` | Create |
| `packages/cre8-apps/cre8_apps/ui/build_ui_resource.py` | Copy from cre8-mcp-ui skill |
| `packages/cre8-apps/cre8_apps/ui/assets/page-shell.html` | Copy from cre8-mcp-ui skill |
| `packages/cre8-apps/cre8_apps/agents/data_explorer.py` | Create |
| `packages/cre8-apps/cre8_apps/agents/orchestrator.py` | Modify — add ragent routing |
| `packages/cre8-studio/src/components/stack-builder.tsx` | Modify — add ui_preview SSE branch + iframe render |

---

## Out of scope

- Supabase live queries (ragent works with in-context data only for now)
- Interactive chart callbacks (`data-click` → MCP tool) in the preview iframe
- Persisting chart previews across sessions
