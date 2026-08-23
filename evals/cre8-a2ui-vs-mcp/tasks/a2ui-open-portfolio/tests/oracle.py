"""Deterministic scoring of an A2UI spec against the shipped cre8-wc catalog.

Standard library only, on purpose: the verifier runs inside the task container
with no network and no package install, so a scoring bug can never be confused
with an install failure.

Every dimension is a fraction in [0, 1] with an explicit denominator. A
dimension with no opportunities scores 1.0 (vacuous truth) and reports its
denominator as 0, so `compare.py` can weight by opportunity count instead of
treating an untested dimension as a pass.
"""

import json
from pathlib import Path

DIMENSIONS = (
    "component_validity",
    "prop_validity",
    "enum_validity",
    "slot_validity",
    "containment",
    "inert_free",
    "task_completion",
)


class Oracle:
    """Ground truth about @tmorrow/cre8-wc, loaded from the fixture files."""

    def __init__(self, fixture_dir: Path):
        compact = json.loads((fixture_dir / "catalog.compact.json").read_text())
        self.library_version = compact.get("libraryVersion", "unknown")
        self.components = {c["name"]: c for c in compact["components"]}

        inert = json.loads((fixture_dir / "inert-props.json").read_text())
        self.inert = inert.get("components", {})

        containment = json.loads((fixture_dir / "containment.json").read_text())
        self.child_of = containment.get("children", {})
        self.slot_children = containment.get("slots", {})
        # The scored relation: components that only ever appear under a parent
        # from their own family, mapped to the parents they were observed under.
        self.family_parents = containment.get("family_parents", {})

    def props(self, component: str) -> dict:
        return self.components.get(component, {}).get("props", {}) or {}

    def slots(self, component: str) -> list:
        return self.components.get(component, {}).get("slots", []) or []

    def accepts_children(self, component: str) -> bool:
        return bool(self.components.get(component, {}).get("acceptsChildren"))

    def takes_free_content(self, component: str) -> bool:
        """Whether a spec may put content in `children` rather than a named slot.

        True for a component the catalog marks `acceptsChildren`, and for one
        that declares a `default` slot - the renderer appends free children with
        no slot attribute, which is exactly what the default slot collects.
        """
        return self.accepts_children(component) or "default" in self.slots(component)

    def is_inert(self, component: str, prop: str) -> bool:
        return prop in (self.inert.get(component) or {})


def iter_nodes(root):
    """Yield (node, parent_component, slot_name, path) for every spec node.

    `slot_name` is None when the node arrived through `children`. Bare strings
    are text content, not nodes, and are skipped.
    """
    stack = [(root, None, None, "$")]
    while stack:
        node, parent, slot, path = stack.pop()
        if not isinstance(node, dict):
            continue
        yield node, parent, slot, path
        component = node.get("component")
        for i, child in enumerate(node.get("children") or []):
            stack.append((child, component, None, f"{path}.children[{i}]"))
        for slot_name, items in (node.get("slots") or {}).items():
            for i, child in enumerate(items or []):
                stack.append(
                    (child, component, slot_name, f"{path}.slots.{slot_name}[{i}]")
                )


def collect_text(root) -> str:
    """All literal text in the spec: string children plus string prop values."""
    chunks = []
    for node, _parent, _slot, _path in iter_nodes(root):
        for child in node.get("children") or []:
            if isinstance(child, str):
                chunks.append(child)
        for value in (node.get("props") or {}).values():
            if isinstance(value, str):
                chunks.append(value)
    return "\n".join(chunks)


def _fraction(hits: int, total: int) -> float:
    return 1.0 if total == 0 else hits / total


