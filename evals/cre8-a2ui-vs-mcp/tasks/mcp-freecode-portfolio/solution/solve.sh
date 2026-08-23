#!/bin/bash
# There is no reference solution for an open brief: any component built from
# real ones is a valid answer, so the oracle agent only demonstrates that the
# harness runs. It writes a real, working App.tsx built entirely out of real
# @tmorrow/cre8-react components - proof the render+DOM-audit path can score
# 1.000, not just parse a JSON file.
set -euo pipefail
cp /solution/App.tsx /app/src/App.tsx
