#!/usr/bin/env python3
"""Regenerate the oracle fixtures this eval scores against.

Everything here is derived from the shipped library, never hand-written:

  catalog.compact.json  copied from packages/cre8-wc/a2ui - component names,
                        prop names, enum choices, slot names.
  inert-props.json      copied from packages/cre8-wc/a2ui - props the catalog
                        declares that never reach the DOM.
  containment.json      derived from packages/cre8-wc/a2ui/catalog-kg.json -
                        the CONTAINS edges of the knowledge graph cre8-mcp
                        itself serves, which the graph builds from component
                        stories, render templates and the authored a2ui
                        examples. Not synthesized from the naming rule:
                        cre8-mcp's own composition.ts documents why a
                        synthesized skeleton is confidently wrong.

Run via sync-oracle.sh, which also fans the fixtures out into each task's
tests/ directory (a Harbor task must be self-contained).
"""

import json
import sys
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).parent
REPO = HERE.parents[2]
A2UI = REPO / "packages" / "cre8-wc" / "a2ui"


def family_root(tag: str) -> str:
    """The family a tag belongs to: cre8-table-body and cre8-table-row are both
    cre8-table. Two segments is what the library's own naming rule uses."""
    return "-".join(tag.split("-")[:2])


def build_containment() -> dict:
    """Parent -> child nesting, and the subset of it that is safe to score.

    Read from the knowledge graph's CONTAINS edges - the same edges
    cre8-mcp's get_composition serves - so the oracle and the tool under test
    cannot disagree about what nests where. The graph draws those edges from
    every shipped artifact that demonstrates a nesting (component stories,
    component render templates, authored a2ui examples) and records which.

    Scoring every observed pair would punish legitimate layout freedom: nothing
    ever puts a cre8-alert inside a cre8-layout-container, but that says
    nothing about whether it may go there. So the scored relation is narrower
    - a *family child* is a component that in every observation appears under
    a parent from its own family (cre8-table-cell only ever under
    cre8-table-row). Those are the ones where a skipped level is a real defect,
    and they are exactly the case a2ui's own docs call the most error-prone
    thing an agent generates.
    """
    kg = json.loads((A2UI / "catalog-kg.json").read_text())
    children: dict[str, set] = defaultdict(set)
    slots: dict[str, dict[str, set]] = defaultdict(lambda: defaultdict(set))
    parents: dict[str, set] = defaultdict(set)
    evidence: dict[str, set] = defaultdict(set)

    for edge in kg["edges"]:
        if edge.get("rel") != "CONTAINS":
            continue
        parent, child, slot = edge["from"], edge["to"], edge.get("slot")
        if slot:
            slots[parent][slot].add(child)
        else:
            children[parent].add(child)
        parents[child].add(parent)
        for ev in edge.get("evidence") or []:
            evidence[f"{parent}>{child}"].add(ev["kind"])

    family_parents = {
        child: sorted(observed)
        for child, observed in sorted(parents.items())
        if child
        and observed
        and all(
            p and p != child and family_root(p) == family_root(child) for p in observed
        )
    }

    meta = kg.get("meta", {})
    return {
        "$comment": (
            "Derived from packages/cre8-wc/a2ui/catalog-kg.json CONTAINS edges - the "
            "same graph cre8-mcp serves. 'children' and 'slots' are the full observed "
            "nesting and are informational. 'family_parents' is the scored relation: "
            "a component that only ever appears under a parent from its own family, "
            "mapped to the parents it was observed under."
        ),
        "graph": {
            "library_version": meta.get("library_version"),
            "generated_from": meta.get("generated_from"),
            "graphify_commit": meta.get("graphify_commit"),
            "evidence": meta.get("evidence"),
        },
        "sources": list(meta.get("generated_from") or []),
        "children": {k: sorted(v) for k, v in sorted(children.items()) if k},
        "slots": {
            k: {s: sorted(c) for s, c in sorted(v.items())}
            for k, v in sorted(slots.items())
            if k
        },
        "family_parents": family_parents,
        "evidence_kinds": {k: sorted(v) for k, v in sorted(evidence.items())},
    }


def main() -> int:
    for name in ("catalog.compact.json", "inert-props.json"):
        src = A2UI / name
        if not src.exists():
            print(f"missing {src}", file=sys.stderr)
            return 1
        (HERE / name).write_text(src.read_text())
        print(f"copied {name}")

    containment = build_containment()
    (HERE / "containment.json").write_text(json.dumps(containment, indent=2) + "\n")
    print(
        f"built containment.json from catalog-kg.json "
        f"({len(containment['children']) + len(containment['slots'])} parents, "
        f"{len(containment['family_parents'])} scored family children)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
