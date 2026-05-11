# Data Explorer Ragent + cre8-chart Preview Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Stream inline `cre8-chart` data previews from the Python backend to the stack-builder chat whenever a user message contains structured data.

**Architecture:** A new `data_explorer` module in `cre8-apps` detects JSON arrays in the user prompt, generates self-contained page-shell HTML using `cre8-chart`, and the server emits it as a `ui_preview` SSE event before running the normal agent pipeline. `stack-builder.tsx` renders `ui_preview` events as sandboxed `<iframe srcdoc>` elements inline in the chat thread.

**Tech Stack:** Python 3.12, FastAPI SSE, `cre8-chart` web component, Next.js 16 / React 19, TypeScript

---

## Task 1: Set up `cre8_apps/ui/` package and page-shell asset

**Files:**
- Create: `packages/cre8-apps/cre8_apps/ui/__init__.py`
- Create: `packages/cre8-apps/cre8_apps/ui/assets/page-shell.html`

**Step 1: Create the package init**

```bash
mkdir -p /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps/cre8_apps/ui/assets
touch /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps/cre8_apps/ui/__init__.py
```

**Step 2: Copy page-shell from cre8-mcp-ui skill**

```bash
cp /Users/tylersmbp/Projects/cre8-plugin/skills/cre8-mcp-ui/assets/page-shell.html \
   /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps/cre8_apps/ui/assets/page-shell.html
```

**Step 3: Verify the shell has the expected placeholders**

```bash
grep -c "{{title}}\|{{theme_css}}\|{{body}}" \
  /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps/cre8_apps/ui/assets/page-shell.html
```
Expected: `3`

**Step 4: Commit**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components
git add packages/cre8-apps/cre8_apps/ui/__init__.py \
        packages/cre8-apps/cre8_apps/ui/assets/page-shell.html
git commit -m "feat: add cre8_apps/ui package with page-shell asset"
```

---

## Task 2: `data_preview.py` — chart HTML generation

**Files:**
- Create: `packages/cre8-apps/cre8_apps/ui/data_preview.py`
- Create: `packages/cre8-apps/tests/ui/test_data_preview.py`

**Step 1: Write failing tests**

Create `packages/cre8-apps/tests/__init__.py` and `packages/cre8-apps/tests/ui/__init__.py` (empty), then:

```python
# packages/cre8-apps/tests/ui/test_data_preview.py
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parents[2]))

from cre8_apps.ui.data_preview import (
    detect_chart_type,
    detect_chartable,
    chart_preview_html,
)

def test_detect_chartable_true():
    records = [{"month": "Jan", "revenue": 1.2}, {"month": "Feb", "revenue": 1.5}]
    assert detect_chartable(records) is True

def test_detect_chartable_false_no_numeric():
    records = [{"name": "Alice"}, {"name": "Bob"}]
    assert detect_chartable(records) is False

def test_detect_chartable_empty():
    assert detect_chartable([]) is False

def test_detect_chart_type_bar():
    records = [{"label": "A", "val": 1}, {"label": "B", "val": 2}]
    assert detect_chart_type(records) == "bar"

def test_detect_chart_type_pie_small():
    records = [{"label": str(i), "val": float(i)} for i in range(4)]
    assert detect_chart_type(records) == "pie"

def test_chart_preview_html_contains_cre8_chart():
    records = [{"month": "Jan", "revenue": 1.2}, {"month": "Feb", "revenue": 1.5}]
    html = chart_preview_html(records, title="Test Chart")
    assert "<cre8-chart" in html
    assert "Test Chart" in html
    assert "<!doctype html>" in html.lower()

def test_chart_preview_html_contains_data():
    records = [{"label": "X", "value": 42.0}]
    html = chart_preview_html(records, title="T")
    assert "42.0" in html or "42" in html

def test_chart_preview_html_sets_js_property():
    records = [{"label": "X", "value": 1.0}]
    html = chart_preview_html(records, title="T")
    assert "el.data" in html
    assert "whenDefined" in html
