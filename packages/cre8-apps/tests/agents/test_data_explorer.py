from cre8_apps.agents.data_explorer import extract_json_records, build_chart_preview_event


# --- extract_json_records ---

def test_extract_finds_json_array_in_mixed_text():
    text = 'Here are the results:\n[{"name": "Alice", "score": 10}, {"name": "Bob", "score": 20}]\nDone.'
    result = extract_json_records(text)
    assert result == [{"name": "Alice", "score": 10}, {"name": "Bob", "score": 20}]


def test_extract_returns_empty_when_no_array():
    text = "No JSON here at all."
    assert extract_json_records(text) == []


def test_extract_returns_empty_for_array_of_non_dicts():
    text = "Numbers only: [1, 2, 3]"
    assert extract_json_records(text) == []


def test_extract_returns_first_array_when_multiple_present():
    text = '[{"a": 1}] and then [{"b": 2}, {"b": 3}]'
    result = extract_json_records(text)
    assert result == [{"a": 1}]


# --- build_chart_preview_event ---

def test_build_returns_none_for_empty_list():
    assert build_chart_preview_event([]) is None


def test_build_returns_none_for_non_chartable_records():
    # All string values — not chartable
    records = [{"name": "Alice", "role": "admin"}, {"name": "Bob", "role": "user"}]
    assert build_chart_preview_event(records) is None


def test_build_returns_ui_preview_dict_for_chartable_records():
    records = [
        {"month": "Jan", "revenue": 100},
        {"month": "Feb", "revenue": 200},
        {"month": "Mar", "revenue": 150},
        {"month": "Apr", "revenue": 300},
        {"month": "May", "revenue": 250},
        {"month": "Jun", "revenue": 400},
        {"month": "Jul", "revenue": 350},
    ]
    result = build_chart_preview_event(records)
    assert result is not None
    assert result["type"] == "ui_preview"
    assert "cre8-chart" in result["html"]


def test_extract_json_records_malformed_json():
    """Regex-matching but invalid JSON returns []."""
    text = "here: [{invalid json}]"
    assert extract_json_records(text) == []


def test_build_chart_preview_event_heterogeneous_records():
    """Heterogeneous records (None in numeric column) must not produce a chart if no consistent numeric column."""
    # All rows have None in the only numeric-ish column — not chartable
    records = [{"name": "Alice", "score": 99}, {"name": "Bob", "score": None}, {"name": "Carol", "score": "N/A"}]
    # score column: has a non-numeric string value — should not be chartable
    result = build_chart_preview_event(records)
    assert result is None
