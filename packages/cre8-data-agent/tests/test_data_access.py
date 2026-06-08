import os
os.environ.setdefault("ANTHROPIC_API_KEY", "sentinel")

import pytest
from cre8_data_agent.data_access import list_datasets, query_dataset, UnknownDataset


def test_list_datasets_returns_manifest():
    out = list_datasets()
    ids = [d["id"] for d in out["datasets"]]
    assert "ecommerce" in ids


def test_query_unknown_dataset_raises():
    with pytest.raises(UnknownDataset):
        query_dataset("nope", select=["category"])


def test_query_select_columns():
    rows = query_dataset("ecommerce", select=["category", "revenue"], limit=3)
    assert len(rows) == 3
    assert set(rows[0].keys()) == {"category", "revenue"}


def test_query_where_filters():
    rows = query_dataset("ecommerce", select=["category"], where={"category": "Electronics"})
    assert all(r["category"] == "Electronics" for r in rows)
    assert len(rows) > 0


def test_query_group_by_with_aggregate():
    rows = query_dataset(
        "ecommerce", group_by=["category"], aggregate={"revenue": "sum"}
    )
    cats = {r["category"] for r in rows}
    assert cats == {"Electronics", "Apparel", "Home", "Toys"}
    assert all("revenue" in r for r in rows)


def test_query_order_by_desc_and_limit():
    rows = query_dataset(
        "ecommerce", group_by=["category"], aggregate={"revenue": "sum"},
        order_by=("revenue", "desc"), limit=2,
    )
    assert len(rows) == 2
    assert rows[0]["revenue"] >= rows[1]["revenue"]


def test_query_empty_result_is_empty_list():
    rows = query_dataset("ecommerce", select=["category"], where={"category": "Nonexistent"})
    assert rows == []
