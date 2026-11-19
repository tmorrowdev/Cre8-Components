# AGENTS.md

cre8 is an open-source design system. This is a pnpm monorepo; run `pnpm install`
at the root.

| Package | What it is |
|---|---|
| `packages/cre8-wc` | Lit web components, React wrappers, A2UI catalog, design tokens and brands. **Read [`packages/cre8-wc/AGENTS.md`](packages/cre8-wc/AGENTS.md) before changing UI, tokens or the catalog.** |
| `packages/cre8-mcp` | The MCP server agents use: catalog, composition, validation, brand/token tools, live UI surfaces. `pnpm --filter @tmorrow/cre8-mcp test` |

Where to look:

- **Knowledge base:** [`docs/kb/`](docs/kb/README.md). Route by intent with
  [`docs/kb/INTENT-MAP.md`](docs/kb/INTENT-MAP.md), or machine-readably with
  [`docs/kb/reference/intents.json`](docs/kb/reference/intents.json).
- **Theming:** [`docs/kb/03-token-theming.md`](docs/kb/03-token-theming.md). A
  brand is one `brand.json`; never write hex values in CSS.
- **Agent-generated UI:** [`docs/kb/04-a2ui.md`](docs/kb/04-a2ui.md) and
  [`docs/kb/08-streaming-ui.md`](docs/kb/08-streaming-ui.md).

Checks: `pnpm kb:check` (root, after editing `docs/kb`; regenerate references with
`pnpm kb:generate`), plus the per-package checks in each package's AGENTS.md.
