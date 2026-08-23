#!/usr/bin/env python3
"""Turn Harbor trial results into the arm-vs-arm comparison this eval exists for.

Reads every `result.json` under the job directories given (default: ./jobs),
labels each trial by its arm from the agent config Harbor recorded, and reports:

  * the flat per-dimension mean, which is what Harbor's own metric reports;
  * the opportunity-weighted mean, which is the honest one - a dimension a trial
    never exercised scores a vacuous 1.0 in the reward, and weighting by each
    trial's denominator stops those from diluting the arms that did exercise it;
  * the per-task overall reward;
  * the violations behind the numbers, so a delta can be read as a cause.

Usage:
    python3 compare.py                      # every job under ./jobs
    python3 compare.py jobs/cre8-a2ui-vs-mcp
    python3 compare.py --json report.json
    python3 compare.py --markdown RESULTS.md
"""

import argparse
import json
import re
from collections import defaultdict
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
ARMS = (
    "baseline",
    "cre8-mcp",
    "cre8-mcp-design",
    "baseline-freecode",
    "cre8-mcp-freecode",
    "cre8-mcp-design-freecode",
)

# Harbor writes each arm's trials under jobs/<job_name>/, and every arm yaml
# sets job_name to "<eval>__<arm>". That name is the arm, exactly, so use it.
JOB_DIR = re.compile(r"__(?P<arm>[a-z0-9-]+)$")


def arm_of(result: dict, result_path: Path) -> str:
    """Identify the arm from the job directory, falling back to the config.

    Inferring from the config alone is not sufficient any more and silently
    merged arms that differ. Every MCP-bearing arm looks identical to it, so
    cre8-mcp-design-freecode - the MCP paired with the design skill, the whole
    point of that arm - collapsed into plain cre8-mcp; and the freecode
    baseline and skill arms merged into their A2UI namesakes despite running a
    different task family under different tool permissions. The job directory
    distinguishes all of them because the arm files already do.
    """
    for parent in result_path.parents:
        match = JOB_DIR.search(parent.name)
        if match and match.group("arm") in ARMS:
            return match.group("arm")

    agent = (result.get("config") or {}).get("agent") or {}
    if any(
        "cre8" in (server.get("name") or "") for server in agent.get("mcp_servers") or []
    ):
        return "cre8-mcp"
    return "baseline"


def load_trials(roots: list[Path]) -> list[dict]:
    trials = []
    for root in roots:
        for result_path in sorted(root.rglob("result.json")):
            try:
                result = json.loads(result_path.read_text())
            except json.JSONDecodeError:
                continue
            if "task_name" not in result:
                continue
            # The oracle agent copies solution/ and scores 1.000 by construction.
            # It belongs in a harness check, never in an arm's mean.
            if ((result.get("config") or {}).get("agent") or {}).get("name") != "claude-code":
                continue
            report_path = result_path.parent / "verifier" / "report.json"
            report = {}
            if report_path.exists():
                try:
                    report = json.loads(report_path.read_text())
                except json.JSONDecodeError:
                    pass
            trials.append(
                {
                    "task": result["task_name"],
                    "trial": result.get("trial_name", result_path.parent.name),
                    "arm": arm_of(result, result_path),
                    "rewards": (result.get("verifier_result") or {}).get("rewards") or {},
                    "report": report,
                }
            )
    return trials


def table(rows: list[list], headers: list[str]) -> str:
    widths = [
        max(len(str(headers[i])), *(len(str(row[i])) for row in rows)) if rows else len(headers[i])
        for i in range(len(headers))
    ]
    lines = ["  ".join(str(h).ljust(widths[i]) for i, h in enumerate(headers))]
    lines.append("  ".join("-" * w for w in widths))
    for row in rows:
        lines.append("  ".join(str(c).ljust(widths[i]) for i, c in enumerate(row)))
    return "\n".join(lines)


def fmt(value) -> str:
    return "-" if value is None else f"{value:.3f}"


