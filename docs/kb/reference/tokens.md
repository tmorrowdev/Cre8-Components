---
title: Design Token Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/1-primitives.css, packages/2-semantic.css, packages/3-components.css
intents:
  - "what tokens can I override"
  - "what is the token for background or text or border"
  - "which token do I use for a surface color"
  - "is this token name real"
---

# Design Token Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

Every `--cre8-*` token, by tier. **This is the vocabulary**; the grammar — which
tier to override and how — is in [Token Theming](../03-token-theming.md).

| Tier | Count | Override it when |
|---|---|---|
| Semantic (tier 2) | 73 | Almost always. This expresses intent and is what branding should change |
| Primitive (tier 1) | 360 | You want every use of a hue to move |
| Component (tier 3) | 299 | One component needs a one-off, accepting the debt |

A name not in this file does not exist. `var(--cre8-…)` with no definition and no
fallback renders as nothing, silently — which is why
[Verifying a theme](../03-token-theming.md#verifying-a-theme) tells you to check, and why `pnpm kb:check`
fails on any token named in these pages that is not defined here.

## Semantic tokens, tier 2: the ones to override

The complete list. Values shown are the `cre8` brand's; a brand override
redefines the same names.

### `--cre8-bg-*`

| Token | Value |
|---|---|
| `--cre8-bg-active` | `var(--cre8-neutral-100)` |
| `--cre8-bg-attention` | `var(--cre8-grape-30)` |
| `--cre8-bg-attention-strong` | `var(--cre8-grape-80)` |
| `--cre8-bg-brand` | `var(--cre8-cyan-05)` |
| `--cre8-bg-brand-active` | `var(--cre8-cyan-20)` |
| `--cre8-bg-brand-hover` | `var(--cre8-cyan-10)` |
| `--cre8-bg-brand-strong` | `var(--cre8-cyan-70)` |
| `--cre8-bg-brand-strong-active` | `var(--cre8-cyan-90)` |
| `--cre8-bg-brand-strong-hover` | `var(--cre8-cyan-80)` |
| `--cre8-bg-brand-xstrong` | `var(--cre8-cyan-80)` |
| `--cre8-bg-brand-xstrong-active` | `var(--cre8-cyan-90)` |
| `--cre8-bg-brand-xstrong-hover` | `var(--cre8-cyan-90)` |
| `--cre8-bg-default` | `var(--cre8-neutral-white)` |
| `--cre8-bg-default-active` | `var(--cre8-cyan-10)` |
| `--cre8-bg-default-hover` | `var(--cre8-cyan-05)` |
| `--cre8-bg-disabled` | `var(--cre8-neutral-10)` |
| `--cre8-bg-error` | `var(--cre8-coral-05)` |
| `--cre8-bg-error-strong` | `var(--cre8-coral-60)` |
| `--cre8-bg-info` | `var(--cre8-sky-blue-20)` |
| `--cre8-bg-info-strong` | `var(--cre8-sky-blue-60)` |
| `--cre8-bg-inverse-active` | `var(--cre8-neutral-white)` |
| `--cre8-bg-inverse-moderate` | `var(--cre8-neutral-40)` |
| `--cre8-bg-moderate` | `var(--cre8-neutral-60)` |
| `--cre8-bg-opacity-default` | `var(--cre8-opacity-neutral-50)` |
| `--cre8-bg-opacity-transparent` | `var(--cre8-opacity-transparent)` |
| `--cre8-bg-strong` | `var(--cre8-neutral-100)` |
| `--cre8-bg-subtle` | `var(--cre8-champagne-05)` |
| `--cre8-bg-success` | `var(--cre8-green-60)` |
| `--cre8-bg-success-strong` | `var(--cre8-green-100)` |
| `--cre8-bg-warning` | `var(--cre8-yellow-05)` |
| `--cre8-bg-warning-strong` | `var(--cre8-yellow-30)` |

### `--cre8-border-*`

| Token | Value |
|---|---|
| `--cre8-border-active-outline` | `var(--cre8-cyan-80)` |
| `--cre8-border-attention` | `var(--cre8-grape-70)` |
| `--cre8-border-brand` | `var(--cre8-cyan-70)` |
| `--cre8-border-brand-strong` | `var(--cre8-cyan-70)` |
| `--cre8-border-brand-subtle` | `var(--cre8-cyan-40)` |
| `--cre8-border-default` | `var(--cre8-neutral-20)` |
| `--cre8-border-disabled` | `var(--cre8-neutral-40)` |
| `--cre8-border-error` | `var(--cre8-coral-50)` |
| `--cre8-border-info` | `var(--cre8-sky-blue-60)` |
| `--cre8-border-inverse-active-outline` | `var(--cre8-grape-20)` |
| `--cre8-border-knockout` | `var(--cre8-neutral-white)` |
| `--cre8-border-strong` | `var(--cre8-neutral-70)` |
| `--cre8-border-success` | `var(--cre8-green-90)` |
| `--cre8-border-transparent` | `var(--cre8-opacity-transparent)` |
| `--cre8-border-warning` | `var(--cre8-yellow-30)` |

### `--cre8-content-*`

| Token | Value |
|---|---|
| `--cre8-content-attention-icon` | `var(--cre8-cyan-60)` |
| `--cre8-content-brand` | `var(--cre8-cyan-70)` |
| `--cre8-content-brand-knockout` | `var(--cre8-grape-05)` |
| `--cre8-content-brand-strong` | `var(--cre8-cyan-70)` |
| `--cre8-content-default` | `var(--cre8-neutral-100)` |
| `--cre8-content-disabled` | `var(--cre8-neutral-50)` |
| `--cre8-content-error` | `var(--cre8-coral-60)` |
| `--cre8-content-error-icon` | `var(--cre8-coral-60)` |
| `--cre8-content-info-icon` | `var(--cre8-sky-blue-60)` |
| `--cre8-content-inverse-link` | `var(--cre8-grape-20)` |
| `--cre8-content-inverse-link-active` | `var(--cre8-grape-40)` |
| `--cre8-content-inverse-link-disabled` | `var(--cre8-neutral-10)` |
| `--cre8-content-inverse-link-focus` | `var(--cre8-neutral-100)` |
| `--cre8-content-inverse-link-hover` | `var(--cre8-grape-30)` |
| `--cre8-content-inverse-link-visited` | `var(--cre8-purple-20)` |
| `--cre8-content-knockout` | `var(--cre8-neutral-white)` |
| `--cre8-content-link` | `var(--cre8-cyan-70)` |
| `--cre8-content-link-active` | `var(--cre8-cyan-90)` |
| `--cre8-content-link-disabled` | `var(--cre8-neutral-50)` |
| `--cre8-content-link-focus` | `var(--cre8-neutral-white)` |
| `--cre8-content-link-hover` | `var(--cre8-cyan-80)` |
| `--cre8-content-link-visited` | `var(--cre8-purple-100)` |
| `--cre8-content-subtle` | `var(--cre8-neutral-70)` |
| `--cre8-content-success` | `var(--cre8-green-60)` |
| `--cre8-content-success-icon` | `var(--cre8-green-60)` |
| `--cre8-content-warning-icon` | `var(--cre8-neutral-100)` |

### `--cre8-link-*`

| Token | Value |
|---|---|
| `--cre8-link-bg-active` | `#333333` |

## Primitive tokens (tier 1)

360 raw values with no meaning attached. Grouped by family; these are
what semantic tokens point at.

| Family | Count | Example |
|---|---|---|
| `--cre8-base-*` | 153 | `--cre8-base-neutral-10` = `#eaeaea` |
| `--cre8-border-*` | 31 | `--cre8-border-radius-0` = `0px` |
| `--cre8-champagne-*` | 10 | `--cre8-champagne-10` = `#edebe7` |
| `--cre8-coral-*` | 11 | `--cre8-coral-10` = `#fccaca` |
| `--cre8-cornflower-*` | 5 | `--cre8-cornflower-blue-10` = `#d7e9ff` |
| `--cre8-cyan-*` | 12 | `--cre8-cyan-10` = `#e3fafc` |
| `--cre8-font-*` | 19 | `--cre8-font-size-0` = `12px` |
| `--cre8-grape-*` | 12 | `--cre8-grape-10` = `#f8f0fc` |
| `--cre8-green-*` | 14 | `--cre8-green-10` = `#e6f1f0` |
| `--cre8-letter-*` | 7 | `--cre8-letter-spacing-0` = `-1.5px` |
| `--cre8-line-*` | 7 | `--cre8-line-heights-12` = `48px` |
| `--cre8-neutral-*` | 12 | `--cre8-neutral-10` = `#eaeaea` |
| `--cre8-opacity-*` | 6 | `--cre8-opacity-transparent` = `#ffffff` |
| `--cre8-paragraph-*` | 2 | `--cre8-paragraph-indent-0` = `0px` |
| `--cre8-purple-*` | 10 | `--cre8-purple-10` = `#f8e3f1` |
| `--cre8-sky-*` | 10 | `--cre8-sky-blue-10` = `#cadcfc` |
| `--cre8-spacing-*` | 18 | `--cre8-spacing-0` = `var(--cre8-spacing-0)` |
| `--cre8-spruce-*` | 10 | `--cre8-spruce-10` = `#dafa87` |
| `--cre8-yellow-*` | 11 | `--cre8-yellow-10` = `#fbe4b8` |

## Component tokens (tier 3)

299 tokens scoped to a single component. Grouped by the component
they belong to — override one of these only for a genuine one-off.

| Component prefix | Count |
|---|---|
| `--cre8-badge-*` | 2 |
| `--cre8-button-*` | 208 |
| `--cre8-desktop-*` | 2 |
| `--cre8-footer-*` | 5 |
| `--cre8-header-*` | 78 |
| `--cre8-icon-*` | 3 |
| `--cre8-progress-*` | 1 |

## What is missing

Tokens are generated from Figma, so this list is what the pipeline produced —
not necessarily everything a theme needs. Notably there is **no dedicated focus
token family**, although [Verifying a theme](../03-token-theming.md#verifying-a-theme) warns that a
brand which darkens backgrounds without adjusting focus indicators ships
invisible focus rings. Check focus visibility by eye; the tokens will not tell
you.
