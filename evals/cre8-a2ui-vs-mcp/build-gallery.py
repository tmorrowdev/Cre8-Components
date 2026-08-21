#!/usr/bin/env python3
"""Build a self-contained visual gallery of what each arm actually generated.

Reads the Harbor job directories, picks one trial per (task, arm), and emits a
single HTML file that renders every spec live with the real `@tmorrow/cre8-wc`
custom elements — the library bundle and its brand tokens are inlined, so the
page needs no network and can be published as an Artifact.

    python3 build-gallery.py [jobs_dir] -o gallery.html

The point is that a reward number says an arm scored 0.71 and shows you nothing;
this shows you the page that scored 0.71, next to the page that scored 1.00.
"""

import argparse
import json
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).parent
REPO = HERE.parents[1]
WC = REPO / "packages" / "cre8-wc"

ARMS = ("baseline", "a2ui-skill", "cre8-mcp")
ARM_LABEL = {
    "baseline": "No knowledge",
    "a2ui-skill": "cre8-a2ui skill",
    "cre8-mcp": "cre8-mcp server",
}
# Brands the picker offers. Each needs design-tokens/brands/<id>/css/tokens_<id>.css;
# three more brand directories exist but ship empty sheets, so they are left out.
BRANDS = [
    {"id": "minimalist", "label": "Minimalist", "note": "square edges, semantic status ramp"},
    {"id": "cre8-vivid", "label": "Vivid", "note": "indigo brand; tags lose their pill chrome"},
    {"id": "cre8-a2ui", "label": "A2UI", "note": "the agent-facing brand — success reads cyan"},
    {"id": "blue", "label": "Blue", "note": "cool primary"},
    {"id": "cre8", "label": "Cre8", "note": "the library default"},
    {"id": "legacy", "label": "Legacy", "note": "the previous look"},
]
DEFAULT_BRAND = "minimalist"

DIMENSIONS = (
    "component_validity",
    "prop_validity",
    "enum_validity",
    "slot_validity",
    "containment",
    "inert_free",
    "task_completion",
)


def arm_of(result: dict) -> str:
    agent = (result.get("config") or {}).get("agent") or {}
    if any("cre8" in (s.get("name") or "") for s in agent.get("mcp_servers") or []):
        return "cre8-mcp"
    if any("cre8-a2ui" in str(s) for s in agent.get("skills") or []):
        return "a2ui-skill"
    return "baseline"


def prop_kinds() -> dict:
    """{component: {prop: "property"|"attribute"}} — the renderer needs x-kind to
    decide between setAttribute and a property assignment."""
    catalog = json.loads((WC / "a2ui" / "catalog.json").read_text())
    out = {}
    for name, definition in catalog["$defs"]["components"].items():
        props = ((definition.get("properties") or {}).get("props") or {}).get(
            "properties"
        ) or {}
        kinds = {p: (s.get("x-kind") or "attribute") for p, s in props.items()}
        if kinds:
            out[name] = kinds
    return out


def collect(jobs_dir: Path) -> dict:
    trials = defaultdict(list)
    for result_path in sorted(jobs_dir.rglob("result.json")):
        try:
            result = json.loads(result_path.read_text())
        except json.JSONDecodeError:
            continue
        if "task_name" not in result:
            continue
        # Oracle trials copy the reference solution; they verify the harness,
        # they are not an arm.
        if ((result.get("config") or {}).get("agent") or {}).get("name") != "claude-code":
            continue
        trial_dir = result_path.parent
        spec_path = trial_dir / "artifacts" / "app" / "ui.a2ui.json"
        report_path = trial_dir / "verifier" / "report.json"
        spec = None
        if spec_path.exists():
            try:
                spec = json.loads(spec_path.read_text())
            except json.JSONDecodeError:
                spec = None
        report = {}
        if report_path.exists():
            try:
                report = json.loads(report_path.read_text())
            except json.JSONDecodeError:
                pass
        rewards = (result.get("verifier_result") or {}).get("rewards") or {}
        task = result["task_name"].split("/")[-1]
        trials[(task, arm_of(result))].append(
            {
                "trial": result.get("trial_name", trial_dir.name),
                "reward": rewards.get("reward", 0.0),
                "rewards": {d: rewards.get(d) for d in DIMENSIONS},
                "spec": spec,
                "violations": report.get("violations") or {},
                "denominators": report.get("denominators") or {},
            }
        )
    return trials


