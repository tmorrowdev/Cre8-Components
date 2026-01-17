export default `:root {
  /* ==========================================================================
   * Starbucks Theme - Complete Design Token Set
   * Primary: #00704A (Starbucks Green) | Brand Strong: #1E3932 (Dark Green)
   * Accent: #D4E9E2 (Light Green)
   * Font: SoDo Sans (fallback: Helvetica Neue)
   * Border Radius: 4px default (subtle rounding)
   * ========================================================================== */

  /* ==========================================================================
   * SPACING TOKENS
   * ========================================================================== */
  --cre8-spacing-0: 0rem;
  --cre8-spacing-2: 0.125rem;
  --cre8-spacing-4: 0.25rem;
  --cre8-spacing-6: 0.375rem;
  --cre8-spacing-8: 0.5rem;
  --cre8-spacing-12: 0.75rem;
  --cre8-spacing-14: 0.875rem;
  --cre8-spacing-16: 1rem;
  --cre8-spacing-18: 1.125rem;
  --cre8-spacing-24: 1.5rem;
  --cre8-spacing-32: 2rem;
  --cre8-spacing-40: 2.5rem;
  --cre8-spacing-48: 3rem;
  --cre8-spacing-64: 4rem;
  --cre8-spacing-80: 5rem;
  --cre8-spacing-96: 6rem;
  --cre8-spacing-120: 7.5rem;
  --cre8-spacing-160: 10rem;

  /* ==========================================================================
   * BACKGROUND COLORS
   * ========================================================================== */
  --cre8-color-bg-default: #ffffff;
  --cre8-color-bg-subtle: #f2f0eb;
  --cre8-color-bg-moderate: #7c7c7c;
  --cre8-color-bg-inverse-moderate: #a6a6a6;
  --cre8-color-bg-knockout: #1E3932;
  --cre8-color-bg-strong: #1E3932;
  --cre8-color-bg-disabled: #e5e5e5;
  --cre8-color-bg-active: #1E3932;
  --cre8-color-bg-inverse-active: #ffffff;

  /* Brand Background Colors */
  --cre8-color-bg-brand: #D4E9E2;
  --cre8-color-bg-brand-strong: #00704A;
  --cre8-color-bg-brand-strong-hover: #006241;
  --cre8-color-bg-brand-strong-active: #1E3932;
  --cre8-color-bg-brand-hover: #B8DCD1;
  --cre8-color-bg-brand-active: #9CCFC0;
  --cre8-color-bg-brand-xstrong: #1E3932;
  --cre8-color-bg-brand-xstrong-hover: #142825;
  --cre8-color-bg-brand-xstrong-active: #0A1918;
  --cre8-color-bg-default-hover: #D4E9E2;
  --cre8-color-bg-default-active: #B8DCD1;

  /* Semantic Background Colors */
  --cre8-color-bg-success: #D4E9E2;
  --cre8-color-bg-success-strong: #00704A;
  --cre8-color-bg-error: #fce8e6;
  --cre8-color-bg-error-strong: #d53b32;
  --cre8-color-bg-warning: #fef3cd;
  --cre8-color-bg-warning-strong: #cda000;
  --cre8-color-bg-info: #e3f1fd;
  --cre8-color-bg-info-strong: #006aff;
  --cre8-color-bg-attention: #e3f1fd;
  --cre8-color-bg-attention-strong: #006aff;

  /* Opacity Background Colors */
  --cre8-color-bg-opacity-transparent: rgba(0, 0, 0, 0.0);
  --cre8-color-bg-opacity-default: rgba(0, 0, 0, 0.50);

  /* ==========================================================================
   * CONTENT/TEXT COLORS
   * ========================================================================== */
  --cre8-color-content-default: #1E3932;
  --cre8-color-content-subtle: #464646;
  --cre8-color-content-disabled: #7c7c7c;
  --cre8-color-content-knockout: #ffffff;
  --cre8-color-content-brand: #00704A;
  --cre8-color-content-brand-strong: #1E3932;
  --cre8-color-content-brand-knockout: #D4E9E2;

  /* Semantic Content Colors */
  --cre8-color-content-success: #00704A;
  --cre8-color-content-success-icon: #00704A;
  --cre8-color-content-error: #d53b32;
  --cre8-color-content-error-icon: #d53b32;
  --cre8-color-content-warning-icon: #cda000;
  --cre8-color-content-info-icon: #006aff;
  --cre8-color-content-attention-icon: #006aff;

  /* Link Colors */
  --cre8-color-content-link: #00704A;
  --cre8-color-content-inverse-link: #ffffff;
  --cre8-color-content-link-hover: #1E3932;
  --cre8-color-content-inverse-link-hover: #D4E9E2;
  --cre8-color-content-link-focus: #ffffff;
  --cre8-color-content-inverse-link-focus: #1E3932;
  --cre8-color-content-link-active: #1E3932;
  --cre8-color-content-inverse-link-active: #D4E9E2;
  --cre8-color-content-link-disabled: #7c7c7c;
  --cre8-color-content-inverse-link-disabled: #a6a6a6;
  --cre8-color-content-link-visted: #1E3932;
  --cre8-color-content-inverse-link-visted: #B8DCD1;

  /* ==========================================================================
   * BORDER COLORS
   * ========================================================================== */
  --cre8-color-border-default: #c8c8c8;
  --cre8-color-border-strong: #7c7c7c;
  --cre8-color-border-knockout: #ffffff;
  --cre8-color-border-disabled: #a6a6a6;
  --cre8-color-border-brand: #00704A;
  --cre8-color-border-brand-subtle: #D4E9E2;
  --cre8-color-border-brand-strong: #1E3932;
  --cre8-color-border-success: #00704A;
  --cre8-color-border-error: #d53b32;
  --cre8-color-border-warning: #cda000;
  --cre8-color-border-info: #006aff;
  --cre8-color-border-attention: #006aff;
  --cre8-color-border-transparent: rgba(0, 0, 0, 0.0);
  --cre8-color-border-active-outline: #1E3932;
  --cre8-color-link-bg-active: #1E3932;

  /* ==========================================================================
   * HEADER COLORS
   * ========================================================================== */
  --cre8-color-header-bg-default: #ffffff;
  --cre8-color-header-inverse-bg-default: #1E3932;
  --cre8-color-header-bg-secondary: #00704A;
  --cre8-color-header-inverse-bg-secondary: #ffffff;
  --cre8-color-header-bg-tertiary: #1E3932;
  --cre8-color-header-inverse-bg-tertiary: #ffffff;

  /* Header Menu Colors */
  --cre8-color-header-menu-bg-default: #ffffff;
  --cre8-color-header-menu-inverse-bg-default: #1E3932;
  --cre8-color-header-menu-bg-selected: #D4E9E2;
  --cre8-color-header-menu-inverse-bg-selected: #00704A;
  --cre8-color-header-menu-bg-hover: #D4E9E2;
  --cre8-color-header-menu-inverse-bg-hover: #006241;
  --cre8-color-header-menu-bg-pressed: #B8DCD1;
  --cre8-color-header-menu-inverse-bg-pressed: #00704A;
  --cre8-color-header-menu-bg-active: #00704A;
  --cre8-color-header-menu-inverse-bg-active: #D4E9E2;
  --cre8-color-header-menu-bg-focus: #D4E9E2;
  --cre8-color-header-menu-inverse-bg-focus: #006241;

  /* Header Menu Content Colors */
  --cre8-color-header-menu-content-default: #1E3932;
  --cre8-color-header-menu-inverse-content-default: #ffffff;
  --cre8-color-header-menu-content-hover: #1E3932;
  --cre8-color-header-menu-inverse-content-hover: #ffffff;
  --cre8-color-header-menu-content-pressed: #1E3932;
  --cre8-color-header-menu-inverse-content-pressed: #ffffff;
  --cre8-color-header-menu-content-active: #ffffff;
  --cre8-color-header-menu-inverse-content-active: #1E3932;
  --cre8-color-header-menu-content-selected: #1E3932;
  --cre8-color-header-menu-inverse-content-selected: #ffffff;
  --cre8-color-header-menu-content-focus: #1E3932;
  --cre8-color-header-menu-inverse-content-focus: #ffffff;

  /* Header Menu Border Colors */
  --cre8-color-header-menu-border-default: #ffffff;
  --cre8-color-header-menu-inverse-border-default: #1E3932;
  --cre8-color-header-menu-border-pressed: #00704A;
  --cre8-color-header-menu-inverse-border-pressed: #ffffff;
  --cre8-color-header-menu-border-active: #00704A;
  --cre8-color-header-menu-inverse-border-active: #ffffff;
  --cre8-color-header-menu-border-selected: #00704A;
  --cre8-color-header-menu-inverse-border-selected: #D4E9E2;
  --cre8-color-header-menu-border-focus: #1E3932;
  --cre8-color-header-menu-inverse-border-focus: #ffffff;
  --cre8-color-header-menu-border-hover: #D4E9E2;
  --cre8-color-header-menu-inverse-border-hover: #006241;

  /* Header Submenu Colors */
  --cre8-color-header-submenu-bg-default: #ffffff;
  --cre8-color-header-submenu-inverse-bg-default: #ffffff;
  --cre8-color-header-submenu-bg-hover: #D4E9E2;
  --cre8-color-header-submenu-inverse-bg-hover: #D4E9E2;
  --cre8-color-header-submenu-bg-pressed: #B8DCD1;
  --cre8-color-header-submenu-inverse-bg-pressed: #B8DCD1;
  --cre8-color-header-submenu-bg-active: #00704A;
  --cre8-color-header-submenu-inverse-bg-active: #00704A;
  --cre8-color-header-submenu-bg-focus: #D4E9E2;
  --cre8-color-header-submenu-inverse-bg-focus: #D4E9E2;
  --cre8-color-header-submenu-bg-selected: #D4E9E2;
  --cre8-color-header-submenu-inverse-bg-selected: #D4E9E2;

  /* Header Submenu Content Colors */
  --cre8-color-header-submenu-content-default: #1E3932;
  --cre8-color-header-submenu-inverse-content-default: #1E3932;
  --cre8-color-header-submenu-content-hover: #1E3932;
  --cre8-color-header-submenu-inverse-content-hover: #1E3932;
  --cre8-color-header-submenu-content-pressed: #1E3932;
  --cre8-color-header-submenu-inverse-content-pressed: #1E3932;
  --cre8-color-header-submenu-content-active: #ffffff;
  --cre8-color-header-submenu-inverse-content-active: #ffffff;
  --cre8-color-header-submenu-content-focus: #1E3932;
  --cre8-color-header-submenu-inverse-content-focus: #1E3932;
  --cre8-color-header-submenu-content-selected: #1E3932;
  --cre8-color-header-submenu-inverse-content-selected: #1E3932;

  /* Header Submenu Border Colors */
  --cre8-color-header-submenu-border-default: #ffffff;
  --cre8-color-header-submenu-inverse-border-default: #ffffff;
  --cre8-color-header-submenu-border-hover: #D4E9E2;
  --cre8-color-header-submenu-inverse-border-hover: #D4E9E2;
  --cre8-color-header-submenu-border-focus: #00704A;
  --cre8-color-header-submenu-inverse-border-focus: #00704A;
  --cre8-color-header-submenu-border-active: #00704A;
  --cre8-color-header-submenu-inverse-border-active: #00704A;
  --cre8-color-header-submenu-border-pressed: #B8DCD1;
  --cre8-color-header-submenu-inverse-border-pressed: #B8DCD1;
  --cre8-color-header-submenu-border-selected: #00704A;
  --cre8-color-header-submenu-inverse-border-selected: #00704A;

  /* Desktop Menu Padding */
  --cre8-desktop-menu-padding-vertical-padding: 1rem;
  --cre8-desktop-menu-padding-horizontal-padding: 0.5rem;

  /* ==========================================================================
   * FOOTER COLORS
   * ========================================================================== */
  --cre8-color-footer-bg-default: #1E3932;
  --cre8-color-footer-bg-secondary: #00704A;
  --cre8-color-footer-content-default: #ffffff;
  --cre8-color-footer-content-secondary: #D4E9E2;
  --cre8-color-footer-link-default: #D4E9E2;
  --cre8-color-footer-link-hover: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - PRIMARY
   * ========================================================================== */
  --cre8-color-button-primary-bg: #00704A;
  --cre8-color-button-primary-inverse-bg: #ffffff;
  --cre8-color-button-primary-bg-hover: #006241;
  --cre8-color-button-primary-inverse-bg-hover: #D4E9E2;
  --cre8-color-button-primary-bg-active: #1E3932;
  --cre8-color-button-primary-inverse-bg-active: #B8DCD1;
  --cre8-color-button-primary-bg-disabled: #e5e5e5;
  --cre8-color-button-primary-inverse-bg-disabled: #a6a6a6;
  --cre8-color-button-primary-border: #00704A;
  --cre8-color-button-primary-inverse-border: #ffffff;
  --cre8-color-button-primary-border-hover: #006241;
  --cre8-color-button-primary-inverse-border-hover: #D4E9E2;
  --cre8-color-button-primary-border-active: #1E3932;
  --cre8-color-button-primary-inverse-border-active: #B8DCD1;
  --cre8-color-button-primary-border-disabled: #e5e5e5;
  --cre8-color-button-primary-inverse-border-disabled: #a6a6a6;
  --cre8-color-button-primary-content: #ffffff;
  --cre8-color-button-primary-inverse-content: #00704A;
  --cre8-color-button-primary-content-hover: #ffffff;
  --cre8-color-button-primary-inverse-content-hover: #00704A;
  --cre8-color-button-primary-content-active: #ffffff;
  --cre8-color-button-primary-inverse-content-active: #1E3932;
  --cre8-color-button-primary-content-disabled: #7c7c7c;
  --cre8-color-button-primary-inverse-content-disabled: #7c7c7c;
  --cre8-color-button-primary-outline: #1E3932;
  --cre8-color-button-primary-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - PRIMARY DANGER
   * ========================================================================== */
  --cre8-color-button-primary-danger-bg: #d53b32;
  --cre8-color-button-primary-danger-inverse-bg: #fce8e6;
  --cre8-color-button-primary-danger-bg-hover: #b32d25;
  --cre8-color-button-primary-danger-inverse-bg-hover: #f9c9c4;
  --cre8-color-button-primary-danger-bg-active: #8f2419;
  --cre8-color-button-primary-danger-inverse-bg-active: #f5a9a2;
  --cre8-color-button-primary-danger-bg-disabled: #e5e5e5;
  --cre8-color-button-primary-danger-inverse-bg-disabled: #a6a6a6;
  --cre8-color-button-primary-danger-content: #ffffff;
  --cre8-color-button-primary-danger-inverse-content: #8f2419;
  --cre8-color-button-primary-danger-content-hover: #ffffff;
  --cre8-color-button-primary-danger-inverse-content-hover: #8f2419;
  --cre8-color-button-primary-danger-content-active: #ffffff;
  --cre8-color-button-primary-danger-inverse-content-active: #8f2419;
  --cre8-color-button-primary-danger-content-disabled: #7c7c7c;
  --cre8-color-button-primary-danger-inverse-content-disabled: #7c7c7c;
  --cre8-color-button-primary-danger-border: #d53b32;
  --cre8-color-button-primary-danger-inverse-border: #fce8e6;
  --cre8-color-button-primary-danger-border-hover: #b32d25;
  --cre8-color-button-primary-danger-inverse-border-hover: #f9c9c4;
  --cre8-color-button-primary-danger-border-active: #8f2419;
  --cre8-color-button-primary-danger-inverse-border-active: #f5a9a2;
  --cre8-color-button-primary-danger-border-disabled: #e5e5e5;
  --cre8-color-button-primary-danger-inverse-border-disabled: #a6a6a6;
  --cre8-color-button-primary-danger-outline: #d53b32;
  --cre8-color-button-primary-danger-inverse-outline: #fce8e6;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY
   * ========================================================================== */
  --cre8-color-button-secondary-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-bg-hover: #D4E9E2;
  --cre8-color-button-secondary-inverse-bg-hover: rgba(255, 255, 255, 0.15);
  --cre8-color-button-secondary-bg-active: #B8DCD1;
  --cre8-color-button-secondary-inverse-bg-active: rgba(255, 255, 255, 0.25);
  --cre8-color-button-secondary-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-inverse-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-border: #00704A;
  --cre8-color-button-secondary-inverse-border: #ffffff;
  --cre8-color-button-secondary-border-hover: #00704A;
  --cre8-color-button-secondary-inverse-border-hover: #ffffff;
  --cre8-color-button-secondary-border-active: #00704A;
  --cre8-color-button-secondary-inverse-border-active: #ffffff;
  --cre8-color-button-secondary-border-disabled: #a6a6a6;
  --cre8-color-button-secondary-inverse-border-disabled: #a6a6a6;
  --cre8-color-button-secondary-content: #00704A;
  --cre8-color-button-secondary-inverse-content: #ffffff;
  --cre8-color-button-secondary-content-hover: #00704A;
  --cre8-color-button-secondary-inverse-content-hover: #ffffff;
  --cre8-color-button-secondary-content-active: #00704A;
  --cre8-color-button-secondary-inverse-content-active: #ffffff;
  --cre8-color-button-secondary-content-disabled: #a6a6a6;
  --cre8-color-button-secondary-inverse-content-disabled: #a6a6a6;
  --cre8-color-button-secondary-outline: #1E3932;
  --cre8-color-button-secondary-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY NEUTRAL
   * ========================================================================== */
  --cre8-color-button-secondary-neutral-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-neutral-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-neutral-content: #1E3932;
  --cre8-color-button-secondary-neutral-inverse-content: #ffffff;
  --cre8-color-button-secondary-neutral-border: #1E3932;
  --cre8-color-button-secondary-neutral-inverse-border: #ffffff;
  --cre8-color-button-secondary-neutral-bg-hover: rgba(0, 0, 0, 0.08);
  --cre8-color-button-secondary-neutral-inverse-bg-hover: rgba(255, 255, 255, 0.15);
  --cre8-color-button-secondary-neutral-content-hover: #1E3932;
  --cre8-color-button-secondary-neutral-inverse-content-hover: #ffffff;
  --cre8-color-button-secondary-neutral-border-hover: #1E3932;
  --cre8-color-button-secondary-neutral-inverse-border-hover: #ffffff;
  --cre8-color-button-secondary-neutral-border-active: #1E3932;
  --cre8-color-button-secondary-neutral-inverse-border-active: #ffffff;
  --cre8-color-button-secondary-neutral-bg-active: rgba(0, 0, 0, 0.16);
  --cre8-color-button-secondary-neutral-inverse-bg-active: rgba(255, 255, 255, 0.25);
  --cre8-color-button-secondary-neutral-content-active: #1E3932;
  --cre8-color-button-secondary-neutral-inverse-content-active: #ffffff;
  --cre8-color-button-secondary-neutral-bg-disabled: #e5e5e5;
  --cre8-color-button-secondary-neutral-inverse-bg-disabled: #a6a6a6;
  --cre8-color-button-secondary-neutral-border-disabled: #e5e5e5;
  --cre8-color-button-secondary-neutral-inverse-border-disabled: #a6a6a6;
  --cre8-color-button-secondary-neutral-content-disabled: #7c7c7c;
  --cre8-color-button-secondary-neutral-inverse-content-disabled: #7c7c7c;
  --cre8-color-button-secondary-neutral-outline: #1E3932;
  --cre8-color-button-secondary-neutral-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY DANGER
   * ========================================================================== */
  --cre8-color-button-secondary-danger-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-danger-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-danger-bg-hover: #b32d25;
  --cre8-color-button-secondary-danger-inverse-bg-hover: #f9c9c4;
  --cre8-color-button-secondary-danger-bg-active: #8f2419;
  --cre8-color-button-secondary-danger-inverse-bg-active: #f5a9a2;
  --cre8-color-button-secondary-danger-bg-disabled: #e5e5e5;
  --cre8-color-button-secondary-danger-inverse-bg-disabled: #a6a6a6;
  --cre8-color-button-secondary-danger-content: #d53b32;
  --cre8-color-button-secondary-danger-inverse-content: #fce8e6;
  --cre8-color-button-secondary-danger-content-hover: #ffffff;
  --cre8-color-button-secondary-danger-inverse-content-hover: #8f2419;
  --cre8-color-button-secondary-danger-content-active: #ffffff;
  --cre8-color-button-secondary-danger-inverse-content-active: #8f2419;
  --cre8-color-button-secondary-danger-content-disabled: #7c7c7c;
  --cre8-color-button-secondary-danger-inverse-content-disabled: #7c7c7c;
  --cre8-color-button-secondary-danger-border: #d53b32;
  --cre8-color-button-secondary-danger-inverse-border: #fce8e6;
  --cre8-color-button-secondary-danger-border-hover: #b32d25;
  --cre8-color-button-secondary-danger-inverse-border-hover: #f9c9c4;
  --cre8-color-button-secondary-danger-border-active: #8f2419;
  --cre8-color-button-secondary-danger-inverse-border-active: #f5a9a2;
  --cre8-color-button-secondary-danger-border-disabled: #e5e5e5;
  --cre8-color-button-secondary-danger-inverse-border-disabled: #a6a6a6;
  --cre8-color-button-secondary-danger-outline: #d53b32;
  --cre8-color-button-secondary-danger-inverse-outline: #fce8e6;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY
   * ========================================================================== */
  --cre8-color-button-tertiary-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-bg-hover: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-bg-hover: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-bg-active: #D4E9E2;
  --cre8-color-button-tertiary-inverse-bg-active: rgba(255, 255, 255, 0.15);
  --cre8-color-button-tertiary-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-border-hover: #00704A;
  --cre8-color-button-tertiary-inverse-border-hover: #ffffff;
  --cre8-color-button-tertiary-border-active: #00704A;
  --cre8-color-button-tertiary-inverse-border-active: #ffffff;
  --cre8-color-button-tertiary-border-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-border-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-content: #00704A;
  --cre8-color-button-tertiary-inverse-content: #ffffff;
  --cre8-color-button-tertiary-content-hover: #00704A;
  --cre8-color-button-tertiary-inverse-content-hover: #ffffff;
  --cre8-color-button-tertiary-content-active: #00704A;
  --cre8-color-button-tertiary-inverse-content-active: #ffffff;
  --cre8-color-button-tertiary-content-disabled: #7c7c7c;
  --cre8-color-button-tertiary-inverse-content-disabled: #a6a6a6;
  --cre8-color-button-tertiary-outline: #1E3932;
  --cre8-color-button-tertiary-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY NEUTRAL
   * ========================================================================== */
  --cre8-color-button-tertiary-neutral-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-content: #1E3932;
  --cre8-color-button-tertiary-neutral-inverse-content: #ffffff;
  --cre8-color-button-tertiary-neutral-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-bg-hover: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-hover: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-content-hover: #1E3932;
  --cre8-color-button-tertiary-neutral-inverse-content-hover: #ffffff;
  --cre8-color-button-tertiary-neutral-border-hover: #1E3932;
  --cre8-color-button-tertiary-neutral-inverse-border-hover: #ffffff;
  --cre8-color-button-tertiary-neutral-border-active: #1E3932;
  --cre8-color-button-tertiary-neutral-inverse-border-active: #ffffff;
  --cre8-color-button-tertiary-neutral-bg-active: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-active: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-content-active: #1E3932;
  --cre8-color-button-tertiary-neutral-inverse-content-active: #ffffff;
  --cre8-color-button-tertiary-neutral-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-border-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-border-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-content-disabled: #7c7c7c;
  --cre8-color-button-tertiary-neutral-inverse-content-disabled: #a6a6a6;
  --cre8-color-button-tertiary-neutral-outline: #1E3932;
  --cre8-color-button-tertiary-neutral-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY DANGER
   * ========================================================================== */
  --cre8-color-button-tertiary-danger-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-danger-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-danger-bg-hover: #b32d25;
  --cre8-color-button-tertiary-danger-inverse-bg-hover: #f9c9c4;
  --cre8-color-button-tertiary-danger-bg-active: #8f2419;
  --cre8-color-button-tertiary-danger-inverse-bg-active: #f5a9a2;
  --cre8-color-button-tertiary-danger-bg-disabled: #e5e5e5;
  --cre8-color-button-tertiary-danger-inverse-bg-disabled: #a6a6a6;
  --cre8-color-button-tertiary-danger-content: #d53b32;
  --cre8-color-button-tertiary-danger-inverse-content: #fce8e6;
  --cre8-color-button-tertiary-danger-content-hover: #ffffff;
  --cre8-color-button-tertiary-danger-inverse-content-hover: #8f2419;
  --cre8-color-button-tertiary-danger-content-active: #ffffff;
  --cre8-color-button-tertiary-danger-inverse-content-active: #8f2419;
  --cre8-color-button-tertiary-danger-content-disabled: #7c7c7c;
  --cre8-color-button-tertiary-danger-inverse-content-disabled: #a6a6a6;
  --cre8-color-button-tertiary-danger-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-danger-inverse-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-danger-border-hover: #b32d25;
  --cre8-color-button-tertiary-danger-inverse-border-hover: #f9c9c4;
  --cre8-color-button-tertiary-danger-border-active: #8f2419;
  --cre8-color-button-tertiary-danger-inverse-border-active: #f5a9a2;
  --cre8-color-button-tertiary-danger-border-disabled: #e5e5e5;
  --cre8-color-button-tertiary-danger-inverse-border-disabled: #a6a6a6;
  --cre8-color-button-tertiary-danger-outline: #d53b32;
  --cre8-color-button-tertiary-danger-inverse-outline: #fce8e6;

  /* ==========================================================================
   * BUTTON PADDING
   * ========================================================================== */
  --cre8-button-padding-vertical-small: 0.5rem;
  --cre8-button-padding-vertical-medium: 0.75rem;
  --cre8-button-padding-vertical-large: 1rem;
  --cre8-button-padding-vertical-icon-only: 0.5rem;
  --cre8-button-padding-vertical-small-icon-only: 0.5rem;
  --cre8-button-padding-vertical-medium-icon-only: 1rem;
  --cre8-button-padding-vertical-large-icon-only: 1rem;
  --cre8-button-padding-horizontal-small: 1rem;
  --cre8-button-padding-horizontal-medium: 1.5rem;
  --cre8-button-padding-horizontal-large: 2rem;
  --cre8-button-padding-horizontal-icon-only: 0.5rem;
  --cre8-button-padding-horizontal-small-icon-only: 0.5rem;
  --cre8-button-padding-horizontal-medium-icon-only: 1rem;
  --cre8-button-padding-horizontal-large-icon-only: 1rem;

  /* ==========================================================================
   * TYPOGRAPHY
   * ========================================================================== */
  --cre8-font-family-default: "SoDo Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --cre8-font-families-sodo-sans: "SoDo Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --cre8-font-weights-sodo-sans-0: 700;
  --cre8-font-weights-sodo-sans-1: 600;
  --cre8-font-weights-sodo-sans-2: 400;
  --cre8-font-weights-sodo-sans-3: 500;

  /* Font Sizes */
  --cre8-font-size-0: 0.75rem;
  --cre8-font-size-1: 0.875rem;
  --cre8-font-size-2: 1rem;
  --cre8-font-size-3: 1.125rem;
  --cre8-font-size-4: 1.25rem;
  --cre8-font-size-5: 1.5rem;
  --cre8-font-size-6: 1.75rem;
  --cre8-font-size-7: 2rem;
  --cre8-font-size-8: 2.5rem;
  --cre8-font-size-9: 3rem;
  --cre8-font-size-10: 3.5rem;
  --cre8-font-size-11: 4rem;
  --cre8-font-size-12: 4.5rem;
  --cre8-font-size-13: 5rem;

  /* Line Heights */
  --cre8-line-heights-0: 1.25;
  --cre8-line-heights-1: 1.12;
  --cre8-line-heights-2: 1.1400000000000001;
  --cre8-line-heights-3: 1.2;
  --cre8-line-heights-4: 1.3;
  --cre8-line-heights-5: 1.33;
  --cre8-line-heights-6: 1.4000000000000001;
  --cre8-line-heights-7: 1.5;
  --cre8-line-heights-8: 1.43;
  --cre8-line-heights-9: 1.11;
  --cre8-line-heights-10: 1.1300000000000001;
  --cre8-line-heights-11: 1.16;
  --cre8-line-heights-12: 0.48;
  --cre8-line-heights-13: 0.4;
  --cre8-line-heights-14: 0.32;
  --cre8-line-heights-15: 0.28;
  --cre8-line-heights-16: 0.24;
  --cre8-line-heights-17: 0.2;
  --cre8-line-heights-18: 0.16;

  /* Letter Spacing */
  --cre8-letter-spacing-0: -1.5;
  --cre8-letter-spacing-1: -1;
  --cre8-letter-spacing-2: -0.5;
  --cre8-letter-spacing-3: 1;
  --cre8-letter-spacing-4: 2;
  --cre8-letter-spacing-5: 0;

  /* Paragraph Spacing */
  --cre8-paragraph-spacing-0: 0;
  --cre8-paragraph-indent-0: 0px;

  /* Text Case & Decoration */
  --cre8-text-case-none: none;
  --cre8-text-case-uppercase: uppercase;
  --cre8-text-decoration-none: none;
  --cre8-text-decoration-underline: underline;

  /* ==========================================================================
   * BORDER RADIUS
   * ========================================================================== */
  --cre8-border-radius-none: 0px;
  --cre8-border-radius-small: 4px;
  --cre8-border-radius-default: 4px;
  --cre8-border-radius-large: 8px;
  --cre8-border-radius-round: 900px;
  --cre8-border-radius-button: 900px;
  --cre8-border-radius-badge: 4px;
  --cre8-border-radius-tabs: 4px;
  --cre8-border-radius-container: 8px;
  --cre8-border-radius-field: 4px;
  --cre8-border-radius-field-brand: 4px;
  --cre8-border-radius-brand: 4px;

  /* ==========================================================================
   * BORDER WIDTH & STYLE
   * ========================================================================== */
  --cre8-border-width-none: 0rem;
  --cre8-border-width-default: 0.0625rem;
  --cre8-border-width-focus: 0.125rem;
  --cre8-border-width-large: 0.25rem;
  --cre8-border-width-button-tertiary-outline-focus: 0.125rem;
  --cre8-border-width-button-default: 0.125rem;
  --cre8-border-width-tab-selected: 0.125rem;
  --cre8-border-width-tab-default: 0.125rem;
  --cre8-border-style-default: solid;
  --cre8-border-style-button-tertiary-outline-focus: solid;

  /* Tertiary Button Borders */
  --cre8-border-button-tertiary-default: none;
  --cre8-border-button-tertiary-hover: 2px solid #00704A;
  --cre8-border-button-tertiary-active: 2px solid #00704A;
  --cre8-border-button-tertiary-disabled: none;

  /* ==========================================================================
   * SHADOWS
   * ========================================================================== */
  --cre8-shadow-none: none;
  --cre8-shadow-small: 0 1px 3px rgba(0,0,0,0.12);
  --cre8-shadow-default: 0 4px 6px rgba(0,0,0,0.1);
  --cre8-shadow-large: 0 10px 20px rgba(0,0,0,0.15);
  --cre8-shadow-button: none;

  /* ==========================================================================
   * ICONS
   * ========================================================================== */
  --cre8-icon-size-small: 0.875rem;
  --cre8-icon-size-default: 1rem;
  --cre8-icon-size-large: 1.125rem;

  /* ==========================================================================
   * COMPONENT TOKENS - BADGE
   * ========================================================================== */
  --cre8-badge-padding-horizontal: 0.5rem;
  --cre8-badge-padding-vertical: 0.125rem;

  /* ==========================================================================
   * COMPONENT TOKENS - PROGRESS METER
   * ========================================================================== */
  --cre8-progress-meter-height: 0.5rem;

  /* ==========================================================================
   * BREAKPOINTS
   * ========================================================================== */
  --cre8-breakpoint-xsm: 375px;
  --cre8-breakpoint-sm: 560px;
  --cre8-breakpoint-md: 768px;
  --cre8-breakpoint-lg: 960px;
  --cre8-breakpoint-xl: 1200px;
  --cre8-breakpoint-xxl: 1400px;

  /* ==========================================================================
   * FONT ASSETS
   * ========================================================================== */
  --cre8-asset-font-sodo-sans-400-normal: "SoDo Sans Regular";
  --cre8-asset-font-sodo-sans-500-normal: "SoDo Sans Medium";
  --cre8-asset-font-sodo-sans-600-normal: "SoDo Sans SemiBold";
  --cre8-asset-font-sodo-sans-700-normal: "SoDo Sans Bold";
}`;
