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


def test_explore_system_prompt_rules():
    from cre8_data_agent.explore_prompt import EXPLORE_SYSTEM_PROMPT as P
    assert "query_dataset" in P
    assert "render_ui" in P
    assert "agent:drilldown" in P
    assert "one" in P.lower()  # one visualization per call


def test_get_explore_options_uses_dataset_tools():
    from cre8_data_agent.agent import get_options
    opts = get_options(mode="explore")
    tools = opts.allowed_tools
    assert "mcp__data-tools__query_dataset" in tools
    assert "mcp__data-tools__list_datasets" in tools


def test_report_system_prompt_allows_multisection():
    from cre8_data_agent.explore_prompt import REPORT_SYSTEM_PROMPT as P
    # Report mode must NOT carry the "exactly one visualization" exploration constraint.
    assert "EXACTLY ONE focused visualization" not in P
    assert "render_ui" in P
    assert "report" in P.lower()


def test_get_report_options_distinct_from_explore():
    from cre8_data_agent.agent import get_options
    r = get_options(mode="report")
    e = get_options(mode="explore")
    assert r.system_prompt != e.system_prompt
    assert "mcp__data-tools__query_dataset" in r.allowed_tools
