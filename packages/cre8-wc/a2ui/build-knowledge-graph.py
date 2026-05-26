#!/usr/bin/env python3
"""
Build a knowledge graph from the cre8-wc a2ui catalog.json.

Outputs:
  catalog-kg.json     — queryable node/edge graph
  catalog.dot         — GraphViz source
  catalog.svg         — rendered SVG

Usage:
  cd packages/cre8-wc/a2ui
  python3 build-knowledge-graph.py
"""

import json
import os
import re
from pathlib import Path
import graphviz

# ── Config ────────────────────────────────────────────────────────────────────

HERE = Path(__file__).parent
CATALOG_PATH = HERE / "catalog.json"
KG_OUT = HERE / "catalog-kg.json"
DOT_OUT = HERE / "catalog"   # graphviz adds .dot / .svg extension

CATEGORY_COLORS = {
    "Actions":    ("#1565C0", "#E3F2FD"),  # blue
    "Data":       ("#2E7D32", "#E8F5E9"),  # green
    "Disclosure": ("#6A1B9A", "#F3E5F5"),  # purple
    "Feedback":   ("#E65100", "#FFF3E0"),  # orange
    "Forms":      ("#00838F", "#E0F7FA"),  # teal
    "Layout":     ("#37474F", "#ECEFF1"),  # slate
    "Marketing":  ("#AD1457", "#FCE4EC"),  # pink
    "Media":      ("#4527A0", "#EDE7F6"),  # indigo
    "Navigation": ("#558B2F", "#F9FBE7"),  # lime
    "Other":      ("#546E7A", "#F5F5F5"),  # grey
    "Typography": ("#4E342E", "#EFEBE9"),  # brown
}
DEFAULT_COLOR = ("#546E7A", "#F5F5F5")

# ── Load catalog ──────────────────────────────────────────────────────────────

with open(CATALOG_PATH) as f:
    catalog = json.load(f)

defs = catalog["$defs"]["components"]

# ── Build knowledge graph ─────────────────────────────────────────────────────

nodes: dict[str, dict] = {}
edges: list[dict] = []

def short(text: str, n: int = 90) -> str:
    text = re.sub(r"\s+", " ", text.strip())
    return text[:n] + "…" if len(text) > n else text

# Category nodes
all_cats: set[str] = set()
for comp_def in defs.values():
    all_cats.add(comp_def.get("x-category", "Other"))

for cat in sorted(all_cats):
    nodes[f"cat:{cat}"] = {"id": f"cat:{cat}", "type": "category", "label": cat}

# Component nodes
for name, comp_def in defs.items():
    cat = comp_def.get("x-category", "Other")
    desc = short(comp_def.get("description", ""), 120)
    props_raw = comp_def.get("properties", {}).get("props", {}).get("properties", {})
    slots_raw = comp_def.get("properties", {}).get("slots", {}).get("properties", {})
    has_children = "children" in comp_def.get("properties", {})

    props: dict[str, dict] = {}
    for pname, pdef in props_raw.items():
        props[pname] = {
            "type": pdef.get("type", "any"),
            "enum": pdef.get("enum"),
            "default": pdef.get("default"),
            "description": short(pdef.get("description", ""), 80),
            "x-kind": pdef.get("x-kind", "attribute"),
        }

    slot_names = list(slots_raw.keys())

    nodes[name] = {
        "id": name,
        "type": "component",
        "category": cat,
        "description": desc,
        "props": props,
        "slots": slot_names,
        "accepts_children": has_children,
    }

    edges.append({"from": name, "to": f"cat:{cat}", "rel": "BELONGS_TO"})

    for slot_name, slot_def in slots_raw.items():
        sid = f"slot:{name}:{slot_name}"
        nodes[sid] = {
            "id": sid,
            "type": "slot",
            "name": slot_name,
            "component": name,
            "description": short(slot_def.get("description", ""), 80),
        }
        edges.append({"from": name, "to": sid, "rel": "HAS_SLOT"})

    for pname, pdef in props_raw.items():
        if pdef.get("enum"):
            pid = f"prop:{name}:{pname}"
            nodes[pid] = {
                "id": pid,
                "type": "enum_prop",
                "name": pname,
                "component": name,
                "enum": pdef["enum"],
                "description": short(pdef.get("description", ""), 80),
            }
            edges.append({"from": name, "to": pid, "rel": "HAS_ENUM_PROP"})

# ── Write catalog-kg.json ─────────────────────────────────────────────────────

kg = {
    "meta": {
        "generated_from": "catalog.json",
        "catalog_id": catalog.get("x-a2ui", {}).get("catalogId"),
        "library": catalog.get("x-a2ui", {}).get("library"),
        "library_version": catalog.get("x-a2ui", {}).get("libraryVersion"),
        "total_nodes": len(nodes),
        "total_edges": len(edges),
    },
    "nodes": list(nodes.values()),
    "edges": edges,
}

with open(KG_OUT, "w") as f:
    json.dump(kg, f, indent=2)

print(f"[kg] {KG_OUT} — {len(nodes)} nodes, {len(edges)} edges")

# ── GraphViz visualization ────────────────────────────────────────────────────

