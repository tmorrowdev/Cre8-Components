---
title: cre8 Knowledge Base
intents:
  - "where do I start"
  - "what is in this knowledge base"
  - "how do I navigate the cre8 docs"
audience: humans and agents
---

# cre8 Knowledge Base

The working documentation for the cre8 design system: what the components are,
how they compose, how they are themed, how agents emit them, and how they behave
inside other frameworks.

This knowledge base is **intent-routed**. You are not expected to know which page
holds your answer — you are expected to know what you are trying to do. Start at
[Intent Map](INTENT-MAP.md), find the sentence closest to your goal, follow the link. Agents
can do the same thing mechanically against
[`reference/intents.json`](reference/intents.json).

## The pages

| Page | Answers |
|---|---|
| [Orientation](00-orientation.md) | What cre8 is, what the layers are, and which one you are touching |
| [Components](01-components.md) | How the component library is organized and what its conventions mean |
| [Composition Patterns](02-composition-patterns.md) | How to assemble components into pages that hold together |
| [Token Theming](03-token-theming.md) | How to change how everything looks, at four different levels of commitment |
| [A2UI — Agent-Generated UI](04-a2ui.md) | How an agent emits cre8 UI as data, and how that is validated |
| [Streaming UI — live surfaces](08-streaming-ui.md) | How an agent builds UI a human watches, patch by patch, and how clicks come back |
| [AI Fluency in cre8](05-ai-fluency.md) | How to work *with* an AI on cre8 well — delegating, describing, checking, owning |
| [Usage in Other Frameworks](06-frameworks.md) | React, Next.js, Vue, Angular, Svelte, and plain HTML |
| [Research and Sources](07-research.md) | The external work this system is built on, with links |
| [Glossary](glossary.md) | Terms, defined once |
| [`reference/components.md`](reference/components.md) | Every component, grouped by the job it does — generated, never hand-edited |
| [`reference/content-model.md`](reference/content-model.md) | Which components take `children` vs `slots` in A2UI — generated |
| [`reference/events.md`](reference/events.md) | What each component emits, and why you must look it up — generated |
| [`reference/props.md`](reference/props.md) | Every declared prop: type, values, default, attribute vs property — generated |
| [`reference/parts.md`](reference/parts.md) | CSS shadow parts you can style, read from component source — generated |
| [`reference/tokens.md`](reference/tokens.md) | Every `--cre8-*` token by tier; the vocabulary theming needs — generated |

## Three rules for this KB

**Derived facts are generated, not typed.** Component lists, counts, content
models, and version numbers come from the manifests that ship with the package.
Regenerate them with:

```bash
pnpm kb:generate
```

If a number in a prose page disagrees with `reference/facts.json`, the prose page
is wrong. Fix it rather than reconciling in your head.

**Examples are machine-checked, including this KB's own.** Run:

```bash
pnpm kb:check
```

That validates, against the shipped implementation rather than against prose:

- every wiki link, relative link, and intent destination;
- every A2UI spec embedded in these pages, through `validateSpec`;
- every `<cre8-*>` tag, attribute, enum value, and event binding in every code
  block;
- every `--cre8-*` token, and every `::part()` name, checked against the
  component sources rather than the generated component docs;
- every `pnpm <script>` and `@tmorrow/cre8-wc` import path the pages tell you to
  use — including the ones documented as *not* existing, so a claim of absence
  fails once it stops being true;
- every repo file path cited in prose, and every `docs/kb` link in the repo root
  README — the front door lives outside this tree, so nothing else would notice
  if a page were renamed;
- the shipped specs in `packages/cre8-wc/a2ui/examples/`, against their
  documented pass/fail status.

