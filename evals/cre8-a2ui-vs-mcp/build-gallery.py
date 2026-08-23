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
import re
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).parent
REPO = HERE.parents[1]
WC = REPO / "packages" / "cre8-wc"

ARMS = ("baseline", "cre8-mcp", "cre8-mcp-design")
ARM_LABEL = {
    "baseline": "No knowledge",
    "cre8-mcp": "cre8-mcp server",
}
# Brands the picker offers, each as the stack of sheets to inline, in cascade
# order. No brand defines every token the components read, so a brand alone
# leaves gaps that show up as missing component chrome — cre8-vivid omits
# --cre8-badge-padding-*, which is why its tags render as bare text with no
# pill. Layering the library default underneath is also how a consumer applies
# a brand in a real app. cre8-vivid is derived from cre8-a2ui, so it stacks on
# that too, which takes it to 486/546 of the variables the components read —
# the most any brand reaches (the remaining 60 are component-level fallbacks
# no brand defines). Coverage is asserted at build time.
BRANDS = [
    {"id": "cre8-vivid", "label": "Vivid", "note": "the newest brand — indigo, semantic status ramp",
     "layers": ["cre8", "cre8-a2ui", "cre8-vivid"]},
    {"id": "cre8-a2ui", "label": "A2UI", "note": "the agent-facing brand, four-tier tokens",
     "layers": ["cre8", "cre8-a2ui"]},
    {"id": "minimalist", "label": "Minimalist", "note": "square edges, low chroma",
     "layers": ["cre8", "minimalist"]},
    {"id": "blue", "label": "Blue", "note": "cool primary", "layers": ["cre8", "blue"]},
    {"id": "cre8", "label": "Cre8", "note": "the library default", "layers": ["cre8"]},
    {"id": "legacy", "label": "Legacy", "note": "the previous look", "layers": ["cre8", "legacy"]},
]
DEFAULT_BRAND = "cre8-vivid"
# The floor is what the library's own default brand reaches: a stack that covers
# less than `cre8` does is missing component chrome somewhere. It is set here
# rather than computed so that a brand quietly losing tokens fails the build
# instead of lowering the bar. (cre8-vivid alone covers 479 and trips this;
# stacked on cre8 + cre8-a2ui it reaches 486.)
MIN_TOKEN_COVERAGE = 482

DIMENSIONS = (
    "component_validity",
    "prop_validity",
    "enum_validity",
    "slot_validity",
    "containment",
    "inert_free",
    "task_completion",
)


# Anchored on this eval's own job_name prefix. Matching any directory ending
# in "__<arm>" was too loose: jobs/ also held cre8-a2ui-open-portfolio__baseline
# and friends from an earlier run, and those merged straight into the current
# arms - baseline reported 30 trials for a run of 18, with two library
# versions averaged together.
JOB_DIR = re.compile(r"^cre8-a2ui-vs-mcp__(?P<arm>[a-z0-9-]+)$")


def arm_of(result: dict, result_path: Path) -> str:
    """Identify the arm from its job directory, as compare.py does.

    Config inference cannot separate arms that share an MCP server, so
    cre8-mcp-design would report as plain cre8-mcp and its trials would be
    drawn in the gallery under the arm it exists to be compared against.
    """
    for parent in result_path.parents:
        match = JOB_DIR.match(parent.name)
        if match and match.group("arm") in ARMS:
            return match.group("arm")
    agent = (result.get("config") or {}).get("agent") or {}
    if any("cre8" in (s.get("name") or "") for s in agent.get("mcp_servers") or []):
        return "cre8-mcp"
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
        trials[(task, arm_of(result, result_path))].append(
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
    # which would put ~1200 library variables on the document and let them bleed
    # into the chrome; custom properties inherit, so a class scope reaches every
    # component inside a frame just as well.
    #
    # A brand is two files and both are needed: tokens_brand.css carries colour
    # and shape, tokens_<id>.css carries typography. Inlining only the second is
    # a silent no-op, because the type is already shared.
    import re

    brands_dir = WC / "design-tokens" / "brands"
    used = set(re.findall(r"var\(\s*(--cre8-[a-zA-Z0-9-]+)", bundle))

    def sheets_for(brand_id: str) -> list[Path]:
        css = brands_dir / brand_id / "css"
        return [p for p in (css / "tokens_brand.css", css / f"tokens_{brand_id}.css") if p.exists()]

    tokens = []
    for brand in BRANDS:
        bid = brand["id"]
        # The default also answers to a bare .specimen, so a frame is styled
        # before any script runs.
        scope = f'.specimen[data-brand="{bid}"]'
        if bid == DEFAULT_BRAND:
            scope = f".specimen, {scope}"
        css = ""
        for layer in brand["layers"]:
            for sheet in sheets_for(layer):
                css += sheet.read_text()
        covered = len(used & set(re.findall(r"(--cre8-[a-zA-Z0-9-]+)\s*:", css)))
        if covered < MIN_TOKEN_COVERAGE:
            raise SystemExit(
                f"brand {bid} covers only {covered}/{len(used)} of the variables the "
                f"components read (minimum {MIN_TOKEN_COVERAGE}) — check its layer stack"
            )
        brand["coverage"] = f"{covered}/{len(used)}"
        tokens.append(f"\n/* ── brand: {bid} ({' + '.join(brand['layers'])}) ── */\n"
                      + css.replace(":root", scope))
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
