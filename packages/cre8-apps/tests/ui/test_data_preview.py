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
    records = [{"label": str(i), "val": float(i)} for i in range(8)]
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

def test_chart_preview_html_empty_returns_empty():
    assert chart_preview_html([], title="T") == ""


def test_chart_preview_html_title_escaping():
    """XSS regression: title with special chars must be HTML-escaped in output."""
    import re
    records = [{"x": "a", "y": 1}]
    html = chart_preview_html(records, title='Sal"es & <Profits>')
    # The title attribute value must not contain raw double-quote
    m = re.search(r'<cre8-chart[^>]*\btitle="([^"]*)"', html)
    assert m is not None, "cre8-chart title attribute not found"
    assert '"' not in m.group(1)
    assert "&quot;" in html
    assert "&lt;" in html
    assert "&amp;" in html


def test_chart_preview_html_explicit_empty_y_keys():
    """y_keys=[] must be honored (no auto-fallback to numeric columns)."""
    records = [{"month": "Jan", "revenue": 100, "cost": 80}]
    html = chart_preview_html(records, y_keys=[])
    import json, re
    m = re.search(r"var data\s*=\s*(\{.*?\});", html, re.DOTALL)
    assert m is not None
    data = json.loads(m.group(1))
    assert data["datasets"] == []
