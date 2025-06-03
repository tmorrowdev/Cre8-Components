# Femmecubator Design Tokens

This directory contains the design tokens for the Femmecubator brand, structured to match the pattern used by the cre8 brand.

## File Structure

- `tokens_femmecubator.css` - Main entry point that imports all token files
- `tokens_equity_restructured.css` - Base design tokens (colors, spacing, typography, etc.) restructured to match cre8 pattern
- `tokens_components.css` - Component-specific tokens organized by component type

## Token Organization

The tokens follow a specific naming structure:

```
--cre8-[category]-[component]-[property]-[state]
```

For example:
- `--cre8-color-button-primary-bg-hover`
- `--cre8-spacing-s`
- `--cre8-border-radius-default`

## Categories

### Base Tokens
- **Color**: Brand colors, UI colors, status colors
- **Spacing**: Spacing scale
- **Border**: Border radius, width, and style
- **Typography**: Font size, weight, family
- **Shadow**: Box shadows
- **Breakpoints**: Responsive breakpoints

### Component Tokens
Component-specific tokens are organized by component type:
- Header
- Footer
- Button (Primary, Secondary, Tertiary)
- Form elements

## Usage

To use these tokens, import the main tokens file:

```css
@import './tokens_femmecubator.css';
```

Or use individual token files if needed:

```css
@import './tokens_equity_restructured.css';
@import './tokens_components.css';
```