```

**Step 2: Run tests to verify they fail**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps
python -m pytest tests/ui/test_data_preview.py -v 2>&1 | head -20
```
Expected: `ModuleNotFoundError` or similar — file doesn't exist yet.

**Step 3: Write `data_preview.py`**

```python
# packages/cre8-apps/cre8_apps/ui/data_preview.py
from __future__ import annotations

import json
from pathlib import Path

_SHELL_PATH = Path(__file__).parent / "assets" / "page-shell.html"
_SHELL: str | None = None


def _load_shell() -> str:
    global _SHELL
    if _SHELL is None:
        _SHELL = _SHELL_PATH.read_text(encoding="utf-8")
    return _SHELL


def _escape_text(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def detect_chartable(records: list[dict]) -> bool:
    """Return True if records contain at least one numeric column."""
    if not records:
        return False
    sample = records[0]
    return any(isinstance(v, (int, float)) for v in sample.values())


def detect_chart_type(records: list[dict]) -> str:
    """Heuristic chart type: pie for ≤6 rows, bar otherwise."""
    if len(records) <= 6:
        # Check if values look like parts of a whole (all positive)
        numeric_cols = [
            k for k, v in records[0].items() if isinstance(v, (int, float))
        ]
        if len(numeric_cols) == 1 and all(
            isinstance(r.get(numeric_cols[0]), (int, float)) and r[numeric_cols[0]] >= 0
            for r in records
        ):
            return "pie"
    return "bar"


def chart_preview_html(
    records: list[dict],
    *,
    title: str = "Data Preview",
    chart_type: str | None = None,
    x_key: str | None = None,
    y_keys: list[str] | None = None,
) -> str:
    """Return a full page-shell HTML string with an embedded cre8-chart."""
    if not records:
        return ""

    keys = list(records[0].keys())
    numeric_keys = [k for k in keys if isinstance(records[0][k], (int, float))]
    string_keys = [k for k in keys if not isinstance(records[0][k], (int, float))]

    resolved_x = x_key or (string_keys[0] if string_keys else keys[0])
    resolved_y = y_keys or numeric_keys or keys[1:]
    resolved_type = chart_type or detect_chart_type(records)

    labels = [str(r.get(resolved_x, "")) for r in records]
    datasets = [
        {
            "label": col,
            "data": [r.get(col, 0) for r in records],
        }
        for col in resolved_y
    ]
    chart_data = json.dumps({"labels": labels, "datasets": datasets})

    body = f"""<cre8-chart id="c" type="{resolved_type}" title="{_escape_text(title)}"></cre8-chart>
<script>
  (function(){{
    var el=document.getElementById('c');
    var data={chart_data};
    function init(){{el.data=data;}}
    customElements.get('cre8-chart')?init():customElements.whenDefined('cre8-chart').then(init);
  }})();
</script>"""

    shell = _load_shell()
    return (
        shell.replace("{{title}}", _escape_text(title))
             .replace("{{theme_css}}", "")
             .replace("{{body}}", body)
    )
```

**Step 4: Run tests to verify they pass**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps
python -m pytest tests/ui/test_data_preview.py -v
```
Expected: all 9 tests PASS.

**Step 5: Commit**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components
git add packages/cre8-apps/cre8_apps/ui/data_preview.py \
        packages/cre8-apps/tests/ui/test_data_preview.py \
        packages/cre8-apps/tests/__init__.py \
        packages/cre8-apps/tests/ui/__init__.py
git commit -m "feat: add data_preview.py with cre8-chart HTML generation"
```

---

## Task 3: `data_explorer.py` — data detection from prompt

**Files:**
- Create: `packages/cre8-apps/cre8_apps/ui/data_explorer.py`
- Create: `packages/cre8-apps/tests/ui/test_data_explorer.py`

**Step 1: Write failing tests**

