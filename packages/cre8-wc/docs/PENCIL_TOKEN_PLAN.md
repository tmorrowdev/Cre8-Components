# Pencil.app Token Architecture Plan

## Objective
Create the cre8 design token architecture from `packages/cre8-design-tokens/lib/web/brands/blue/css/tokens_brand.css` as variables in the Pencil.app cre8.pen file.

## Source Files
- **Base tokens**: `packages/cre8-design-tokens/lib/web/brands/blue/css/tokens_brand.css`
- **Typography tokens**: `packages/cre8-design-tokens/lib/web/brands/blue/css/tokens_blue.css`
- **Target**: `/Users/tylersmbp/Projects/cre8-web-components/cre8.pen`

## Token Architecture

### 1. Spacing Tokens
```
--cre8-spacing-0: 0rem
--cre8-spacing-2: 0.125rem (2px)
--cre8-spacing-4: 0.25rem (4px)
--cre8-spacing-6: 0.375rem (6px)
--cre8-spacing-8: 0.5rem (8px)
--cre8-spacing-12: 0.75rem (12px)
--cre8-spacing-14: 0.875rem (14px)
--cre8-spacing-16: 1rem (16px)
--cre8-spacing-18: 1.125rem (18px)
--cre8-spacing-24: 1.5rem (24px)
--cre8-spacing-32: 2rem (32px)
--cre8-spacing-40: 2.5rem (40px)
--cre8-spacing-48: 3rem (48px)
--cre8-spacing-64: 4rem (64px)
--cre8-spacing-80: 5rem (80px)
--cre8-spacing-96: 6rem (96px)
--cre8-spacing-120: 7.5rem (120px)
--cre8-spacing-160: 10rem (160px)
```

### 2. Core Color Tokens

#### Background Colors
```
--cre8-color-bg-default: #ffffff
--cre8-color-bg-subtle: #f4f4f4
--cre8-color-bg-moderate: #858585
--cre8-color-bg-inverse-moderate: #adadad
--cre8-color-bg-knockout: #333333
--cre8-color-bg-disabled: #ebebeb
--cre8-color-bg-strong: #333333
--cre8-color-bg-active: #333333
--cre8-color-bg-inverse-active: #ffffff
--cre8-color-bg-opacity-transparent: rgba(51, 51, 51, 0.0)
--cre8-color-bg-opacity-default: rgba(51, 51, 51, 0.50)
```

#### Background Brand Colors
```
--cre8-color-bg-brand: #e6ebff
--cre8-color-bg-brand-strong: #0033ff
--cre8-color-bg-brand-strong-hover: #001f99
--cre8-color-bg-brand-strong-active: #001466
--cre8-color-bg-brand-hover: #ccd6ff
--cre8-color-bg-brand-active: #99adff
--cre8-color-bg-brand-xstrong: #110081
--cre8-color-bg-brand-xstrong-hover: #0a004d
--cre8-color-bg-brand-xstrong-active: #070034
--cre8-color-bg-default-hover: #e6ebff
--cre8-color-bg-default-active: #ccd6ff
```

#### Background Semantic Colors
```
--cre8-color-bg-success: #dae6d1
--cre8-color-bg-success-strong: #488319
--cre8-color-bg-error: #f1cccc
--cre8-color-bg-error-strong: #ba0000
--cre8-color-bg-warning: #fff5d6
--cre8-color-bg-warning-strong: #FFCD34
--cre8-color-bg-info: #ccd6ff
--cre8-color-bg-info-strong: #110081
--cre8-color-bg-attention: #ccd6ff
--cre8-color-bg-attention-strong: #110081
```

#### Content Colors
```
--cre8-color-content-default: #333333
--cre8-color-content-subtle: #5c5c5c
--cre8-color-content-disabled: #858585
--cre8-color-content-knockout: #ffffff
--cre8-color-content-brand: #0033ff
--cre8-color-content-brand-strong: #110081
--cre8-color-content-brand-knockout: #ccd6ff
--cre8-color-content-success: #3a6914
--cre8-color-content-success-icon: #488319
--cre8-color-content-error: #ba0000
--cre8-color-content-error-icon: #ba0000
--cre8-color-content-warning-icon: #333333
--cre8-color-content-info-icon: #110081
--cre8-color-content-attention-icon: #110081
```

