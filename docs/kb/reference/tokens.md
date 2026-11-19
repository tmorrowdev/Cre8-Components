---
title: Design Token Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/design-tokens/brands/cre8/css/tokens_brand.css, packages/cre8-wc/design-tokens/schema/token-intents.json
intents:
  - "what tokens can I override"
  - "what is the token for background or text or border"
  - "which token do I use for a surface color"
  - "is this token name real"
  - "what does this token mean"
  - "what are the seed tokens"
---

# Design Token Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

Every `--cre8-*` token, by tier. **This is the vocabulary**; the grammar — how a
brand sets the seeds and how modes and scoped rebrands work — is in
[Token Theming](../03-token-theming.md). The usage lines come from
`design-tokens/schema/token-intents.json`, which the MCP `list_tokens` tool serves.

| Tier | Count | You… |
|---|---|---|
| Seed (tier 0) | 13 | Set these, through `brand.json`. The only literals in the system |
| Primitive (tier 1) | 172 | Never edit. Ramps and scales derived from the seeds |
| Semantic (tier 2) | 86 | Read these in CSS. The only tier `data-mode` touches |
| Component (tier 3) | 315 | Leave alone, except for a genuine one-off on one component |
| Legacy aliases | 432 | Never write new code against. `--cre8-color-*` names kept so old styles resolve |

