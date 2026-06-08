import os, json
os.environ.setdefault("ANTHROPIC_API_KEY", "sentinel")

import pytest
from cre8_data_agent import tools


@pytest.mark.asyncio
async def test_list_datasets_tool():
    res = await tools.list_datasets_tool.handler({})
    text = res["content"][0]["text"]
    assert "ecommerce" in text


@pytest.mark.asyncio
async def test_query_dataset_tool_groups():
    res = await tools.query_dataset_tool.handler({
        "dataset": "ecommerce", "group_by": ["category"], "aggregate": {"revenue": "sum"},
    })
    data = json.loads(res["content"][0]["text"])
    assert isinstance(data, list)
    assert any("category" in r for r in data)


@pytest.mark.asyncio
async def test_query_dataset_tool_unknown():
    res = await tools.query_dataset_tool.handler({"dataset": "nope"})
    assert "error" in res["content"][0]["text"].lower()
