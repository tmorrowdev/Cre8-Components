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
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#x27;")
    )


def detect_chartable(records: list[dict]) -> bool:
    if not records:
        return False
    sample = records[0]
    return any(isinstance(v, (int, float)) for v in sample.values())


def detect_chart_type(records: list[dict]) -> str:
    if len(records) <= 6:
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
    if not records:
        return ""

    keys = list(records[0].keys())
    numeric_keys = [k for k in keys if isinstance(records[0][k], (int, float))]
    string_keys = [k for k in keys if not isinstance(records[0][k], (int, float))]

    resolved_x = x_key or (string_keys[0] if string_keys else keys[0])
    resolved_y = y_keys if y_keys is not None else (numeric_keys or keys[1:])
    resolved_type = chart_type or detect_chart_type(records)

    labels = [str(r.get(resolved_x, "")) for r in records]
    datasets = [
        {"label": col, "data": [r.get(col, 0) for r in records]}
        for col in resolved_y
    ]
    chart_data = json.dumps({"labels": labels, "datasets": datasets})

    body = (
        f'<cre8-chart id="c" type="{resolved_type}" title="{_escape_text(title)}"></cre8-chart>\n'
        f"<script>\n"
        f"  (function(){{\n"
        f"    var el=document.getElementById('c');\n"
        f"    var data={chart_data};\n"
        f"    function init(){{el.data=data;}}\n"
        f"    customElements.get('cre8-chart')?init():customElements.whenDefined('cre8-chart').then(init);\n"
        f"  }})();\n"
        f"</script>"
    )

    shell = _load_shell()
    return (
        shell.replace("{{title}}", _escape_text(title))
             .replace("{{theme_css}}", "")
             .replace("{{body}}", body)
    )