```python
# packages/cre8-apps/tests/ui/test_data_explorer.py
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parents[2]))

from cre8_apps.ui.data_explorer import extract_json_records, build_chart_preview_event

def test_extract_json_records_inline_array():
    prompt = 'Show me: [{"month": "Jan", "revenue": 1.2}, {"month": "Feb", "revenue": 1.5}]'
    records = extract_json_records(prompt)
    assert records is not None
    assert len(records) == 2
    assert records[0]["month"] == "Jan"

def test_extract_json_records_no_data():
    assert extract_json_records("Just build me a dashboard") is None

def test_extract_json_records_non_array():
    assert extract_json_records('Here: {"key": "value"}') is None

def test_extract_json_records_non_chartable():
    # Array of strings — not chartable
    result = extract_json_records('["a", "b", "c"]')
    assert result is None

def test_build_chart_preview_event_returns_sse():
    records = [{"label": "X", "value": 42.0}]
    event = build_chart_preview_event(records, title="Test")
    assert event.startswith("event: ui_preview\n")
    assert '"type":"ui_preview"' in event or '"html"' in event

def test_build_chart_preview_event_contains_html():
    records = [{"month": "Jan", "revenue": 1.2}]
    event = build_chart_preview_event(records, title="Chart")
    assert "cre8-chart" in event
    assert "Chart" in event
```

**Step 2: Run to verify failure**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps
python -m pytest tests/ui/test_data_explorer.py -v 2>&1 | head -10
```
Expected: `ModuleNotFoundError`.

**Step 3: Write `data_explorer.py`**

```python
# packages/cre8-apps/cre8_apps/ui/data_explorer.py
from __future__ import annotations

import json
import re

from cre8_apps.ui.data_preview import chart_preview_html, detect_chartable


_JSON_ARRAY_RE = re.compile(r"\[[\s\S]*?\]", re.MULTILINE)


def extract_json_records(prompt: str) -> list[dict] | None:
    """Find the first JSON array of dicts in the prompt that is chartable."""
    for match in _JSON_ARRAY_RE.finditer(prompt):
        try:
            parsed = json.loads(match.group())
        except (json.JSONDecodeError, ValueError):
            continue
        if (
            isinstance(parsed, list)
            and parsed
            and isinstance(parsed[0], dict)
            and detect_chartable(parsed)
        ):
            return parsed
    return None


def build_chart_preview_event(records: list[dict], *, title: str = "Data Preview") -> str:
    """Return a fully-formed SSE string for a ui_preview event."""
    html = chart_preview_html(records, title=title)
    data = json.dumps({"type": "ui_preview", "html": html})
    return f"event: ui_preview\ndata: {data}\n\n"
```

**Step 4: Run tests to verify they pass**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps
python -m pytest tests/ui/test_data_explorer.py -v
```
Expected: all 6 tests PASS.

**Step 5: Commit**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components
git add packages/cre8-apps/cre8_apps/ui/data_explorer.py \
        packages/cre8-apps/tests/ui/test_data_explorer.py
git commit -m "feat: add data_explorer — JSON detection and SSE chart event builder"
```

---

## Task 4: Integrate into `server.py`

**Files:**
- Modify: `packages/cre8-apps/server.py`

The integration adds one call at the top of both `_stream_stack_first` and `_stream_stack_update`. If the prompt contains chartable JSON, a `ui_preview` SSE event is yielded before the agent pipeline runs.

**Step 1: Add the import at the top of `server.py`** (after the existing imports)

```python
from cre8_apps.ui.data_explorer import extract_json_records, build_chart_preview_event
```

**Step 2: Add detection block inside `_stream_stack_first`**

After the line `current_agent = ""` (line ~207 in the original), add:

```python
    # ── data preview ────────────────────────────────────────────────────────
    _records = extract_json_records(prompt)
    if _records:
        yield build_chart_preview_event(_records, title="Data Preview")
    # ────────────────────────────────────────────────────────────────────────
```

**Step 3: Add the same block inside `_stream_stack_update`**

After `yield sse("agent_start", ...)` (around line ~328), add:

```python
        # ── data preview ────────────────────────────────────────────────────
        _records = extract_json_records(prompt)
        if _records:
            yield build_chart_preview_event(_records, title="Data Preview")
        # ────────────────────────────────────────────────────────────────────
