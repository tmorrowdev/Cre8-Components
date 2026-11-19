---
title: Token Theming
intents:
  - "how do I change the colors"
  - "how do I brand cre8 for a client"
  - "how do I add a new brand"
  - "how do I generate a theme from a website"
  - "how do I add dark mode"
  - "how do I rebrand one part of the page"
  - "why is my css not applying inside a component"
  - "what are the token tiers"
  - "what is brand.json"
  - "how does an agent rebrand cre8"
see_also: [01-components, 06-frameworks, 07-research]
sources:
  - packages/cre8-wc/design-tokens/BRAND_CONTRACT.md
  - packages/cre8-wc/design-tokens/schema/brand.schema.json
  - packages/cre8-wc/design-tokens/schema/token-intents.json
  - packages/cre8-wc/design-tokens/brands/cre8/brand.json
  - packages/cre8-wc/design-tokens/brands/cre8/css/tokens_brand.css
  - packages/cre8-mcp/src/brand-tools.ts
---

# Token Theming

Everything visual routes through CSS custom properties named `--cre8-*`, and every
one of them derives from a handful of **seeds**. A brand is those seeds, written
once in a `brand.json`; the stylesheets are generated from it. If you are writing
a hex code anywhere other than a `brand.json`, you have left the system.

This is what "themeable" means here, in the sense Brad Frost gives the term: one
component library, many brand design languages, swapped by changing values rather
than by forking components (see [Design tokens](07-research.md#design-tokens)).

**The full vocabulary is [`reference/tokens.md`](reference/tokens.md)** — the
seeds and all 73 semantic tokens, each with what to use it for and what never to
use it for, plus the primitive and component tiers by family. A token name not in
that file does not exist, and `var()` on an undefined token renders as nothing,
silently.

## Loading a theme

Before anything else, a theme has to be on the page. It is one stylesheet,
imported once at your app entry:

```js
import '@tmorrow/cre8-wc/themes/cre8';
```

which resolves to `lib/design-tokens/brands/<brand>/css/tokens_<brand>.css`. That
sheet `@import`s its two siblings, `tokens_brand.css` (every tier) and
`fonts.css`. With no build step, link it directly — see
[Plain HTML and CDN](06-frameworks.md#plain-html-and-cdn). If components render
unstyled, check this first rather than debugging your overrides.

## The four tiers

Each tier references only the tier above it, and literal values appear in exactly
one place: the seed. The structure is visible in
`design-tokens/brands/cre8/css/tokens_brand.css`, section by section:

| Tier | Contains | Example | You… |
|---|---|---|---|
| **0. Seed** | The only literals. Set from `brand.json`. | `--cre8-seed-primary: #3b82f6` | change these, through `brand.json` |
| **1. Primitive** | OKLCH ramps (`50`…`950`) and scales derived from the seeds | `--cre8-primary-600` | never touch these |
| **2. Semantic** | Purpose, not colour. The only tier a mode swap touches. | `--cre8-bg-brand-strong` | read these in CSS |
| **3. Component** | One component's aliases onto semantic tokens | `--cre8-header-bg-default` | leave these alone |

Old `--cre8-color-*` names (for example `--cre8-color-bg-brand-strong`) are still
emitted as **legacy aliases** of the semantic tier so existing component styles
resolve. Do not write new code against them: drop the `color-` prefix.

The decision this replaces — "which tier do I edit?" — mostly goes away. You
change seeds, the ramps follow, the semantic tier follows the ramps, and every
component follows the semantic tier. The ramp for a seed reproduces the colour
you gave it at step `500`, so give the brand colour itself, not a lighter or darker
variant of it.

## brand.json is the single source

Each brand lives in `packages/cre8-wc/design-tokens/brands/<name>/`. The one file a
person (or an agent) writes is `brand.json`; everything in `css/` is generated from
it and must not be hand-edited.

| File | Role |
|---|---|
| `brand.json` | The brand: seeds, typography, shape, spacing, elevation, focus, contrast target, voice |
| `css/tokens_brand.css` | Generated. Every tier, scoped to `:root, [data-cre8-theme]` |
| `css/tokens_<name>.css` | Generated. The theme entry consumers import; `@import`s the other two |
| `css/fonts.css` | Generated. `@font-face` rules from `typography.fontFaces` |

The schema is `design-tokens/schema/brand.schema.json` (the **brand contract**). A
minimal brand is a name and two colours; everything unset falls back to `extends`,
then to `cre8`:

```json
{
  "$schema": "../../schema/brand.schema.json",
  "name": "acme",
  "displayName": "Acme",
  "extends": "cre8",
  "color": {
    "primary": { "$type": "color", "$value": "#0f766e" },
    "neutral": { "$type": "color", "$value": "#57534e" }
  },
  "shape": { "radius": { "$type": "dimension", "$value": "8px" } },
  "voice": { "tone": "Plain, warm, brief.", "avoid": ["exclamation marks"] }
}
```

Leaves use the W3C DTCG `{ "$type", "$value" }` shape. The seeds a brand can set:
`color.primary`, `neutral`, `accent`, `success`, `warning`, `error`, `info`,
`chart`; `typography.body`, `display`, `mono`, `baseSize`, `scaleRatio`, `weights`,
`fontFaces`; `shape.radius`, `controlRadius`, `buttonRadius`, `borderWidth`;
`space.base` and `density`; `elevation.style`; `motion`; `focus`; and
`accessibility.contrastTarget`. `voice` is copy guidance for agents and is not
rendered. `overrides` sets literal `--cre8-*` values last; it is an escape hatch,
it bypasses the ramps, and the validator warns on every entry.

Consumers import a repo brand through the package export, exactly as above, with
the brand's name in place of `cre8`.

### Generating a brand from a website

The `brand-theme-extractor` skill scrapes a brand site and extracts its colours,
type and shape. Its output should be a `brand.json`, not a CSS override file: the
extracted primary, neutral and status colours become seeds, the font becomes
`typography.body`, the corner radius becomes `shape.radius`. Then validate it like
any other brand. Extraction is automation; accepting the result is a human call,
because contrast and focus visibility are not things to accept on trust (see
[Delegation: choosing the mode](05-ai-fluency.md#delegation-choosing-the-mode)).

The older theme-generator scripts described in `agent-docs/THEME_GENERATOR.md`
were never wired into `package.json` and are not the path; `brand.json` is.

## Rebrand in three steps

For an agent (or a hurried human) rebranding cre8 for a client:

1. **Write the seeds.** Start from `"extends": "cre8"` and set only what differs:
   `color.primary` and `color.neutral` at minimum, then fonts and radius. Through
   MCP, `get_brand_contract` gives the schema and an example; `list_brands` shows
   what to extend.
2. **Validate.** `validate_brand` (or `pnpm tokens:check` in the repo) runs the
   schema and the [contrast guard](#the-contrast-guard). Fix failures by moving the
   seed — usually darkening `primary` or the status colour named in the failing
   pair — never with `overrides`.
3. **Apply.** In the repo: save `design-tokens/brands/<name>/brand.json` and run
   `pnpm tokens:build <name>`. Without the repo: `apply_brand` returns the same
   generated CSS to inject after the cre8 theme, or restyles a live surface in
   place with `surface_id`.

## Scoped rebrand with data-cre8-theme

The whole token stack is declared for `:root` **and** for any element carrying
`data-cre8-theme`. That second selector is what makes a subtree rebrand work: a
custom property is substituted where it is declared, so reseeding a subtree only
changes its components if the tiers are re-declared on that subtree too.

```html
<section data-cre8-theme style="--cre8-seed-primary: #7c3aed">
  <!-- every cre8 component in here is purple-branded -->
</section>
```

That is the right tool for one region, one screen or one experiment. For a whole
second brand in one region, generate it scoped: `apply_brand` with
`scope: '[data-cre8-theme="acme"]'` (or the generator's `scope` option) emits the
stack under that selector only, and the element carries `data-cre8-theme="acme"`.

Setting a semantic token directly on a container (`--cre8-bg-brand-strong: …`)
still works as a one-off, but it does not follow modes and it skips the contrast
guard. Prefer reseeding.

## Dark mode and modes in general

A **mode** is a lighting condition within a brand; a **brand** is a design
language. They compose. Modes are set with `data-mode`:

```html
<html data-mode="inverse">                      <!-- whole document dark -->
<html data-mode="auto">                         <!-- follows prefers-color-scheme -->
<div data-cre8-theme data-mode="inverse">       <!-- one dark region -->
```

Only the semantic tier changes. Mode-dependent semantic tokens read a
`--cre8-mode-*` indirection; `[data-mode="inverse"]` (and `[data-mode="auto"]`
under `prefers-color-scheme: dark`) remaps that indirection, and the semantic and
component tiers re-resolve through it. So:

- Anything that reads semantic tokens follows the mode for free. Anything that
  reads a primitive ramp step (`--cre8-primary-600`) or a literal does not — which
  is the practical reason to read semantic tokens. `list_tokens` marks the
  mode-aware ones.
- To scope a mode, pair `data-mode` with `data-cre8-theme` on the same element.
- Keep the attribute authoritative in your app; seed it from
  `prefers-color-scheme` if you like, or use `auto`.
- **`inverted` is not dark mode.** It is a per-component prop for placing one
  component on a dark background within a light page. `inverted` everywhere is a
  light theme wearing a coat.

## The contrast guard

Every brand declares `accessibility.contrastTarget` (`AA` by default, or `AAA`).
The brand tooling computes every required text/background and UI-boundary pair
from the generated ramps, in light **and** inverse mode, and fails the brand if
any pair falls below the WCAG 2.2 target. Failures are errors, not warnings:
`pnpm tokens:check` exits non-zero and `apply_brand` refuses the brand.
`validate_brand` returns each pair with its ratio, so the failing seed is named
rather than guessed.

When a derived pair would fail, the generator corrects it: it moves to the
first passing ramp step, or uses dark text on a fill too light for white (a
yellow primary, say), and records the choice in the generated file's header.
A brand can opt out of a correction for a named pair with
`accessibility.waive`; each waiver is reported as a warning. The default
`cre8` brand currently waives seven pairs so that it renders exactly as it
did before the brand contract (its white-on-primary-500 button is 3.68:1);
remove a waiver and the guard applies the passing step.

The guard covers what the seeds generate. It does not cover `overrides`, a
semantic token you set by hand, or text you colour yourself — check those by eye.

## The CLIs

Run in `packages/cre8-wc`:

| Command | Does |
|---|---|
| `pnpm tokens:build` | Regenerate every brand's `css/` from its `brand.json` |
| `pnpm tokens:build <name>` | Regenerate one brand |
| `pnpm tokens:check` | Validate every brand (schema + contrast); fails if any generated CSS is stale against its `brand.json` |

`tokens:check` is the CI gate: a hand edit to a generated file shows up as stale
and fails it. Both wrap `design-tokens/tools/brand.mjs`, whose exports
(`loadBrand`, `validateBrand`, `generateBrandCss`, `checkContrast`, `listTokens`,
`resolveToken`) are documented in `design-tokens/BRAND_CONTRACT.md`.

## MCP tools for agents

The cre8 MCP server (`packages/cre8-mcp`) exposes the same machinery, so an agent
never has to read CSS to theme:

| Tool | Input | Returns |
|---|---|---|
| `list_tokens` | `{ tier?, query? }` | Tokens with tier, current cre8 value, and a "Use for … Never for …" line. No arguments: seed + semantic. |
| `get_brand_contract` | `{}` | The brand schema, a short authoring guide, and the cre8 brand as an example |
| `list_brands` | `{}` | Brands with display name, description, `extends`, seed colours, and whether they carry `voice` |
| `validate_brand` | `{ brand }` | `{ ok, errors, warnings, contrast }` |
| `apply_brand` | `{ brand, scope?, surface_id? }` | `{ brandCss, themeCss, fontsCss }`; with `surface_id`, restyles that live surface in place |

`brand` is a brand name or a whole `brand.json` object. Usage descriptions come
from `design-tokens/schema/token-intents.json`, which is machine-readable and
covers every seed and semantic token. A brand's `voice` is returned by
`apply_brand`, by `ui_open_surface` for its theme, and by
`GET /a2ui/context?brand=<name>`, so the agent writing labels writes them on-brand.

## Styling across the shadow boundary

This is the section people arrive at angry. Your stylesheet cannot select into a
component's shadow DOM. `.cre8-c-card__header { … }` from your app does nothing —
that class exists inside the shadow root and your selector never reaches it.

Three doors exist, in order of preference:

**1. Custom properties (inherit through the boundary).** The default answer.
Tokens are designed for this, which is why a reseeded `data-cre8-theme` subtree
restyles every component inside it.

**2. CSS shadow parts (`::part()`).** The component author explicitly exposed
these. `cre8-card` exposes `card`, `header`, `body`, `footer`;
`cre8-accordion-item` exposes `heading`, `button`, `body`, `body-inner`.

Only 10 of the 85 components expose any parts at all — the full list is in
[`reference/parts.md`](reference/parts.md), read from the component sources.

```css
cre8-card::part(header) {
  border-block-end: 1px solid var(--cre8-border-default);
}
```

Parts are a supported API — but a narrow one. You can set properties on the part;
you cannot select its descendants.

**3. Slotted content (`::slotted()`).** For styling what *you* passed in, from
outside. Rarely needed, since you already control that markup.

If none of the three gets you there, the honest answers are: the component needs a
new token or part upstream (open a PR), or you are fighting the design system and
should reconsider the design. Both beat a hack that breaks on the next release.

## Verifying a theme

`pnpm tokens:check` (or `validate_brand`) is the first check and covers contrast
for everything the seeds generate. Then look at the things it cannot see:

- **Overrides and hand-set tokens.** Each `overrides` entry and any token set
  directly on a container bypasses the guard. Check those pairs yourself: 4.5:1
  for body text, 3:1 for large text and UI boundaries.
- **Focus visibility.** Focus colour defaults to the primary ramp (`focus.color`
  in `brand.json`). On a brand whose primary sits close to its surfaces, focus
  rings vanish — a keyboard-blocking bug that visual review never catches. Tab
  through a page in both modes.
- **Both modes.** Open a page with `data-mode="inverse"` as well as the default.
- **Every token resolves.** A `var(--cre8-…)` with no definition and no fallback
  renders as nothing, silently. Names you use should be in
  [`reference/tokens.md`](reference/tokens.md).
- **Fonts actually load.** `fonts.css` paths are relative to the brand's `css/`
  directory; confirm they survive your bundler, or use `https` URLs in
  `fontFaces`.

→ *For the standards behind the contrast numbers, see
[Accessibility](07-research.md#accessibility).*

## Where to go next

- The token vocabulary with usage → [`reference/tokens.md`](reference/tokens.md)
- Loading a theme in a framework app → [Usage in Other Frameworks](06-frameworks.md)
- Having an agent produce a theme → [Delegation: choosing the mode](05-ai-fluency.md#delegation-choosing-the-mode)
- The research this architecture rests on → [Design tokens](07-research.md#design-tokens)
