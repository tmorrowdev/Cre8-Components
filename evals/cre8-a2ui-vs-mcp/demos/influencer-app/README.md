# Innovexa Creator Studio — single-generation demo

One trial of the combined arm (cre8-mcp + cre8-design skill), single attempt,
prompt: "build a social media marketing management app for an influencer".
Generated 2026-08-24 against @tmorrow/cre8-mcp 2.3.6 (before semantic
search_components shipped), claude-opus-5.

Result: reward 1.000, zero violations. 332 nodes, 43 distinct components,
max depth 13, 36 named slots - the densest slot usage of any generation in
the eval sessions - and no stray theme import, the first live confirmation
of the instruction.md theming rule.

`App.tsx` is the agent's code verbatim. `report.json` is the verifier's full
scoring report. To rebuild the page, drop App.tsx into
`tasks/mcp-freecode-portfolio/environment/app/src/` and `npx vite build` in
the task image.
