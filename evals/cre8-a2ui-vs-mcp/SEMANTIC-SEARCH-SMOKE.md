# search_components semantic search: smoke test

Not a scored comparison — 1 trial per arm, `@tmorrow/cre8-mcp` built locally
(unreleased), `claude-opus-5`. The question this answers is narrower than
RESULTS.md's: not "is the arm better," but "does the semantic-search build
actually work end to end, and is the search any good." See
[RESULTS.md](RESULTS.md) for the scored 6-arm comparison, which still runs
against the published `@tmorrow/cre8-mcp@2.3.6` — this feature isn't in that
package yet.

## The bug that made this worth running

`search_components` grew a query-time semantic path this session: embed the
query with OpenAI `text-embedding-3-small`, rank the catalog's 88 precomputed
vectors by cosine similarity, fall back to the old lexical substring match if
anything's unavailable. First attempt to actually exercise it — with a real
key, real generated vectors — threw `ERR_PACKAGE_PATH_NOT_EXPORTED` on
`catalog-embeddings.json`.

Cause: `@tmorrow/cre8-wc`'s `package.json` lists explicit `exports` entries
for `catalog.json`, `catalog.compact.json`, and `catalog-kg.json`, but nobody
added one for the new `catalog-embeddings.json`. It fell through to the
generic `./a2ui/*` wildcard, which only declares an `import` condition — and
`createRequire(...).resolve()` resolves under `require` semantics, which that
wildcard doesn't satisfy. The failure is caught (`loadEmbeddings()` returns
`null` on any error, by design, so a broken key or missing file degrades to
lexical rather than erroring the tool), which is exactly why it went
unnoticed: every test of the fallback path passed, because the fallback path
is what always ran. Semantic search had never actually fired, in this
worktree or anywhere else, until the `exports` map was fixed:

```diff
     "./a2ui/catalog-kg.json": "./a2ui/catalog-kg.json",
+    "./a2ui/catalog-embeddings.json": "./a2ui/catalog-embeddings.json",
```

## Live query check (post-fix, real key, real vectors)

Ran directly against `handleSearchComponents`, no lexical overlap between
query text and the components it returned — this is semantic matching, not
substring luck:

| query | top matches (score) |
|---|---|
| "show progress toward a goal" | `cre8-progress-steps` (0.58), `cre8-percent-bar` (0.54), `cre8-progress-meter` (0.53) |
| "confirm a destructive action" | `cre8-danger-button` (0.32), `cre8-split-button` (0.31), `cre8-alert` (0.29) |
| "a form field with an error message" | `cre8-field-note` (0.50), `cre8-field` (0.48), `cre8-form` (0.42) |

## Harbor trials (n=1 per arm, local build)

Both used `node /opt/cre8-mcp-local/.../dist/index.js` (packed from this
worktree, deduped against a locally-packed `@tmorrow/cre8-wc` so the tarball
install doesn't silently re-fetch the published dependency) instead of
`npx @tmorrow/cre8-mcp@2.3.6`.

| arm | reward | component | prop | enum | slot | containment | inert_free |
|---|---|---|---|---|---|---|---|
| cre8-mcp-freecode | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 |
| cre8-mcp-design-freecode | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 |

**Caveat that matters more than the scores:** neither trial actually called
`search_components` — grepped both trials' raw transcripts for a real
`tool_use` invocation and found none, only the tool's name in the static
tools-list metadata. The agent built both pages with `get_component` /
`get_a2ui_catalog` / `cre8_guide` instead. So these two perfect scores confirm
the *local build* is structurally sound (connects over stdio, ships valid
output, breaks nothing) — they are not evidence about search quality. That
evidence is the live query table above, run separately and directly.

## What real output looks like

Both are genuine generated React apps, rendered and screenshotted from the
trial's own built `dist/`, not staged.

**cre8-mcp-freecode** (plain MCP, no design skill):

![cre8-mcp-freecode output](screenshots/cre8-mcp-freecode-local.jpg)

**cre8-mcp-design-freecode** (MCP + cre8-design skill):

![cre8-mcp-design-freecode output](screenshots/cre8-mcp-design-freecode-local.jpg)

## Status

- Fix + feature: uncommitted in this worktree (`packages/cre8-wc/package.json`,
  `packages/cre8-mcp/src/embeddings.ts` and related). Not published.
- All eval-harness files touched for this test (Dockerfile, both arm YAMLs,
  packed tarballs) were reverted back to their committed state afterward —
  `RESULTS.md` / `run-all.sh` still exercise the published npm package as-is.
- To get semantic search actually exercised inside a scored Harbor run:
  publish the fix, bump the pin in the arm YAMLs, then run for real — this
  smoke test deliberately didn't force tool selection.