#### Link Colors
```
--cre8-color-content-link: #0033ff
--cre8-color-content-inverse-link: #ffffff
--cre8-color-content-link-hover: #110081
--cre8-color-content-inverse-link-hover: #ccd6ff
--cre8-color-content-link-focus: #ffffff
--cre8-color-content-inverse-link-focus: #333333
--cre8-color-content-link-active: #001466
--cre8-color-content-inverse-link-active: #ccd6ff
--cre8-color-content-link-visited: #8032df
--cre8-color-content-inverse-link-visited: #e6ebff
--cre8-color-content-link-disabled: #858585
--cre8-color-content-inverse-link-disabled: #d6d6d6
--cre8-color-link-bg-active: #333333
```

#### Border Colors
```
--cre8-color-border-default: #d6d6d6
--cre8-color-border-strong: #707070
--cre8-color-border-knockout: #ffffff
--cre8-color-border-disabled: #999999
--cre8-color-border-brand: #0033ff
--cre8-color-border-brand-subtle: #ccd6ff
--cre8-color-border-brand-strong: #110081
--cre8-color-border-success: #488319
--cre8-color-border-error: #c83333
--cre8-color-border-warning: #FFCD34
--cre8-color-border-info: #110081
--cre8-color-border-attention: #110081
--cre8-color-border-transparent: rgba(51, 51, 51, 0.0)
--cre8-color-border-active-outline: #1f1f1f
```

### 3. Button Color Tokens

#### Primary Button
```
--cre8-color-button-primary-bg: #0033ff
--cre8-color-button-primary-inverse-bg: #ffffff
--cre8-color-button-primary-bg-hover: #001f99
--cre8-color-button-primary-inverse-bg-hover: #e6ebff
--cre8-color-button-primary-bg-active: #001466
--cre8-color-button-primary-inverse-bg-active: #ccd6ff
--cre8-color-button-primary-bg-disabled: #8099ff
--cre8-color-button-primary-inverse-bg-disabled: #8880c0
--cre8-color-button-primary-content: #ffffff
--cre8-color-button-primary-inverse-content: #0033ff
--cre8-color-button-primary-content-disabled: #ffffff
--cre8-color-button-primary-inverse-content-disabled: #584da7
--cre8-color-button-primary-border: #0033ff
--cre8-color-button-primary-inverse-border: #ffffff
--cre8-color-button-primary-outline: #333333
--cre8-color-button-primary-inverse-outline: #ffffff
```

#### Primary Danger Button
```
--cre8-color-button-primary-danger-bg: #ba0000
--cre8-color-button-primary-danger-bg-hover: #700000
--cre8-color-button-primary-danger-bg-active: #4a0000
--cre8-color-button-primary-danger-bg-disabled: #ebebeb
--cre8-color-button-primary-danger-content: #ffffff
--cre8-color-button-primary-danger-content-disabled: #999999
--cre8-color-button-primary-danger-border: #ba0000
```

#### Secondary Button
```
--cre8-color-button-secondary-bg: rgba(51, 51, 51, 0.0)
--cre8-color-button-secondary-bg-hover: #e6ebff
--cre8-color-button-secondary-bg-active: #ccd6ff
--cre8-color-button-secondary-content: #0033ff
--cre8-color-button-secondary-border: #0033ff
--cre8-color-button-secondary-border-disabled: #8099ff
--cre8-color-button-secondary-content-disabled: #8099ff
```

#### Tertiary Button
```
--cre8-color-button-tertiary-bg: rgba(51, 51, 51, 0.0)
--cre8-color-button-tertiary-bg-active: #ccd6ff
--cre8-color-button-tertiary-content: #0033ff
--cre8-color-button-tertiary-border: rgba(51, 51, 51, 0.0)
--cre8-color-button-tertiary-border-hover: #0033ff
--cre8-color-button-tertiary-content-disabled: #999999
```

### 4. Typography Tokens

#### Font Sizes
```
--cre8-font-size-0: 0.75rem (12px)
--cre8-font-size-1: 0.875rem (14px)
--cre8-font-size-2: 1rem (16px)
--cre8-font-size-3: 1.125rem (18px)
--cre8-font-size-4: 1.25rem (20px)
--cre8-font-size-5: 1.5rem (24px)
--cre8-font-size-6: 1.75rem (28px)
--cre8-font-size-7: 2rem (32px)
--cre8-font-size-8: 2.5rem (40px)
--cre8-font-size-9: 3rem (48px)
--cre8-font-size-10: 3.5rem (56px)
--cre8-font-size-11: 4rem (64px)
--cre8-font-size-12: 4.5rem (72px)
--cre8-font-size-13: 5rem (80px)
```

