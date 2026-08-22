#!/usr/bin/env python3
"""Report what each arm costs to run, not just what it scores.

    python3 latency.py [jobs_dir ...]

Harbor records per-trial wall-clock and token usage; the eval's reward says
nothing about either. The MCP arm buys its fidelity with tool calls, and this
is where that shows up.
"""

import json
import statistics
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path

ARMS = ("baseline", "a2ui-skill", "cre8-mcp")


def arm_of(result):
    agent = (result.get("config") or {}).get("agent") or {}
    if any("cre8" in (s.get("name") or "") for s in agent.get("mcp_servers") or []):
        return "cre8-mcp"
    if any("cre8-a2ui" in str(s) for s in agent.get("skills") or []):
        return "a2ui-skill"
    return "baseline"


def mcp_version(result):
    agent = (result.get("config") or {}).get("agent") or {}
    for s in agent.get("mcp_servers") or []:
        for a in s.get("args") or []:
            if "cre8-mcp@" in a:
                return a.split("@")[-1]
    return None


def seconds(block):
    if not block or not block.get("started_at") or not block.get("finished_at"):
        return None
    fmt = lambda t: datetime.fromisoformat(t.replace("Z", "+00:00"))  # noqa: E731
    return (fmt(block["finished_at"]) - fmt(block["started_at"])).total_seconds()


def collect(roots):
    rows = defaultdict(list)
    for root in roots:
        for path in sorted(Path(root).rglob("result.json")):
            try:
                r = json.loads(path.read_text())
            except json.JSONDecodeError:
                continue
            if "task_name" not in r:
                continue
            if ((r.get("config") or {}).get("agent") or {}).get("name") != "claude-code":
                continue
            a = r.get("agent_result") or {}
            label = arm_of(r)
            version = mcp_version(r)
            if label == "cre8-mcp" and version:
                label = f"cre8-mcp {version}"
            rows[label].append(
                {
                    "agent_s": seconds(r.get("agent_execution")),
                    "total_s": seconds({"started_at": r.get("started_at"), "finished_at": r.get("finished_at")}),
                    "in_tok": a.get("n_input_tokens"),
                    "cache_tok": a.get("n_cache_tokens"),
                    "out_tok": a.get("n_output_tokens"),
                    "reward": ((r.get("verifier_result") or {}).get("rewards") or {}).get("reward"),
                }
            )
    return rows


def stat(values, fn=statistics.median):
    values = [v for v in values if v is not None]
    return fn(values) if values else None


def main():
    roots = sys.argv[1:] or ["jobs"]
    rows = collect(roots)
    if not rows:
        print(f"no trials under {roots}")
        return 1

    # claude-opus-5 list prices, $/MTok. Cache reads bill at ~0.1x input.
    IN_RATE, OUT_RATE, CACHE_RATE = 5.0, 25.0, 0.5

    def cost(row):
        if row["in_tok"] is None or row["out_tok"] is None:
            return None
        cached = row.get("cache_tok") or 0
        fresh = max(row["in_tok"] - cached, 0)
        return (fresh * IN_RATE + cached * CACHE_RATE + row["out_tok"] * OUT_RATE) / 1_000_000

    order = sorted(rows, key=lambda k: (not k.startswith("baseline"), k))
    print(f"{'arm':<18} {'n':>3} {'agent s':>9} {'p90 s':>7} {'input':>10} {'cached':>10} {'output':>8} {'$/trial':>8} {'reward':>7}")
    print("-" * 92)
    for label in order:
        r = rows[label]
        agent = [x["agent_s"] for x in r if x["agent_s"] is not None]
        p90 = sorted(agent)[int(len(agent) * 0.9) - 1] if len(agent) >= 2 else (agent[0] if agent else None)
        print(
            f"{label:<18} {len(r):>3} "
            f"{stat(agent):>9.1f} {p90:>7.1f} "
            f"{stat([x['in_tok'] for x in r]):>10,.0f} "
            f"{stat([x.get('cache_tok') for x in r]) or 0:>10,.0f} "
            f"{stat([x['out_tok'] for x in r]):>8,.0f} "
            f"{stat([cost(x) for x in r]):>8.2f} "
            f"{stat([x['reward'] for x in r]):>7.3f}"
        )

    base = [x["agent_s"] for x in rows.get("baseline", []) if x["agent_s"]]
    if base:
        print()
        for label in order:
            if label == "baseline":
                continue
            agent = [x["agent_s"] for x in rows[label] if x["agent_s"]]
            if agent:
                factor = statistics.median(agent) / statistics.median(base)
                print(f"  {label:<18} {factor:.2f}x the baseline's median agent time")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
