#!/usr/bin/env python3
"""Regenerate the oracle fixtures this eval scores against.

Everything here is derived from the shipped library, never hand-written:

  catalog.compact.json  copied from packages/cre8-wc/a2ui - component names,
                        prop names, enum choices, slot names.
  inert-props.json      copied from packages/cre8-wc/a2ui - props the catalog
                        declares that never reach the DOM.
  containment.json      derived from packages/cre8-wc/a2ui/examples/*.json -
                        parent -> child nesting as the authored, shipped specs
                        actually nest it. Not synthesized from the naming rule:
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

    Scoring every observed pair would punish legitimate layout freedom: the
    examples never put a cre8-alert inside a cre8-layout-container, but that
    says nothing about whether it may go there. So the scored relation is
    narrower - a *family child* is a component that in every shipped example
    appears under a parent from its own family (cre8-table-cell only ever under
    cre8-table-row). Those are the ones where a skipped level is a real defect,
    and they are exactly the case a2ui's own docs call the most error-prone
    thing an agent generates.
    """
    children: dict[str, set] = defaultdict(set)
    slots: dict[str, dict[str, set]] = defaultdict(lambda: defaultdict(set))
    parents: dict[str, set] = defaultdict(set)

    def walk(node):
        if not isinstance(node, dict):
            return
        parent = node.get("component")
        for child in node.get("children") or []:
            if isinstance(child, dict):
                children[parent].add(child.get("component"))
                parents[child.get("component")].add(parent)
                walk(child)
        for slot, items in (node.get("slots") or {}).items():
            for child in items or []:
                if isinstance(child, dict):
                    slots[parent][slot].add(child.get("component"))
                    parents[child.get("component")].add(parent)
                    walk(child)

    sources = sorted((A2UI / "examples").glob("*.json"))
    for path in sources:
        spec = json.loads(path.read_text())
        walk(spec.get("root", spec))

    family_parents = {
        child: sorted(observed)
        for child, observed in sorted(parents.items())
        if child
        and observed
        and all(
            p and p != child and family_root(p) == family_root(child) for p in observed
        )
    }

    return {
        "$comment": (
            "Derived from the authored specs under packages/cre8-wc/a2ui/examples. "
            "'children' and 'slots' are the full observed nesting and are "
            "informational. 'family_parents' is the scored relation: a component "
            "that only ever appears under a parent from its own family, mapped to "
            "the parents it was observed under."
        ),
        "sources": [p.name for p in sources],
        "children": {k: sorted(v) for k, v in sorted(children.items()) if k},
        "slots": {
            k: {s: sorted(c) for s, c in sorted(v.items())}
            for k, v in sorted(slots.items())
            if k
        },
        "family_parents": family_parents,
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
        f"built containment.json from {len(containment['sources'])} example specs "
        f"({len(containment['children'])} parents)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
