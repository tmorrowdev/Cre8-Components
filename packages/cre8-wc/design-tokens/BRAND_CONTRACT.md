# Brand contract (shared interface for the modernization work)

`schema/brand.schema.json` defines a brand. Each brand directory holds a
`brand.json` that validates against it. Everything else in the brand
directory (`css/tokens_brand.css`, `css/tokens_<name>.css`, `css/fonts.css`,
`css/tokens_<name>.module.ts`) is GENERATED from `brand.json` and must not be
hand-edited.

## Module: `design-tokens/tools/brand.mjs` (owned by the tokens workstream)

Plain ESM, Node 22, no build step, dependencies limited to `ajv` (+ `ajv-formats`)
and `culori` for colour math. Exports:

```js
loadBrand(nameOrPath)            // -> brand object, with `extends` chain merged; throws on unknown brand
validateBrand(brand)             // -> { ok: boolean, errors: string[], warnings: string[] }
                                 //    schema errors + contrast failures in errors; each `overrides` entry is a warning
generateBrandCss(brand, opts?)   // -> { brandCss, themeCss, fontsCss }  (strings; contents of the three css files)
                                 //    opts.scope: CSS selector to scope to instead of `:root, [data-cre8-theme]`
checkContrast(brand)             // -> { target: 'AA'|'AAA', pairs: [{ fg, bg, mode, ratio, required, pass }], pass: boolean }
listTokens({ tier? })            // -> [{ name, tier: 'seed'|'primitive'|'semantic'|'component'|'legacy', value, description? }]
resolveToken(brand, name, mode?) // -> concrete colour/dimension string after resolving the var() chain for that brand
```

CLI wrappers (package.json scripts in packages/cre8-wc):
- `pnpm tokens:build [brand]`  regenerate one or all brands
- `pnpm tokens:check`          validate every brand + contrast; non-zero exit on failure; also fails if generated css is stale

## Other workstreams consume, never edit, the above
- cre8-mcp tools import `brand.mjs` (relative path from the monorepo root).
- CI / render audit iterates `design-tokens/brands/*/brand.json`.