def html_escape(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")

def prop_row(pname: str, pdef: dict) -> str:
    raw_type = pdef.get("type", "any")
    typ = " | ".join(raw_type) if isinstance(raw_type, list) else str(raw_type)
    enums = pdef.get("enum")
    if enums:
        val = " | ".join(html_escape(str(e)) for e in enums[:5])
        if len(enums) > 5:
            val += f" (+{len(enums) - 5})"
    else:
        val = html_escape(typ)
    return (
        f'<TR><TD ALIGN="LEFT" BGCOLOR="#FAFAFA"><FONT POINT-SIZE="9">'
        f'  {html_escape(pname)}</FONT></TD>'
        f'<TD ALIGN="LEFT" BGCOLOR="#FAFAFA"><FONT POINT-SIZE="8" COLOR="#666666">'
        f'{val}</FONT></TD></TR>'
    )

def component_label(name: str, node: dict) -> str:
    cat = node["category"]
    fg, bg = CATEGORY_COLORS.get(cat, DEFAULT_COLOR)
    props = node["props"]
    slots = node["slots"]
    has_ch = node["accepts_children"]

    # Header row
    badge_parts = []
    if has_ch:
        badge_parts.append("children")
    for s in slots:
        badge_parts.append(f"[{s}]")
    badge = "  " + " · ".join(badge_parts) if badge_parts else ""

    badge_html = (
        f'<FONT POINT-SIZE="8" COLOR="#888888">{html_escape(badge)}</FONT>'
        if badge else ""
    )
    rows = [
        f'<TR><TD COLSPAN="2" BGCOLOR="{bg}" ALIGN="LEFT">'
        f'<B><FONT COLOR="{fg}" POINT-SIZE="11">{html_escape(name)}</FONT></B>'
        f'{badge_html}'
        f'</TD></TR>'
    ]

    # Props (up to 6 most interesting)
    shown = list(props.items())[:6]
    for pname, pdef in shown:
        rows.append(prop_row(pname, pdef))
    if len(props) > 6:
        rows.append(
            f'<TR><TD COLSPAN="2" ALIGN="LEFT" BGCOLOR="#F5F5F5">'
            f'<FONT POINT-SIZE="8" COLOR="#999999">  +{len(props) - 6} more props</FONT>'
            f'</TD></TR>'
        )

    inner = "".join(rows)
    return f'<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="3">{inner}</TABLE>>'


# Build the graph
g = graphviz.Digraph(
    "cre8-wc",
    comment="cre8 Web Components Knowledge Graph",
    engine="fdp",  # force-directed — handles 85 nodes well
    graph_attr={
        "fontname": "Helvetica",
        "fontsize": "11",
        "rankdir": "LR",
        "splines": "ortho",
        "nodesep": "0.5",
        "ranksep": "1.5",
        "overlap": "false",
        "bgcolor": "#FFFFFF",
        "label": "cre8-wc Component Knowledge Graph",
        "labelloc": "t",
        "labelfontsize": "16",
    },
    node_attr={"fontname": "Helvetica", "shape": "none", "margin": "0"},
    edge_attr={"fontname": "Helvetica", "fontsize": "9"},
)

# One subgraph cluster per category
cat_comps: dict[str, list[str]] = {}
for name, node in nodes.items():
    if node["type"] == "component":
        cat = node["category"]
        cat_comps.setdefault(cat, []).append(name)

for cat in sorted(cat_comps):
    fg, bg = CATEGORY_COLORS.get(cat, DEFAULT_COLOR)
    with g.subgraph(name=f"cluster_{cat.replace(' ', '_')}") as c:
        c.attr(
            label=f"  {cat}  ",
            style="filled,rounded",
            fillcolor=bg,
            color=fg,
            penwidth="2",
            fontcolor=fg,
            fontsize="13",
            fontname="Helvetica-Bold",
        )
        for comp_name in sorted(cat_comps[cat]):
            node = nodes[comp_name]
            c.node(comp_name, label=component_label(comp_name, node))

# Slot edges (only for named slots — keeps graph readable)
for edge in edges:
    if edge["rel"] == "HAS_SLOT":
        slot_node = nodes[edge["to"]]
        g.edge(
            edge["from"],
            edge["to"],
            label=slot_node["name"],
            style="dashed",
            color="#9C27B0",
            fontcolor="#9C27B0",
            arrowhead="open",
        )
        # Add the slot node itself
        g.node(
            edge["to"],
            label=f'<<FONT POINT-SIZE="9" COLOR="#9C27B0">slot: {html_escape(slot_node["name"])}</FONT>>',
            shape="ellipse",
            style="filled,dashed",
            fillcolor="#F8E8FF",
            color="#9C27B0",
            margin="0.1,0.05",
        )

# Render
g.render(str(DOT_OUT), format="svg", cleanup=False)
print(f"[dot] {DOT_OUT}.dot")
print(f"[svg] {DOT_OUT}.svg")

# ── Query helpers printed to stdout ──────────────────────────────────────────
print("\n── Knowledge graph summary ──────────────────────────────────────")
comp_nodes = [n for n in nodes.values() if n["type"] == "component"]
print(f"  Components : {len(comp_nodes)}")
for cat in sorted(cat_comps):
    print(f"    {cat:15s} {len(cat_comps[cat])} components")
enum_props = [n for n in nodes.values() if n["type"] == "enum_prop"]
print(f"  Enum props : {len(enum_props)}")
slot_nodes = [n for n in nodes.values() if n["type"] == "slot"]
print(f"  Named slots: {len(slot_nodes)}")
print(f"  Total edges: {len(edges)}")
print()
print("Query with:  python3 -c \"")
print("  import json; kg=json.load(open('a2ui/catalog-kg.json'))")
print("  comps=[n for n in kg['nodes'] if n['type']=='component']")
print("  print([c['id'] for c in comps if c['category']=='Forms'])")
print("\"")