#### Font Families
```
--cre8-font-families-value-serif-pro: "Value Serif Pro", serif
--cre8-font-families-value-sans-pro: "Value Sans Pro", sans-serif
```

#### Font Weights
```
--cre8-font-weights-value-serif-pro-0: 700 (bold)
--cre8-font-weights-value-sans-pro-1: 700 (bold)
--cre8-font-weights-value-sans-pro-2: 400 (regular)
--cre8-font-weights-value-sans-pro-3: 500 (medium)
```

#### Line Heights
```
--cre8-line-heights-0: 1.25
--cre8-line-heights-1: 1.12
--cre8-line-heights-2: 1.14
--cre8-line-heights-3: 1.2
--cre8-line-heights-4: 1.3
--cre8-line-heights-5: 1.33
--cre8-line-heights-6: 1.4
--cre8-line-heights-7: 1.5
```

### 5. Border Radius Tokens
```
--cre8-border-radius-none: 0px
--cre8-border-radius-small: 4px
--cre8-border-radius-default: 8px
--cre8-border-radius-large: 30px
--cre8-border-radius-round: 900px
--cre8-border-radius-button: 900px
--cre8-border-radius-badge: 4px
--cre8-border-radius-tabs: 4px
--cre8-border-radius-container: 30px
--cre8-border-radius-field: 8px
--cre8-border-radius-field-brand: 900px
--cre8-border-radius-brand: 900px
```

### 6. Border Width Tokens
```
--cre8-border-width-none: 0rem
--cre8-border-width-default: 0.0625rem (1px)
--cre8-border-width-focus: 0.125rem (2px)
--cre8-border-width-large: 0.25rem (4px)
--cre8-border-width-button-default: 0.125rem (2px)
--cre8-border-width-tab-selected: 0.125rem (2px)
--cre8-border-width-tab-default: 0.125rem (2px)
```

### 7. Shadow Tokens
```
--cre8-shadow-none: none
--cre8-shadow-small: 0 1px 2px 1px rgba(0,0,0,0.2)
--cre8-shadow-default: 0 8px 6px 0 rgba(0,0,0,0.1)
--cre8-shadow-large: 0 10px 12px 0 rgba(0,0,0,0.2)
--cre8-shadow-button: none
```

### 8. Breakpoint Tokens
```
--cre8-breakpoint-xsm: 375px
--cre8-breakpoint-sm: 560px
--cre8-breakpoint-md: 768px
--cre8-breakpoint-lg: 960px
--cre8-breakpoint-xl: 1200px
--cre8-breakpoint-xxl: 1400px
```

### 9. Icon Size Tokens
```
--cre8-icon-size-small: 0.875rem (14px)
--cre8-icon-size-default: 1rem (16px)
--cre8-icon-size-large: 1.125rem (18px)
```

### 10. Component-Specific Tokens

#### Button Padding
```
--cre8-button-padding-vertical-small: 0.5rem
--cre8-button-padding-vertical-medium: 0.75rem
--cre8-button-padding-vertical-large: 1rem
--cre8-button-padding-horizontal-small: 1rem
--cre8-button-padding-horizontal-medium: 1.5rem
--cre8-button-padding-horizontal-large: 2rem
```

#### Badge Padding
```
--cre8-badge-padding-horizontal: 0.5rem
--cre8-badge-padding-vertical: 0.125rem
```

#### Progress Meter
```
--cre8-progress-meter-height: 1rem
```

## Implementation Steps

1. Open Pencil.app
2. Open `/Users/tylersmbp/Projects/cre8-web-components/cre8.pen`
3. Use `mcp__pencil__set_variables` to create the token architecture
4. Organize variables into logical groups (colors, spacing, typography, etc.)
5. Verify the variables are correctly set using `mcp__pencil__get_variables`

## Command to Execute

When Pencil.app is ready, run:
```
create the token architecture from this plan file in pencil.app variables
```

## Notes
- The "blue" brand uses `#0033ff` as the primary brand color
- Typography uses "Value Serif Pro" for display/headlines and "Value Sans Pro" for body text
- Button border radius is fully rounded (900px pill shape)
- The design system supports both regular and inverse color modes
