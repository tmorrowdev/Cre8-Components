---
name: cre8-design
description: Design judgment for the CRE8/Innovexa design system - which component a given job calls for, how to compose a page out of them, and how the design token and brand architecture fits together. Use alongside the cre8-mcp server, which supplies the component API facts (names, props, enum values, slots) this skill deliberately does not restate. Triggers on building UI with CRE8, @tmorrow/cre8-wc, @tmorrow/cre8-react, Innovexa components, theming CRE8, or choosing between CRE8 components.
---

# CRE8 design judgment

Component APIs live in the MCP. Taste, composition and token architecture live here.

## This skill does not list components

No component names, props, enum values or slot names appear in this file as
fact. Get them from the `cre8` MCP server, every time:

| You need | Call |
| --- | --- |
| What exists, by category | `list_components` - **start here.** One call puts every real component name in context; pick from what actually ships rather than from memory. |
| The exact props, enums and slots of one component | `get_component` - always, before using anything the list surfaced. |
| A worked composition (page shell, form, table) | `get_patterns` / `get_composition` |
| Whether an A2UI tree is valid | `validate_a2ui_spec` |

This split is deliberate and was paid for. A previous version of this skill
carried its own component tables, and by release 2.3.6 they had drifted badly:
**46% of the components it documented no longer existed**, alongside 27
undeclared props and 16 invalid enum values - each written out with
confident-looking examples. An eval measured agents *worse* with that skill
than with no CRE8 knowledge at all, because it taught them to reach for
`cre8-toast`, `cre8-toggle`, `cre8-avatar` and 35 other components that had
been removed or never shipped.

`pnpm --filter @tmorrow/cre8-wc check:skills` re-runs that audit against the
catalog the current release regenerated, and the release itself runs it. If
this file ever starts reporting defects, it has stopped being a design skill
and started restating the catalog again.

A restated catalog is always a stale catalog. If you catch yourself about to
write a component name into this file as reference material, that is the bug.

**If the MCP is unavailable, say so and stop guessing.** The installed
package's own type declarations (`node_modules/@tmorrow/cre8-react/**/*.d.ts`,
or `@tmorrow/cre8-wc/lib/**`) are the fallback source of truth - read them.
Never infer a prop or slot name from another design system's conventions;
CRE8's slot names in particular are not guessable, and inventing one fails
silently at runtime rather than erroring.

## Choosing a component

Ask what the content *is*, not what it should look like. Most wrong choices
here are a visual match to a semantic mismatch.

And ask the MCP, not your memory. The reflex to skip the catalog because you
already have a name in mind is exactly how phantom components and dead props
get written: the name in your head may be another design system's, or a
component this library removed. `list_components` is one call and shows what
actually ships; guessing costs a build failure or a silently dead page. When
nothing in the list looks right for the job, that usually means the library
expresses the need differently - check `get_patterns` before concluding a
component is missing.

**Page skeleton.** Work outside in: the outermost frame, then the banded
regions, then the width constraint, then the content. Reach for a layout
primitive when you need structure, a container when you need a width bound,
and a band or section when you need a full-bleed horizontal region with its
own background. Don't nest two width constraints; the inner one wins and the
outer one becomes a lie that the next person has to debug.

**Grouping.** A card is a *bounded, self-contained* unit - it implies the
content inside could be moved elsewhere intact. A section is a *division of a
continuous document* - it implies sequence and shared context. A page of
cards where the "cards" are really just chapters reads as fragmented; a wall
of sections where each item is independent reads as undifferentiated.

**Status and messaging.** Three different jobs, routinely confused:

- A *label on a thing* ("Shipped", "Draft") belongs on that thing, inline,
  and should be a compact status element.
- A *message about the region you are looking at* (a validation summary, a
  warning about this form) is contextual and belongs next to what it
  concerns.
- A *message about the whole page or session* (an outage, a trial expiring)
  is page-level and belongs at the top of the frame.

Getting the level wrong is louder than getting the colour wrong. A page-level
banner for a field error trains people to ignore banners.

**Navigation.** Distinguish by scope, not position: site-wide, within a
section, and within a page. Use one mechanism per scope and don't mix two in
the same bar. Tabs switch between *peer views of the same subject*; if
choosing one changes what the page is about, it's navigation, not tabs.

