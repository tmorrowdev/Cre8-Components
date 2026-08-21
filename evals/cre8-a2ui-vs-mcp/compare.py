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
"""

import argparse
import json
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
ARMS = ("baseline", "a2ui-skill", "cre8-mcp")


def arm_of(result: dict) -> str:
    agent = (result.get("config") or {}).get("agent") or {}
    if any(
        "cre8" in (server.get("name") or "") for server in agent.get("mcp_servers") or []
    ):
        return "cre8-mcp"
    if any("cre8-a2ui" in str(skill) for skill in agent.get("skills") or []):
        return "a2ui-skill"
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
                    "arm": arm_of(result),
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


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("jobs", nargs="*", type=Path, default=[Path("jobs")])
    parser.add_argument("--json", type=Path, help="Also write the comparison as JSON.")
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

    for trial in trials:
        arm, rewards, report = trial["arm"], trial["rewards"], trial["report"]
        counts[arm] += 1
        overall[(arm, trial["task"])].append(rewards.get("reward", 0.0))
        overall[(arm, "ALL")].append(rewards.get("reward", 0.0))
        for dimension in DIMENSIONS:
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
        for dimension in DIMENSIONS
    ]
    print(table(rows, ["dimension"] + list(arms)) + "\n")

    print("Per-dimension mean weighted by opportunities (hits / denominator)")
    rows = []
    for dimension in DIMENSIONS:
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
                arm: {d: mean(flat[(arm, d)]) for d in DIMENSIONS} for arm in arms
            },
            "weighted_means": {
                arm: {
                    d: {
                        "hits": weighted[(arm, d)][0],
                        "denominator": weighted[(arm, d)][1],
                    }
                    for d in DIMENSIONS
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
