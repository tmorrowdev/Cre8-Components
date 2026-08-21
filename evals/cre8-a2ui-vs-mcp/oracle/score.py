#!/usr/bin/env python3
"""Verifier entrypoint. Scores the agent's A2UI spec and writes the reward.

Run as `python3 /tests/score.py` from /tests/test.sh. Writes:

  /logs/verifier/reward.json   the reward dict Harbor reads
  /logs/verifier/report.json   denominators, hits, and every violation

The report is what makes the arms comparable: a dimension the task never
exercised scores 1.0, so compare.py weights each dimension by its denominator
rather than by the flat mean.

`--spec` and `--logs` exist so the same scorer can be run on the host against a
task's reference solution (see selftest.sh); the verifier itself passes neither.
"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from oracle import DIMENSIONS, Oracle, check_requirements, score_spec  # noqa: E402

TESTS_DIR = Path(__file__).parent


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--spec", type=Path, help="Spec to score. Defaults to the "
                        "output_path in expectations.json.")
    parser.add_argument("--logs", type=Path, default=Path("/logs/verifier"),
                        help="Directory to write reward.json and report.json into.")
    parser.add_argument("--expectations", type=Path,
                        default=TESTS_DIR / "expectations.json")
    args = parser.parse_args()

    expectations = json.loads(args.expectations.read_text())
    output_path = args.spec or Path(expectations["output_path"])
    oracle = Oracle(TESTS_DIR)

    LOGS_DIR = args.logs
    LOGS_DIR.mkdir(parents=True, exist_ok=True)

    rewards = {name: 0.0 for name in DIMENSIONS}
    rewards["spec_valid"] = 0.0
    report = {
        "task": expectations["task"],
        "library_version": oracle.library_version,
        "output_path": str(output_path),
    }

    if not output_path.exists():
        report["error"] = f"{output_path} was never written"
    else:
        try:
            spec = json.loads(output_path.read_text())
        except json.JSONDecodeError as exc:
            report["error"] = f"{output_path} is not valid JSON: {exc}"
        else:
            root = spec.get("root", spec) if isinstance(spec, dict) else spec
            if not isinstance(root, dict) or not root.get("component"):
                report["error"] = (
                    "spec has no root node: expected an object with a "
                    "'component' key, or an envelope with a 'root' node"
                )
            else:
                rewards["spec_valid"] = 1.0
                fidelity, detail = score_spec(spec, oracle)
                rewards.update(fidelity)
                completion, requirement_detail = check_requirements(
                    spec, expectations["requirements"]
                )
                rewards["task_completion"] = completion
                detail["denominators"]["task_completion"] = len(
                    expectations["requirements"]
                )
                detail["hits"]["task_completion"] = round(
                    completion * len(expectations["requirements"])
                )
                report.update(detail)
                report["requirements"] = requirement_detail

    rewards["reward"] = (
        sum(rewards[name] for name in DIMENSIONS) / len(DIMENSIONS)
        if rewards["spec_valid"]
        else 0.0
    )

    (LOGS_DIR / "reward.json").write_text(json.dumps(rewards, indent=2) + "\n")
    (LOGS_DIR / "report.json").write_text(json.dumps(report, indent=2) + "\n")

    width = max(len(name) for name in rewards)
    print(f"task: {report['task']}  (@tmorrow/cre8-wc {oracle.library_version})")
    if "error" in report:
        print(f"error: {report['error']}")
    for name, value in rewards.items():
        denominator = report.get("denominators", {}).get(name)
        suffix = "" if denominator is None else f"   (n={denominator})"
        print(f"  {name:<{width}}  {value:.3f}{suffix}")
    for dimension, entries in (report.get("violations") or {}).items():
        print(f"\n{dimension}: {len(entries)} violation(s)")
        for entry in entries[:12]:
            print(f"  {json.dumps(entry, sort_keys=True)}")
        if len(entries) > 12:
            print(f"  ... {len(entries) - 12} more")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
