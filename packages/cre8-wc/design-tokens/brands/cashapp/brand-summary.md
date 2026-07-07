# Brand Theme Summary — Cash App

- **Brand:** Cash App
- **Source URL:** https://cash.app
- **Generated:** 2026-06-26
- **Extraction method:** Live computed styles read from the rendered homepage via a headless browser.

## Why not Firecrawl

The skill's Step 1 (Firecrawl CLI) was unavailable here: the anonymous IP is
blocked by Firecrawl and no `FIRECRAWL_API_KEY` is configured. I substituted a
**live-DOM extraction** — querying `getComputedStyle` across the rendered page
for dominant background colors, CTA button styles, fonts, and border radii. This
is the skill's "CSS inspection (primary)" path executed against the live render,
which is generally *more* reliable than scraped markdown for color/typography.

## Raw extracted values (before mapping)

| Signal | Value | Confidence |
|---|---|---|
| Brand green (dominant bg) | `#00E013` | **High** — largest color area on the page by far |
| Core neutrals | `#000000`, `#FFFFFF` | **High** — high-contrast black/white sections |
| Primary font | `Cash Sans` → `Helvetica Neue, Helvetica, sans-serif` | **High** |
| Display font | `Cash Sans Wide` | High (loaded font) |
| Mono font | `Cash Sans Mono` | High (loaded font) |
| Body size / line | `16px` / heavy `400` weight | High |
| Hero heading | `~50px`, weight `400`, Cash Sans | Medium |
| Button shape | pill — `border-radius: 999px / 100px` | **High** |
| Card radius | `~19px` | High (recurring) |
| Primary CTA ("Sign up"/"Get started") | white bg, black text, pill | High |
| Outline CTA ("Send money") | transparent bg, black text, pill | High |
| CTA padding / weight | ~`12px × 18px`, weight `400–500` | Medium |
| Links | `#0000EE` (UA default on homepage) | Low — not brand-styled here |

## Confidence by category

| Category | Confidence | Notes |
|---|---|---|
| Brand color | **High** | Green extracted directly from dominant fill |
| Neutrals / backgrounds | **High** | Black + white are core to the identity |
| Typography family | **High** | But **Cash Sans is proprietary** (see below) |
| Type scale / weights | Medium | Base 16px confirmed; rest derived from standard scale |
| Shape / radii | **High** | Pills + 19px cards are signature |
| Borders | Medium | Page is largely borderless; neutrals derived |
| Buttons | High (color/shape), Medium (sizing) | |
| Status colors | **Low** | No alert/badge UI on the homepage — standard semantics used, success reuses brand green |
| Shadows | Low | Flat design; conservative defaults |
| Animation | Low | No explicit durations captured; CRE8 defaults |
| Component sizing | Low | Only CTA padding measured reliably |

## Fonts — Cash Sans (CDN-hosted)

Cash Sans, Cash Sans Wide, and Cash Sans Mono are Cash App's own typefaces and
are **served from the Square CDN** (`cash-f.squarecdn.com`) — so you can load them
directly with `@font-face`, no Google Fonts and no license file needed. Add this
before your styles (weights: 400 Regular, 500 Medium, 600 Semibold, 700 Bold,
900 Black):

```css
@font-face{font-family:"Cash Sans";font-weight:400;font-display:swap;src:url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Regular.woff2) format("woff2")}
@font-face{font-family:"Cash Sans";font-weight:500;font-display:swap;src:url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Medium.woff2) format("woff2")}
@font-face{font-family:"Cash Sans";font-weight:600;font-display:swap;src:url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Semibold.woff2) format("woff2")}
@font-face{font-family:"Cash Sans";font-weight:700;font-display:swap;src:url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Bold.woff2) format("woff2")}
@font-face{font-family:"Cash Sans";font-weight:900;font-display:swap;src:url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Black.woff2) format("woff2")}
/* Cash Sans Wide (display) and Cash Sans Mono live at the same path:
   CashSansWide-{Regular,Medium,Semibold,Bold,Black}.woff2 and CashSansMono-Regular.woff2 */
```

The token stack (`--cre8-font-family-default`) still keeps **Helvetica Neue** as
the fallback, matching the site. Verified: `CashSans-Black.woff2` returns HTTP 200
(~35 KB) and the faces load (400/500/600/700/900). Note the woff2 files are hot-
linked from Cash App's CDN — for a production app you may prefer to self-host copies.

## Logos / assets

The homepage logo is an inline SVG (no standalone file URL to capture). Not saved.

## Status-color palette

**Detected:** none (no alert/toast/badge components on the marketing homepage).
**Inferred:** error = red `#C8102E`, warning = amber, info = blue, attention =
orange; **success reuses the brand green** family (`#00E013` / `#008A0C`). Treat
all status tokens as Low confidence and validate against in-product UI.

## Gaps / needs manual review

- **Status colors** — verify against real Cash App alert/badge components.
- **Link color** — homepage used the UA default; mapped to brand green (in-app behavior) but confirm.
- **Shadows & animation** — flat aesthetic; values are conservative defaults.
- **Component sizing** (input height, sidebar, container max-width) — left out / commented; not derivable from the marketing page.
- **`content-brand`** uses a darkened green (`#008A0C`) for legibility on white, since pure `#00E013` text fails contrast.

## Use with CRE8

```html
<!-- load before cre8-wc -->
<link rel="stylesheet" href="./brand-tokens.css" />
<script type="module" src="@tmorrow/cre8-wc"></script>
```

```tsx
// React entry
import './brand-tokens.css';
import { Button } from '@tmorrow/cre8-react';
```

Tip: this pairs with the studio's brand extractor at `/a2ui/brand` and the
`cre8-a2ui` token-override workflow in this repo.
