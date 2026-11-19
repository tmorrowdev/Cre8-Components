# AGENTS.md — @tmorrow/cre8-wc

Lit web components, generated React wrappers, the A2UI catalog, and the design
tokens. Ten things a coding agent must know before touching this package. Details
live in the knowledge base (`docs/kb/` at the repo root); this file links rather
than repeats.

1. **Load a theme or nothing is styled.** Components read every value from
   `--cre8-*` custom properties. Import one theme sheet at the app entry:
   `import '@tmorrow/cre8-wc/themes/cre8'`. Unstyled components mean this is
   missing. → [Loading a theme](../../docs/kb/03-token-theming.md#loading-a-theme)

2. **Never write a hex value (or px colour, or literal font) in component or app
   CSS.** Read a semantic token (`var(--cre8-bg-brand-strong)`,
   `var(--cre8-content-default)`). Literals live only in `brand.json`. A token not
   in [`reference/tokens.md`](../../docs/kb/reference/tokens.md) does not exist, and
   `var()` on it renders nothing.

3. **Token tiers: seed → primitive → semantic → component.** Change seeds (via
   `brand.json`), read semantic tokens, never edit primitives, leave component
   tokens alone. `--cre8-color-*` names are legacy aliases: do not use them in new
   code. → [The four tiers](../../docs/kb/03-token-theming.md#the-four-tiers)

4. **Rebrand via `design-tokens/brands/<name>/brand.json`, nothing else.** It
   validates against `design-tokens/schema/brand.schema.json`. Everything in that
   brand's `css/` is generated: never hand-edit it. Interface:
   `design-tokens/BRAND_CONTRACT.md`. →
   [Rebrand in three steps](../../docs/kb/03-token-theming.md#rebrand-in-three-steps)

5. **Scope and modes are attributes.** `data-cre8-theme` on an element re-resolves
   the token stack there (subtree rebrand); `data-mode="inverse"` or `"auto"` sets
   dark/auto mode, page-wide on `<html>` or scoped together with
   `data-cre8-theme`. The `inverted` prop is not dark mode. →
   [Dark mode and modes](../../docs/kb/03-token-theming.md#dark-mode-and-modes-in-general)

6. **Use the MCP server instead of reading source.** `packages/cre8-mcp` answers
   what you would otherwise grep for: `cre8_guide` (start here),
   `get_content_model`, `get_composition`, `validate_a2ui_spec`, `list_tokens`,
   `get_brand_contract`, `validate_brand`, `apply_brand`, and the `ui_*` live
   surface tools. → [The tool surface](../../docs/kb/05-ai-fluency.md#the-tool-surface)

7. **Children vs slots is per component and cannot be guessed.** Every component
   takes content through `children` or `slots`, never both; a button's label is
   the `text` prop. Look it up (`get_content_model`,
   [`reference/content-model.md`](../../docs/kb/reference/content-model.md)) before
   emitting a container.

8. **The catalog is generated; edit its sources.** Component source →
   `mcp-manifest.json` (`pnpm build:mcp-manifest`) → `a2ui/catalog.json`,
   `catalog.compact.json`, `catalog-kg.json` (`pnpm build:a2ui`). Which components
   may go in which slot is the hand-maintained `a2ui/slot-eligibility.json`. Never
   hand-edit `catalog*.json` or the React wrappers (`pnpm build:react`). →
   [Keeping the A2UI artifacts in sync](../../docs/kb/04-a2ui.md#keeping-the-a2ui-artifacts-in-sync)

9. **Styling inside a component goes through tokens, `::part()`, or nothing.**
   Your selectors do not reach shadow DOM, and only a few components expose parts
   ([`reference/parts.md`](../../docs/kb/reference/parts.md)). If neither works, the
   component needs a token or part upstream. →
   [Styling across the shadow boundary](../../docs/kb/03-token-theming.md#styling-across-the-shadow-boundary)

10. **Verify before you say done.** In this package: `pnpm tokens:check` (every
    brand validates, passes contrast, and its generated CSS is current),
    `pnpm test:a2ui` (catalog smoke, stream, render audit, layer parity), and
    `pnpm test` for unit tests. At the repo root: `pnpm kb:check` if you touched
    `docs/kb`. A green validator means "consistent with the catalog", not
    "correct" — look at what renders. →
    [Verifying a theme](../../docs/kb/03-token-theming.md#verifying-a-theme)
