export default `:root {
  /* ==========================================================================
   * Bolt Theme - Complete Design Token Set
   * Primary: #F7C632 (Electric Yellow) | Brand Strong: #000000 (Black)
   * High contrast, bold aesthetic
   * Font: Inter
   * Border Radius: 4px default
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
  --cre8-color-bg-subtle: #f5f5f5;
  --cre8-color-bg-moderate: #757575;
  --cre8-color-bg-inverse-moderate: #a0a0a0;
  --cre8-color-bg-knockout: #000000;
  --cre8-color-bg-strong: #000000;
  --cre8-color-bg-disabled: #e0e0e0;
  --cre8-color-bg-active: #000000;
  --cre8-color-bg-inverse-active: #ffffff;

  /* Brand Background Colors */
  --cre8-color-bg-brand: #FFF8E1;
  --cre8-color-bg-brand-strong: #F7C632;
  --cre8-color-bg-brand-strong-hover: #E5B62E;
  --cre8-color-bg-brand-strong-active: #CCA129;
  --cre8-color-bg-brand-hover: #FFECB3;
  --cre8-color-bg-brand-active: #FFE082;
  --cre8-color-bg-brand-xstrong: #000000;
  --cre8-color-bg-brand-xstrong-hover: #1a1a1a;
  --cre8-color-bg-brand-xstrong-active: #333333;
  --cre8-color-bg-default-hover: #FFF8E1;
  --cre8-color-bg-default-active: #FFECB3;

  /* Semantic Background Colors */
  --cre8-color-bg-success: #e8f5e9;
  --cre8-color-bg-success-strong: #4caf50;
  --cre8-color-bg-error: #ffebee;
  --cre8-color-bg-error-strong: #f44336;
  --cre8-color-bg-warning: #FFF8E1;
  --cre8-color-bg-warning-strong: #F7C632;
  --cre8-color-bg-info: #e3f2fd;
  --cre8-color-bg-info-strong: #2196f3;
  --cre8-color-bg-attention: #e3f2fd;
  --cre8-color-bg-attention-strong: #2196f3;

  /* Opacity Background Colors */
  --cre8-color-bg-opacity-transparent: rgba(0, 0, 0, 0.0);
  --cre8-color-bg-opacity-default: rgba(0, 0, 0, 0.50);

  /* ==========================================================================
   * CONTENT/TEXT COLORS
   * ========================================================================== */
  --cre8-color-content-default: #000000;
  --cre8-color-content-subtle: #424242;
  --cre8-color-content-disabled: #757575;
  --cre8-color-content-knockout: #ffffff;
  --cre8-color-content-brand: #000000;
  --cre8-color-content-brand-strong: #000000;
  --cre8-color-content-brand-knockout: #FFF8E1;

  /* Semantic Content Colors */
  --cre8-color-content-success: #2e7d32;
  --cre8-color-content-success-icon: #4caf50;
  --cre8-color-content-error: #c62828;
  --cre8-color-content-error-icon: #f44336;
  --cre8-color-content-warning-icon: #F7C632;
  --cre8-color-content-info-icon: #2196f3;
  --cre8-color-content-attention-icon: #2196f3;

  /* Link Colors */
  --cre8-color-content-link: #000000;
  --cre8-color-content-inverse-link: #F7C632;
  --cre8-color-content-link-hover: #424242;
  --cre8-color-content-inverse-link-hover: #FFE082;
  --cre8-color-content-link-focus: #ffffff;
  --cre8-color-content-inverse-link-focus: #000000;
  --cre8-color-content-link-active: #000000;
  --cre8-color-content-inverse-link-active: #FFECB3;
  --cre8-color-content-link-disabled: #757575;
  --cre8-color-content-inverse-link-disabled: #a0a0a0;
  --cre8-color-content-link-visted: #424242;
  --cre8-color-content-inverse-link-visted: #FFECB3;

  /* ==========================================================================
   * BORDER COLORS
   * ========================================================================== */
  --cre8-color-border-default: #bdbdbd;
  --cre8-color-border-strong: #424242;
  --cre8-color-border-knockout: #ffffff;
  --cre8-color-border-disabled: #a0a0a0;
  --cre8-color-border-brand: #F7C632;
  --cre8-color-border-brand-subtle: #FFF8E1;
  --cre8-color-border-brand-strong: #000000;
  --cre8-color-border-success: #4caf50;
  --cre8-color-border-error: #f44336;
  --cre8-color-border-warning: #F7C632;
  --cre8-color-border-info: #2196f3;
  --cre8-color-border-attention: #2196f3;
  --cre8-color-border-transparent: rgba(0, 0, 0, 0.0);
  --cre8-color-border-active-outline: #000000;
  --cre8-color-link-bg-active: #000000;

  /* ==========================================================================
   * HEADER COLORS
   * ========================================================================== */
  --cre8-color-header-bg-default: #000000;
  --cre8-color-header-inverse-bg-default: #F7C632;
  --cre8-color-header-bg-secondary: #F7C632;
  --cre8-color-header-inverse-bg-secondary: #000000;
  --cre8-color-header-bg-tertiary: #1a1a1a;
  --cre8-color-header-inverse-bg-tertiary: #ffffff;

  /* Header Menu Colors */
  --cre8-color-header-menu-bg-default: #000000;
  --cre8-color-header-menu-inverse-bg-default: #F7C632;
  --cre8-color-header-menu-bg-selected: #1a1a1a;
  --cre8-color-header-menu-inverse-bg-selected: #E5B62E;
  --cre8-color-header-menu-bg-hover: #1a1a1a;
  --cre8-color-header-menu-inverse-bg-hover: #E5B62E;
  --cre8-color-header-menu-bg-pressed: #333333;
  --cre8-color-header-menu-inverse-bg-pressed: #CCA129;
  --cre8-color-header-menu-bg-active: #F7C632;
  --cre8-color-header-menu-inverse-bg-active: #000000;
  --cre8-color-header-menu-bg-focus: #1a1a1a;
  --cre8-color-header-menu-inverse-bg-focus: #E5B62E;

  /* Header Menu Content Colors */
  --cre8-color-header-menu-content-default: #ffffff;
  --cre8-color-header-menu-inverse-content-default: #000000;
  --cre8-color-header-menu-content-hover: #F7C632;
  --cre8-color-header-menu-inverse-content-hover: #000000;
  --cre8-color-header-menu-content-pressed: #F7C632;
  --cre8-color-header-menu-inverse-content-pressed: #000000;
  --cre8-color-header-menu-content-active: #000000;
  --cre8-color-header-menu-inverse-content-active: #ffffff;
  --cre8-color-header-menu-content-selected: #F7C632;
  --cre8-color-header-menu-inverse-content-selected: #000000;
  --cre8-color-header-menu-content-focus: #ffffff;
  --cre8-color-header-menu-inverse-content-focus: #000000;

  /* Header Menu Border Colors */
  --cre8-color-header-menu-border-default: #000000;
  --cre8-color-header-menu-inverse-border-default: #F7C632;
  --cre8-color-header-menu-border-pressed: #F7C632;
  --cre8-color-header-menu-inverse-border-pressed: #000000;
  --cre8-color-header-menu-border-active: #F7C632;
  --cre8-color-header-menu-inverse-border-active: #000000;
  --cre8-color-header-menu-border-selected: #F7C632;
  --cre8-color-header-menu-inverse-border-selected: #000000;
  --cre8-color-header-menu-border-focus: #F7C632;
  --cre8-color-header-menu-inverse-border-focus: #000000;
  --cre8-color-header-menu-border-hover: #1a1a1a;
  --cre8-color-header-menu-inverse-border-hover: #E5B62E;

  /* Header Submenu Colors */
  --cre8-color-header-submenu-bg-default: #1a1a1a;
  --cre8-color-header-submenu-inverse-bg-default: #ffffff;
  --cre8-color-header-submenu-bg-hover: #333333;
  --cre8-color-header-submenu-inverse-bg-hover: #FFF8E1;
  --cre8-color-header-submenu-bg-pressed: #000000;
  --cre8-color-header-submenu-inverse-bg-pressed: #FFECB3;
  --cre8-color-header-submenu-bg-active: #F7C632;
  --cre8-color-header-submenu-inverse-bg-active: #000000;
  --cre8-color-header-submenu-bg-focus: #333333;
  --cre8-color-header-submenu-inverse-bg-focus: #FFF8E1;
  --cre8-color-header-submenu-bg-selected: #333333;
  --cre8-color-header-submenu-inverse-bg-selected: #FFECB3;

  /* Header Submenu Content Colors */
  --cre8-color-header-submenu-content-default: #ffffff;
  --cre8-color-header-submenu-inverse-content-default: #000000;
  --cre8-color-header-submenu-content-hover: #F7C632;
  --cre8-color-header-submenu-inverse-content-hover: #000000;
  --cre8-color-header-submenu-content-pressed: #F7C632;
  --cre8-color-header-submenu-inverse-content-pressed: #000000;
  --cre8-color-header-submenu-content-active: #000000;
  --cre8-color-header-submenu-inverse-content-active: #ffffff;
  --cre8-color-header-submenu-content-focus: #F7C632;
  --cre8-color-header-submenu-inverse-content-focus: #000000;
  --cre8-color-header-submenu-content-selected: #F7C632;
  --cre8-color-header-submenu-inverse-content-selected: #000000;

  /* Header Submenu Border Colors */
  --cre8-color-header-submenu-border-default: #1a1a1a;
  --cre8-color-header-submenu-inverse-border-default: #ffffff;
  --cre8-color-header-submenu-border-hover: #333333;
  --cre8-color-header-submenu-inverse-border-hover: #FFF8E1;
  --cre8-color-header-submenu-border-focus: #F7C632;
  --cre8-color-header-submenu-inverse-border-focus: #000000;
  --cre8-color-header-submenu-border-active: #F7C632;
  --cre8-color-header-submenu-inverse-border-active: #000000;
  --cre8-color-header-submenu-border-pressed: #000000;
  --cre8-color-header-submenu-inverse-border-pressed: #FFECB3;
  --cre8-color-header-submenu-border-selected: #F7C632;
  --cre8-color-header-submenu-inverse-border-selected: #000000;

  /* Desktop Menu Padding */
  --cre8-desktop-menu-padding-vertical-padding: 1rem;
  --cre8-desktop-menu-padding-horizontal-padding: 0.5rem;

  /* ==========================================================================
   * FOOTER COLORS
   * ========================================================================== */
  --cre8-color-footer-bg-default: #000000;
  --cre8-color-footer-bg-secondary: #1a1a1a;
  --cre8-color-footer-content-default: #ffffff;
  --cre8-color-footer-content-secondary: #a0a0a0;
  --cre8-color-footer-link-default: #F7C632;
  --cre8-color-footer-link-hover: #FFE082;

  /* ==========================================================================
   * BUTTON COLORS - PRIMARY
   * ========================================================================== */
  --cre8-color-button-primary-bg: #F7C632;
  --cre8-color-button-primary-inverse-bg: #000000;
  --cre8-color-button-primary-bg-hover: #E5B62E;
  --cre8-color-button-primary-inverse-bg-hover: #1a1a1a;
  --cre8-color-button-primary-bg-active: #CCA129;
  --cre8-color-button-primary-inverse-bg-active: #333333;
  --cre8-color-button-primary-bg-disabled: #e0e0e0;
  --cre8-color-button-primary-inverse-bg-disabled: #757575;
  --cre8-color-button-primary-border: #F7C632;
  --cre8-color-button-primary-inverse-border: #000000;
  --cre8-color-button-primary-border-hover: #E5B62E;
  --cre8-color-button-primary-inverse-border-hover: #1a1a1a;
  --cre8-color-button-primary-border-active: #CCA129;
  --cre8-color-button-primary-inverse-border-active: #333333;
  --cre8-color-button-primary-border-disabled: #e0e0e0;
  --cre8-color-button-primary-inverse-border-disabled: #757575;
  --cre8-color-button-primary-content: #000000;
  --cre8-color-button-primary-inverse-content: #F7C632;
  --cre8-color-button-primary-content-hover: #000000;
  --cre8-color-button-primary-inverse-content-hover: #F7C632;
  --cre8-color-button-primary-content-active: #000000;
  --cre8-color-button-primary-inverse-content-active: #F7C632;
  --cre8-color-button-primary-content-disabled: #757575;
  --cre8-color-button-primary-inverse-content-disabled: #757575;
  --cre8-color-button-primary-outline: #000000;
  --cre8-color-button-primary-inverse-outline: #F7C632;

  /* ==========================================================================
   * BUTTON COLORS - PRIMARY DANGER
   * ========================================================================== */
  --cre8-color-button-primary-danger-bg: #f44336;
  --cre8-color-button-primary-danger-inverse-bg: #ffebee;
  --cre8-color-button-primary-danger-bg-hover: #d32f2f;
  --cre8-color-button-primary-danger-inverse-bg-hover: #ffcdd2;
  --cre8-color-button-primary-danger-bg-active: #c62828;
  --cre8-color-button-primary-danger-inverse-bg-active: #ef9a9a;
  --cre8-color-button-primary-danger-bg-disabled: #e0e0e0;
  --cre8-color-button-primary-danger-inverse-bg-disabled: #a0a0a0;
  --cre8-color-button-primary-danger-content: #ffffff;
  --cre8-color-button-primary-danger-inverse-content: #c62828;
  --cre8-color-button-primary-danger-content-hover: #ffffff;
  --cre8-color-button-primary-danger-inverse-content-hover: #c62828;
  --cre8-color-button-primary-danger-content-active: #ffffff;
  --cre8-color-button-primary-danger-inverse-content-active: #c62828;
  --cre8-color-button-primary-danger-content-disabled: #757575;
  --cre8-color-button-primary-danger-inverse-content-disabled: #757575;
  --cre8-color-button-primary-danger-border: #f44336;
  --cre8-color-button-primary-danger-inverse-border: #ffebee;
  --cre8-color-button-primary-danger-border-hover: #d32f2f;
  --cre8-color-button-primary-danger-inverse-border-hover: #ffcdd2;
  --cre8-color-button-primary-danger-border-active: #c62828;
  --cre8-color-button-primary-danger-inverse-border-active: #ef9a9a;
  --cre8-color-button-primary-danger-border-disabled: #e0e0e0;
  --cre8-color-button-primary-danger-inverse-border-disabled: #a0a0a0;
  --cre8-color-button-primary-danger-outline: #f44336;
  --cre8-color-button-primary-danger-inverse-outline: #ffebee;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY
   * ========================================================================== */
  --cre8-color-button-secondary-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-bg-hover: #FFF8E1;
  --cre8-color-button-secondary-inverse-bg-hover: rgba(247, 198, 50, 0.15);
  --cre8-color-button-secondary-bg-active: #FFECB3;
  --cre8-color-button-secondary-inverse-bg-active: rgba(247, 198, 50, 0.25);
  --cre8-color-button-secondary-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-inverse-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-border: #000000;
  --cre8-color-button-secondary-inverse-border: #F7C632;
  --cre8-color-button-secondary-border-hover: #000000;
  --cre8-color-button-secondary-inverse-border-hover: #F7C632;
  --cre8-color-button-secondary-border-active: #000000;
  --cre8-color-button-secondary-inverse-border-active: #F7C632;
  --cre8-color-button-secondary-border-disabled: #a0a0a0;
  --cre8-color-button-secondary-inverse-border-disabled: #757575;
  --cre8-color-button-secondary-content: #000000;
  --cre8-color-button-secondary-inverse-content: #F7C632;
  --cre8-color-button-secondary-content-hover: #000000;
  --cre8-color-button-secondary-inverse-content-hover: #F7C632;
  --cre8-color-button-secondary-content-active: #000000;
  --cre8-color-button-secondary-inverse-content-active: #F7C632;
  --cre8-color-button-secondary-content-disabled: #a0a0a0;
  --cre8-color-button-secondary-inverse-content-disabled: #757575;
  --cre8-color-button-secondary-outline: #000000;
  --cre8-color-button-secondary-inverse-outline: #F7C632;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY NEUTRAL
   * ========================================================================== */
  --cre8-color-button-secondary-neutral-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-neutral-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-neutral-content: #000000;
  --cre8-color-button-secondary-neutral-inverse-content: #ffffff;
  --cre8-color-button-secondary-neutral-border: #000000;
  --cre8-color-button-secondary-neutral-inverse-border: #ffffff;
  --cre8-color-button-secondary-neutral-bg-hover: rgba(0, 0, 0, 0.08);
  --cre8-color-button-secondary-neutral-inverse-bg-hover: rgba(255, 255, 255, 0.15);
  --cre8-color-button-secondary-neutral-content-hover: #000000;
  --cre8-color-button-secondary-neutral-inverse-content-hover: #ffffff;
  --cre8-color-button-secondary-neutral-border-hover: #000000;
  --cre8-color-button-secondary-neutral-inverse-border-hover: #ffffff;
  --cre8-color-button-secondary-neutral-border-active: #000000;
  --cre8-color-button-secondary-neutral-inverse-border-active: #ffffff;
  --cre8-color-button-secondary-neutral-bg-active: rgba(0, 0, 0, 0.16);
  --cre8-color-button-secondary-neutral-inverse-bg-active: rgba(255, 255, 255, 0.25);
  --cre8-color-button-secondary-neutral-content-active: #000000;
  --cre8-color-button-secondary-neutral-inverse-content-active: #ffffff;
  --cre8-color-button-secondary-neutral-bg-disabled: #e0e0e0;
  --cre8-color-button-secondary-neutral-inverse-bg-disabled: #757575;
  --cre8-color-button-secondary-neutral-border-disabled: #e0e0e0;
  --cre8-color-button-secondary-neutral-inverse-border-disabled: #757575;
  --cre8-color-button-secondary-neutral-content-disabled: #757575;
  --cre8-color-button-secondary-neutral-inverse-content-disabled: #424242;
  --cre8-color-button-secondary-neutral-outline: #000000;
  --cre8-color-button-secondary-neutral-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY DANGER
   * ========================================================================== */
  --cre8-color-button-secondary-danger-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-danger-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-secondary-danger-bg-hover: #d32f2f;
  --cre8-color-button-secondary-danger-inverse-bg-hover: #ffcdd2;
  --cre8-color-button-secondary-danger-bg-active: #c62828;
  --cre8-color-button-secondary-danger-inverse-bg-active: #ef9a9a;
  --cre8-color-button-secondary-danger-bg-disabled: #e0e0e0;
  --cre8-color-button-secondary-danger-inverse-bg-disabled: #a0a0a0;
  --cre8-color-button-secondary-danger-content: #f44336;
  --cre8-color-button-secondary-danger-inverse-content: #ffebee;
  --cre8-color-button-secondary-danger-content-hover: #ffffff;
  --cre8-color-button-secondary-danger-inverse-content-hover: #c62828;
  --cre8-color-button-secondary-danger-content-active: #ffffff;
  --cre8-color-button-secondary-danger-inverse-content-active: #c62828;
  --cre8-color-button-secondary-danger-content-disabled: #757575;
  --cre8-color-button-secondary-danger-inverse-content-disabled: #757575;
  --cre8-color-button-secondary-danger-border: #f44336;
  --cre8-color-button-secondary-danger-inverse-border: #ffebee;
  --cre8-color-button-secondary-danger-border-hover: #d32f2f;
  --cre8-color-button-secondary-danger-inverse-border-hover: #ffcdd2;
  --cre8-color-button-secondary-danger-border-active: #c62828;
  --cre8-color-button-secondary-danger-inverse-border-active: #ef9a9a;
  --cre8-color-button-secondary-danger-border-disabled: #e0e0e0;
  --cre8-color-button-secondary-danger-inverse-border-disabled: #a0a0a0;
  --cre8-color-button-secondary-danger-outline: #f44336;
  --cre8-color-button-secondary-danger-inverse-outline: #ffebee;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY
   * ========================================================================== */
  --cre8-color-button-tertiary-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-bg-hover: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-bg-hover: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-bg-active: #FFF8E1;
  --cre8-color-button-tertiary-inverse-bg-active: rgba(247, 198, 50, 0.15);
  --cre8-color-button-tertiary-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-border-hover: #000000;
  --cre8-color-button-tertiary-inverse-border-hover: #F7C632;
  --cre8-color-button-tertiary-border-active: #000000;
  --cre8-color-button-tertiary-inverse-border-active: #F7C632;
  --cre8-color-button-tertiary-border-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-inverse-border-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-content: #000000;
  --cre8-color-button-tertiary-inverse-content: #F7C632;
  --cre8-color-button-tertiary-content-hover: #000000;
  --cre8-color-button-tertiary-inverse-content-hover: #F7C632;
  --cre8-color-button-tertiary-content-active: #000000;
  --cre8-color-button-tertiary-inverse-content-active: #F7C632;
  --cre8-color-button-tertiary-content-disabled: #757575;
  --cre8-color-button-tertiary-inverse-content-disabled: #757575;
  --cre8-color-button-tertiary-outline: #000000;
  --cre8-color-button-tertiary-inverse-outline: #F7C632;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY NEUTRAL
   * ========================================================================== */
  --cre8-color-button-tertiary-neutral-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-content: #000000;
  --cre8-color-button-tertiary-neutral-inverse-content: #ffffff;
  --cre8-color-button-tertiary-neutral-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-bg-hover: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-hover: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-content-hover: #000000;
  --cre8-color-button-tertiary-neutral-inverse-content-hover: #ffffff;
  --cre8-color-button-tertiary-neutral-border-hover: #000000;
  --cre8-color-button-tertiary-neutral-inverse-border-hover: #ffffff;
  --cre8-color-button-tertiary-neutral-border-active: #000000;
  --cre8-color-button-tertiary-neutral-inverse-border-active: #ffffff;
  --cre8-color-button-tertiary-neutral-bg-active: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-active: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-content-active: #000000;
  --cre8-color-button-tertiary-neutral-inverse-content-active: #ffffff;
  --cre8-color-button-tertiary-neutral-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-border-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-border-disabled: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-neutral-content-disabled: #757575;
  --cre8-color-button-tertiary-neutral-inverse-content-disabled: #424242;
  --cre8-color-button-tertiary-neutral-outline: #000000;
  --cre8-color-button-tertiary-neutral-inverse-outline: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY DANGER
   * ========================================================================== */
  --cre8-color-button-tertiary-danger-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-danger-inverse-bg: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-danger-bg-hover: #d32f2f;
  --cre8-color-button-tertiary-danger-inverse-bg-hover: #ffcdd2;
  --cre8-color-button-tertiary-danger-bg-active: #c62828;
  --cre8-color-button-tertiary-danger-inverse-bg-active: #ef9a9a;
  --cre8-color-button-tertiary-danger-bg-disabled: #e0e0e0;
  --cre8-color-button-tertiary-danger-inverse-bg-disabled: #a0a0a0;
  --cre8-color-button-tertiary-danger-content: #f44336;
  --cre8-color-button-tertiary-danger-inverse-content: #ffebee;
  --cre8-color-button-tertiary-danger-content-hover: #ffffff;
  --cre8-color-button-tertiary-danger-inverse-content-hover: #c62828;
  --cre8-color-button-tertiary-danger-content-active: #ffffff;
  --cre8-color-button-tertiary-danger-inverse-content-active: #c62828;
  --cre8-color-button-tertiary-danger-content-disabled: #757575;
  --cre8-color-button-tertiary-danger-inverse-content-disabled: #757575;
  --cre8-color-button-tertiary-danger-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-danger-inverse-border: rgba(0, 0, 0, 0.0);
  --cre8-color-button-tertiary-danger-border-hover: #d32f2f;
  --cre8-color-button-tertiary-danger-inverse-border-hover: #ffcdd2;
  --cre8-color-button-tertiary-danger-border-active: #c62828;
  --cre8-color-button-tertiary-danger-inverse-border-active: #ef9a9a;
  --cre8-color-button-tertiary-danger-border-disabled: #e0e0e0;
  --cre8-color-button-tertiary-danger-inverse-border-disabled: #a0a0a0;
  --cre8-color-button-tertiary-danger-outline: #f44336;
  --cre8-color-button-tertiary-danger-inverse-outline: #ffebee;

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
  --cre8-font-family-default: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --cre8-font-families-inter: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
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
   * BORDER RADIUS
   * ========================================================================== */
  --cre8-border-radius-none: 0px;
  --cre8-border-radius-small: 4px;
  --cre8-border-radius-default: 4px;
  --cre8-border-radius-large: 8px;
  --cre8-border-radius-round: 900px;
  --cre8-border-radius-button: 4px;
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
  --cre8-border-button-tertiary-hover: 2px solid #000000;
  --cre8-border-button-tertiary-active: 2px solid #000000;
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
  --cre8-asset-font-inter-400-normal: "Inter-Regular";
  --cre8-asset-font-inter-500-normal: "Inter-Medium";
  --cre8-asset-font-inter-600-normal: "Inter-SemiBold";
  --cre8-asset-font-inter-700-normal: "Inter-Bold";
}`;
