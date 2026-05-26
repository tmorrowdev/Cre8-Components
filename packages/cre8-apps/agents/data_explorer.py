import json
from cre8_apps.ui.data_preview import chart_preview_html, detect_chartable


def extract_json_records(text: str) -> list[dict]:
    """Return the first JSON array of objects found in text, or []."""
    i = 0
    while i < len(text):
        start = text.find('[', i)
        if start == -1:
            break
        depth = 0
        j = start
        for j, ch in enumerate(text[start:], start):
            if ch == '[':
                depth += 1
            elif ch == ']':
                depth -= 1
                if depth == 0:
                    candidate = text[start:j + 1]
                    try:
                        parsed = json.loads(candidate)
                        if isinstance(parsed, list) and parsed and isinstance(parsed[0], dict):
                            return parsed
                    except json.JSONDecodeError:
                        pass
                    i = j + 1
                    break
        else:
            break
    return []


def build_chart_preview_event(records: list[dict]) -> dict | None:
    """Return a ui_preview SSE event dict, or None if records aren't chartable."""
    if not records or not detect_chartable(records):
        return None
    keys = list(records[0].keys())
    numeric_keys = [
        k for k in keys
        if isinstance(records[0].get(k), (int, float)) and not isinstance(records[0].get(k), bool)
    ]
    # Limit to first numeric column so datasets with different scales render cleanly
    y_keys = numeric_keys[:1] if numeric_keys else None
    html = chart_preview_html(records, title="Data Preview", y_keys=y_keys)
    return {"type": "ui_preview", "html": html}
