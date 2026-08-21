#!/usr/bin/env bash
# Get this checkout ready to run the eval, and refuse to pretend when it is not.
#
#   1. materialise the a2ui arm's input (the cre8-a2ui skill) into .arm-inputs/
#   2. confirm the oracle fixtures in each task match the shipped library
#   3. run the host-side selftest, which proves the scorer still discriminates
#   4. report on the tooling a real run needs (harbor, docker, npx)
set -uo pipefail

cd "$(dirname "$0")"
status=0
say () { printf '%s\n' "$*"; }

# 1. skill ---------------------------------------------------------------------
SKILL_PATH=${CRE8_A2UI_SKILL_PATH:-}
if [[ -z $SKILL_PATH ]]; then
    for candidate in \
        "$HOME/.claude/skills/synced/cre8-a2ui" \
        "$HOME/.claude/skills/cre8-a2ui" \
        "../../.claude/skills/cre8-a2ui"
    do
        [[ -f "$candidate/SKILL.md" ]] && { SKILL_PATH=$candidate; break; }
    done
fi

if [[ -n $SKILL_PATH && -f "$SKILL_PATH/SKILL.md" ]]; then
    rm -rf .arm-inputs/cre8-a2ui
    mkdir -p .arm-inputs
    cp -R "$SKILL_PATH" .arm-inputs/cre8-a2ui
    say "skill arm:    .arm-inputs/cre8-a2ui  <- $SKILL_PATH"
else
    say "skill arm:    NOT FOUND. Set CRE8_A2UI_SKILL_PATH to the cre8-a2ui skill"
    say "              directory (the one containing SKILL.md). arms/a2ui-skill.yaml"
    say "              and arms/all-arms.yaml cannot run until it resolves."
    status=1
fi

# 2. oracle --------------------------------------------------------------------
if ./sync-oracle.sh --check >/dev/null 2>&1; then
    say "oracle:       fixtures in sync with packages/cre8-wc/a2ui"
else
    say "oracle:       fixtures have drifted - run ./sync-oracle.sh and commit the result"
    status=1
fi

# 3. selftest ------------------------------------------------------------------
say ""
if ./selftest.sh; then
    say ""
    say "selftest:     pass"
else
    say ""
    say "selftest:     FAIL - the scorer no longer behaves as this eval claims"
    status=1
fi

# 4. tooling -------------------------------------------------------------------
say ""
for tool in harbor docker npx; do
    if command -v "$tool" >/dev/null 2>&1; then
        say "$tool: $(command -v "$tool")"
    else
        say "$tool: missing"
        [[ $tool == npx ]] || status=1
    fi
done
if command -v docker >/dev/null 2>&1 && ! docker info >/dev/null 2>&1; then
    say "docker: installed but not reachable - trials cannot start"
    status=1
elif command -v docker >/dev/null 2>&1; then
    # A reachable daemon is not enough: a network that blocks the registry
    # fails every trial at build time, 15 identical RuntimeErrors deep. Find
    # out here instead.
    base=$(sed -n 's/^FROM //p' templates/Dockerfile | head -1)
    if timeout 180 docker pull -q "$base" >/dev/null 2>&1; then
        say "base image: $base pulled"
    else
        say "base image: cannot pull $base - registry unreachable or blocked."
        say "            The daemon is up, but every trial will fail at build time."
        status=1
    fi
fi

exit $status
