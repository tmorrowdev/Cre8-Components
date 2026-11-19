# Brand contract (shared interface for the modernization work)

`schema/brand.schema.json` defines a brand. Each brand directory holds a
`brand.json` that validates against it. Everything else in the brand
directory (`css/tokens_brand.css`, `css/tokens_<name>.css`, `css/fonts.css`,
`css/tokens_<name>.module.ts`) is GENERATED from `brand.json` and must not be
hand-edited.

## Module: `design-tokens/tools/brand.mjs` (owned by the tokens workstream)

Plain ESM, Node 22, no build step. The only dependency is `ajv` (2020-12
schema validation, devDependency of @tmorrow/cre8-wc). Colour math (OKLab /
OKLCH, CSS relative colour, CSS Color 4 gamut mapping, WCAG 2.x contrast) is
implemented in `tools/lib/color.mjs`, so `culori` is not needed. Exports:

```js
loadBrand(nameOrPath)            // -> brand object, with `extends` chain merged; throws on unknown brand
validateBrand(brand)             // -> { ok: boolean, errors: string[], warnings: string[] }
                                 //    schema errors + contrast failures in errors; each `overrides` entry
                                 //    and each `accessibility.waive` entry is a warning
generateBrandCss(brand, opts?)   // -> { brandCss, themeCss, fontsCss }  (strings; contents of the three css files)
                                 //    opts.scope: CSS selector to scope to instead of `:root, [data-cre8-theme]`
checkContrast(brand, opts?)      // -> { target: 'AA'|'AAA', pairs: [{ fg, bg, mode, ratio, required, pass,
                                 //      waived, kind, fgValue, bgValue }], pass: boolean, corrections: string[] }
                                 //    reports on the css that ships (after auto-correction);
                                 //    opts.autoCorrect: false shows the uncorrected pairs
listTokens({ tier?, brand? })    // -> [{ name, tier: 'seed'|'primitive'|'semantic'|'component'|'legacy', value, description? }]
                                 //    brand defaults to cre8
resolveToken(brand, name, mode?) // -> concrete colour/dimension string after resolving the var() chain for that brand
                                 //    name with or without `--cre8-`; mode 'light' (default) | 'inverse';
                                 //    colours come back as #rrggbb, or #rrggbbaa when translucent
```

Additive helpers (not required by consumers): `generateBrandFiles(brand, { withModule })`
(every generated file keyed by path), `listBrands()`, `CONTRAST_PAIRS`, `BRANDS_DIR`,
`DESIGN_TOKENS_DIR`, `GENERATED_BANNER`.

### Contrast guard
`CONTRAST_PAIRS` lists what is checked: content-default on bg-default and
bg-subtle, content-subtle / content-link / content-brand / content-error on
bg-default, content-knockout on bg-brand-strong (light and inverse), status
text on its tint (light only; the tints are not mode-aware), and 3:1 UI pairs
for border-strong and the focus ring. Text needs 4.5:1 (AA) or 7:1 (AAA).
A failing derived pair is corrected by the generator to the first passing
ramp step (or, for a fill the knockout barely reads on, the dark knockout),
and the choice is recorded in the generated file's header and next to the
mode block. A brand may instead accept a known failure with
`accessibility.waive: [{ fg, bg, mode?, reason }]`; waived pairs are left as
they are, reported as warnings, and do not fail the check. No shipped brand
uses a waiver; cre8's corrections (primary-600 button and links, darker status
text) are listed in its generated sheet's header.

### Schema additions since the first draft
- `colorScheme: 'light' | 'auto'` — `auto` also applies the inverse mode to a
  document with no `data-mode` when the system prefers dark.
- `accessibility.waive` — see above.
- Descriptions corrected: `typography.baseSize` is font-size-2 (body), and
  unset `scaleRatio` keeps cre8's hand-tuned steps; unset `color.info` reads
  the accent ramp.

CLI wrappers (package.json scripts in packages/cre8-wc):
- `pnpm tokens:build [brand]`  regenerate one or all brands
- `pnpm tokens:check [brand]`  validate every brand + contrast; non-zero exit on failure; also fails if generated css is stale
- `pnpm test:tokens`           node:test suite for the generator (design-tokens/tools/*.test.mjs)

Generated files start with "GENERATED from brand.json by tools/brand.mjs — do not edit".
A brand keeps a `css/tokens_<name>.module.ts` (Storybook's inlined copy) only if it already has one.

## Other workstreams consume, never edit, the above
- cre8-mcp tools import `brand.mjs` (relative path from the monorepo root).
- CI / render audit iterates `design-tokens/brands/*/brand.json`.
