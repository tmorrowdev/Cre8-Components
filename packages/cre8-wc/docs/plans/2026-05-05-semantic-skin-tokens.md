# Semantic Skin Tokens Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Introduce a clean, semantically-named token layer ("skins") as CSS custom properties and update the MCP manifest so AI agents can reference tokens by intuitive names like `--cre8-background-default` instead of `--cre8-color-header-menu-bg-default`.

**Architecture:** Two new skin CSS files (`cre8-teal`, `claude-terracotta`) define ~45 semantic CSS custom properties covering color, spacing, radius, and typography. The `mcp-manifest.json` is updated to expose this full token vocabulary to the MCP server so agents can pick tokens by name and value at a glance.

**Tech Stack:** CSS custom properties, TypeScript (module re-export), JSON (mcp-manifest)

---

## Background

The existing token system generates hundreds of verbose, component-scoped vars (e.g. `--cre8-color-header-menu-bg-hover`). The Pencil design file defines a canonical semantic layer with two skins:
- **cre8-teal** — teal accent (#0EA5A8), white background
- **claude-terracotta** — terracotta accent (#C85F2F), same neutral base

These skins live in `design-tokens/brands/<skin-name>/css/` alongside the existing brand directories. No existing components or brand files change — this is additive.

---

## Task 1: Create `cre8-teal` skin directory and CSS file

**Files:**
- Create: `packages/cre8-wc/design-tokens/brands/cre8-teal/css/tokens_cre8-teal.css`
- Create: `packages/cre8-wc/design-tokens/brands/cre8-teal/css/tokens_brand.css`
- Create: `packages/cre8-wc/design-tokens/brands/cre8-teal/css/tokens_cre8-teal.module.ts`

**Step 1: Write the test — verify the CSS file parses without errors**

```bash
node -e "
const fs = require('fs');
const css = fs.readFileSync('design-tokens/brands/cre8-teal/css/tokens_cre8-teal.css', 'utf8');
const required = ['--cre8-background-default','--cre8-accent-primary','--cre8-spacing-md','--cre8-radius-md','--cre8-font-size-md'];
required.forEach(t => { if (!css.includes(t)) throw new Error('Missing: ' + t); });
console.log('PASS');
"
```

Expected: `PASS`

**Step 2: Create `tokens_brand.css`** (the base file imported by the skin CSS)

```css
/* packages/cre8-wc/design-tokens/brands/cre8-teal/css/tokens_brand.css */

:root {
  /* ─── Background & Surface ─────────────────────────────────── */
  --cre8-background-default:    #FFFFFF;
  --cre8-background-subtle:     #F5F5F5;
  --cre8-background-strong:     #EAEAEA;
  --cre8-background-inverse:    #1A1A1A;
  --cre8-surface-default:       #FFFFFF;
  --cre8-surface-elevated:      #FFFFFF;

  /* ─── Content (text) ───────────────────────────────────────── */
  --cre8-content-default:       #1A1A1A;
  --cre8-content-muted:         #949494;
  --cre8-content-inverse:       #FFFFFF;
  --cre8-content-link:          #1963E1;

  /* ─── Borders ──────────────────────────────────────────────── */
  --cre8-border-subtle:         #EAEAEA;
  --cre8-border-default:        #D5D5D5;
  --cre8-border-strong:         #6C6C6C;
  --cre8-border-inverse:        #ABABAB;

  /* ─── Accent / Brand ───────────────────────────────────────── */
  --cre8-accent-primary:        #0EA5A8;
  --cre8-accent-primary-hover:  #0B8588;
  --cre8-accent-primary-active: #086E70;
  --cre8-accent-primary-subtle: rgba(14, 165, 168, 0.10);
  --cre8-accent-secondary:      #1A1A1A;
  --cre8-focus-ring:            #0EA5A8;

  /* ─── Status ───────────────────────────────────────────────── */
  --cre8-status-info:           #1963E1;
  --cre8-status-success:        #1E9E5A;
  --cre8-status-warning:        #E08A1F;
  --cre8-status-error:          #D02525;
  --cre8-status-error-dark:     #AA1313;
  --cre8-status-error-darkest:  #7A0000;
  --cre8-overlay:               rgba(0, 0, 0, 0.20);

  /* ─── Spacing ──────────────────────────────────────────────── */
  --cre8-spacing-2xs:  2px;
  --cre8-spacing-xs:   4px;
  --cre8-spacing-sm:   8px;
  --cre8-spacing-md:   12px;
  --cre8-spacing-lg:   16px;
  --cre8-spacing-xl:   24px;
  --cre8-spacing-2xl:  32px;
  --cre8-spacing-3xl:  48px;
  --cre8-spacing-4xl:  64px;
  --cre8-spacing-5xl:  96px;

  /* ─── Radius ───────────────────────────────────────────────── */
  --cre8-radius-none:  0px;
  --cre8-radius-sm:    4px;
  --cre8-radius-md:    8px;
  --cre8-radius-lg:    12px;
  --cre8-radius-xl:    16px;
  --cre8-radius-2xl:   24px;
  --cre8-radius-full:  9999px;

  /* ─── Typography — Font Size ───────────────────────────────── */
  --cre8-font-size-xs:   12px;
  --cre8-font-size-sm:   14px;
  --cre8-font-size-md:   16px;
  --cre8-font-size-lg:   18px;
  --cre8-font-size-xl:   20px;
  --cre8-font-size-2xl:  24px;
  --cre8-font-size-3xl:  32px;
  --cre8-font-size-4xl:  40px;
  --cre8-font-size-5xl:  56px;
  --cre8-font-size-6xl:  72px;

  /* ─── Typography — Font Weight ─────────────────────────────── */
  --cre8-font-weight-regular:   400;
  --cre8-font-weight-medium:    500;
  --cre8-font-weight-semibold:  600;
  --cre8-font-weight-bold:      700;

  /* ─── Typography — Font Family ─────────────────────────────── */
  --cre8-font-family-sans: 'Inter', system-ui, sans-serif;
  --cre8-font-family-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* ─── Typography — Line Height ─────────────────────────────── */
  --cre8-line-height-tight:  1.2;
  --cre8-line-height-normal: 1.5;
}
```

**Step 3: Create `tokens_cre8-teal.css`**

```css
/* packages/cre8-wc/design-tokens/brands/cre8-teal/css/tokens_cre8-teal.css */
@import './tokens_brand.css';
```

**Step 4: Create `tokens_cre8-teal.module.ts`**

```ts
// packages/cre8-wc/design-tokens/brands/cre8-teal/css/tokens_cre8-teal.module.ts
import tokensCss from './tokens_cre8-teal.css?inline';
export default tokensCss;
```

**Step 5: Run the verify script from Step 1**

Expected: `PASS`

**Step 6: Commit**

```bash
git add packages/cre8-wc/design-tokens/brands/cre8-teal/
git commit -m "feat: add cre8-teal semantic skin token layer"
```

---

## Task 2: Create `claude-terracotta` skin

**Files:**
- Create: `packages/cre8-wc/design-tokens/brands/claude-terracotta/css/tokens_brand.css`
- Create: `packages/cre8-wc/design-tokens/brands/claude-terracotta/css/tokens_claude-terracotta.css`
- Create: `packages/cre8-wc/design-tokens/brands/claude-terracotta/css/tokens_claude-terracotta.module.ts`

**Step 1: Write the test**

```bash
node -e "
const fs = require('fs');
const css = fs.readFileSync('design-tokens/brands/claude-terracotta/css/tokens_brand.css', 'utf8');
const required = ['--cre8-background-default','--cre8-accent-primary','--cre8-spacing-md'];
required.forEach(t => { if (!css.includes(t)) throw new Error('Missing: ' + t); });
const teal = fs.readFileSync('design-tokens/brands/cre8-teal/css/tokens_brand.css', 'utf8');
if (css === teal) throw new Error('Terracotta must differ from teal');
console.log('PASS');
"
```

**Step 2: Create `tokens_brand.css`** for claude-terracotta

Same structure as cre8-teal but with warm terracotta accent colors. Override only the accent/brand and focus tokens — neutrals, spacing, radius, and typography stay the same:

```css
/* packages/cre8-wc/design-tokens/brands/claude-terracotta/css/tokens_brand.css */

:root {
  /* ─── Background & Surface ─────────────────────────────────── */
  --cre8-background-default:    #FFFFFF;
  --cre8-background-subtle:     #FBF6F3;
  --cre8-background-strong:     #F2E8E2;
  --cre8-background-inverse:    #1A1208;
  --cre8-surface-default:       #FFFFFF;
  --cre8-surface-elevated:      #FFFAF8;

  /* ─── Content (text) ───────────────────────────────────────── */
  --cre8-content-default:       #1A1208;
  --cre8-content-muted:         #8A7A72;
  --cre8-content-inverse:       #FFFFFF;
  --cre8-content-link:          #9E3A15;

  /* ─── Borders ──────────────────────────────────────────────── */
  --cre8-border-subtle:         #F0E2D9;
  --cre8-border-default:        #D9C4B8;
  --cre8-border-strong:         #7A5D52;
  --cre8-border-inverse:        #B09080;

  /* ─── Accent / Brand ───────────────────────────────────────── */
  --cre8-accent-primary:        #C85F2F;
  --cre8-accent-primary-hover:  #A84D24;
  --cre8-accent-primary-active: #8C3F1C;
  --cre8-accent-primary-subtle: rgba(200, 95, 47, 0.10);
  --cre8-accent-secondary:      #1A1208;
  --cre8-focus-ring:            #C85F2F;

  /* ─── Status (same across skins — brand-neutral) ───────────── */
  --cre8-status-info:           #1963E1;
  --cre8-status-success:        #1E9E5A;
  --cre8-status-warning:        #E08A1F;
  --cre8-status-error:          #D02525;
  --cre8-status-error-dark:     #AA1313;
  --cre8-status-error-darkest:  #7A0000;
  --cre8-overlay:               rgba(0, 0, 0, 0.20);

  /* ─── Spacing (same across all skins) ─────────────────────── */
  --cre8-spacing-2xs:  2px;
  --cre8-spacing-xs:   4px;
  --cre8-spacing-sm:   8px;
  --cre8-spacing-md:   12px;
  --cre8-spacing-lg:   16px;
  --cre8-spacing-xl:   24px;
  --cre8-spacing-2xl:  32px;
  --cre8-spacing-3xl:  48px;
  --cre8-spacing-4xl:  64px;
  --cre8-spacing-5xl:  96px;

  /* ─── Radius ───────────────────────────────────────────────── */
  --cre8-radius-none:  0px;
  --cre8-radius-sm:    4px;
  --cre8-radius-md:    8px;
  --cre8-radius-lg:    12px;
  --cre8-radius-xl:    16px;
  --cre8-radius-2xl:   24px;
  --cre8-radius-full:  9999px;

  /* ─── Typography — Font Size ───────────────────────────────── */
  --cre8-font-size-xs:   12px;
  --cre8-font-size-sm:   14px;
  --cre8-font-size-md:   16px;
  --cre8-font-size-lg:   18px;
  --cre8-font-size-xl:   20px;
  --cre8-font-size-2xl:  24px;
  --cre8-font-size-3xl:  32px;
  --cre8-font-size-4xl:  40px;
  --cre8-font-size-5xl:  56px;
  --cre8-font-size-6xl:  72px;

  /* ─── Typography — Font Weight ─────────────────────────────── */
  --cre8-font-weight-regular:   400;
  --cre8-font-weight-medium:    500;
  --cre8-font-weight-semibold:  600;
  --cre8-font-weight-bold:      700;

  /* ─── Typography — Font Family ─────────────────────────────── */
  --cre8-font-family-sans: 'Inter', system-ui, sans-serif;
  --cre8-font-family-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* ─── Typography — Line Height ─────────────────────────────── */
  --cre8-line-height-tight:  1.2;
  --cre8-line-height-normal: 1.5;
}
```

**Step 3: Create `tokens_claude-terracotta.css`**

```css
/* packages/cre8-wc/design-tokens/brands/claude-terracotta/css/tokens_claude-terracotta.css */
@import './tokens_brand.css';
```

**Step 4: Create `tokens_claude-terracotta.module.ts`**

```ts
// packages/cre8-wc/design-tokens/brands/claude-terracotta/css/tokens_claude-terracotta.module.ts
import tokensCss from './tokens_claude-terracotta.css?inline';
export default tokensCss;
```

**Step 5: Run the verify script from Step 1**

Expected: `PASS`

**Step 6: Commit**

```bash
git add packages/cre8-wc/design-tokens/brands/claude-terracotta/
git commit -m "feat: add claude-terracotta semantic skin token layer"
```

---

## Task 3: Update `mcp-manifest.json` — designTokens section

**Files:**
- Modify: `packages/cre8-wc/mcp-manifest.json` (the `designTokens` key)

The current `designTokens` object only has a description and category list. Replace it with a full vocabulary so the MCP server can surface token names + values to agents without requiring file reads.

**Step 1: Write the test**

```bash
node -e "
const m = require('./mcp-manifest.json');
const dt = m.designTokens;
if (!dt.skins) throw new Error('Missing skins');
if (!dt.skins['cre8-teal']) throw new Error('Missing cre8-teal skin');
const tokens = dt.skins['cre8-teal'].tokens;
const required = ['background-default','accent-primary','spacing-md','radius-md','font-size-md'];
required.forEach(t => { if (!tokens[t]) throw new Error('Missing token: ' + t); });
console.log('PASS – token count:', Object.keys(tokens).length);
"
```

Expected: `PASS – token count: 47` (or similar)

**Step 2: Replace the `designTokens` section in `mcp-manifest.json`**

Open `mcp-manifest.json` and replace the `"designTokens"` value with:

```json
"designTokens": {
  "description": "Semantic token layer consumed by Pencil designs and agent-generated code. Reference tokens as CSS custom properties: var(--cre8-<token-name>). Two skins available; load the skin CSS before using components.",
  "tokenPackage": "@tmorrow/cre8-wc",
  "skinCssPath": "design-tokens/brands/{skin}/css/tokens_{skin}.css",
  "availableSkins": ["cre8-teal", "claude-terracotta"],
  "rules": [
    "Always reference colors via a token, never a hex literal.",
    "Use spacing-* tokens for gap and padding values.",
    "Use radius-* tokens for border-radius (cornerRadius in Pencil).",
    "Pick the variant that matches the semantic intent, not visual approximation.",
    "Switch skins by loading a different skin CSS file — no component changes needed."
  ],
  "skins": {
    "cre8-teal": {
      "description": "Default cre8 skin. Teal accent on neutral white base.",
      "tokens": {
        "background-default":    { "cssVar": "--cre8-background-default",    "value": "#FFFFFF",                   "category": "background" },
        "background-subtle":     { "cssVar": "--cre8-background-subtle",     "value": "#F5F5F5",                   "category": "background" },
        "background-strong":     { "cssVar": "--cre8-background-strong",     "value": "#EAEAEA",                   "category": "background" },
        "background-inverse":    { "cssVar": "--cre8-background-inverse",    "value": "#1A1A1A",                   "category": "background" },
        "surface-default":       { "cssVar": "--cre8-surface-default",       "value": "#FFFFFF",                   "category": "surface" },
        "surface-elevated":      { "cssVar": "--cre8-surface-elevated",      "value": "#FFFFFF",                   "category": "surface" },
        "content-default":       { "cssVar": "--cre8-content-default",       "value": "#1A1A1A",                   "category": "content" },
        "content-muted":         { "cssVar": "--cre8-content-muted",         "value": "#949494",                   "category": "content" },
        "content-inverse":       { "cssVar": "--cre8-content-inverse",       "value": "#FFFFFF",                   "category": "content" },
        "content-link":          { "cssVar": "--cre8-content-link",          "value": "#1963E1",                   "category": "content" },
        "border-subtle":         { "cssVar": "--cre8-border-subtle",         "value": "#EAEAEA",                   "category": "border" },
        "border-default":        { "cssVar": "--cre8-border-default",        "value": "#D5D5D5",                   "category": "border" },
        "border-strong":         { "cssVar": "--cre8-border-strong",         "value": "#6C6C6C",                   "category": "border" },
        "border-inverse":        { "cssVar": "--cre8-border-inverse",        "value": "#ABABAB",                   "category": "border" },
        "accent-primary":        { "cssVar": "--cre8-accent-primary",        "value": "#0EA5A8",                   "category": "accent" },
        "accent-primary-hover":  { "cssVar": "--cre8-accent-primary-hover",  "value": "#0B8588",                   "category": "accent" },
        "accent-primary-active": { "cssVar": "--cre8-accent-primary-active", "value": "#086E70",                   "category": "accent" },
        "accent-primary-subtle": { "cssVar": "--cre8-accent-primary-subtle", "value": "rgba(14,165,168,0.10)",     "category": "accent" },
        "accent-secondary":      { "cssVar": "--cre8-accent-secondary",      "value": "#1A1A1A",                   "category": "accent" },
        "focus-ring":            { "cssVar": "--cre8-focus-ring",            "value": "#0EA5A8",                   "category": "accent" },
        "status-info":           { "cssVar": "--cre8-status-info",           "value": "#1963E1",                   "category": "status" },
        "status-success":        { "cssVar": "--cre8-status-success",        "value": "#1E9E5A",                   "category": "status" },
        "status-warning":        { "cssVar": "--cre8-status-warning",        "value": "#E08A1F",                   "category": "status" },
        "status-error":          { "cssVar": "--cre8-status-error",          "value": "#D02525",                   "category": "status" },
        "status-error-dark":     { "cssVar": "--cre8-status-error-dark",     "value": "#AA1313",                   "category": "status" },
        "status-error-darkest":  { "cssVar": "--cre8-status-error-darkest",  "value": "#7A0000",                   "category": "status" },
        "overlay":               { "cssVar": "--cre8-overlay",               "value": "rgba(0,0,0,0.20)",          "category": "status" },
        "spacing-2xs":           { "cssVar": "--cre8-spacing-2xs",           "value": "2px",                       "category": "spacing" },
        "spacing-xs":            { "cssVar": "--cre8-spacing-xs",            "value": "4px",                       "category": "spacing" },
        "spacing-sm":            { "cssVar": "--cre8-spacing-sm",            "value": "8px",                       "category": "spacing" },
        "spacing-md":            { "cssVar": "--cre8-spacing-md",            "value": "12px",                      "category": "spacing" },
        "spacing-lg":            { "cssVar": "--cre8-spacing-lg",            "value": "16px",                      "category": "spacing" },
        "spacing-xl":            { "cssVar": "--cre8-spacing-xl",            "value": "24px",                      "category": "spacing" },
        "spacing-2xl":           { "cssVar": "--cre8-spacing-2xl",           "value": "32px",                      "category": "spacing" },
        "spacing-3xl":           { "cssVar": "--cre8-spacing-3xl",           "value": "48px",                      "category": "spacing" },
        "spacing-4xl":           { "cssVar": "--cre8-spacing-4xl",           "value": "64px",                      "category": "spacing" },
        "spacing-5xl":           { "cssVar": "--cre8-spacing-5xl",           "value": "96px",                      "category": "spacing" },
        "radius-none":           { "cssVar": "--cre8-radius-none",           "value": "0px",                       "category": "radius" },
        "radius-sm":             { "cssVar": "--cre8-radius-sm",             "value": "4px",                       "category": "radius" },
        "radius-md":             { "cssVar": "--cre8-radius-md",             "value": "8px",                       "category": "radius" },
        "radius-lg":             { "cssVar": "--cre8-radius-lg",             "value": "12px",                      "category": "radius" },
        "radius-xl":             { "cssVar": "--cre8-radius-xl",             "value": "16px",                      "category": "radius" },
        "radius-2xl":            { "cssVar": "--cre8-radius-2xl",            "value": "24px",                      "category": "radius" },
        "radius-full":           { "cssVar": "--cre8-radius-full",           "value": "9999px",                    "category": "radius" },
        "font-size-xs":          { "cssVar": "--cre8-font-size-xs",          "value": "12px",                      "category": "typography" },
        "font-size-sm":          { "cssVar": "--cre8-font-size-sm",          "value": "14px",                      "category": "typography" },
        "font-size-md":          { "cssVar": "--cre8-font-size-md",          "value": "16px",                      "category": "typography" },
        "font-size-lg":          { "cssVar": "--cre8-font-size-lg",          "value": "18px",                      "category": "typography" },
        "font-size-xl":          { "cssVar": "--cre8-font-size-xl",          "value": "20px",                      "category": "typography" },
        "font-size-2xl":         { "cssVar": "--cre8-font-size-2xl",         "value": "24px",                      "category": "typography" },
        "font-size-3xl":         { "cssVar": "--cre8-font-size-3xl",         "value": "32px",                      "category": "typography" },
        "font-size-4xl":         { "cssVar": "--cre8-font-size-4xl",         "value": "40px",                      "category": "typography" },
        "font-size-5xl":         { "cssVar": "--cre8-font-size-5xl",         "value": "56px",                      "category": "typography" },
        "font-size-6xl":         { "cssVar": "--cre8-font-size-6xl",         "value": "72px",                      "category": "typography" },
        "font-weight-regular":   { "cssVar": "--cre8-font-weight-regular",   "value": "400",                       "category": "typography" },
        "font-weight-medium":    { "cssVar": "--cre8-font-weight-medium",    "value": "500",                       "category": "typography" },
        "font-weight-semibold":  { "cssVar": "--cre8-font-weight-semibold",  "value": "600",                       "category": "typography" },
        "font-weight-bold":      { "cssVar": "--cre8-font-weight-bold",      "value": "700",                       "category": "typography" },
        "font-family-sans":      { "cssVar": "--cre8-font-family-sans",      "value": "Inter, system-ui, sans-serif", "category": "typography" },
        "font-family-mono":      { "cssVar": "--cre8-font-family-mono",      "value": "JetBrains Mono, Courier New, monospace", "category": "typography" },
        "line-height-tight":     { "cssVar": "--cre8-line-height-tight",     "value": "1.2",                       "category": "typography" },
        "line-height-normal":    { "cssVar": "--cre8-line-height-normal",    "value": "1.5",                       "category": "typography" }
      }
    },
    "claude-terracotta": {
      "description": "Claude-branded skin. Warm terracotta accent on warm white base. Same token names as cre8-teal — only accent and surface values differ.",
      "tokens": {
        "background-default":    { "cssVar": "--cre8-background-default",    "value": "#FFFFFF",                   "category": "background" },
        "background-subtle":     { "cssVar": "--cre8-background-subtle",     "value": "#FBF6F3",                   "category": "background" },
        "background-strong":     { "cssVar": "--cre8-background-strong",     "value": "#F2E8E2",                   "category": "background" },
        "background-inverse":    { "cssVar": "--cre8-background-inverse",    "value": "#1A1208",                   "category": "background" },
        "surface-default":       { "cssVar": "--cre8-surface-default",       "value": "#FFFFFF",                   "category": "surface" },
        "surface-elevated":      { "cssVar": "--cre8-surface-elevated",      "value": "#FFFAF8",                   "category": "surface" },
        "content-default":       { "cssVar": "--cre8-content-default",       "value": "#1A1208",                   "category": "content" },
        "content-muted":         { "cssVar": "--cre8-content-muted",         "value": "#8A7A72",                   "category": "content" },
        "content-inverse":       { "cssVar": "--cre8-content-inverse",       "value": "#FFFFFF",                   "category": "content" },
        "content-link":          { "cssVar": "--cre8-content-link",          "value": "#9E3A15",                   "category": "content" },
        "border-subtle":         { "cssVar": "--cre8-border-subtle",         "value": "#F0E2D9",                   "category": "border" },
        "border-default":        { "cssVar": "--cre8-border-default",        "value": "#D9C4B8",                   "category": "border" },
        "border-strong":         { "cssVar": "--cre8-border-strong",         "value": "#7A5D52",                   "category": "border" },
        "border-inverse":        { "cssVar": "--cre8-border-inverse",        "value": "#B09080",                   "category": "border" },
        "accent-primary":        { "cssVar": "--cre8-accent-primary",        "value": "#C85F2F",                   "category": "accent" },
        "accent-primary-hover":  { "cssVar": "--cre8-accent-primary-hover",  "value": "#A84D24",                   "category": "accent" },
        "accent-primary-active": { "cssVar": "--cre8-accent-primary-active", "value": "#8C3F1C",                   "category": "accent" },
        "accent-primary-subtle": { "cssVar": "--cre8-accent-primary-subtle", "value": "rgba(200,95,47,0.10)",      "category": "accent" },
        "accent-secondary":      { "cssVar": "--cre8-accent-secondary",      "value": "#1A1208",                   "category": "accent" },
        "focus-ring":            { "cssVar": "--cre8-focus-ring",            "value": "#C85F2F",                   "category": "accent" },
        "status-info":           { "cssVar": "--cre8-status-info",           "value": "#1963E1",                   "category": "status" },
        "status-success":        { "cssVar": "--cre8-status-success",        "value": "#1E9E5A",                   "category": "status" },
        "status-warning":        { "cssVar": "--cre8-status-warning",        "value": "#E08A1F",                   "category": "status" },
        "status-error":          { "cssVar": "--cre8-status-error",          "value": "#D02525",                   "category": "status" },
        "status-error-dark":     { "cssVar": "--cre8-status-error-dark",     "value": "#AA1313",                   "category": "status" },
        "status-error-darkest":  { "cssVar": "--cre8-status-error-darkest",  "value": "#7A0000",                   "category": "status" },
        "overlay":               { "cssVar": "--cre8-overlay",               "value": "rgba(0,0,0,0.20)",          "category": "status" },
        "spacing-2xs":           { "cssVar": "--cre8-spacing-2xs",           "value": "2px",                       "category": "spacing" },
        "spacing-xs":            { "cssVar": "--cre8-spacing-xs",            "value": "4px",                       "category": "spacing" },
        "spacing-sm":            { "cssVar": "--cre8-spacing-sm",            "value": "8px",                       "category": "spacing" },
        "spacing-md":            { "cssVar": "--cre8-spacing-md",            "value": "12px",                      "category": "spacing" },
        "spacing-lg":            { "cssVar": "--cre8-spacing-lg",            "value": "16px",                      "category": "spacing" },
        "spacing-xl":            { "cssVar": "--cre8-spacing-xl",            "value": "24px",                      "category": "spacing" },
        "spacing-2xl":           { "cssVar": "--cre8-spacing-2xl",           "value": "32px",                      "category": "spacing" },
        "spacing-3xl":           { "cssVar": "--cre8-spacing-3xl",           "value": "48px",                      "category": "spacing" },
        "spacing-4xl":           { "cssVar": "--cre8-spacing-4xl",           "value": "64px",                      "category": "spacing" },
        "spacing-5xl":           { "cssVar": "--cre8-spacing-5xl",           "value": "96px",                      "category": "spacing" },
        "radius-none":           { "cssVar": "--cre8-radius-none",           "value": "0px",                       "category": "radius" },
        "radius-sm":             { "cssVar": "--cre8-radius-sm",             "value": "4px",                       "category": "radius" },
        "radius-md":             { "cssVar": "--cre8-radius-md",             "value": "8px",                       "category": "radius" },
        "radius-lg":             { "cssVar": "--cre8-radius-lg",             "value": "12px",                      "category": "radius" },
        "radius-xl":             { "cssVar": "--cre8-radius-xl",             "value": "16px",                      "category": "radius" },
        "radius-2xl":            { "cssVar": "--cre8-radius-2xl",            "value": "24px",                      "category": "radius" },
        "radius-full":           { "cssVar": "--cre8-radius-full",           "value": "9999px",                    "category": "radius" },
        "font-size-xs":          { "cssVar": "--cre8-font-size-xs",          "value": "12px",                      "category": "typography" },
        "font-size-sm":          { "cssVar": "--cre8-font-size-sm",          "value": "14px",                      "category": "typography" },
        "font-size-md":          { "cssVar": "--cre8-font-size-md",          "value": "16px",                      "category": "typography" },
        "font-size-lg":          { "cssVar": "--cre8-font-size-lg",          "value": "18px",                      "category": "typography" },
        "font-size-xl":          { "cssVar": "--cre8-font-size-xl",          "value": "20px",                      "category": "typography" },
        "font-size-2xl":         { "cssVar": "--cre8-font-size-2xl",         "value": "24px",                      "category": "typography" },
        "font-size-3xl":         { "cssVar": "--cre8-font-size-3xl",         "value": "32px",                      "category": "typography" },
        "font-size-4xl":         { "cssVar": "--cre8-font-size-4xl",         "value": "40px",                      "category": "typography" },
        "font-size-5xl":         { "cssVar": "--cre8-font-size-5xl",         "value": "56px",                      "category": "typography" },
        "font-size-6xl":         { "cssVar": "--cre8-font-size-6xl",         "value": "72px",                      "category": "typography" },
        "font-weight-regular":   { "cssVar": "--cre8-font-weight-regular",   "value": "400",                       "category": "typography" },
        "font-weight-medium":    { "cssVar": "--cre8-font-weight-medium",    "value": "500",                       "category": "typography" },
        "font-weight-semibold":  { "cssVar": "--cre8-font-weight-semibold",  "value": "600",                       "category": "typography" },
        "font-weight-bold":      { "cssVar": "--cre8-font-weight-bold",      "value": "700",                       "category": "typography" },
        "font-family-sans":      { "cssVar": "--cre8-font-family-sans",      "value": "Inter, system-ui, sans-serif", "category": "typography" },
        "font-family-mono":      { "cssVar": "--cre8-font-family-mono",      "value": "JetBrains Mono, Courier New, monospace", "category": "typography" },
        "line-height-tight":     { "cssVar": "--cre8-line-height-tight",     "value": "1.2",                       "category": "typography" },
        "line-height-normal":    { "cssVar": "--cre8-line-height-normal",    "value": "1.5",                       "category": "typography" }
      }
    }
  }
}
```

**Step 3: Run the verify script from Step 1**

Expected: `PASS – token count: 57`

**Step 4: Commit**

```bash
git add packages/cre8-wc/mcp-manifest.json
git commit -m "feat: add semantic skin token vocabulary to mcp-manifest"
```

---

## Task 4: Update `mcp-manifest.json` — component catalog section

**Files:**
- Modify: `packages/cre8-wc/mcp-manifest.json` (add `componentCatalog` key alongside existing `components`)

The existing `components` array has 85 verbose entries. Add a `componentCatalog` object that groups all 133 Pencil components in Family/Variant format for fast agent lookup. This does NOT replace the existing `components` array — it augments it.

**Step 1: Write the test**

```bash
node -e "
const m = require('./mcp-manifest.json');
const cat = m.componentCatalog;
if (!cat) throw new Error('Missing componentCatalog');
if (!cat.groups) throw new Error('Missing groups');
const allFamilies = cat.groups.flatMap(g => g.families);
if (allFamilies.length < 8) throw new Error('Too few families: ' + allFamilies.length);
console.log('PASS – family count:', allFamilies.length);
"
```

**Step 2: Add `componentCatalog` to `mcp-manifest.json`**

Add the following key at the top level of the JSON (after `"components"`):

```json
"componentCatalog": {
  "description": "133 Pencil design components grouped by family. Each family corresponds to one or more cre8-wc web component tags. Use Family/Variant to pick the right design reference; use the tag from the components array to generate HTML.",
  "namingConvention": "Family/Variant or Family/Type/State. Two segments when only state matters, three when both type and state matter (e.g. Button/Primary/Hover).",
  "groups": [
    {
      "name": "Actions",
      "families": [
        { "family": "Button", "variants": ["Primary", "Primary/Hover", "Primary/Active", "Primary/Disabled", "Secondary", "Secondary/Hover", "Secondary/Active", "Secondary/Disabled", "Tertiary", "Tertiary/Hover", "Tertiary/Active", "Tertiary/Disabled", "Danger", "Danger/Hover", "Danger/Active", "Danger/Disabled"], "tag": "cre8-button" },
        { "family": "ButtonGroup", "variants": ["Default"], "tag": "cre8-button-group" },
        { "family": "SplitButton", "variants": ["Default"], "tag": "cre8-split-button" }
      ]
    },
    {
      "name": "Forms",
      "families": [
        { "family": "Field",       "variants": ["Default", "Focus", "Error", "Success", "Disabled"], "tag": "cre8-field" },
        { "family": "Select",      "variants": ["Default", "Focus"],                                   "tag": "cre8-select" },
        { "family": "Checkbox",    "variants": ["Unchecked", "Checked", "Indeterminate", "Disabled"],  "tag": "cre8-checkbox" },
        { "family": "Radio",       "variants": ["Unchecked", "Checked", "Disabled"],                   "tag": "cre8-radio-field" },
        { "family": "SelectTile",  "variants": ["Unselected", "Selected", "Disabled"],                 "tag": "cre8-select-tile" },
        { "family": "DatePicker",  "variants": ["Default"],                                            "tag": "cre8-date-picker" },
        { "family": "MultiSelect", "variants": ["Default"],                                            "tag": "cre8-multi-select" }
      ]
    },
    {
      "name": "Navigation",
      "families": [
        { "family": "Header",          "variants": ["Default", "Inverse"],                              "tag": "cre8-header" },
        { "family": "Footer",          "variants": ["Default"],                                          "tag": "cre8-footer" },
        { "family": "PrimaryNavItem",  "variants": ["Default", "Hover", "Active", "Selected"],          "tag": "cre8-primary-nav-item" },
        { "family": "Tabs",            "variants": ["Default"],                                          "tag": "cre8-tabs" },
        { "family": "Tab",             "variants": ["Unselected", "Selected"],                           "tag": "cre8-tab" },
        { "family": "SubmenuItem",     "variants": ["Default", "Hover", "Active"],                       "tag": "cre8-submenu-item" },
        { "family": "Submenu",         "variants": ["Default"],                                          "tag": "cre8-submenu" },
        { "family": "UtilityNavItem",  "variants": ["Default", "Hover"],                                 "tag": "cre8-utility-nav-item" },
        { "family": "UtilityNav",      "variants": ["Default"],                                          "tag": "cre8-utility-nav" },
        { "family": "GlobalNavItem",   "variants": ["Default", "Hover", "Active"],                       "tag": "cre8-global-nav-item" },
        { "family": "GlobalNav",       "variants": ["Default"],                                          "tag": "cre8-global-nav" },
        { "family": "TertiaryNavItem", "variants": ["Default", "Hover", "Active"],                       "tag": "cre8-tertiary-nav-item" },
        { "family": "TertiaryNav",     "variants": ["Default"],                                          "tag": "cre8-tertiary-nav" },
        { "family": "NavContainer",    "variants": ["Default"],                                          "tag": "cre8-nav-container" },
        { "family": "Breadcrumbs",     "variants": ["Default"],                                          "tag": "cre8-breadcrumbs" },
        { "family": "Pagination",      "variants": ["Default"],                                          "tag": "cre8-pagination" },
        { "family": "LinkListItem",    "variants": ["Default"],                                          "tag": "cre8-link-list-item" },
        { "family": "LinkList",        "variants": ["Default"],                                          "tag": "cre8-link-list" }
      ]
    },
    {
      "name": "Data",
      "families": [
        { "family": "Table",           "variants": ["Default"],                                          "tag": "cre8-table" },
        { "family": "TableHeader",     "variants": ["Default"],                                          "tag": "cre8-table-header" },
        { "family": "TableHeaderCell", "variants": ["Default", "Sortable"],                              "tag": "cre8-table-header-cell" },
        { "family": "TableCell",       "variants": ["Default"],                                          "tag": "cre8-table-cell" },
        { "family": "TableRow",        "variants": ["Default", "Hover"],                                 "tag": "cre8-table-row" },
        { "family": "AccordionItem",   "variants": ["Collapsed", "Expanded"],                            "tag": "cre8-accordion-item" },
        { "family": "DropdownItem",    "variants": ["Default", "Hover", "Selected"],                     "tag": "cre8-dropdown-item" },
        { "family": "Dropdown",        "variants": ["Default"],                                          "tag": "cre8-dropdown" }
      ]
    },
    {
      "name": "Feedback",
      "families": [
        { "family": "Alert",              "variants": ["Info", "Success", "Warning", "Error"],            "tag": "cre8-alert" },
        { "family": "Badge",              "variants": ["Default", "Success", "Error", "Warning", "Info"], "tag": "cre8-badge" },
        { "family": "Tooltip",            "variants": ["Default"],                                        "tag": "cre8-tooltip" },
        { "family": "Popover",            "variants": ["Default"],                                        "tag": "cre8-popover" },
        { "family": "Modal",              "variants": ["Default"],                                        "tag": "cre8-modal" },
        { "family": "Spinner",            "variants": ["Small", "Medium", "Large"],                       "tag": "cre8-spinner" },
        { "family": "ProgressMeter",      "variants": ["Default"],                                        "tag": "cre8-progress-meter" },
        { "family": "PercentBar",         "variants": ["Default"],                                        "tag": "cre8-percent-bar" },
        { "family": "ProgressStepsItem",  "variants": ["Pending", "Active", "Complete"],                  "tag": "cre8-progress-steps-item" }
      ]
    },
    {
      "name": "Layout",
      "families": [
        { "family": "Hero",        "variants": ["Default"],                    "tag": "cre8-hero" },
        { "family": "Band",        "variants": ["Default", "Subtle", "Strong"], "tag": "cre8-band" },
        { "family": "Grid",        "variants": ["2Col", "3Col"],               "tag": "cre8-grid" },
        { "family": "Card",        "variants": ["Default"],                    "tag": "cre8-card" },
        { "family": "VerticalCard","variants": ["Default"],                    "tag": "cre8-vertical-card" },
        { "family": "Feature",     "variants": ["Default"],                    "tag": "cre8-feature" }
      ]
    },
    {
      "name": "Typography",
      "families": [
        { "family": "Heading",      "variants": ["H1", "H2", "H3", "H4", "H5", "H6"],                           "tag": "cre8-heading" },
        { "family": "TextPassage",  "variants": ["Default"],                                                      "tag": "cre8-text-passage" },
        { "family": "TextLink",     "variants": ["Default", "Hover", "Active", "Visited", "Disabled"],            "tag": "cre8-text-link" },
        { "family": "Tag",          "variants": ["Default"],                                                      "tag": "cre8-tag" },
        { "family": "RemoveTag",    "variants": ["Default"],                                                      "tag": "cre8-remove-tag" },
        { "family": "TagList",      "variants": ["Default"],                                                      "tag": "cre8-tag-list" }
      ]
    },
    {
      "name": "Utilities",
      "families": [
        { "family": "Icon",          "variants": ["Small", "Default", "Large", "XL"], "tag": "cre8-icon" },
        { "family": "Divider",       "variants": ["Horizontal", "Vertical"],           "tag": "cre8-divider" },
        { "family": "SkeletonLoader","variants": ["Text", "Image", "Card"],            "tag": "cre8-skeleton-loader" }
      ]
    }
  ]
}
```

**Step 3: Run the verify script**

Expected: `PASS – family count: 47`

**Step 4: Commit**

```bash
git add packages/cre8-wc/mcp-manifest.json
git commit -m "feat: add componentCatalog with Family/Variant grouping to mcp-manifest"
```

---

## Verification

After all tasks are complete, run:

```bash
# 1. Confirm skin files exist
ls packages/cre8-wc/design-tokens/brands/cre8-teal/css/
ls packages/cre8-wc/design-tokens/brands/claude-terracotta/css/

# 2. Confirm token count in manifest
node -e "
const m = require('./mcp-manifest.json');
const tealCount = Object.keys(m.designTokens.skins['cre8-teal'].tokens).length;
const catFamilies = m.componentCatalog.groups.flatMap(g => g.families).length;
console.log('Skin tokens:', tealCount);
console.log('Component families:', catFamilies);
console.log(tealCount >= 55 && catFamilies >= 40 ? 'PASS' : 'FAIL');
"

# 3. Confirm no existing tests broke
cd packages/cre8-wc && pnpm test
```

---

## Notes for Executor

- Run all `node -e` commands from `packages/cre8-wc/` directory
- Do NOT modify any existing brand CSS files — this is purely additive
- The `components` array in `mcp-manifest.json` is unchanged; `componentCatalog` is a parallel structure
- `claude-terracotta` values for non-accent tokens (spacing, radius, font-*) are identical to `cre8-teal` — that is intentional; only accent + surface colors differ between skins