**Forms.** Every input needs a persistent label - placeholder text is not a
label, it disappears exactly when the user needs it. Group related controls
so the grouping is announced, not just visually implied. Field-level help and
errors belong to the field, not the form.

**Tables.** A table is for comparing rows on shared columns. If people will
mostly read one record at a time, that's a list or a set of cards. If a
column exists only to hold a button, ask whether the row itself should be the
target.

## Composition rules

- **One primary action per view.** A second primary button halves the meaning
  of the first. Everything else is secondary or tertiary; destructive actions
  use the destructive variant, not a recoloured primary.
- **Slots are the contract.** Named slots are where a component expects
  specific content to go, and putting that content in as free children
  instead does not render it in the right place - or sometimes at all. Some
  components declare named slots and *no* default slot, so free children have
  nowhere to land and vanish silently. Confirm slot names with
  `get_component` before composing; this is the single most common source of
  a page that builds cleanly and renders wrong.
- **Do not invent a component to fill a gap.** If nothing fits, compose what
  exists, or use plain HTML for structure. A page built from real components
  plus a `<div>` is correct; a page with a plausible-sounding component that
  doesn't exist is broken.
- **A documented prop is not always a live prop.** Some props are declared
  and read by nothing - the value is accepted and silently dropped. Where a
  component takes its content through a slot, prefer the slot even if a
  same-named prop appears in the API.
- **Prefer fewer components used correctly.** Breadth is not quality. A
  smaller composition built only from real components beats a richer one that
  guesses.

## Token architecture

Tokens resolve in tiers, and knowing the chain is what lets you theme
predictably:

```
seed (raw brand value)  ->  base/semantic (role)  ->  component-level
--cre8-seed-font        ->  --cre8-font-family-base -> --cre8-font-families-*
```

Three consequences:

1. **Override at the highest tier that achieves the change.** Retheming a
   brand means changing seeds, not repainting component tokens one by one.
2. **A token's name can be historical rather than descriptive.** Names are
   generated from whatever the value was when the token was minted, and they
   are not renamed when the value changes - a token whose name mentions one
   typeface can resolve, through the chain above, to an entirely different
   one. Always resolve the chain before believing a name.
3. **Never hardcode a raw value.** A hex code or font stack written directly
   into a page opts that page out of theming entirely, and it will not be
   caught by any build step.

### Brands stack

Brands are not all complete. Some are *overlay* brands that redefine only
part of the token set and assume a base brand underneath - loading one alone
leaves every token it doesn't restate undefined, and the components fall back
to unstyled for exactly those properties.

Load the base brand first, then the overlay:

```js
import '@tmorrow/cre8-wc/design-tokens/brands/<base>/css/fonts.css';
import '@tmorrow/cre8-wc/design-tokens/brands/<base>/css/tokens_brand.css';
import '@tmorrow/cre8-wc/design-tokens/brands/<base>/css/tokens_<base>.css';
import '@tmorrow/cre8-wc/design-tokens/brands/<overlay>/css/fonts.css';
import '@tmorrow/cre8-wc/design-tokens/brands/<overlay>/css/tokens_brand.css';
import '@tmorrow/cre8-wc/design-tokens/brands/<overlay>/css/tokens_<overlay>.css';
```

To tell whether a brand is complete or an overlay, compare how many custom
properties its `tokens_brand.css` defines against a known-complete brand's. A
large shortfall means it is an overlay and needs a base.

Two practical notes:

- **Import through the package's `exports` map** (`.../design-tokens/...`),
  not the `dist/` path it resolves to internally - bundlers reject the deep
  path.
- **Component styles are useless without tokens.** Components carry their own
  shadow styles, but those are written against these custom properties. Load
  no tokens and every component renders unstyled while still being
  structurally correct - so this failure survives a green build and only
  shows up visually.

## Theming a page to a brand

Theming belongs to the *page*, not to a component. Load the tokens once at
the entry point. A theme import inside a component module is evaluated after
the entry's imports and will override the page's brand for everyone -
a real and easy mistake to make.

## Verify visually, not just structurally

A CRE8 page can typecheck, build, and pass every structural check while
rendering wrong - unstyled from missing tokens, empty from content placed in
the wrong slot, or off-brand from a stray theme import. None of those produce
an error.

Before calling it done, render it and look at it. Confirm the type is the
brand's face rather than a fallback, that slotted regions actually show their
content, and that a primary action reads as primary.