def pick(entries: list) -> dict | None:
    """The median trial by reward — not the best one. Showing an arm's luckiest
    attempt would misrepresent it in exactly the direction that flatters."""
    usable = [e for e in entries if e["spec"] is not None]
    if not usable:
        return None
    usable.sort(key=lambda e: e["reward"])
    return usable[len(usable) // 2]


def aggregate(trials: dict) -> dict:
    per_arm = {}
    for arm in ARMS:
        rows = [e for (task, a), lst in trials.items() if a == arm for e in lst]
        if not rows:
            continue
        weighted = {}
        for d in DIMENSIONS:
            hits = sum(
                round((e["rewards"].get(d) or 0) * (e["denominators"].get(d) or 0))
                for e in rows
            )
            total = sum(e["denominators"].get(d) or 0 for e in rows)
            weighted[d] = {"hits": hits, "total": total}
        per_arm[arm] = {
            "n": len(rows),
            "reward": sum(e["reward"] for e in rows) / len(rows),
            "weighted": weighted,
        }
    return per_arm


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("jobs", nargs="?", type=Path, default=HERE / "jobs")
    parser.add_argument("-o", "--output", type=Path, default=HERE / "gallery.html")
    args = parser.parse_args()

    trials = collect(args.jobs)
    if not trials:
        print(f"no trials under {args.jobs}")
        return 1

    tasks = sorted({task for task, _ in trials})
    gallery = {}
    for task in tasks:
        gallery[task] = {}
        for arm in ARMS:
            chosen = pick(trials.get((task, arm), []))
            if chosen:
                gallery[task][arm] = chosen

    payload = {
        "tasks": tasks,
        "arms": list(ARMS),
        "armLabels": ARM_LABEL,
        "dimensions": list(DIMENSIONS),
        "gallery": gallery,
        "aggregate": aggregate(trials),
        "brands": BRANDS,
        "defaultBrand": DEFAULT_BRAND,
        "propKinds": prop_kinds(),
        "trialCounts": {
            arm: sum(len(v) for (t, a), v in trials.items() if a == arm) for arm in ARMS
        },
    }

    bundle = (WC / "cdn" / "cre8-wc.esm.js").read_text()
    # The map file is not shipped with the page; the reference would 404.
    bundle = bundle.replace("//# sourceMappingURL=cre8-wc.esm.js.map", "")

    # Brand sheets, scoped to the specimen frames. They are authored at :root,
    # which would put ~1000 library variables on the document and let them bleed
    # into the chrome; custom properties inherit, so a class scope reaches every
    # component inside a frame just as well.
    #
    # A brand is two files, and both are needed: tokens_brand.css carries colour
    # and shape (~485 variables), tokens_<id>.css carries typography. Inlining
    # only the second one is a silent no-op — the type is already the same, so
    # the frames render identically and nothing looks broken.
    brands_dir = WC / "design-tokens" / "brands"
    tokens = []
    for brand in BRANDS:
        bid = brand["id"]
        # The default also answers to a bare .specimen, so a frame is styled
        # before any script runs.
        scope = f'.specimen[data-brand="{bid}"]'
        if bid == DEFAULT_BRAND:
            scope = f'.specimen, {scope}'
        parts = []
        for sheet in (brands_dir / bid / "css" / "tokens_brand.css",
                      brands_dir / bid / "css" / f"tokens_{bid}.css"):
            if sheet.exists():
                parts.append(sheet.read_text().replace(":root", scope))
        tokens.append(f"\n/* ── brand: {bid} ── */\n" + "\n".join(parts))
    tokens = "\n".join(tokens)

    html = (HERE / "gallery-template.html").read_text()
    html = html.replace("/*__TOKENS__*/", tokens)
    html = html.replace("/*__DATA__*/", json.dumps(payload))
    html = html.replace("/*__BUNDLE__*/", bundle)
    args.output.write_text(html)

    size_mb = args.output.stat().st_size / 1_000_000
    rendered = sum(len(v) for v in gallery.values())
    print(f"wrote {args.output} ({size_mb:.1f} MB) — {rendered} specs across {len(tasks)} tasks")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
