# Prisma Design Tokens

This directory contains the design tokens for the Prisma brand, structured to match the pattern used by the cre8 design system.

## File Structure

- `figma-tokens.css` – CSS custom properties generated from Figma design tokens, mapped to the required semantic variables for the Prisma brand.
- `tokens_prisma.module.ts` – TypeScript module exporting the Prisma theme as a Lit CSS template literal, containing all required variables as per the design system's theme specification.

## Token Organization

Tokens follow the semantic naming structure required by the cre8 design system:

```
--cre8-[category]-[component]-[property]-[state]
```

For example:
- `--cre8-color-button-primary-bg-hover`
- `--cre8-spacing-16`
- `--cre8-typography-title-large-font-family`

## Categories

### Base Tokens
- **Color**: Brand, UI, and status colors
- **Spacing**: Spacing scale
- **Typography**: Font family, size, weight, and text transform
- **Border**: Border radius, width, and style

### Component Tokens
Component-specific tokens are organized by component type:
- Header
- Footer
- Button (Primary, Secondary, Tertiary)

## Usage

To use these tokens in your project, import the CSS or TypeScript module as needed:

```css
@import './figma-tokens.css';
```

Or in TypeScript (Lit):

```ts
import { prisma } from './tokens_prisma.module.js';
```

## Notes
- All required semantic variables are present in both files, with no extras, as per the design system's theme requirements.
- If you need to regenerate or update the tokens, ensure the output matches the strict variable list and format from the theme-generator.prompt.md.
