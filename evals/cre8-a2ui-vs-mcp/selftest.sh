#!/usr/bin/env bash
# Verify the scorer on the host, without Docker or an agent.
#
# Two claims, one per task:
#   1. the reference solution scores exactly 1.0 - the task is solvable and the
#      scorer does not penalise a correct spec;
#   2. a spec written strictly to the API the bundled cre8-a2ui skill documents
#      scores below 1.0 - the scorer separates "documented" from "shipped",
#      which is the whole measurement this eval exists to make.
#
# Fixtures under selftest/fixtures are copied from that skill's reference pages;
# nothing in them was invented here.
set -uo pipefail

cd "$(dirname "$0")"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
status=0

reward () {  # task_dir spec_path
    python3 "$1/tests/score.py" --spec "$2" \
        --expectations "$1/tests/expectations.json" --logs "$TMP/logs" >/dev/null 2>&1
    python3 -c "import json,sys; print(json.load(open('$TMP/logs/reward.json'))['reward'])"
}

printf '%-26s %-10s %-10s %s\n' TASK REFERENCE SKILL-DOC VERDICT
for task in tasks/*/; do
    name=$(basename "$task")
    ref=$(reward "$task" "$task/solution/ui.a2ui.json")
    # A task with no skill-documented fixture has no negative control - an open
    # brief has no single wrong answer to write one from. Report the reference
    # score and say so, rather than scoring a missing file as 0.000 and calling
    # it a pass.
    if [[ ! -f "selftest/fixtures/$name.json" ]]; then
        printf '%-26s %-10.3f %-10s %s\n' "$name" "$ref" "n/a" \
            "$(python3 -c "print('ok   no negative control (open brief)' if $ref > 0.999 else 'FAIL reference solution does not score 1.0')")"
        [[ $(python3 -c "print(1 if $ref < 0.999 else 0)") == 1 ]] && status=1
        continue
    fi
    doc=$(reward "$task" "selftest/fixtures/$name.json")
    verdict=$(python3 - "$ref" "$doc" <<'PY'
import sys
ref, doc = float(sys.argv[1]), float(sys.argv[2])
if ref < 0.999:
    print("FAIL reference solution does not score 1.0")
elif doc >= 0.999:
    print("FAIL skill-documented spec is indistinguishable")
else:
    print(f"ok   delta {ref - doc:+.3f}")
PY
)
    printf '%-26s %-10.3f %-10.3f %s\n' "$name" "$ref" "$doc" "$verdict"
    [[ $verdict == FAIL* ]] && status=1
done

exit $status
