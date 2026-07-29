---
title: Streaming UI — live surfaces
intents:
  - "how do I stream ui instead of returning markup"
  - "how does an agent update ui without re-rendering"
  - "what is a surface"
  - "how do I stream tokens into a component"
  - "how do I bind a prop to a data model"
  - "how do I get a click back from generated ui"
see_also: [04-a2ui, 02-composition-patterns, 05-ai-fluency]
sources:
  - packages/cre8-wc/a2ui/stream/
  - packages/cre8-mcp/src/surfaces.ts
  - packages/cre8-mcp/src/ui-tools.ts
  - docs/plans/2026-07-29-cre8-mcp-streaming-ui.md
---

# Streaming UI — live surfaces

A **surface** is a region of UI an agent builds up over time while someone
watches. The agent opens one, gets back a URL, and then patches it: append a
card, stream text into a paragraph, flip a value, wait for a click. Nothing is
re-rendered and nothing is re-sent.

This is a different job from [A2UI](04-a2ui.md), not a replacement for it. A2UI
answers "what UI should exist"; streaming answers "how does that UI arrive". The
document model is the same nested `ComponentSpec` tree, validated by the same
`validateSpec` against the same catalog.

## Why this needed a decision rather than just plumbing

The cre8 A2UI dialect renders a spec in **one pass**. There was no way to say
"add one row to that table" — only "here is the whole page again". The
[conformance table](04-a2ui.md#conformance-with-a2uiorg-v10) named the standard
answer, adopting a2ui.org's flat + `id` + `dataModel` document model, and
correctly called it a breaking change to every spec and both renderers.

That road was not taken. **Streaming addresses nodes by the path grammar the
renderer already emits on events** — `$`, `$.children[0]`, `$.slots.footer[0]`.
That grammar is already the node identity in `EmittedEvent.path`, so incremental
update reuses something the system shipped and documented rather than inventing
a parallel one. A one-shot spec becomes `surface.create` plus a single `append`
at `$`; every existing spec, example, and renderer keeps working unchanged.

The trade is real and worth stating: **paths are positional, so they shift.**
Inserting a node above another changes the second one's path. Ids would not
shift. What the path grammar buys instead is that no spec anywhere has to grow
an `id` field, and that the identity an event reports is the identity a patch
addresses — one scheme, not two that must be kept in agreement.

## The pieces

| Piece | File | Role |
|---|---|---|
| **Protocol** | `packages/cre8-wc/a2ui/stream/types.ts` | Message envelope, patch ops, data patches |
| **Model** | `packages/cre8-wc/a2ui/stream/model.ts` | `SurfaceModel` — DOM-free, applies messages, validates |
| **Renderer** | `packages/cre8-wc/a2ui/stream/renderer.ts` | `SurfaceRenderer` — mirrors the model into live DOM |
| **Store** | `packages/cre8-mcp/src/surfaces.ts` | One model per surface, server side, plus the event queue |
| **Tools** | `packages/cre8-mcp/src/ui-tools.ts` | `ui_open_surface`, `ui_stream`, `ui_get_surface`, `ui_events`, `ui_close_surface` |

`SurfaceModel` runs in Node and in the browser, and that is the point rather than
a convenience. The server applies every patch first, so a spec that breaks the
[children-vs-slots rule](04-a2ui.md#children-vs-slots-the-rule-that-breaks-specs)
fails at the tool boundary with a path-qualified message the agent can act on —
instead of producing a broken page in someone's browser. The same model gives a
viewer that connects halfway through the current tree rather than a replay.

## The message envelope

Five message types, each stamped with a monotonic `seq`:

| Type | Carries |
|---|---|
| `surface.create` | catalog id, optional root spec, optional data model. Always a full resync |
| `surface.patch` | an array of ops |
| `surface.data` | RFC 6901 pointer patches against the data model |
| `surface.status` | `streaming` / `idle` / `done` / `error`, for the viewer's indicator |
| `surface.delete` | the surface is finished |

A message whose `seq` is not exactly one past the last applied one raises
`SurfaceSeqGapError` rather than being applied. That is deliberate: a silently
dropped patch produces a UI that is subtly, invisibly wrong, and the viewer's
recovery — reconnect, receive a fresh `surface.create` — is cheap.

## The ops

Every op names a `path`. Container ops also take an optional `slot`; omitting it
means the component's `children` array, and `"default"` names the default slot —
[these are not interchangeable](04-a2ui.md#children-vs-slots-the-rule-that-breaks-specs).

| Op | Does |
|---|---|
| `append` / `insert` | Add nodes to a content list |
| `replace` / `remove` | Swap or drop the node at `path`; `$` targets the whole surface |
| `setProps` | Merge props. A `null` value deletes one |
| `setEvents` | Merge event bindings. A `null` value removes one |
| `setText` | Replace a container's content with a single text node |
| `appendText` | Concatenate onto the trailing text node |
| `clear` | Empty a content list |

```json
{
  "op": "append",
  "path": "$",
  "nodes": [
    { "component": "cre8-card",
      "slots": {
        "header": [{ "component": "cre8-heading", "props": { "tagVariant": "h3" }, "children": ["Results"] }],
        "default": [{ "component": "cre8-text-passage" }]
      } }
  ]
}
```

### Streaming text is the op that matters

`appendText` concatenates into the trailing text node, and the renderer mutates
that one `Text` node in place rather than rebuilding the container. Streaming a
model's output token by token therefore costs one small message and one DOM
write per token:

```json
{ "op": "appendText", "path": "$.children[0].slots.default[0]", "text": "Hel" }
```

Every other approach to the same effect — re-sending the spec, re-rendering the
subtree — is what makes streamed UI flicker, lose focus, and reset scroll.

## Binding props to a data model

A prop value of the shape `{ "$bind": "/pointer" }` reads from the surface's data
model instead of being taken literally:

```json
{ "component": "cre8-button", "props": { "text": { "$bind": "/cta/label" } } }
```

Then updating that label costs one message that names no components at all:

```json
{ "pointer": "/cta/label", "value": "Checkout" }
```

Two properties worth knowing:

- **Bindings resolve before validation.** A bound value is checked against the
  same enum and type constraints a literal one would be, so binding a garbage
  value into `variant` is rejected at the data patch, not discovered at render.
- **An unresolvable binding with no `default` drops the prop entirely** rather
  than setting `undefined`. An absent prop is something the validator and the
  renderer both already handle correctly.

## Events come back the same way they always did

Handlers are still **names**, never code — the whole security argument in
[Events and the return path](04-a2ui.md#events-and-the-return-path) applies
unchanged. What streaming adds is a return channel: the viewer POSTs the event,
the server queues it, and the agent reads it with `ui_events`.

```json
{ "component": "cre8-button", "path": "$.slots.footer[0]", "event": "click", "handler": "upgrade-clicked" }
```

`path` is resolved **at the moment the event fires**, not when the listener was
attached. Insert a heading above a button and the button's next click reports its
new path. This is why the renderer keys elements by spec-node object identity
rather than by path.

## Atomicity, and what it costs

A patch message either lands whole or not at all. Ops mutate the tree in place —
that is what preserves element identity, and with it focus, scroll position, and
in-flight animations — so atomicity is bought with a backup: if any op in the
message fails validation, the tree is restored and the error is marked
`rolledBack`, which tells a renderer its identity map is now stale and it must
remount.

Two consequences to plan around:

- **Within one message, ops see each other's effects.** A `remove` shifts the
  indices every later op in the same message will use. Order accordingly, or send
  two messages.
- **A rejected message consumes no sequence number.** Retrying with a corrected
  op needs no resynchronisation.

## Running it

One server carries all of it — that is what makes it a single connector rather
than a set of cooperating services:

| Path | For |
|---|---|
| `POST /mcp` | MCP over Streamable HTTP: every tool, stateless |
| `GET /surfaces/:id` | The viewer page a human opens |
| `GET /surfaces/:id/stream` | Server-sent events carrying surface messages |
| `POST /surfaces/:id/events` | The viewer reporting a handler firing |
| `POST /surfaces` … | The same surface operations as REST, for non-MCP callers |
| `GET /themes` and `/themes/:brand/tokens.css` | The brand token sheets a surface is styled with |

```bash
pnpm mcp:api
```

Over **stdio** there is no such server, and a surface only exists in the process
that created it — so the stdio transport boots its own viewer on loopback the
first time a surface is opened, and returns a URL pointing at that. Nothing to
configure and no second process to run; `CRE8_MCP_VIEWER_PORT` pins the port and
`CRE8_MCP_PUBLIC_URL` changes the advertised origin if you are behind a tunnel.

The viewer routes sit **above** the bearer-token gate, because a browser cannot
put an `Authorization` header on a page load or an `EventSource`. What protects a
surface instead is that its id is 128 random bits: the URL is the capability.
A viewer's only write is reporting an event that already happened — it cannot
patch, and it cannot enumerate other surfaces.

A surface is styled by a **brand token sheet**, served from the same place and
named on `ui_open_surface` with `theme` (default `cre8`; `GET /themes` lists what
is installed). This matters more than it sounds: cre8 components carry their own
shadow styles but read every value from a `--cre8-*` custom property, so a page
without the token sheet renders structurally correct and completely unstyled.
Theming is a viewer concern — it changes nothing about the spec, which is why
[the four theming methods](03-token-theming.md) all still apply.

From an agent, the whole loop is five tools:

1. `ui_open_surface` — returns a URL. Give it to the user.
2. `ui_stream` — `data`, then `ops`, then `status`, applied in that order so a
   node bound to a value the same call introduces still validates.
3. `ui_events` with `waitMs` — block until the user does something.
4. `ui_get_surface` — recover the current paths when you have lost track.
5. `ui_close_surface`.

## Limits worth knowing before you rely on this

- **Surfaces are in-memory.** A server restart drops every open surface. They are
  also swept after an hour without a viewer or a patch.
- **Every viewer sees the same surface.** There is no per-viewer state; two people
  on the same URL watch the same thing and both can fire events.
- **The sequence gap check assumes one writer.** Two agents patching one surface
  concurrently will interleave correctly on the server but can race each other's
  intent. Give each agent its own surface.
- **Paths are positional.** See the trade named at the top; call `ui_get_surface`
  rather than guessing an index after a structural change.

## Conformance with a2ui.org v1.0, revisited

The [document-model differences](04-a2ui.md#conformance-with-a2uiorg-v10) stand:
cre8 is a nested tree with inline values, a2ui.org is a flat adjacency list with
`id`s and JSON Pointer data binding. What has changed is the *capability* column.

| Capability | a2ui.org v1.0 | cre8, before | cre8, now |
|---|---|---|---|
| Incremental update | `updateComponents` | none | `surface.patch` ops by path |
| Data model | `dataModel` + JSON Pointer | none | `surface.data` + `{ "$bind" }` |
| Surface lifecycle | `createSurface` / `deleteSurface` | none | `surface.create` / `surface.delete` |
| Node identity | required `id` per node | position path, events only | position path, events *and* patches |
| Actions | `actionResponse` / `callFunction` | `onEvent` callback | `onEvent` plus a server-side event queue |

A cre8 surface message is still **not** a valid a2ui.org payload and vice versa.
A converter remains mechanical and unwritten. The reason to keep them distinct is
unchanged: cre8's model is simpler for one-shot generation, and it now covers the
streaming case without asking every existing spec to change shape.

→ *For the spec shape itself and what validation catches, see
[A2UI](04-a2ui.md). For whether the UI you streamed is any good, see
[Composition Patterns](02-composition-patterns.md).*
