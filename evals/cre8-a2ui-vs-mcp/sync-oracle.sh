#!/usr/bin/env bash
# Regenerate the oracle fixtures and fan them out into every task.
#
# A Harbor task has to be self-contained - only the task directory is uploaded
# to the environment - so each task carries its own copy of the fixtures and of
# the shared Dockerfile and test runner. This script is the single writer of
# those copies; `--check` fails if any copy has drifted - use it as a CI gate.
set -euo pipefail

cd "$(dirname "$0")"
CHECK=0
[[ "${1:-}" == "--check" ]] && CHECK=1

python3 oracle/build_oracle.py >/dev/null

SHARED=(oracle.py score.py catalog.compact.json inert-props.json containment.json)
status=0

copy() {
    local src=$1 dst=$2
    if [[ $CHECK -eq 1 ]]; then
        if ! cmp -s "$src" "$dst"; then
            echo "drifted: $dst"
            status=1
        fi
    else
        mkdir -p "$(dirname "$dst")"
        cp "$src" "$dst"
    fi
}

for task in tasks/*/; do
    [[ -f "$task/task.toml" ]] || continue
    # A task whose deliverable isn't A2UI JSON (e.g. a freecode task scored by
    # rendering real component code) needs its own Dockerfile and score.py -
    # the shared ones assume `ui.a2ui.json` at a fixed path. `.custom-harness`
    # opts a task out of having those two overwritten; it still gets the
    # catalog fixtures and test.sh like everyone else.
    if [[ ! -f "$task/.custom-harness" ]]; then
        copy templates/Dockerfile "$task/environment/Dockerfile"
        copy oracle/score.py "$task/tests/score.py"
    fi
    copy templates/ca/README.md "$task/environment/ca/README.md"
    copy templates/test.sh "$task/tests/test.sh"
    [[ $CHECK -eq 1 ]] || chmod +x "$task/tests/test.sh"
    for file in "${SHARED[@]}"; do
        [[ $file == score.py && -f "$task/.custom-harness" ]] && continue
        copy "oracle/$file" "$task/tests/$file"
    done
done

if [[ $CHECK -eq 1 ]]; then
    [[ $status -eq 0 ]] && echo "oracle fixtures are in sync"
    exit $status
fi
echo "synced oracle fixtures into $(ls -d tasks/*/ | wc -l | tr -d ' ') tasks"
