export default `:root {
  /* ==========================================================================
   * Femmecubator Theme - Complete Design Token Set
   * Primary: #026fe4 (Blue) | Brand Strong: #012144 (Dark Navy)
   * Logo Accent: #e43c4a (Red)
   * Font: Inter
   * Border Radius: 1rem (rounded)
   * Dark mode primary UI
   * ========================================================================== */

  /* ==========================================================================
   * SPACING TOKENS
   * ========================================================================== */
  --cre8-spacing-0: 0rem;
  --cre8-spacing-2: 0.25rem;
  --cre8-spacing-4: 0.5rem;
  --cre8-spacing-6: 0.75rem;
  --cre8-spacing-8: 1rem;
  --cre8-spacing-12: 1.25rem;
  --cre8-spacing-14: 0.875rem;
  --cre8-spacing-16: 1.5rem;
  --cre8-spacing-18: 1.125rem;
  --cre8-spacing-24: 2rem;
  --cre8-spacing-32: 3rem;
  --cre8-spacing-40: 3.5rem;
  --cre8-spacing-48: 4rem;
  --cre8-spacing-64: 4rem;
  --cre8-spacing-80: 5rem;
  --cre8-spacing-96: 6rem;
  --cre8-spacing-120: 7.5rem;
  --cre8-spacing-160: 10rem;

  /* ==========================================================================
   * BACKGROUND COLORS (Dark Mode)
   * ========================================================================== */
  --cre8-color-bg-default: #4f4f4f;
  --cre8-color-bg-subtle: #333333;
  --cre8-color-bg-moderate: #828282;
  --cre8-color-bg-inverse-moderate: #9c9c9c;
  --cre8-color-bg-knockout: #1a1a1a;
  --cre8-color-bg-strong: #828282;
  --cre8-color-bg-disabled: #e0e0e0;
  --cre8-color-bg-active: #333333;
  --cre8-color-bg-inverse-active: #ffffff;

  /* Brand Background Colors */
  --cre8-color-bg-brand: #026fe4;
  --cre8-color-bg-brand-strong: #012144;
  --cre8-color-bg-brand-strong-hover: #014ea0;
  --cre8-color-bg-brand-strong-active: #012144;
  --cre8-color-bg-brand-hover: #81b7f2;
  --cre8-color-bg-brand-active: #026fe4;
  --cre8-color-bg-brand-xstrong: #012144;
  --cre8-color-bg-brand-xstrong-hover: #014ea0;
  --cre8-color-bg-brand-xstrong-active: #012144;
  --cre8-color-bg-default-hover: #4f4f4f;
  --cre8-color-bg-default-active: #333333;
  --cre8-color-bg-logo: #e43c4a;

  /* Semantic Background Colors */
  --cre8-color-bg-success: #d4efdf;
  --cre8-color-bg-success-strong: #00875a;
  --cre8-color-bg-error: #fbdddd;
  --cre8-color-bg-error-strong: #eb5757;
  --cre8-color-bg-warning: #fae9b7;
  --cre8-color-bg-warning-strong: #f2c94c;
  --cre8-color-bg-info: #c0e1f4;
  --cre8-color-bg-info-strong: #2d9cdb;
  --cre8-color-bg-attention: #c0e1f4;
  --cre8-color-bg-attention-strong: #2d9cdb;

  /* Opacity Background Colors */
  --cre8-color-bg-opacity-transparent: rgba(255, 255, 255, 0.0);
  --cre8-color-bg-opacity-default: rgba(0, 0, 0, 0.50);

  /* ==========================================================================
   * CONTENT/TEXT COLORS (Light text for dark backgrounds)
   * ========================================================================== */
  --cre8-color-content-default: #ffffff;
  --cre8-color-content-subtle: #4f4f4f;
  --cre8-color-content-disabled: #9c9c9c;
  --cre8-color-content-knockout: #ffffff;
  --cre8-color-content-brand: #026fe4;
  --cre8-color-content-brand-strong: #81b7f2;
  --cre8-color-content-brand-knockout: #e6f1fc;

  /* Semantic Content Colors */
  --cre8-color-content-success: #17683a;
  --cre8-color-content-success-icon: #00875a;
  --cre8-color-content-error: #8d3434;
  --cre8-color-content-error-icon: #eb5757;
  --cre8-color-content-warning-icon: #f2c94c;
  --cre8-color-content-info-icon: #2d9cdb;
  --cre8-color-content-attention-icon: #2d9cdb;

  /* Link Colors */
  --cre8-color-content-link: #026fe4;
  --cre8-color-content-inverse-link: #ffffff;
  --cre8-color-content-link-hover: #014ea0;
  --cre8-color-content-inverse-link-hover: #ffffff;
  --cre8-color-content-link-focus: #026fe4;
  --cre8-color-content-inverse-link-focus: #ffffff;
  --cre8-color-content-link-active: #014ea0;
  --cre8-color-content-inverse-link-active: #ffffff;
  --cre8-color-content-link-disabled: #9c9c9c;
  --cre8-color-content-inverse-link-disabled: #9c9c9c;
  --cre8-color-content-link-visted: #014ea0;
  --cre8-color-content-inverse-link-visted: #ffffff;

  /* ==========================================================================
   * BORDER COLORS
   * ========================================================================== */
  --cre8-color-border-default: #9c9c9c;
  --cre8-color-border-strong: #4f4f4f;
  --cre8-color-border-knockout: #ffffff;
  --cre8-color-border-disabled: #9c9c9c;
  --cre8-color-border-brand: #026fe4;
  --cre8-color-border-brand-subtle: #e6f1fc;
  --cre8-color-border-brand-strong: #014ea0;
  --cre8-color-border-success: #00875a;
  --cre8-color-border-error: #eb5757;
  --cre8-color-border-warning: #f2c94c;
  --cre8-color-border-info: #2d9cdb;
  --cre8-color-border-attention: #2d9cdb;
  --cre8-color-border-transparent: rgba(255, 255, 255, 0.0);
  --cre8-color-border-active-outline: #026fe4;
  --cre8-color-link-bg-active: #026fe4;

  /* ==========================================================================
   * HEADER COLORS
   * ========================================================================== */
  --cre8-color-header-bg-default: #4f4f4f;
  --cre8-color-header-inverse-bg-default: #026fe4;
  --cre8-color-header-bg-secondary: #026fe4;
  --cre8-color-header-inverse-bg-secondary: #4f4f4f;
  --cre8-color-header-bg-tertiary: #333333;
  --cre8-color-header-inverse-bg-tertiary: #012144;

  /* Header Menu Colors */
  --cre8-color-header-menu-bg-default: #4f4f4f;
  --cre8-color-header-menu-inverse-bg-default: #026fe4;
  --cre8-color-header-menu-bg-selected: #333333;
  --cre8-color-header-menu-inverse-bg-selected: #014ea0;
  --cre8-color-header-menu-bg-hover: #333333;
  --cre8-color-header-menu-inverse-bg-hover: #014ea0;
  --cre8-color-header-menu-bg-pressed: #1a1a1a;
  --cre8-color-header-menu-inverse-bg-pressed: #012144;
  --cre8-color-header-menu-bg-active: #1a1a1a;
  --cre8-color-header-menu-inverse-bg-active: #012144;
  --cre8-color-header-menu-bg-focus: #333333;
  --cre8-color-header-menu-inverse-bg-focus: #014ea0;

  /* Header Menu Content Colors */
  --cre8-color-header-menu-content-default: #ffffff;
  --cre8-color-header-menu-inverse-content-default: #ffffff;
  --cre8-color-header-menu-content-hover: #e6f1fc;
  --cre8-color-header-menu-inverse-content-hover: #ffffff;
  --cre8-color-header-menu-content-pressed: #c0e1f4;
  --cre8-color-header-menu-inverse-content-pressed: #ffffff;
  --cre8-color-header-menu-content-active: #c0e1f4;
  --cre8-color-header-menu-inverse-content-active: #ffffff;
  --cre8-color-header-menu-content-selected: #81b7f2;
  --cre8-color-header-menu-inverse-content-selected: #ffffff;
  --cre8-color-header-menu-content-focus: #ffffff;
  --cre8-color-header-menu-inverse-content-focus: #ffffff;

  /* Header Menu Border Colors */
  --cre8-color-header-menu-border-default: rgba(255, 255, 255, 0.0);
  --cre8-color-header-menu-inverse-border-default: rgba(255, 255, 255, 0.0);
  --cre8-color-header-menu-border-pressed: #026fe4;
  --cre8-color-header-menu-inverse-border-pressed: #ffffff;
  --cre8-color-header-menu-border-active: #026fe4;
  --cre8-color-header-menu-inverse-border-active: #ffffff;
  --cre8-color-header-menu-border-selected: #81b7f2;
  --cre8-color-header-menu-inverse-border-selected: #e6f1fc;
  --cre8-color-header-menu-border-focus: #026fe4;
  --cre8-color-header-menu-inverse-border-focus: #ffffff;
  --cre8-color-header-menu-border-hover: rgba(255, 255, 255, 0.0);
  --cre8-color-header-menu-inverse-border-hover: #ffffff;

  /* Header Submenu Colors */
  --cre8-color-header-submenu-bg-default: #333333;
  --cre8-color-header-submenu-inverse-bg-default: #014ea0;
  --cre8-color-header-submenu-bg-hover: #4f4f4f;
  --cre8-color-header-submenu-inverse-bg-hover: #026fe4;
  --cre8-color-header-submenu-bg-pressed: #1a1a1a;
  --cre8-color-header-submenu-inverse-bg-pressed: #012144;
  --cre8-color-header-submenu-bg-active: #1a1a1a;
  --cre8-color-header-submenu-inverse-bg-active: #012144;
  --cre8-color-header-submenu-bg-focus: #333333;
  --cre8-color-header-submenu-inverse-bg-focus: #014ea0;
  --cre8-color-header-submenu-bg-selected: #4f4f4f;
  --cre8-color-header-submenu-inverse-bg-selected: #026fe4;

  /* Header Submenu Content Colors */
  --cre8-color-header-submenu-content-default: #ffffff;
  --cre8-color-header-submenu-inverse-content-default: #ffffff;
  --cre8-color-header-submenu-content-hover: #e6f1fc;
  --cre8-color-header-submenu-inverse-content-hover: #ffffff;
  --cre8-color-header-submenu-content-pressed: #c0e1f4;
  --cre8-color-header-submenu-inverse-content-pressed: #ffffff;
  --cre8-color-header-submenu-content-active: #c0e1f4;
  --cre8-color-header-submenu-inverse-content-active: #ffffff;
  --cre8-color-header-submenu-content-focus: #81b7f2;
  --cre8-color-header-submenu-inverse-content-focus: #ffffff;
  --cre8-color-header-submenu-content-selected: #026fe4;
  --cre8-color-header-submenu-inverse-content-selected: #ffffff;

  /* Header Submenu Border Colors */
  --cre8-color-header-submenu-border-default: #333333;
  --cre8-color-header-submenu-inverse-border-default: #014ea0;
  --cre8-color-header-submenu-border-hover: #4f4f4f;
  --cre8-color-header-submenu-inverse-border-hover: #026fe4;
  --cre8-color-header-submenu-border-focus: #026fe4;
  --cre8-color-header-submenu-inverse-border-focus: #ffffff;
  --cre8-color-header-submenu-border-active: #1a1a1a;
  --cre8-color-header-submenu-inverse-border-active: #012144;
  --cre8-color-header-submenu-border-pressed: #1a1a1a;
  --cre8-color-header-submenu-inverse-border-pressed: #012144;
  --cre8-color-header-submenu-border-selected: #81b7f2;
  --cre8-color-header-submenu-inverse-border-selected: #e6f1fc;

  /* Desktop Menu Padding */
  --cre8-desktop-menu-padding-vertical-padding: 1rem;
  --cre8-desktop-menu-padding-horizontal-padding: 0.5rem;

  /* ==========================================================================
   * FOOTER COLORS
   * ========================================================================== */
  --cre8-color-footer-bg-default: #333333;
  --cre8-color-footer-bg-secondary: #4f4f4f;
  --cre8-color-footer-content-default: #ffffff;
  --cre8-color-footer-content-secondary: #e6f1fc;
  --cre8-color-footer-link-default: #81b7f2;
  --cre8-color-footer-link-hover: #026fe4;

  /* ==========================================================================
   * BUTTON COLORS - PRIMARY
   * ========================================================================== */
  --cre8-color-button-primary-bg: #026fe4;
  --cre8-color-button-primary-inverse-bg: #ffffff;
  --cre8-color-button-primary-bg-hover: #014ea0;
  --cre8-color-button-primary-inverse-bg-hover: #e6f1fc;
  --cre8-color-button-primary-bg-active: #012144;
  --cre8-color-button-primary-inverse-bg-active: #c0e1f4;
  --cre8-color-button-primary-bg-disabled: #e0e0e0;
  --cre8-color-button-primary-inverse-bg-disabled: #9c9c9c;
  --cre8-color-button-primary-border: #026fe4;
  --cre8-color-button-primary-inverse-border: #ffffff;
  --cre8-color-button-primary-border-hover: #014ea0;
  --cre8-color-button-primary-inverse-border-hover: #e6f1fc;
  --cre8-color-button-primary-border-active: #012144;
  --cre8-color-button-primary-inverse-border-active: #c0e1f4;
  --cre8-color-button-primary-border-disabled: #e0e0e0;
  --cre8-color-button-primary-inverse-border-disabled: #9c9c9c;
  --cre8-color-button-primary-content: #ffffff;
  --cre8-color-button-primary-inverse-content: #026fe4;
  --cre8-color-button-primary-content-hover: #ffffff;
  --cre8-color-button-primary-inverse-content-hover: #014ea0;
  --cre8-color-button-primary-content-active: #ffffff;
  --cre8-color-button-primary-inverse-content-active: #012144;
  --cre8-color-button-primary-content-disabled: #9c9c9c;
  --cre8-color-button-primary-inverse-content-disabled: #4f4f4f;
  --cre8-color-button-primary-outline: #026fe4;
  --cre8-color-button-primary-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - PRIMARY DANGER
   * ========================================================================== */
  --cre8-color-button-primary-danger-bg: #eb5757;
  --cre8-color-button-primary-danger-inverse-bg: #fbdddd;
  --cre8-color-button-primary-danger-bg-hover: #c23b3b;
  --cre8-color-button-primary-danger-inverse-bg-hover: #f5b8b8;
  --cre8-color-button-primary-danger-bg-active: #8d3434;
  --cre8-color-button-primary-danger-inverse-bg-active: #e69999;
  --cre8-color-button-primary-danger-bg-disabled: #e0e0e0;
  --cre8-color-button-primary-danger-inverse-bg-disabled: #9c9c9c;
  --cre8-color-button-primary-danger-content: #ffffff;
  --cre8-color-button-primary-danger-inverse-content: #8d3434;
  --cre8-color-button-primary-danger-content-hover: #ffffff;
  --cre8-color-button-primary-danger-inverse-content-hover: #8d3434;
  --cre8-color-button-primary-danger-content-active: #ffffff;
  --cre8-color-button-primary-danger-inverse-content-active: #8d3434;
  --cre8-color-button-primary-danger-content-disabled: #9c9c9c;
  --cre8-color-button-primary-danger-inverse-content-disabled: #4f4f4f;
  --cre8-color-button-primary-danger-border: #eb5757;
  --cre8-color-button-primary-danger-inverse-border: #fbdddd;
  --cre8-color-button-primary-danger-border-hover: #c23b3b;
  --cre8-color-button-primary-danger-inverse-border-hover: #f5b8b8;
  --cre8-color-button-primary-danger-border-active: #8d3434;
  --cre8-color-button-primary-danger-inverse-border-active: #e69999;
  --cre8-color-button-primary-danger-border-disabled: #e0e0e0;
  --cre8-color-button-primary-danger-inverse-border-disabled: #9c9c9c;
  --cre8-color-button-primary-danger-outline: #eb5757;
  --cre8-color-button-primary-danger-inverse-outline: #fbdddd;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY
   * ========================================================================== */
  --cre8-color-button-secondary-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-bg-hover: rgba(2, 111, 228, 0.1);
  --cre8-color-button-secondary-inverse-bg-hover: rgba(255, 255, 255, 0.1);
  --cre8-color-button-secondary-bg-active: rgba(2, 111, 228, 0.2);
  --cre8-color-button-secondary-inverse-bg-active: rgba(255, 255, 255, 0.2);
  --cre8-color-button-secondary-bg-disabled: #e0e0e0;
  --cre8-color-button-secondary-inverse-bg-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-border: #026fe4;
  --cre8-color-button-secondary-inverse-border: #ffffff;
  --cre8-color-button-secondary-border-hover: #014ea0;
  --cre8-color-button-secondary-inverse-border-hover: #e6f1fc;
  --cre8-color-button-secondary-border-active: #012144;
  --cre8-color-button-secondary-inverse-border-active: #c0e1f4;
  --cre8-color-button-secondary-border-disabled: #9c9c9c;
  --cre8-color-button-secondary-inverse-border-disabled: #9c9c9c;
  --cre8-color-button-secondary-content: #026fe4;
  --cre8-color-button-secondary-inverse-content: #ffffff;
  --cre8-color-button-secondary-content-hover: #014ea0;
  --cre8-color-button-secondary-inverse-content-hover: #e6f1fc;
  --cre8-color-button-secondary-content-active: #012144;
  --cre8-color-button-secondary-inverse-content-active: #c0e1f4;
  --cre8-color-button-secondary-content-disabled: #9c9c9c;
  --cre8-color-button-secondary-inverse-content-disabled: #9c9c9c;
  --cre8-color-button-secondary-outline: #026fe4;
  --cre8-color-button-secondary-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY NEUTRAL
   * ========================================================================== */
  --cre8-color-button-secondary-neutral-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-neutral-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-neutral-content: #4f4f4f;
  --cre8-color-button-secondary-neutral-inverse-content: #ffffff;
  --cre8-color-button-secondary-neutral-border: #4f4f4f;
  --cre8-color-button-secondary-neutral-inverse-border: #ffffff;
  --cre8-color-button-secondary-neutral-bg-hover: rgba(79, 79, 79, 0.1);
  --cre8-color-button-secondary-neutral-inverse-bg-hover: rgba(255, 255, 255, 0.1);
  --cre8-color-button-secondary-neutral-content-hover: #333333;
  --cre8-color-button-secondary-neutral-inverse-content-hover: #ffffff;
  --cre8-color-button-secondary-neutral-border-hover: #333333;
  --cre8-color-button-secondary-neutral-inverse-border-hover: #ffffff;
  --cre8-color-button-secondary-neutral-border-active: #1a1a1a;
  --cre8-color-button-secondary-neutral-inverse-border-active: #ffffff;
  --cre8-color-button-secondary-neutral-bg-active: rgba(79, 79, 79, 0.2);
  --cre8-color-button-secondary-neutral-inverse-bg-active: rgba(255, 255, 255, 0.2);
  --cre8-color-button-secondary-neutral-content-active: #1a1a1a;
  --cre8-color-button-secondary-neutral-inverse-content-active: #ffffff;
  --cre8-color-button-secondary-neutral-bg-disabled: #e0e0e0;
  --cre8-color-button-secondary-neutral-inverse-bg-disabled: #9c9c9c;
  --cre8-color-button-secondary-neutral-border-disabled: #e0e0e0;
  --cre8-color-button-secondary-neutral-inverse-border-disabled: #9c9c9c;
  --cre8-color-button-secondary-neutral-content-disabled: #9c9c9c;
  --cre8-color-button-secondary-neutral-inverse-content-disabled: #4f4f4f;
  --cre8-color-button-secondary-neutral-outline: #026fe4;
  --cre8-color-button-secondary-neutral-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY DANGER
   * ========================================================================== */
  --cre8-color-button-secondary-danger-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-danger-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-danger-bg-hover: #c23b3b;
  --cre8-color-button-secondary-danger-inverse-bg-hover: #f5b8b8;
  --cre8-color-button-secondary-danger-bg-active: #8d3434;
  --cre8-color-button-secondary-danger-inverse-bg-active: #e69999;
  --cre8-color-button-secondary-danger-bg-disabled: #e0e0e0;
  --cre8-color-button-secondary-danger-inverse-bg-disabled: #9c9c9c;
  --cre8-color-button-secondary-danger-content: #eb5757;
  --cre8-color-button-secondary-danger-inverse-content: #fbdddd;
  --cre8-color-button-secondary-danger-content-hover: #ffffff;
  --cre8-color-button-secondary-danger-inverse-content-hover: #8d3434;
  --cre8-color-button-secondary-danger-content-active: #ffffff;
  --cre8-color-button-secondary-danger-inverse-content-active: #8d3434;
  --cre8-color-button-secondary-danger-content-disabled: #9c9c9c;
  --cre8-color-button-secondary-danger-inverse-content-disabled: #4f4f4f;
  --cre8-color-button-secondary-danger-border: #eb5757;
  --cre8-color-button-secondary-danger-inverse-border: #fbdddd;
  --cre8-color-button-secondary-danger-border-hover: #c23b3b;
  --cre8-color-button-secondary-danger-inverse-border-hover: #f5b8b8;
  --cre8-color-button-secondary-danger-border-active: #8d3434;
  --cre8-color-button-secondary-danger-inverse-border-active: #e69999;
  --cre8-color-button-secondary-danger-border-disabled: #e0e0e0;
  --cre8-color-button-secondary-danger-inverse-border-disabled: #9c9c9c;
  --cre8-color-button-secondary-danger-outline: #eb5757;
  --cre8-color-button-secondary-danger-inverse-outline: #fbdddd;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY
   * ========================================================================== */
  --cre8-color-button-tertiary-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-bg-hover: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-inverse-bg-hover: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-bg-active: rgba(2, 111, 228, 0.1);
  --cre8-color-button-tertiary-inverse-bg-active: rgba(255, 255, 255, 0.1);
  --cre8-color-button-tertiary-bg-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-inverse-bg-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-border: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-inverse-border: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-border-hover: #026fe4;
  --cre8-color-button-tertiary-inverse-border-hover: #ffffff;
  --cre8-color-button-tertiary-border-active: #014ea0;
  --cre8-color-button-tertiary-inverse-border-active: #e6f1fc;
  --cre8-color-button-tertiary-border-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-inverse-border-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-content: #026fe4;
  --cre8-color-button-tertiary-inverse-content: #ffffff;
  --cre8-color-button-tertiary-content-hover: #014ea0;
  --cre8-color-button-tertiary-inverse-content-hover: #e6f1fc;
  --cre8-color-button-tertiary-content-active: #012144;
  --cre8-color-button-tertiary-inverse-content-active: #c0e1f4;
  --cre8-color-button-tertiary-content-disabled: #9c9c9c;
  --cre8-color-button-tertiary-inverse-content-disabled: #9c9c9c;
  --cre8-color-button-tertiary-outline: #026fe4;
  --cre8-color-button-tertiary-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY NEUTRAL
   * ========================================================================== */
  --cre8-color-button-tertiary-neutral-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-content: #4f4f4f;
  --cre8-color-button-tertiary-neutral-inverse-content: #ffffff;
  --cre8-color-button-tertiary-neutral-border: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-border: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-bg-hover: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-hover: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-content-hover: #333333;
  --cre8-color-button-tertiary-neutral-inverse-content-hover: #ffffff;
  --cre8-color-button-tertiary-neutral-border-hover: #4f4f4f;
  --cre8-color-button-tertiary-neutral-inverse-border-hover: #ffffff;
  --cre8-color-button-tertiary-neutral-border-active: #333333;
  --cre8-color-button-tertiary-neutral-inverse-border-active: #ffffff;
  --cre8-color-button-tertiary-neutral-bg-active: rgba(79, 79, 79, 0.1);
  --cre8-color-button-tertiary-neutral-inverse-bg-active: rgba(255, 255, 255, 0.1);
  --cre8-color-button-tertiary-neutral-content-active: #1a1a1a;
  --cre8-color-button-tertiary-neutral-inverse-content-active: #ffffff;
  --cre8-color-button-tertiary-neutral-bg-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-border-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-border-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-content-disabled: #9c9c9c;
  --cre8-color-button-tertiary-neutral-inverse-content-disabled: #4f4f4f;
  --cre8-color-button-tertiary-neutral-outline: #026fe4;
  --cre8-color-button-tertiary-neutral-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY DANGER
   * ========================================================================== */
  --cre8-color-button-tertiary-danger-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-danger-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-danger-bg-hover: #c23b3b;
  --cre8-color-button-tertiary-danger-inverse-bg-hover: #f5b8b8;
  --cre8-color-button-tertiary-danger-bg-active: #8d3434;
  --cre8-color-button-tertiary-danger-inverse-bg-active: #e69999;
  --cre8-color-button-tertiary-danger-bg-disabled: #e0e0e0;
  --cre8-color-button-tertiary-danger-inverse-bg-disabled: #9c9c9c;
  --cre8-color-button-tertiary-danger-content: #eb5757;
  --cre8-color-button-tertiary-danger-inverse-content: #fbdddd;
  --cre8-color-button-tertiary-danger-content-hover: #ffffff;
  --cre8-color-button-tertiary-danger-inverse-content-hover: #8d3434;
  --cre8-color-button-tertiary-danger-content-active: #ffffff;
  --cre8-color-button-tertiary-danger-inverse-content-active: #8d3434;
  --cre8-color-button-tertiary-danger-content-disabled: #9c9c9c;
  --cre8-color-button-tertiary-danger-inverse-content-disabled: #4f4f4f;
  --cre8-color-button-tertiary-danger-border: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-danger-inverse-border: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-danger-border-hover: #c23b3b;
  --cre8-color-button-tertiary-danger-inverse-border-hover: #f5b8b8;
  --cre8-color-button-tertiary-danger-border-active: #8d3434;
  --cre8-color-button-tertiary-danger-inverse-border-active: #e69999;
  --cre8-color-button-tertiary-danger-border-disabled: #e0e0e0;
  --cre8-color-button-tertiary-danger-inverse-border-disabled: #9c9c9c;
  --cre8-color-button-tertiary-danger-outline: #eb5757;
  --cre8-color-button-tertiary-danger-inverse-outline: #fbdddd;

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
  --cre8-font-family-default: "Inter", sans-serif;
  --cre8-font-families-inter: "Inter", sans-serif;
  --cre8-font-weights-inter-0: 700;
  --cre8-font-weights-inter-1: 600;
  --cre8-font-weights-inter-2: 400;
  --cre8-font-weights-inter-3: 500;

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
   * BORDER RADIUS (More rounded aesthetic)
   * ========================================================================== */
  --cre8-border-radius-none: 0rem;
  --cre8-border-radius-small: 0.25rem;
  --cre8-border-radius-default: 1rem;
  --cre8-border-radius-large: 3.75rem;
  --cre8-border-radius-round: 56.25rem;
  --cre8-border-radius-button: 1rem;
  --cre8-border-radius-badge: 0.25rem;
  --cre8-border-radius-tabs: 1rem;
  --cre8-border-radius-container: 3.75rem;
  --cre8-border-radius-field: 1rem;
  --cre8-border-radius-field-brand: 1rem;
  --cre8-border-radius-brand: 1rem;

  /* ==========================================================================
   * BORDER WIDTH & STYLE
   * ========================================================================== */
  --cre8-border-width-none: 0rem;
  --cre8-border-width-default: 0.0625rem;
  --cre8-border-width-focus: 0.125rem;
  --cre8-border-width-large: 0.25rem;
  --cre8-border-width-thin: 0.062rem;
  --cre8-border-width-medium: 0.25rem;
  --cre8-border-width-thick: 0.375rem;
  --cre8-border-width-button-tertiary-outline-focus: 0.125rem;
  --cre8-border-width-button-default: 0.125rem;
  --cre8-border-width-tab-selected: 0.125rem;
  --cre8-border-width-tab-default: 0.125rem;
  --cre8-border-style-default: solid;
  --cre8-border-style-button-tertiary-outline-focus: solid;

  /* Tertiary Button Borders */
  --cre8-border-button-tertiary-default: none;
  --cre8-border-button-tertiary-hover: 2px solid #026fe4;
  --cre8-border-button-tertiary-active: 2px solid #014ea0;
  --cre8-border-button-tertiary-disabled: none;

  /* ==========================================================================
   * SHADOWS (No shadows in Femmecubator)
   * ========================================================================== */
  --cre8-shadow-none: none;
  --cre8-shadow-small: none;
  --cre8-shadow-default: none;
  --cre8-shadow-large: none;
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
  --cre8-progress-meter-height: 1rem;

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
  --cre8-asset-font-inter-400-normal: "Inter-Regular";
  --cre8-asset-font-inter-500-normal: "Inter-Medium";
  --cre8-asset-font-inter-600-normal: "Inter-SemiBold";
  --cre8-asset-font-inter-700-normal: "Inter-Bold";
}`;
