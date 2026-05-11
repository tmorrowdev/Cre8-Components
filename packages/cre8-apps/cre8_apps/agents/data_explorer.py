import json
import re
from cre8_apps.ui.data_preview import chart_preview_html, detect_chartable

_JSON_ARRAY_RE = re.compile(r'\[(\s*\{.*?\}\s*,?\s*)+\]', re.DOTALL)


def extract_json_records(text: str) -> list[dict]:
    """Return the first JSON array of objects found in text, or []."""
    for m in _JSON_ARRAY_RE.finditer(text):
        try:
            parsed = json.loads(m.group(0))
            if isinstance(parsed, list) and parsed and isinstance(parsed[0], dict):
                return parsed
        except json.JSONDecodeError:
            continue
    return []


def build_chart_preview_event(records: list[dict]) -> dict | None:
    """Return a ui_preview SSE event dict, or None if records aren't chartable."""
    if not records or not detect_chartable(records):
        return None
    html = chart_preview_html(records, title="Data Preview")
    return {"type": "ui_preview", "html": html}
