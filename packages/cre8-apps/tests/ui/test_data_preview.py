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
