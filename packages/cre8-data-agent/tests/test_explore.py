import os
os.environ.setdefault("ANTHROPIC_API_KEY", "sentinel")

from cre8_data_agent.explore import build_explore_prompt, build_report_prompt


def test_explore_prompt_overview():
    out = build_explore_prompt("ecommerce", "overview", None, None)
    assert "ecommerce" in out
    assert "overview" in out.lower()


def test_explore_prompt_includes_path_and_detail():
    out = build_explore_prompt(
        "ecommerce", "drilldown", {"category": "Electronics"},
        {"path": ["overview", "category:Electronics"], "flagged": []},
    )
    assert "Electronics" in out
    assert "<ui_event>" in out
    assert "category:Electronics" in out


def test_explore_prompt_lists_flagged_to_avoid_repeats():
    out = build_explore_prompt(
        "ecommerce", "drilldown", {"region": "North"},
        {"path": ["overview"], "flagged": [{"title": "Revenue by category", "action": "overview", "detail": {}}]},
    )
    assert "Revenue by category" in out


def test_report_prompt_lists_each_flagged():
    out = build_report_prompt("ecommerce", [
        {"title": "Revenue by category", "action": "overview", "detail": {}},
        {"title": "Electronics by region", "action": "drilldown", "detail": {"category": "Electronics"}},
    ])
    assert "Revenue by category" in out
    assert "Electronics by region" in out
    assert "report" in out.lower()


def test_report_prompt_empty_flagged_still_valid():
    out = build_report_prompt("ecommerce", [])
    assert "ecommerce" in out
