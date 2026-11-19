# @tmorrow/cre8-mcp

MCP server for the Cre8 design system. Gives an agent the component catalog for
[`@tmorrow/cre8-wc`](../cre8-wc) and `@tmorrow/cre8-react` — typed props, slots,
events, content models, composition data — plus streaming UI surfaces it can
build up over time.

## Use it

No install. Point any MCP client at the published package:

```json
{
  "mcpServers": {
    "cre8": {
      "command": "npx",
      "args": ["-y", "@tmorrow/cre8-mcp"]
    }
  }
}
```

That is the whole setup. `npx` fetches the package on first run and the server
speaks stdio, which is what MCP clients expect.

To run the checkout instead of the published package — which is what this
repository's own `.mcp.json` does — build first and point at the output:

```json
{ "command": "node", "args": ["packages/cre8-mcp/dist/index.js"] }
```

```sh
pnpm --filter @tmorrow/cre8-mcp build
```

## Tools

| | |
|---|---|
| `list_components`, `get_component`, `search_components` | The catalog. Every component with props, slots, events, and imports. `format: "react"` switches to `@tmorrow/cre8-react`. |
| `get_patterns` | Prebuilt compositions — login form, data table, page layout. |
| `generate_code` | A component tree as JSON in, HTML or JSX out. |
| `get_a2ui_catalog`, `validate_a2ui_spec` | The A2UI schema, and validation of a spec against it. |
| `get_content_model`, `get_composition`, `cre8_guide` | What goes inside a component, what is observed nesting inside it, and the prose guide. |
| `list_tokens` | The `--cre8-*` vocabulary by tier (seed, primitive, semantic, component, legacy), each with a "use for / never for" line from `design-tokens/schema/token-intents.json`. |
| `get_brand_contract`, `list_brands` | The `brand.json` schema with an authoring guide, and the brands this server has. |
| `validate_brand`, `apply_brand` | Schema + contrast check of a brand, and the generated CSS for it. `apply_brand { surface_id }` restyles a live surface in place. |
| `ui_open_surface`, `ui_stream`, `ui_get_surface`, `ui_events`, `ui_close_surface` | Streaming UI. See below. |

The brand tools call `design-tokens/tools/brand.mjs` from a cre8 source
checkout (set `CRE8_WC_ROOT`, or `CRE8_BRAND_MODULE` to the module itself); a
published `@tmorrow/cre8-wc` does not ship it, and those tools then say so.
`list_tokens`, `get_brand_contract` and `list_brands` still answer from JSON.

## Streaming surfaces over stdio

A surface is a live region of UI the agent builds up incrementally, viewed in a
browser. Surfaces live in the process that created them, and over stdio that
process serves no HTTP of its own — so the first `ui_open_surface` boots a
loopback viewer and returns a URL on it. Nothing to configure and no second
process to run; the URL is live for as long as the client keeps the server
alive.

Set `CRE8_MCP_PUBLIC_URL` to change the *advertised* origin without changing
what is bound, which is what you want behind a tunnel.

## HTTP

The same app also runs as a normal HTTP server, exposing MCP over Streamable
HTTP at `POST /mcp` alongside a REST view of the catalog and the surface API:

```sh
npx -y -p @tmorrow/cre8-mcp cre8-mcp-api      # defaults to 127.0.0.1:3001
```

The `Dockerfile` in this directory builds that server from the monorepo root,
and is the right shape for hosting it — the surface store is in-memory and SSE
holds a connection open, so it wants one long-lived process rather than
per-request instances.

| Variable | Effect |
|---|---|
| `PORT` | Listen port (default `3001`). |
| `CRE8_MCP_HOST` | Bind address. Loopback by default: `GET /surfaces` enumerates surface ids, and those ids are the viewer's only capability. |
| `CRE8_MCP_TOKEN` | Bearer token gating everything except `/health` and the viewer. Set it whenever the port is reachable. |
| `CRE8_MCP_TENANTS` | Per-tenant tokens and rate limits; see `src/tenants.ts`. Leaves the public catalog anonymous, keeps the surface API closed. |
| `CRE8_MCP_THEME` | Default brand token sheet for surfaces (default `cre8`). |
| `CRE8_WC_ROOT` | Point at a checkout of `@tmorrow/cre8-wc` to serve its assets instead of the installed copy's. |
| `CRE8_BRAND_MODULE` | Exact path to `brand.mjs` for the brand tools (default `<CRE8_WC_ROOT>/design-tokens/tools/brand.mjs`). |
| `CRE8_BRANDS_DIR` | Directory of `<name>/brand.json` brands (default `<cre8-wc>/design-tokens/brands`). |

## Develop

```sh
pnpm --filter @tmorrow/cre8-mcp build
pnpm --filter @tmorrow/cre8-mcp test
pnpm --filter @tmorrow/cre8-mcp dev:api
```