def score_spec(spec, oracle: Oracle) -> dict:
    """Score the six catalog-fidelity dimensions and record every violation."""
    root = spec.get("root", spec) if isinstance(spec, dict) else spec

    counts = {name: [0, 0] for name in DIMENSIONS[:-1]}  # name -> [hits, total]
    violations = {name: [] for name in counts}

    def record(dimension, ok, detail):
        counts[dimension][1] += 1
        if ok:
            counts[dimension][0] += 1
        else:
            violations[dimension].append(detail)

    for node, parent, slot, path in iter_nodes(root):
        component = node.get("component")
        if not isinstance(component, str):
            record("component_validity", False, {"path": path, "component": component})
            continue

        known = component in oracle.components
        record("component_validity", known, {"path": path, "component": component})

        props = node.get("props") or {}
        if known:
            declared = oracle.props(component)
            for prop, value in props.items():
                valid = prop in declared
                record(
                    "prop_validity",
                    valid,
                    {"path": path, "component": component, "prop": prop},
                )
                record(
                    "inert_free",
                    not oracle.is_inert(component, prop),
                    {
                        "path": path,
                        "component": component,
                        "prop": prop,
                        "reason": (oracle.inert.get(component, {}).get(prop) or {}).get(
                            "reason"
                        ),
                    },
                )
                spec_prop = declared.get(prop) or {}
                choices = spec_prop.get("enum")
                if valid and choices and isinstance(value, (str, int, float, bool)):
                    record(
                        "enum_validity",
                        value in choices,
                        {
                            "path": path,
                            "component": component,
                            "prop": prop,
                            "value": value,
                            "allowed": choices,
                        },
                    )

            for slot_name in (node.get("slots") or {}):
                record(
                    "slot_validity",
                    slot_name in oracle.slots(component),
                    {
                        "path": path,
                        "component": component,
                        "slot": slot_name,
                        "declared": oracle.slots(component),
                    },
                )

            # The renderer appends `children` to the element without a slot
            # attribute, so free children land in the component's default slot.
            # That is fine wherever a default slot exists; it is an error only
            # when the component exposes named slots and no default one, where
            # the content has nowhere to land - the same class of failure as an
            # invented slot name.
            if node.get("children") and not oracle.takes_free_content(component):
                record(
                    "slot_validity",
                    False,
                    {
                        "path": path,
                        "component": component,
                        "slot": "children",
                        "declared": oracle.slots(component),
                        "reason": "component does not accept free children",
                    },
                )

        # Containment is scored only where the shipped examples are prescriptive:
        # a family child (cre8-table-cell, cre8-accordion-item, ...) must sit
        # under one of the parents it was observed under. Layout nesting the
        # examples merely never happen to show is not a violation.
        if component in oracle.family_parents:
            record(
                "containment",
                parent in oracle.family_parents[component],
                {
                    "path": path,
                    "component": component,
                    "parent": parent,
                    "observed_parents": oracle.family_parents[component],
                },
            )

    rewards = {name: _fraction(*counts[name]) for name in counts}
    report = {
        "denominators": {name: counts[name][1] for name in counts},
        "hits": {name: counts[name][0] for name in counts},
        "violations": {k: v for k, v in violations.items() if v},
    }
    return rewards, report


def shape(spec, oracle: Oracle) -> dict:
    """Descriptive stats about what the agent reached for.

    Deliberately *not* rewards. On an open brief there is no correct answer to
    score against, but how much of the library an agent touches, and how deeply
    it composes, is a fact about the spec that needs no taste to measure. A
    reader can decide whether more breadth is better; the eval only reports it.
    """
    root = spec.get("root", spec) if isinstance(spec, dict) else spec
    nodes = list(iter_nodes(root))
    used = [n.get("component") for n, _p, _s, _path in nodes if isinstance(n.get("component"), str)]
    real = [c for c in used if c in oracle.components]
    depth = max((path.count(".") for _n, _p, _s, path in nodes), default=0)
    slots_used = sum(len(n.get("slots") or {}) for n, _p, _s, _path in nodes)
    categories = {oracle.components[c].get("category") for c in real if c in oracle.components}
    return {
        "nodes": len(nodes),
        "distinct_components": len(set(used)),
        "distinct_real_components": len(set(real)),
        "catalog_breadth": round(len(set(real)) / len(oracle.components), 4),
        "categories_touched": len(categories),
        "max_depth": depth,
        "slots_used": slots_used,
        "text_chars": len(collect_text(root)),
    }


def check_requirements(spec, requirements) -> tuple:
    """Score the task's own semantic requirements. Returns (fraction, details)."""
    root = spec.get("root", spec) if isinstance(spec, dict) else spec
    nodes = [n for n, _p, _s, _path in iter_nodes(root)]
    used = [n.get("component") for n in nodes]
    text = collect_text(root).lower()

    details = []
    met = 0
    for requirement in requirements:
        kind = requirement["kind"]
        ok = False

        if kind == "component_present":
            ok = any(c in used for c in requirement["any_of"])
        elif kind == "min_count":
            ok = used.count(requirement["component"]) >= requirement["min"]
        elif kind == "text_present":
            ok = any(needle.lower() in text for needle in requirement["any_of"])
        elif kind == "prop_value":
            ok = any(
                node.get("component") == requirement["component"]
                and (node.get("props") or {}).get(requirement["prop"])
                == requirement["value"]
                for node in nodes
            )
        elif kind == "prop_present":
            ok = any(
                node.get("component") == requirement["component"]
                and requirement["prop"] in (node.get("props") or {})
                for node in nodes
            )
        elif kind == "nesting":
            ok = any(
                parent == requirement["parent"] and node.get("component") == requirement["child"]
                for node, parent, _slot, _path in iter_nodes(root)
            )
        else:
            raise ValueError(f"unknown requirement kind: {kind}")

        met += bool(ok)
        details.append({"id": requirement["id"], "met": bool(ok), "kind": kind})

    return _fraction(met, len(requirements)), details
