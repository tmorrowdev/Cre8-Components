---
title: Token Theming
intents:
  - "how do I change the colors"
  - "how do I brand cre8 for a client"
  - "how do I add a new brand"
  - "how do I generate a theme from a website"
  - "how do I add dark mode"
  - "why is my css not applying inside a component"
  - "what are the token tiers"
see_also: [01-components, 06-frameworks, 07-research]
sources:
  - packages/1-primitives.css, packages/2-semantic.css, packages/3-components.css
  - packages/cre8-wc/design-tokens/
  - packages/cre8-wc/agent-docs/THEME_SYSTEM.md
  - packages/cre8-wc/agent-docs/THEME_GENERATOR.md
---

# Token Theming

Everything visual routes through CSS custom properties named `--cre8-*`. To change
how something looks, you change a token — if you are writing a hex code anywhere
outside a token file, you have left the system.

There are four ways to do it, at four levels of commitment; jump to
[Four methods, in ascending order of commitment](#four-methods-in-ascending-order-of-commitment) if you already know which you
need. This is what "themeable" means here, in the specific sense Brad Frost gives
the term: one component library, many brand design languages, swapped by changing
values rather than by forking components (see [Design tokens](07-research.md#design-tokens)).

**The full vocabulary is [`reference/tokens.md`](reference/tokens.md)** — all 73
semantic tokens listed in full, plus the 360 primitives and 299 component
tokens. Read this page for *which tier to change and how*; read that one for
*what the thing is called*. A token name that is not in that file does not
exist, and `var()` on an undefined token renders as nothing, silently.

## Loading a theme

Before overriding anything, the base theme has to be on the page. It is one
stylesheet, imported once at your app entry:

```js
import '@tmorrow/cre8-wc/themes/cre8';
```

which resolves to `lib/design-tokens/brands/<brand>/css/tokens_<brand>.css`. With
no build step, link it directly — see [Plain HTML and CDN](06-frameworks.md#plain-html-and-cdn) for the
CDN form. Everything below assumes it is loaded; if components render unstyled,
check this first rather than debugging your overrides.

## The three tiers

Tokens are layered, and each tier only ever references the one below it. The
generated files at the repo root show the structure plainly:

| Tier | File | Contains | Example |
|---|---|---|---|
| **1. Primitives** | `packages/1-primitives.css` | Raw values. No meaning. | `--cre8-cyan-70: …` |
| **2. Semantic** | `packages/2-semantic.css` | Purpose. References tier 1. | `--cre8-bg-brand-strong: var(--cre8-cyan-70)` |
| **3. Component** | `packages/3-components.css` | One component's needs. References tiers 1–2. | `--cre8-header-bg-default: var(--cre8-neutral-white)` |

The tier you edit determines the blast radius, and this is the whole decision:

- Change a **primitive** → everything using that hue moves. This is what you want
  when a brand's blue changes.
- Change a **semantic** token → everything with that *meaning* moves. This is what
  you want when "brand strong" should be a different color than "brand".
- Change a **component** token → only that component moves. This is what you want
  for a one-off fix, and it is also how you accumulate debt if you overuse it.

> Tiers 1–3 are marked `Do not edit directly - auto-generated from Figma tokens`.
> Edit the source, not the output. See [Design tokens](07-research.md#design-tokens) for the
> interchange format this pipeline is converging on.

→ *If you only need one color changed in one place, do not start here — see
[Method 1: scoped custom property override](#method-1-scoped-custom-property-override).*

## Four methods, in ascending order of commitment

Pick the lightest one that solves your problem. Most theming mistakes are
someone reaching for method 3 when method 1 would have done.

### Method 1: scoped custom property override

Set the token on any ancestor. Custom properties inherit, and they cross the
shadow boundary — which is exactly why the system is built on them.

```css
.checkout-panel {
  --cre8-bg-brand-strong: #1d4ed8;
  --cre8-bg-brand-strong-hover: #1e40af;
}
```

Every cre8 component inside `.checkout-panel` picks this up. Nothing else does.

**Use when:** one region, one screen, or one experiment.
**Do not use when:** you find yourself repeating the same block in three files —
that is method 2 asking to be born.

### Method 2: brand override file

One stylesheet, loaded after the base tokens, that redefines semantic tokens at
`:root`.

```css
/* app-brand.css — loaded after the cre8 theme */
:root {
  --cre8-bg-brand-strong: #0f766e;
  --cre8-content-brand: #0f766e;
  --cre8-border-brand: #14b8a6;
}
```

Override **semantic** tokens (tier 2), not primitives, unless you genuinely want
every use of a hue to shift. Semantic overrides express intent — "our brand color
is teal" — and survive upstream primitive renames better.

**Use when:** one application needs to look like its own product.
**Do not use when:** the brand needs to ship to other consumers — that is method 3.

### Method 3: a new brand directory

Brands live in `packages/cre8-wc/design-tokens/brands/<name>/`. Fifteen exist
today (`cre8`, `cre8-teal`, `cre8-a2ui`, `blue`, `bolt`, `claude-terracotta`,
`femmecubator`, `legacy`, `cre8-legacy`, `marketing`, `minimalist`, `notion`,
`prisma`, `starbucks`, `tmorrow`).

The shape to copy is `brands/cre8/css/`:

| File | Role |
|---|---|
| `tokens_brand.css` | The brand's own values |
| `tokens_<brand>.css` | The full theme: imports `tokens_brand.css` + `fonts.css`, then component-tier tokens |
| `fonts.css` | `@font-face` declarations |

Consumers then import through the package export:

```js
import '@tmorrow/cre8-wc/themes/cre8';
```

which resolves to `lib/design-tokens/brands/<brand>/css/tokens_<brand>.css`.

> **Drift.** The brand directories are not uniformly structured. `notion` and
> `bolt` contain only a `.module.ts`; `prisma` carries raw Figma token JSON;
> `starbucks` has module files but no `css/` directory. Only brands with a
> `css/tokens_<brand>.css` are reachable through the `./themes/*` export. If you
> add a brand, add the CSS or it will not be loadable by consumers.

**Use when:** the brand is a first-class artifact other projects will consume.

### Method 4: generated themes

`agent-docs/THEME_GENERATOR.md` and `THEME_SYSTEM.md` document an AI pipeline
that scrapes a URL with Puppeteer, categorizes the extracted CSS, maps it onto
cre8's semantic token names with an LLM, and writes a brand directory. There is
also a documented theme manager (list/activate/info/preview), a validator, and an
AgentRPC server.

> **Drift — check before you rely on this.** The documented entry points
> (`pnpm generate-theme`, `theme-manager`, `theme-validator`, `agentrpc`) are
> **not present** in `package.json` scripts at the repo root or in
> `packages/cre8-wc`. The documentation describes the system's intent; the npm
> wiring is missing or has moved. Treat method 4 as a design document until the
> scripts are restored, and prefer methods 1–3 for work that has to ship.

A related and *working* path exists as a skill:
`anthropic-skills:brand-theme-extractor` scrapes a brand site with the Firecrawl
CLI and emits a CRE8-compatible CSS override file — i.e. it produces a method 2
artifact. That is the pragmatic version of the same idea.

→ *If you are deciding whether to hand theme extraction to an agent at all, see
[Delegation: choosing the mode](05-ai-fluency.md#delegation-choosing-the-mode).*

## Styling across the shadow boundary

This is the section people arrive at angry. Your stylesheet cannot select into a
component's shadow DOM. `.cre8-c-card__header { … }` from your app does nothing —
that class exists inside the shadow root and your selector never reaches it.

Three doors exist, in order of preference:

**1. Custom properties (inherit through the boundary).** The default answer.
Tokens are designed for this.

```css
:root { --cre8-bg-brand-strong: #1d4ed8; }
```

**2. CSS shadow parts (`::part()`).** The component author explicitly exposed
these. `cre8-card` exposes `card`, `header`, `body`, `footer`;
`cre8-accordion-item` exposes `heading`, `button`, `body`, `body-inner`.

Only 10 of the 85 components expose any parts at all — the full list is in
[`reference/parts.md`](reference/parts.md), read from the component sources
rather than from `agent-docs/COMPONENTS.md`, which documents parts for just three
of them and lists names for accordion-item (`header`, `icon`) that the source
does not emit.

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

→ *For which parts a specific component exposes, see
[`reference/parts.md`](reference/parts.md), which is read from the component
sources.*

## Dark mode and modes in general

There is no global `prefers-color-scheme` implementation in the token files. What
exists is **attribute-scoped theming**, and only in the `tmorrow` brand:

```css
[data-theme="tmorrow-frost"] { /* token values */ }
```

```html
<body data-theme="tmorrow-frost">
```

That pattern is the one to extend. To add dark mode properly:

1. Define the dark values as a **semantic** override block under
   `[data-theme="<brand>-dark"]` — same token names, different values. Do not
   introduce parallel `--cre8-*-dark-*` names; that doubles every consumer's work.
2. Set `data-theme` on `<html>` or `<body>` from your app, persisting the choice.
3. Optionally seed the initial value from `prefers-color-scheme`, but keep the
   attribute authoritative so users can override the OS.

Two distinctions worth keeping straight:

- **`inverted` is not dark mode.** It is a per-component prop for placing a
  component on a dark background within an otherwise light page. The guidelines
  call this out explicitly. Using `inverted` everywhere is not a dark theme; it
  is a light theme wearing a coat.
- **Brand ≠ mode.** Brand selects a design language; mode selects a lighting
  condition within it. They compose: `data-theme="tmorrow-frost"` is a brand-mode
  pair, and a full matrix needs both axes named consistently.

## Verifying a theme

Before shipping a theme, check the things that break most often:

- **Contrast.** Every foreground/background token pair that can co-occur must
  meet WCAG 2.2 AA — 4.5:1 for body text, 3:1 for large text and UI boundaries.
  Semantic status colors (error, warning, success) are the usual failures because
  they are chosen for recognizability first.
- **Focus visibility.** Focus indicators are tokenized. A brand that darkens
  backgrounds without adjusting focus tokens produces invisible focus rings — a
  keyboard-blocking bug that visual review never catches.
- **Every semantic token resolves.** A `var(--cre8-…)` with no definition and no
  fallback renders as nothing, silently. Grep the brand file for token names the
  base theme defines and yours does not.
- **Fonts actually load.** `tokens_<brand>.css` imports `fonts.css`; if the brand
  ships `assets/` fonts, confirm the paths survive your bundler.

→ *For the standards behind the contrast numbers, see
[Accessibility](07-research.md#accessibility).*

## Where to go next

- Which components consume which tokens → `packages/cre8-wc/agent-docs/COMPONENTS.md`
- Loading a theme in a framework app → [Usage in Other Frameworks](06-frameworks.md)
- Having an agent produce a theme → [Delegation: choosing the mode](05-ai-fluency.md#delegation-choosing-the-mode)
- The research this architecture rests on → [Design tokens](07-research.md#design-tokens)