Documented APIs in this system drift from shipped ones
([Provenance and drift](07-research.md#provenance-and-drift)), and a knowledge base is documentation —
the most drift-prone kind. Running these checks against the KB itself has caught
several real errors in it, which is why the section exists.

Two of the checks work differently from the rest and are worth knowing about:

- **Intent reachability.** Every page must be reachable from at least one machine
  intent. In an intent-routed KB, a page nothing routes to is invisible however
  well it is written.
- **The [drift ledger](07-research.md#provenance-and-drift), checked in both
  directions.** An **Open** row asserts something is still broken, so the check
  fails when someone fixes it and the row needs moving. A **Resolved** row asserts
  something is now true, so the check fails if it regresses. Every other page here
  describes a fixed target; the ledger describes a moving one.

`pnpm kb:check-urls` verifies the external sources cited in [Research and Sources](07-research.md) are
still live. It is separate because it needs network, and a transient outage should
not block a docs commit.

Run `pnpm kb:check` before considering a change done. Wiring it into CI or a
pre-commit hook would be a reasonable next step; it is currently manual.

**Claims are sourced or labeled.** Where a page states something that came from
outside this repo, it links to the source in [Research and Sources](07-research.md). Where a page states
something the maintainers decided, it says so. Where something is uncertain or
drifting, it is marked with a **Drift** callout rather than smoothed over — those
callouts are the most valuable content here, because they are what a reader
cannot recover by reading the code.

## Maintaining this knowledge base

The machinery has a few conventions that are not guessable and will fail
confusingly if you get them wrong. All of it lives in `tools/`.

| Command | Does |
|---|---|
| `pnpm kb:generate` | Rewrites every `reference/*.md` and both JSON files from the manifests, catalog, token files, and component sources |
| `pnpm kb:check` | Links + intents, then examples, then the drift ledger. This is the gate |
| `pnpm kb:check-urls` | External links in [Research and Sources](07-research.md). Needs network, so it is separate |
| `pnpm kb:check-drift` | Just the ledger. Included in `kb:check` |

**Adding a prose page.** Give it `intents:` frontmatter, then add at least one
entry to the intent list in `tools/generate-reference.mjs` and regenerate —
`kb:check` fails on any page no intent routes to, because in an intent-routed KB
an unreachable page is an invisible one. Add a row to the table above too.

**Never hand-edit `reference/*.md`.** They carry a "DO NOT EDIT" marker and are
overwritten by `kb:generate`. To change one, change the generator.

**Adding a drift row.** Put it in the **Open** table in
[Provenance and drift](07-research.md#provenance-and-drift), and add a matching assertion to
`tools/check-drift.mjs` unless it genuinely needs human judgement — in which case
list it in that file's `UNAUTOMATABLE` array so it is visibly excluded rather
than silently missing. Remember the inversion: **the assertion returns `true`
while the drift still exists**, so the check fails once someone fixes the bug and
prompts you to move the row to Resolved. That is deliberate. Ledger rows go stale
faster than anything else here.

**Writing about a mistake.** Several checks would flag a page that *names* a
wrong value in order to warn about it. Each has an explicit escape hatch, all
following the same shape — an allowlist that asserts the thing is still wrong:

- `TOKEN_COUNTEREXAMPLES` in `check-examples.mjs` — tokens cited as invented
- `ASSERTED_ABSENT` — commands documented as not existing
- `KNOWN_FAILING` — shipped example specs documented as failing
- `<!-- kb-check: counterexample -->` on a markup line — deliberately wrong
  markup shown to say "not this". Per line, so the rest of the block is still
  checked normally

If the named thing becomes real, the check fails, because the prose citing it as
broken is now wrong. Do not silence a check by deleting the assertion; move the
claim instead.

**What the checks cannot see.** Identifier validation catches wrong names. It
cannot catch a page contradicting another page, a link that resolves but no
longer answers what the sentence promised, or an instruction that cannot be
followed. Those need a read-through — the defects that have done the most damage
here were all of that kind, and all passed every check at the time.

## Linking conventions

- **Use standard markdown links** — `[label](02-composition-patterns.md)` and
  `[label](03-token-theming.md#the-three-tiers)`. Relative to the file you are
  writing in, so pages under `reference/` link back up with `../`.
- **Do not use `[[wiki-links]]`.** They render as literal text on GitHub, which
  only supports that syntax in Wikis, not in repository files. This KB used them
  for most of its life and 228 links were dead to anyone reading on GitHub;
  `kb:check` now rejects the syntax so it cannot come back.
- **Link text should read as prose**, not as a filename — "see
  [the three tiers](03-token-theming.md#the-three-tiers)", not "see
  [03-token-theming#the-three-tiers]".
- **Intent links** read `→ *If you want to X, see [page](page.md)*` and appear at
  the end of each section. They are the primary navigation; the table of contents
  is a fallback for people who already know the shape of the system.