A name not in this file does not exist. `var(--cre8-…)` with no definition and no
fallback renders as nothing, silently — which is why
[Verifying a theme](../03-token-theming.md#verifying-a-theme) tells you to check, and why `pnpm kb:check`
fails on any token named in these pages that is not defined.

## Seed tokens, tier 0: what a brand sets

Each seed is set from the `brand.json` field shown. Values are the `cre8`
brand's. To change one, change the brand, not the CSS — see
[Rebrand in three steps](../03-token-theming.md#rebrand-in-three-steps).

| Token | brand.json | Value | Use |
|---|---|---|---|
| `--cre8-seed-primary` | `color.primary` | `#3b82f6` | the brand hue; the primary-50..950 ramp, buttons, links, focus and selection all derive from it |
| `--cre8-seed-neutral` | `color.neutral` | `#64748b` | the grey family; surfaces, borders and body text derive from it, and a tinted neutral sets the brand temperature |
| `--cre8-seed-success` | `color.success` | `#06b6d4` | the success hue; positive status backgrounds, borders and text derive from it |
| `--cre8-seed-error` | `color.error` | `#ec4899` | the error hue; destructive and invalid-state backgrounds, borders and text derive from it |
| `--cre8-seed-warning` | `color.warning` | `#f59e0b` | the warning hue; caution status backgrounds, borders and icons derive from it |
| `--cre8-seed-accent` | `color.accent` | `#7c3aed` | the secondary brand hue; info states, visited links, highlights and charts derive from it |
| `--cre8-seed-font` | `typography.body` | `"Plus Jakarta Sans", sans-serif` | the body/UI font stack every typography token resolves through |
| `--cre8-seed-radius` | `shape.radius` | `24px` | the container corner radius; control, button and pill radii derive from it |
| `--cre8-seed-space` | `space.base` | `0.25rem` | the 1-step spacing unit; the spacing and padding scales multiply it |
| `--cre8-seed-font-size` | `typography.baseSize` | `1rem` | the body text size; the type scale is computed from it |
| `--cre8-seed-border-width` | `shape.borderWidth` | `0.0625rem` | the default hairline width for borders and dividers |
| `--cre8-seed-font-mono` | `typography.mono` | `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` | the monospace family for code, data tables and tabular figures |
| `--cre8-seed-density` | `space.density` | `1` | the multiplier on control padding (compact 0.8, comfortable 1, spacious 1.25) |

## Semantic tokens, tier 2: the ones to read

The complete list. Values are the `cre8` brand's; every brand defines the same
names. **Mode** marks tokens that flip under `data-mode="inverse"` / `"auto"`.
Each has a legacy alias with `color-` inserted after `--cre8-`.

### `--cre8-bg-*`

| Token | Value | Mode | Use for … never for … |
|---|---|---|---|
| `--cre8-bg-active` | `var(--cre8-neutral-900)` |  | Use for the fill of an active/current item in a dark-on-light treatment (current tab pill). Never for hover feedback. |
| `--cre8-bg-attention` | `var(--cre8-mode-bg-attention)` |  | Use for the surface behind an attention-state element. Never for status meaning; attention is emphasis, not success/error. |
| `--cre8-bg-attention-strong` | `var(--cre8-mode-bg-attention-strong)` |  | Use for a solid attention fill (new/featured markers, highlight chips). Never for error or warning states. |
| `--cre8-bg-brand` | `var(--cre8-mode-bg-brand)` | yes | Use for a light brand-tinted surface behind brand content (selected nav, callouts). Never for primary buttons; use --cre8-bg-brand-strong. |
| `--cre8-bg-brand-active` | `var(--cre8-primary-200)` |  | Use for pressed/selected on a --cre8-bg-brand surface. Never for hover. |
| `--cre8-bg-brand-hover` | `var(--cre8-mode-bg-brand-hover)` | yes | Use for hover on a --cre8-bg-brand surface. Never for resting surfaces. |
| `--cre8-bg-brand-strong` | `var(--cre8-mode-bg-brand-strong)` | yes | Use for the primary action fill: primary buttons, active toggles, brand bars. Never for large page backgrounds or body-text backgrounds; text on it is --cre8-content-knockout. |
| `--cre8-bg-brand-strong-active` | `var(--cre8-primary-700)` |  | Use for pressed state of a --cre8-bg-brand-strong fill. Never for hover. |
| `--cre8-bg-brand-strong-hover` | `var(--cre8-mode-bg-brand-strong-hover)` | yes | Use for hover on a --cre8-bg-brand-strong fill. Never for resting state. |
| `--cre8-bg-brand-xstrong` | `var(--cre8-primary-800)` |  | Use for the darkest brand fill, for emphasis on or next to bg-brand-strong (headers, hero bands). Never for default buttons; use --cre8-bg-brand-strong. |
| `--cre8-bg-brand-xstrong-active` | `var(--cre8-primary-900)` |  | Use for pressed state of a --cre8-bg-brand-xstrong fill. Never for hover. |
| `--cre8-bg-brand-xstrong-hover` | `var(--cre8-primary-700)` |  | Use for hover on a --cre8-bg-brand-xstrong fill. Never for resting state. |
| `--cre8-bg-default` | `var(--cre8-mode-bg-default)` | yes | Use for the page and default component surface. Never for text or icons; use a --cre8-content-* token. |
| `--cre8-bg-default-active` | `var(--cre8-primary-100)` |  | Use for the pressed/selected state of a default-surface item. Never for hover; use --cre8-bg-default-hover. |
| `--cre8-bg-default-hover` | `var(--cre8-mode-bg-default-hover)` | yes | Use for the hover state of a default-surface row, item or ghost control. Never for resting surfaces. |
| `--cre8-bg-disabled` | `var(--cre8-mode-bg-disabled)` | yes | Use for the fill of a disabled control. Never for read-only or inactive-but-usable states. |
| `--cre8-bg-error` | `var(--cre8-mode-bg-error)` |  | Use for a light error background (inline error, alert). Never for error text; use --cre8-content-error. |
| `--cre8-bg-error-strong` | `var(--cre8-mode-bg-error-strong)` |  | Use for a solid error fill (destructive button, filled error badge). Never for decorative brand accents. |
| `--cre8-bg-info` | `var(--cre8-mode-bg-info)` |  | Use for a light informational background (info alert, tip). Never for brand surfaces; use --cre8-bg-brand. |
| `--cre8-bg-info-strong` | `var(--cre8-mode-bg-info-strong)` |  | Use for a solid informational fill (filled info badge). Never for primary actions. |
| `--cre8-bg-inverse-active` | `var(--cre8-neutral-0)` |  | Use for the fill of an active item inside an inverse region. Never for light-mode surfaces. |
| `--cre8-bg-inverse-moderate` | `var(--cre8-neutral-500)` |  | Use for mid-grey fills on an inverse (dark) region. Never for light-mode surfaces. |
| `--cre8-bg-moderate` | `var(--cre8-neutral-400)` |  | Use for mid-grey fills such as track backgrounds and placeholders. Never for text backgrounds; contrast with body text is not guaranteed. |
| `--cre8-bg-opacity-default` | `var(--cre8-overlay-50)` |  | Use for the scrim behind modals and drawers. Never for opaque surfaces. |
| `--cre8-bg-opacity-transparent` | `var(--cre8-overlay-transparent)` |  | Use for a fully transparent fill that keeps the token chain (ghost buttons). Never for hiding content; use display or visibility. |
| `--cre8-bg-strong` | `var(--cre8-mode-bg-strong)` | yes | Use for high-emphasis neutral fills: tooltips, toasts, dark bands on a light page. Never for large page areas; pair text on it with --cre8-content-knockout. |
| `--cre8-bg-subtle` | `var(--cre8-mode-bg-subtle)` | yes | Use for recessed areas: wells, table stripes, sidebars, code blocks. Never for the main page surface or any text. |
| `--cre8-bg-success` | `var(--cre8-mode-bg-success)` |  | Use for a light success background (alert, badge, row highlight). Never for success text; use --cre8-content-success. |
| `--cre8-bg-success-strong` | `var(--cre8-mode-bg-success-strong)` |  | Use for a solid success fill (filled badge, progress complete). Never for large areas or text backgrounds without checking contrast. |
| `--cre8-bg-warning` | `var(--cre8-mode-bg-warning)` |  | Use for a light warning background (caution alert). Never for warning icons; use --cre8-content-warning-icon. |
| `--cre8-bg-warning-strong` | `var(--cre8-mode-bg-warning-strong)` |  | Use for a solid warning fill (filled warning badge). Never for text backgrounds without checking contrast. |

### `--cre8-border-*`

| Token | Value | Mode | Use for … never for … |
|---|---|---|---|
| `--cre8-border-active-outline` | `var(--cre8-primary-600)` |  | Use for the focus ring / active outline on light surfaces. Never for decorative borders; never remove it without a replacement. |
| `--cre8-border-attention` | `var(--cre8-primary-400)` |  | Use for attention/featured borders. Never for status meaning. |
| `--cre8-border-brand` | `var(--cre8-mode-border-brand)` | yes | Use for brand-coloured borders: selected cards, active inputs. Never for error or focus states. |
| `--cre8-border-brand-strong` | `var(--cre8-primary-600)` |  | Use for high-contrast brand borders. Never for default borders. |
| `--cre8-border-brand-subtle` | `var(--cre8-primary-300)` |  | Use for light brand borders on tinted brand surfaces. Never for borders that must meet 3:1. |
| `--cre8-border-default` | `var(--cre8-mode-border-default)` | yes | Use for default borders and dividers: cards, inputs, table rules. Never for focus indication; use --cre8-border-active-outline. |
| `--cre8-border-disabled` | `var(--cre8-neutral-300)` |  | Use for borders of disabled controls. Never for subtle borders on active controls. |
| `--cre8-border-error` | `var(--cre8-error-400)` |  | Use for error-state borders (invalid input, error alert). Never for neutral or brand borders. |
| `--cre8-border-info` | `var(--cre8-info-500)` |  | Use for informational borders. Never for brand selection. |
| `--cre8-border-inverse-active-outline` | `var(--cre8-primary-200)` |  | Use for the focus ring / active outline inside an inverse region. Never for light surfaces. |
| `--cre8-border-knockout` | `var(--cre8-neutral-0)` |  | Use for borders on strong/dark fills. Never for borders on default surfaces. |
| `--cre8-border-strong` | `var(--cre8-mode-border-strong)` | yes | Use for high-emphasis borders: input outlines that must meet 3:1, separators that must read. Never for decorative hairlines; use --cre8-border-default. |
| `--cre8-border-success` | `var(--cre8-success-400)` |  | Use for success-state borders (valid input, success alert). Never for neutral borders. |
| `--cre8-border-transparent` | `var(--cre8-overlay-transparent)` |  | Use for a transparent border that reserves space so state changes do not shift layout. Never for hiding borders on purpose-built borderless components. |
| `--cre8-border-warning` | `var(--cre8-warning-400)` |  | Use for warning-state borders. Never for error states. |

### `--cre8-chart-*`

| Token | Value | Mode | Use for … never for … |
|---|---|---|---|
| `--cre8-chart-1` | `var(--cre8-primary-500)` |  | Use for categorical data-viz series 1, in order, for lines, bars and legend swatches. Never for status meaning (use success/warning/error) or text on a chart fill without checking contrast. |
| `--cre8-chart-2` | `var(--cre8-accent-600)` |  | Use for categorical data-viz series 2, in order, for lines, bars and legend swatches. Never for status meaning (use success/warning/error) or text on a chart fill without checking contrast. |
| `--cre8-chart-3` | `var(--cre8-primary-300)` |  | Use for categorical data-viz series 3, in order, for lines, bars and legend swatches. Never for status meaning (use success/warning/error) or text on a chart fill without checking contrast. |
| `--cre8-chart-4` | `var(--cre8-accent-500)` |  | Use for categorical data-viz series 4, in order, for lines, bars and legend swatches. Never for status meaning (use success/warning/error) or text on a chart fill without checking contrast. |
| `--cre8-chart-5` | `var(--cre8-primary-700)` |  | Use for categorical data-viz series 5, in order, for lines, bars and legend swatches. Never for status meaning (use success/warning/error) or text on a chart fill without checking contrast. |
| `--cre8-chart-6` | `var(--cre8-accent-800)` |  | Use for categorical data-viz series 6, in order, for lines, bars and legend swatches. Never for status meaning (use success/warning/error) or text on a chart fill without checking contrast. |

### `--cre8-content-*`

| Token | Value | Mode | Use for … never for … |
|---|---|---|---|
| `--cre8-content-attention-icon` | `var(--cre8-primary-400)` |  | Use for attention/featured icons. Never for status meaning. |
| `--cre8-content-brand` | `var(--cre8-mode-content-brand)` | yes | Use for brand-coloured text and icons: emphasis, active nav labels. Never for links; use --cre8-content-link so visited/hover states work. |
| `--cre8-content-brand-knockout` | `var(--cre8-success-50)` |  | Use for brand-tinted text on dark brand fills. Never for text on light surfaces. |
| `--cre8-content-brand-strong` | `var(--cre8-mode-content-brand-strong)` | yes | Use for higher-contrast brand text on tinted brand surfaces. Never for body copy. |
| `--cre8-content-default` | `var(--cre8-mode-content-default)` | yes | Use for body text and default icons. Never for text on brand-strong or strong fills; use --cre8-content-knockout. |
| `--cre8-content-disabled` | `var(--cre8-mode-content-disabled)` | yes | Use for text and icons of disabled controls. Never for de-emphasised but active text; use --cre8-content-subtle. |
| `--cre8-content-error` | `var(--cre8-mode-content-error)` |  | Use for error message and validation text. Never for decorative red; error colour means something is wrong. |
| `--cre8-content-error-icon` | `var(--cre8-error-600)` |  | Use for error status icons. Never for running text. |
| `--cre8-content-info-icon` | `var(--cre8-info-500)` |  | Use for informational status icons. Never for links or brand emphasis. |
| `--cre8-content-inverse-link` | `var(--cre8-primary-200)` |  | Use for link text inside an inverse (dark) region. Never for links on light surfaces. |
| `--cre8-content-inverse-link-active` | `var(--cre8-primary-400)` |  | Use for pressed links inside an inverse region. Never for light surfaces. |
| `--cre8-content-inverse-link-disabled` | `var(--cre8-neutral-200)` |  | Use for disabled links inside an inverse region. Never for light surfaces. |
| `--cre8-content-inverse-link-focus` | `var(--cre8-neutral-900)` |  | Use for focused links inside an inverse region. Never for light surfaces. |
| `--cre8-content-inverse-link-hover` | `var(--cre8-primary-300)` |  | Use for hovered links inside an inverse region. Never for light surfaces. |
| `--cre8-content-inverse-link-visited` | `var(--cre8-accent-200)` |  | Use for visited links inside an inverse region. Never for light surfaces. |
| `--cre8-content-knockout` | `var(--cre8-mode-content-knockout)` | yes | Use for text and icons on strong fills (bg-brand-strong, bg-strong, *-strong status fills). Never for text on default surfaces, where it is invisible. |
| `--cre8-content-link` | `var(--cre8-mode-content-link)` | yes | Use for link text at rest. Never for non-navigational emphasis; use --cre8-content-brand. |
| `--cre8-content-link-active` | `var(--cre8-primary-700)` |  | Use for link text while pressed. Never for current-page nav items. |
| `--cre8-content-link-disabled` | `var(--cre8-neutral-600)` |  | Use for links that cannot be followed. Never for subtle text; use --cre8-content-subtle. |
| `--cre8-content-link-focus` | `var(--cre8-neutral-0)` |  | Use for link text while focused (sits on the focus fill). Never for focus rings; the ring is a border/outline token. |
| `--cre8-content-link-hover` | `var(--cre8-mode-content-link-hover)` | yes | Use for link text on hover. Never for resting links. |
| `--cre8-content-link-visited` | `var(--cre8-accent-600)` |  | Use for visited links. Never for unvisited links. |
| `--cre8-content-subtle` | `var(--cre8-mode-content-subtle)` | yes | Use for secondary text: captions, helper text, metadata, placeholders. Never for body copy or anything the user must read to act; check it meets 4.5:1 where it carries meaning. |
| `--cre8-content-success` | `var(--cre8-mode-content-success)` |  | Use for success message text. Never for icons alone; use --cre8-content-success-icon. |
| `--cre8-content-success-icon` | `var(--cre8-success-600)` |  | Use for success status icons. Never for running text. |
| `--cre8-content-warning-icon` | `var(--cre8-warning-600)` |  | Use for warning status icons. Never for warning text on light backgrounds; contrast is usually too low. |

### `--cre8-focus-*`

| Token | Value | Mode | Use for … never for … |
|---|---|---|---|
| `--cre8-focus-ring-color` | `var(--cre8-mode-focus-ring-color)` |  | Use for the outline colour of a keyboard focus indicator. Never for borders or selection fills; it is checked for 3:1 against the background only as a focus ring. |
| `--cre8-focus-ring-offset` | `2px` |  | Use for outline-offset of a keyboard focus indicator. Never for spacing between elements. |
| `--cre8-focus-ring-width` | `2px` |  | Use for the outline width of a keyboard focus indicator. Never for border widths. |

### `--cre8-gradient-*`

| Token | Value | Mode | Use for … never for … |
|---|---|---|---|
| `--cre8-gradient-brand` | `linear-gradient(135deg, var(--cre8-gradient-brand-from) 0%, var(--cre8-gradient-brand-to) 100%)` |  | Use for the default brand gradient (background-image) for hero and marketing surfaces. Never for text, borders, or any small UI element; behind text, check contrast against the darkest stop. |
| `--cre8-gradient-brand-from` | `var(--cre8-primary-500)` |  | Use for the start stop of the brand gradient. Never for text, borders, or any small UI element; behind text, check contrast against the darkest stop. |
| `--cre8-gradient-brand-rich` | `linear-gradient(150deg, var(--cre8-gradient-brand-from) 0%, var(--cre8-accent-600) 42%, var(--cre8-gradient-brand-to) 100%)` |  | Use for a deeper, higher-chroma brand gradient for large display surfaces. Never for text, borders, or any small UI element; behind text, check contrast against the darkest stop. |
| `--cre8-gradient-brand-to` | `var(--cre8-accent-600)` |  | Use for the end stop of the brand gradient. Never for text, borders, or any small UI element; behind text, check contrast against the darkest stop. |

### `--cre8-link-*`

| Token | Value | Mode | Use for … never for … |
|---|---|---|---|
| `--cre8-link-bg-active` | `var(--cre8-neutral-900)` |  | Use for the background of a pressed or focused link. Never for link text colour. |

## Primitive tokens (tier 1)

172 values with no meaning attached, all derived from the seeds.
Grouped by family; these are what semantic tokens point at. A ramp step does not
follow `data-mode`, which is the practical reason not to read one directly.

| Family | Count | Example |
|---|---|---|
| `--cre8-accent-*` | 6 | `--cre8-accent-50` = `oklch(from var(--cre8-seed-accent) 0.96 calc(c * 0.15) h)` |
| `--cre8-border-*` | 4 | `--cre8-border-width-none` = `0rem` |
| `--cre8-control-*` | 1 | `--cre8-control-gap` = `calc(var(--cre8-seed-space) * 2 * var(--cre8-seed-density))` |
| `--cre8-duration-*` | 3 | `--cre8-duration-fast` = `100ms` |
| `--cre8-easing-*` | 2 | `--cre8-easing-standard` = `cubic-bezier(0.2, 0, 0, 1)` |
| `--cre8-error-*` | 11 | `--cre8-error-50` = `oklch(from var(--cre8-seed-error) 0.9714 calc(c * 0.0668) calc(h - 11.11))` |
| `--cre8-font-*` | 21 | `--cre8-font-size-0` = `calc(var(--cre8-seed-font-size) * 0.75)` |
| `--cre8-info-*` | 8 | `--cre8-info-50` = `var(--cre8-accent-50)` |
| `--cre8-line-*` | 5 | `--cre8-line-height-tight` = `1.12` |
| `--cre8-mode-*` | 33 | `--cre8-mode-bg-default` = `var(--cre8-neutral-0)` |
| `--cre8-neutral-*` | 12 | `--cre8-neutral-0` = `oklch(from var(--cre8-seed-neutral) 1 calc(c * 0) calc(h - 167.54))` |
| `--cre8-overlay-*` | 4 | `--cre8-overlay-transparent` = `oklch(from var(--cre8-neutral-900) l c h / 0)` |
| `--cre8-padding-*` | 5 | `--cre8-padding-2` = `calc(var(--cre8-spacing-2) * var(--cre8-seed-density))` |
| `--cre8-primary-*` | 11 | `--cre8-primary-50` = `oklch(from var(--cre8-seed-primary) 0.9705 calc(c * 0.0754) calc(h - 5.21))` |
| `--cre8-radius-*` | 10 | `--cre8-radius-none` = `0px` |
| `--cre8-spacing-*` | 18 | `--cre8-spacing-0` = `0rem` |
| `--cre8-success-*` | 9 | `--cre8-success-50` = `oklch(from var(--cre8-seed-success) 0.9841 calc(c * 0.1502) calc(h - 14.35))` |
| `--cre8-warning-*` | 9 | `--cre8-warning-50` = `oklch(from var(--cre8-seed-warning) 0.9869 calc(c * 0.13) calc(h + 25.2))` |

## Component tokens (tier 3)

315 aliases scoped to a single component, each pointing at a
semantic token. Grouped by the component they belong to — override one only for a
genuine one-off.

| Component prefix | Count |
|---|---|
| `--cre8-badge-*` | 2 |
| `--cre8-button-*` | 222 |
| `--cre8-desktop-*` | 2 |
| `--cre8-footer-*` | 5 |
| `--cre8-header-*` | 78 |
| `--cre8-icon-*` | 3 |
| `--cre8-input-*` | 2 |
| `--cre8-progress-*` | 1 |

## Legacy aliases

432 older names, mostly `--cre8-color-*`, still emitted so
existing component styles resolve to the value they always had. Drop the
`color-` prefix to get the semantic name; do not use these in new code.

## What is missing

There is **no dedicated focus token family** in the semantic tier. Focus colour,
width and offset are brand fields (`focus` in `brand.json`), and the contrast
guard does not see a focus ring against every surface it can land on. Check focus
visibility by eye, in both modes — see
[Verifying a theme](../03-token-theming.md#verifying-a-theme).