def md_table(rows: list[list], headers: list[str]) -> str:
    lines = ["| " + " | ".join(str(h) for h in headers) + " |"]
    lines.append("|" + "|".join("---" for _ in headers) + "|")
    for row in rows:
        lines.append("| " + " | ".join(str(c) for c in row) + " |")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("jobs", nargs="*", type=Path, default=[Path("jobs")])
    parser.add_argument("--json", type=Path, help="Also write the comparison as JSON.")
    parser.add_argument(
        "--markdown",
        type=Path,
        help="Also write the comparison as a markdown report (e.g. RESULTS.md).",
    )
    args = parser.parse_args()

    roots = [p for p in args.jobs if p.exists()]
    if not roots:
        print(f"no job directories found: {[str(p) for p in args.jobs]}")
        return 1

    trials = load_trials(roots)
    if not trials:
        print(f"no trial results under {[str(p) for p in roots]}")
        return 1

    arms = [arm for arm in ARMS if any(t["arm"] == arm for t in trials)]
    tasks = sorted({t["task"] for t in trials})

    flat = defaultdict(list)  # (arm, dimension) -> [reward, ...]
    weighted = defaultdict(lambda: [0, 0])  # (arm, dimension) -> [hits, denominator]
    overall = defaultdict(list)  # (arm, task) -> [reward, ...]
    counts = defaultdict(int)
    violations = defaultdict(lambda: defaultdict(int))  # arm -> label -> n

    # A dimension no trial scored is absent, not zero: the open brief drops
    # task_completion because there is nothing to complete against, and
    # defaulting it to 0.0 would drag every arm's mean down by a seventh.
    present = {d for t in trials for d in DIMENSIONS if d in t["rewards"]}
    dimensions = [d for d in DIMENSIONS if d in present]

    for trial in trials:
        arm, rewards, report = trial["arm"], trial["rewards"], trial["report"]
        counts[arm] += 1
        overall[(arm, trial["task"])].append(rewards.get("reward", 0.0))
        overall[(arm, "ALL")].append(rewards.get("reward", 0.0))
        for dimension in dimensions:
            flat[(arm, dimension)].append(rewards.get(dimension, 0.0))
            hits = (report.get("hits") or {}).get(dimension)
            total = (report.get("denominators") or {}).get(dimension)
            if isinstance(hits, int) and isinstance(total, int):
                weighted[(arm, dimension)][0] += hits
                weighted[(arm, dimension)][1] += total
        for dimension, entries in (report.get("violations") or {}).items():
            for entry in entries:
                label = entry.get("component", "?")
                if entry.get("prop"):
                    label += f".{entry['prop']}"
                elif entry.get("slot"):
                    label += f" slot:{entry['slot']}"
                violations[arm][f"{dimension}  {label}"] += 1

    mean = lambda values: sum(values) / len(values) if values else None  # noqa: E731

    print(f"trials: {len(trials)}   " + "   ".join(f"{a}={counts[a]}" for a in arms))
    print(f"tasks:  {len(tasks)}\n")

    print("Overall reward by task")
    rows = [
        [task] + [fmt(mean(overall[(arm, task)])) for arm in arms]
        for task in tasks + ["ALL"]
    ]
    print(table(rows, ["task"] + list(arms)) + "\n")

    print("Per-dimension mean (flat, as Harbor reports it)")
    rows = [
        [dimension] + [fmt(mean(flat[(arm, dimension)])) for arm in arms]
        for dimension in dimensions
    ]
    print(table(rows, ["dimension"] + list(arms)) + "\n")

    print("Per-dimension mean weighted by opportunities (hits / denominator)")
    rows = []
    for dimension in dimensions:
        row = [dimension]
        for arm in arms:
            hits, total = weighted[(arm, dimension)]
            row.append(f"{hits / total:.3f} (n={total})" if total else "- (n=0)")
        rows.append(row)
    print(table(rows, ["dimension"] + list(arms)) + "\n")

    for arm in arms:
        top = sorted(violations[arm].items(), key=lambda kv: -kv[1])[:12]
        print(f"Top violations - {arm}")
        if not top:
            print("  (none)\n")
            continue
        print(table([[n, label] for label, n in top], ["n", "violation"]) + "\n")

    if args.markdown:
        doc = [
            "# Results: cre8-a2ui skill vs cre8-mcp",
            "",
            "Generated by `compare.py --markdown`. Every number below comes from "
            "`oracle/score.py`, which is deterministic, runs offline, and calls no "
            "model. Regenerate the ground truth it scores against with "
            "`./sync-oracle.sh`; re-derive these numbers with `./run-all.sh`.",
            "",
            f"Jobs read: {', '.join(str(r) for r in roots)}  ",
            f"Trials: {len(trials)} ("
            + ", ".join(f"{a}={counts[a]}" for a in arms)
            + f") over {len(tasks)} tasks",
            "",
            "## Overall reward by task",
            "",
            md_table(
                [
                    [task] + [fmt(mean(overall[(arm, task)])) for arm in arms]
                    for task in tasks + ["ALL"]
                ],
                ["task"] + list(arms),
            ),
            "",
            "## Per-dimension mean, weighted by opportunities",
            "",
            "Hits divided by denominator, summed across trials. This is the number "
            "to quote: a dimension a trial never exercised scores a vacuous 1.0 in "
            "the flat mean, and weighting removes that dilution.",
            "",
        ]
        rows = []
        for dimension in dimensions:
            row = [dimension]
            for arm in arms:
                hits, total = weighted[(arm, dimension)]
                row.append(f"{hits / total:.3f} (n={total})" if total else "– (n=0)")
            rows.append(row)
        doc += [md_table(rows, ["dimension"] + list(arms)), ""]
        doc += [
            "## Per-dimension mean, flat",
            "",
            "What Harbor's own metric reports, kept here so the two can be compared.",
            "",
            md_table(
                [
                    [d] + [fmt(mean(flat[(arm, d)])) for arm in arms]
                    for d in dimensions
                ],
                ["dimension"] + list(arms),
            ),
            "",
            "## What went wrong, counted",
            "",
        ]
        for arm in arms:
            top = sorted(violations[arm].items(), key=lambda kv: -kv[1])[:15]
            doc += [f"### {arm}", ""]
            doc += (
                [md_table([[n, f"`{label}`"] for label, n in top], ["n", "violation"])]
                if top
                else ["No violations recorded."]
            )
            doc += [""]
        args.markdown.write_text("\n".join(doc) + "\n")
        print(f"wrote {args.markdown}")

    if args.json:
        payload = {
            "arms": arms,
            "tasks": tasks,
            "trial_counts": dict(counts),
            "overall": {
                arm: {
                    task: mean(overall[(arm, task)]) for task in tasks + ["ALL"]
                }
                for arm in arms
            },
            "flat_means": {
                arm: {d: mean(flat[(arm, d)]) for d in dimensions} for arm in arms
            },
            "weighted_means": {
                arm: {
                    d: {
                        "hits": weighted[(arm, d)][0],
                        "denominator": weighted[(arm, d)][1],
                    }
                    for d in dimensions
                }
                for arm in arms
            },
            "violations": {arm: dict(violations[arm]) for arm in arms},
        }
        args.json.write_text(json.dumps(payload, indent=2) + "\n")
        print(f"wrote {args.json}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
