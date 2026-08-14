# Deploying cre8-mcp

Two supported targets. They run the same Hono app (`src/app.ts`) and expose the
same routes — `/mcp`, the REST catalog, and the streaming-surface API.

| | Vercel | Docker (`Dockerfile`) |
|---|---|---|
| Process model | serverless, per-request | one long-lived process |
| Streaming surfaces | not reliable (see below) | fully supported |
| Setup | connect the repo | `docker build` from the monorepo root |

## Vercel

The project is a **separate Vercel project with Root Directory
`packages/cre8-mcp`**, git-connected to this repository. Configuration lives in
`packages/cre8-mcp/vercel.json`; the root `vercel.json` belongs to the Storybook
project and is not used here.

What the config does:

- **Install** runs from the monorepo root with `--filter @tmorrow/cre8-mcp...`,
  so the workspace dependency on `@tmorrow/cre8-wc` resolves without building
  every other package.
- **Build** runs `tsc`, then `scripts/vendor-cre8-wc.mjs`, which replaces the
  pnpm symlink at `node_modules/@tmorrow/cre8-wc` with a real directory holding
  `a2ui/`, `cdn/`, `design-tokens/`, and the two manifests. Both halves matter:
  Vercel's `includeFiles` globs do not walk symlinks, and the server reads most
  of those files through paths it computes at runtime, which no dependency
  tracer can follow.
- **`api/index.js`** is the function. It is `app.fetch` behind `hono/vercel`,
  with a rewrite sending every path to it, so no `/api` prefix appears in the
  routes an agent calls.

### Environment variables

None are required — an unconfigured deployment is a public, read-only catalog
server.

| Variable | Effect |
|---|---|
| `CRE8_MCP_TOKEN` | Single bearer token gating everything except `/health` and the surface viewer. **Set this if the deployment is not meant to be public** — without it `GET /surfaces` enumerates every live surface id, and those ids are the viewer's only capability. |
| `CRE8_MCP_TENANTS` | Per-tenant tokens and rate limits; see `src/tenants.ts`. Leaves the catalog anonymous and rate-limited, closes the surface API. |
| `CRE8_MCP_PUBLIC_URL` | Base URL used to build viewer links. Defaults to the Vercel production hostname, so set it only for a custom domain. |
| `CRE8_MCP_THEME` | Default brand token sheet for surfaces (default `cre8`). |

### The serverless caveat

Surfaces live in memory in a single process (`src/surfaces.ts`), and SSE holds a
connection open. Neither survives being spread across lambda invocations: a
surface created by one request may not exist for the next, and
`GET /surfaces/:id/stream` is cut off at the function timeout. Everything
stateless — the `/mcp` tool surface, the component catalog, `/guide`,
`/composition`, `/generate`, `/a2ui/*`, and the served assets — works normally.

**If you need streaming UI, deploy the `Dockerfile` instead** (any host that
runs a container: Fly, Railway, Cloud Run). Pointing agents at the Vercel URL
for component intelligence and a container for surfaces is a reasonable split.

### Verifying a deployment

```sh
curl https://<deployment>/health           # {"status":"ok","service":"cre8-mcp"}
curl https://<deployment>/themes           # brands[] must be non-empty
curl -X POST https://<deployment>/mcp \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

An empty `brands` array at `/themes` means the build shipped the catalog but not
the token sheets — surfaces would render unstyled, and nothing else would
complain. Check that `vendor-cre8-wc.mjs` ran in the build log.

### Connecting an MCP client

```json
{
  "mcpServers": {
    "cre8": {
      "type": "http",
      "url": "https://<deployment>/mcp"
    }
  }
}
```

The transport is Streamable HTTP and stateless, so there is no session to lose
between invocations. Add `"headers": { "Authorization": "Bearer ..." }` if
`CRE8_MCP_TOKEN` is set.
