import json
from pathlib import Path

_DATASETS_DIR = Path(__file__).parent / "datasets"


class UnknownDataset(Exception):
    pass


def _load_manifest() -> dict:
    return json.loads((_DATASETS_DIR / "manifest.json").read_text())


def list_datasets() -> dict:
    return _load_manifest()


def _load_rows(dataset: str) -> list[dict]:
    ids = {d["id"] for d in _load_manifest()["datasets"]}
    if dataset not in ids:
        raise UnknownDataset(dataset)
    return json.loads((_DATASETS_DIR / f"{dataset}.json").read_text())


def query_dataset(
    dataset: str,
    select: list[str] | None = None,
    where: dict | None = None,
    group_by: list[str] | None = None,
    aggregate: dict | None = None,
    order_by: tuple[str, str] | None = None,
    limit: int | None = None,
) -> list[dict]:
    rows = _load_rows(dataset)

    if where:
        rows = [r for r in rows if all(r.get(k) == v for k, v in where.items())]

    if group_by:
        agg = aggregate or {}
        groups: dict[tuple, list[dict]] = {}
        for r in rows:
            key = tuple(r.get(g) for g in group_by)
            groups.setdefault(key, []).append(r)
        out = []
        for key, members in groups.items():
            rec = dict(zip(group_by, key))
            for col, op in agg.items():
                vals = [m[col] for m in members if isinstance(m.get(col), (int, float))]
                if op == "sum":
                    rec[col] = round(sum(vals), 4)
                elif op == "avg":
                    rec[col] = round(sum(vals) / len(vals), 4) if vals else 0
                elif op == "count":
                    rec[col] = len(members)
                elif op == "max":
                    rec[col] = max(vals) if vals else None
                elif op == "min":
                    rec[col] = min(vals) if vals else None
            out.append(rec)
        rows = out

    if order_by:
        col, direction = order_by
        rows.sort(key=lambda r: (r.get(col) is None, r.get(col)), reverse=(direction == "desc"))

    if not group_by and select:
        rows = [{k: r.get(k) for k in select} for r in rows]

    if limit is not None:
        rows = rows[:limit]

    return rows