```

**Step 4: Smoke-test the server starts**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps
python -c "import server; print('OK')"
```
Expected: `OK` with no import errors.

**Step 5: Commit**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components
git add packages/cre8-apps/server.py
git commit -m "feat: emit ui_preview SSE event when prompt contains chartable JSON"
```

---

## Task 5: `stack-builder.tsx` — render `ui_preview` inline in chat

**Files:**
- Modify: `packages/cre8-studio/src/components/stack-builder.tsx`

**Step 1: Extend the `Message` type** (line 8)

Replace:
```ts
type Message = { role: "user" | "assistant"; text: string };
```
With:
```ts
type Message =
  | { role: "user" | "assistant"; kind?: "text"; text: string }
  | { role: "assistant"; kind: "chart"; html: string };
```

**Step 2: Add `appendChartPreview` callback** (after `appendAssistantText`, around line 29)

```ts
  const appendChartPreview = useCallback((html: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", kind: "chart", html },
    ]);
  }, []);
```

**Step 3: Add `ui_preview` case to the SSE switch** (after the `"error"` case, around line 97)

```ts
            case "ui_preview":
              appendChartPreview(String(data.html ?? ""));
              break;
```

**Step 4: Update the message render** (in the JSX, around line 117)

Replace the current message render block:
```tsx
          {messages.map((m, i) => (
            <div key={i} className={`stack-message stack-message--${m.role}`}>
              <span className="stack-message-role">{m.role === "user" ? "You" : "AI"}</span>
              <p className="stack-message-text">{m.text}</p>
            </div>
          ))}
```
With:
```tsx
          {messages.map((m, i) =>
            m.kind === "chart" ? (
              <div key={i} className="stack-message stack-message--assistant">
                <span className="stack-message-role">AI</span>
                <iframe
                  srcdoc={m.html}
                  style={{ width: "100%", height: 320, border: "none", borderRadius: 8, display: "block" }}
                  sandbox="allow-scripts"
                  title="Data preview"
                />
              </div>
            ) : (
              <div key={i} className={`stack-message stack-message--${m.role}`}>
                <span className="stack-message-role">{m.role === "user" ? "You" : "AI"}</span>
                <p className="stack-message-text">{m.text}</p>
              </div>
            )
          )}
```

**Step 5: Verify TypeScript compiles**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-studio
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors.

**Step 6: Commit**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components
git add packages/cre8-studio/src/components/stack-builder.tsx
git commit -m "feat: render ui_preview SSE events as inline chart iframes in stack chat"
```

---

## Task 6: End-to-end smoke test

**Step 1: Start the backend**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-apps
python server.py &
```

**Step 2: Send a test request with JSON data**

```bash
curl -sN -X POST http://localhost:8001/api/stack \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Visualize this: [{\"month\": \"Jan\", \"revenue\": 1.2}, {\"month\": \"Feb\", \"revenue\": 1.5}, {\"month\": \"Mar\", \"revenue\": 1.8}]"}' \
  | grep "event: ui_preview"
```
Expected: one line starting with `event: ui_preview`.

**Step 3: Verify HTML contains cre8-chart**

```bash
curl -sN -X POST http://localhost:8001/api/stack \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Chart: [{\"cat\": \"A\", \"val\": 10}, {\"cat\": \"B\", \"val\": 20}]"}' \
  | grep "ui_preview" | python3 -c "
import sys, json
line = sys.stdin.read()
data_str = line.split('data: ', 1)[1].strip()
d = json.loads(data_str)
print('cre8-chart' in d['html'])
"
```
Expected: `True`.

**Step 4: Start the studio and manually verify**

```bash
cd /Users/tylersmbp/Projects/cre8-web-components/packages/cre8-studio
pnpm dev
```
Open `http://localhost:3000/stack`, type a message with JSON data, and confirm a chart iframe appears inline in the chat.
