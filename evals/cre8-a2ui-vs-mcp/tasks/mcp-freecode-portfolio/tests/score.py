#!/usr/bin/env python3
"""Verifier entrypoint for the freecode task. Renders /app/src/App.tsx for
real and scores the DOM it produces, instead of parsing a JSON file the
oracle/score.py that every A2UI task shares assumes.

Run as `python3 /tests/score.py` from /tests/test.sh (same contract as every
other task). Writes the same two files in the same shape:

  /logs/verifier/reward.json   the reward dict Harbor reads
  /logs/verifier/report.json   denominators, hits, and every violation

so compare.py and build-gallery.py need no changes to read this task's
results alongside the A2UI tasks' - same DIMENSIONS constant, same
score_spec()/check_requirements()/shape() from oracle.py, just fed a node
tree serialized from the live DOM (serialize-dom.mjs) instead of parsed
straight out of a file the agent wrote by hand.

There is no `--spec` host-side mode here the way oracle/score.py has one:
scoring this task means actually building and rendering the app, which needs
the installed node_modules that only exist inside the task container. Use
solve.sh + the container to selftest this one, not a bare host-side script.
"""

import json
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from oracle import DIMENSIONS, Oracle, check_requirements, score_spec, shape  # noqa: E402

TESTS_DIR = Path(__file__).parent
APP_DIR = Path("/app")


def main() -> int:
    expectations = json.loads((TESTS_DIR / "expectations.json").read_text())
    oracle = Oracle(TESTS_DIR)

    LOGS_DIR = Path("/logs/verifier")
    LOGS_DIR.mkdir(parents=True, exist_ok=True)

    rewards = {name: 0.0 for name in DIMENSIONS}
    rewards["spec_valid"] = 0.0
    report = {
        "task": expectations["task"],
        "library_version": oracle.library_version,
        "output_path": str(APP_DIR / "src" / "App.tsx"),
    }

    app_path = APP_DIR / "src" / "App.tsx"
    if not app_path.exists():
        report["error"] = f"{app_path} was never written"
    else:
        # jsdom/tsx live in /app/node_modules (declared as devDependencies of
        # the scaffolded app, installed at image build time). Node's ESM
        # resolver looks for bare imports relative to the *importing file's*
        # own location, not the process cwd - running serialize-dom.mjs
        # straight out of /tests would never find them, since /tests isn't
        # under /app. Copying it into /app first (rather than, say, setting
        # NODE_PATH) is what actually works: ESM resolution ignores NODE_PATH
        # entirely, by design, since Node 12.
        harness_copy = APP_DIR / ".verifier-serialize-dom.mjs"
        shutil.copy(TESTS_DIR / "serialize-dom.mjs", harness_copy)
        proc = subprocess.run(
            ["npx", "tsx", str(harness_copy),
             str(TESTS_DIR / "catalog.compact.json"), str(APP_DIR)],
            cwd=APP_DIR, capture_output=True, text=True, timeout=120,
        )
        harness_copy.unlink(missing_ok=True)
        if proc.returncode != 0:
            report["error"] = (
                f"render harness exited {proc.returncode}\n"
                f"stdout: {proc.stdout[-4000:]}\nstderr: {proc.stderr[-4000:]}"
            )
        else:
            try:
                result = json.loads(proc.stdout)
            except json.JSONDecodeError as exc:
                report["error"] = f"render harness produced non-JSON output: {exc}\n{proc.stdout[-4000:]}"
                result = None

            if result is not None and "error" in result:
                report["error"] = f"App.tsx did not render: {result['error']}"
            elif result is not None:
                spec = result
                root = spec.get("root", spec) if isinstance(spec, dict) else spec
                if not isinstance(root, dict) or not root.get("component"):
                    report["error"] = "rendered DOM produced no cre8-* root node"
                else:
                    rewards["spec_valid"] = 1.0
                    fidelity, detail = score_spec(spec, oracle)
                    rewards.update(fidelity)
                    requirements = expectations["requirements"]
                    if requirements:
                        completion, requirement_detail = check_requirements(spec, requirements)
                        rewards["task_completion"] = completion
                        detail["denominators"]["task_completion"] = len(requirements)
                        detail["hits"]["task_completion"] = round(completion * len(requirements))
                        report["requirements"] = requirement_detail
                    else:
                        rewards.pop("task_completion", None)
                        report["requirements"] = "open brief - no requirements to check"
                    report.update(detail)
                    report["shape"] = shape(spec, oracle)

    scored = [name for name in DIMENSIONS if name in rewards]
    rewards["reward"] = (
        sum(rewards[name] for name in scored) / len(scored)
        if rewards["spec_valid"] and scored
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
