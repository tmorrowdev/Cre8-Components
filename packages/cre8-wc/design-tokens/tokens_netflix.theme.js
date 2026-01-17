export default `:root {
  /* ==========================================================================
   * Netflix Theme - Complete Design Token Set
   * Primary: #E50914 (Netflix Red) | Brand Strong: #B81D24 (Dark Red)
   * Accent: #221F1F (Near Black) | Background: #141414 (Dark)
   * Font: Netflix Sans (fallback: Helvetica Neue)
   * Border Radius: 4px default (minimal rounding, cinematic style)
   * Mode: Dark theme
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
  --cre8-color-bg-default: #141414;
  --cre8-color-bg-subtle: #1f1f1f;
  --cre8-color-bg-moderate: #808080;
  --cre8-color-bg-inverse-moderate: #b3b3b3;
  --cre8-color-bg-knockout: #ffffff;
  --cre8-color-bg-strong: #ffffff;
  --cre8-color-bg-disabled: #333333;
  --cre8-color-bg-active: #ffffff;
  --cre8-color-bg-inverse-active: #141414;

  /* Brand Background Colors */
  --cre8-color-bg-brand: #2a0a0c;
  --cre8-color-bg-brand-strong: #E50914;
  --cre8-color-bg-brand-strong-hover: #ff1f2c;
  --cre8-color-bg-brand-strong-active: #B81D24;
  --cre8-color-bg-brand-hover: #3d1012;
  --cre8-color-bg-brand-active: #4f1418;
  --cre8-color-bg-brand-xstrong: #B81D24;
  --cre8-color-bg-brand-xstrong-hover: #8B0000;
  --cre8-color-bg-brand-xstrong-active: #660000;
  --cre8-color-bg-default-hover: #1f1f1f;
  --cre8-color-bg-default-active: #2a2a2a;

  /* Semantic Background Colors */
  --cre8-color-bg-success: #0d2818;
  --cre8-color-bg-success-strong: #46d369;
  --cre8-color-bg-error: #2a0a0c;
  --cre8-color-bg-error-strong: #E50914;
  --cre8-color-bg-warning: #2a2008;
  --cre8-color-bg-warning-strong: #f5b014;
  --cre8-color-bg-info: #0a1a2a;
  --cre8-color-bg-info-strong: #0071eb;
  --cre8-color-bg-attention: #0a1a2a;
  --cre8-color-bg-attention-strong: #0071eb;

  /* Opacity Background Colors */
  --cre8-color-bg-opacity-transparent: rgba(20, 20, 20, 0.0);
  --cre8-color-bg-opacity-default: rgba(0, 0, 0, 0.70);

  /* ==========================================================================
   * CONTENT/TEXT COLORS
   * ========================================================================== */
  --cre8-color-content-default: #ffffff;
  --cre8-color-content-subtle: #b3b3b3;
  --cre8-color-content-disabled: #666666;
  --cre8-color-content-knockout: #141414;
  --cre8-color-content-brand: #E50914;
  --cre8-color-content-brand-strong: #ff3d46;
  --cre8-color-content-brand-knockout: #ffffff;

  /* Semantic Content Colors */
  --cre8-color-content-success: #46d369;
  --cre8-color-content-success-icon: #46d369;
  --cre8-color-content-error: #E50914;
  --cre8-color-content-error-icon: #E50914;
  --cre8-color-content-warning-icon: #f5b014;
  --cre8-color-content-info-icon: #0071eb;
  --cre8-color-content-attention-icon: #0071eb;

  /* Link Colors */
  --cre8-color-content-link: #0071eb;
  --cre8-color-content-inverse-link: #0071eb;
  --cre8-color-content-link-hover: #4d9af1;
  --cre8-color-content-inverse-link-hover: #4d9af1;
  --cre8-color-content-link-focus: #141414;
  --cre8-color-content-inverse-link-focus: #ffffff;
  --cre8-color-content-link-active: #0058b8;
  --cre8-color-content-inverse-link-active: #0058b8;
  --cre8-color-content-link-disabled: #666666;
  --cre8-color-content-inverse-link-disabled: #4d4d4d;
  --cre8-color-content-link-visited: #9b59b6;
  --cre8-color-content-inverse-link-visited: #9b59b6;

  /* ==========================================================================
   * BORDER COLORS
   * ========================================================================== */
  --cre8-color-border-default: #333333;
  --cre8-color-border-strong: #808080;
  --cre8-color-border-knockout: #141414;
  --cre8-color-border-disabled: #4d4d4d;
  --cre8-color-border-brand: #E50914;
  --cre8-color-border-brand-subtle: #661015;
  --cre8-color-border-brand-strong: #ff3d46;
  --cre8-color-border-success: #46d369;
  --cre8-color-border-error: #E50914;
  --cre8-color-border-warning: #f5b014;
  --cre8-color-border-info: #0071eb;
  --cre8-color-border-attention: #0071eb;
  --cre8-color-border-transparent: rgba(20, 20, 20, 0.0);
  --cre8-color-border-active-outline: #0071eb;
  --cre8-color-border-inverse-active-outline: #0071eb;
  --cre8-color-link-bg-active: #0071eb;

  /* ==========================================================================
   * HEADER COLORS
   * ========================================================================== */
  --cre8-color-header-bg-default: #141414;
  --cre8-color-header-inverse-bg-default: #E50914;
  --cre8-color-header-bg-secondary: #1f1f1f;
  --cre8-color-header-inverse-bg-secondary: #B81D24;
  --cre8-color-header-bg-tertiary: #0a0a0a;
  --cre8-color-header-inverse-bg-tertiary: #ff1f2c;

  /* Header Menu Colors */
  --cre8-color-header-menu-bg-default: #141414;
  --cre8-color-header-menu-inverse-bg-default: #E50914;
  --cre8-color-header-menu-bg-selected: #2a2a2a;
  --cre8-color-header-menu-inverse-bg-selected: #B81D24;
  --cre8-color-header-menu-bg-hover: #1f1f1f;
  --cre8-color-header-menu-inverse-bg-hover: #ff1f2c;
  --cre8-color-header-menu-bg-pressed: #2a2a2a;
  --cre8-color-header-menu-inverse-bg-pressed: #B81D24;
  --cre8-color-header-menu-bg-active: #333333;
  --cre8-color-header-menu-inverse-bg-active: #8B0000;
  --cre8-color-header-menu-bg-focus: #1f1f1f;
  --cre8-color-header-menu-inverse-bg-focus: #ff1f2c;

  /* Header Menu Content Colors */
  --cre8-color-header-menu-content-default: #b3b3b3;
  --cre8-color-header-menu-inverse-content-default: #ffffff;
  --cre8-color-header-menu-content-hover: #ffffff;
  --cre8-color-header-menu-inverse-content-hover: #ffffff;
  --cre8-color-header-menu-content-pressed: #ffffff;
  --cre8-color-header-menu-inverse-content-pressed: #ffffff;
  --cre8-color-header-menu-content-active: #ffffff;
  --cre8-color-header-menu-inverse-content-active: #ffffff;
  --cre8-color-header-menu-content-selected: #ffffff;
  --cre8-color-header-menu-inverse-content-selected: #ffffff;
  --cre8-color-header-menu-content-focus: #ffffff;
  --cre8-color-header-menu-inverse-content-focus: #ffffff;

  /* Header Menu Border Colors */
  --cre8-color-header-menu-border-default: rgba(20, 20, 20, 0.0);
  --cre8-color-header-menu-inverse-border-default: rgba(229, 9, 20, 0.0);
  --cre8-color-header-menu-border-pressed: #E50914;
  --cre8-color-header-menu-inverse-border-pressed: #ffffff;
  --cre8-color-header-menu-border-active: #E50914;
  --cre8-color-header-menu-inverse-border-active: #ffffff;
  --cre8-color-header-menu-border-selected: #E50914;
  --cre8-color-header-menu-inverse-border-selected: #ffffff;
  --cre8-color-header-menu-border-focus: #0071eb;
  --cre8-color-header-menu-inverse-border-focus: #ffffff;
  --cre8-color-header-menu-border-hover: #333333;
  --cre8-color-header-menu-inverse-border-hover: #ff3d46;

  /* Header Submenu Colors */
  --cre8-color-header-submenu-bg-default: #1a1a1a;
  --cre8-color-header-submenu-inverse-bg-default: #1a1a1a;
  --cre8-color-header-submenu-bg-hover: #252525;
  --cre8-color-header-submenu-inverse-bg-hover: #252525;
  --cre8-color-header-submenu-bg-pressed: #333333;
  --cre8-color-header-submenu-inverse-bg-pressed: #333333;
  --cre8-color-header-submenu-bg-active: #E50914;
  --cre8-color-header-submenu-inverse-bg-active: #E50914;
  --cre8-color-header-submenu-bg-focus: #252525;
  --cre8-color-header-submenu-inverse-bg-focus: #252525;
  --cre8-color-header-submenu-bg-selected: #2a0a0c;
  --cre8-color-header-submenu-inverse-bg-selected: #2a0a0c;

  /* Header Submenu Content Colors */
  --cre8-color-header-submenu-content-default: #b3b3b3;
  --cre8-color-header-submenu-inverse-content-default: #b3b3b3;
  --cre8-color-header-submenu-content-hover: #ffffff;
  --cre8-color-header-submenu-inverse-content-hover: #ffffff;
  --cre8-color-header-submenu-content-pressed: #ffffff;
  --cre8-color-header-submenu-inverse-content-pressed: #ffffff;
  --cre8-color-header-submenu-content-active: #ffffff;
  --cre8-color-header-submenu-inverse-content-active: #ffffff;
  --cre8-color-header-submenu-content-focus: #ffffff;
  --cre8-color-header-submenu-inverse-content-focus: #ffffff;
  --cre8-color-header-submenu-content-selected: #E50914;
  --cre8-color-header-submenu-inverse-content-selected: #E50914;

  /* Header Submenu Border Colors */
  --cre8-color-header-submenu-border-default: #333333;
  --cre8-color-header-submenu-inverse-border-default: #333333;
  --cre8-color-header-submenu-border-hover: #404040;
  --cre8-color-header-submenu-inverse-border-hover: #404040;
  --cre8-color-header-submenu-border-focus: #0071eb;
  --cre8-color-header-submenu-inverse-border-focus: #0071eb;
  --cre8-color-header-submenu-border-active: #E50914;
  --cre8-color-header-submenu-inverse-border-active: #E50914;
  --cre8-color-header-submenu-border-pressed: #333333;
  --cre8-color-header-submenu-inverse-border-pressed: #333333;
  --cre8-color-header-submenu-border-selected: #E50914;
  --cre8-color-header-submenu-inverse-border-selected: #E50914;

  /* Desktop Menu Padding */
  --cre8-desktop-menu-padding-vertical-padding: 1rem;
  --cre8-desktop-menu-padding-horizontal-padding: 0.5rem;

  /* ==========================================================================
   * FOOTER COLORS
   * ========================================================================== */
  --cre8-color-footer-bg-default: #141414;
  --cre8-color-footer-bg-secondary: #0a0a0a;
  --cre8-color-footer-content-default: #808080;
  --cre8-color-footer-content-secondary: #666666;
  --cre8-color-footer-link-default: #808080;
  --cre8-color-footer-link-hover: #ffffff;

  /* ==========================================================================
   * BUTTON COLORS - PRIMARY
   * ========================================================================== */
  --cre8-color-button-primary-bg: #E50914;
  --cre8-color-button-primary-inverse-bg: #ffffff;
  --cre8-color-button-primary-bg-hover: #ff1f2c;
  --cre8-color-button-primary-inverse-bg-hover: #e6e6e6;
  --cre8-color-button-primary-bg-active: #B81D24;
  --cre8-color-button-primary-inverse-bg-active: #cccccc;
  --cre8-color-button-primary-bg-disabled: #333333;
  --cre8-color-button-primary-inverse-bg-disabled: #4d4d4d;
  --cre8-color-button-primary-border: #E50914;
  --cre8-color-button-primary-inverse-border: #ffffff;
  --cre8-color-button-primary-border-hover: #ff1f2c;
  --cre8-color-button-primary-inverse-border-hover: #e6e6e6;
  --cre8-color-button-primary-border-active: #B81D24;
  --cre8-color-button-primary-inverse-border-active: #cccccc;
  --cre8-color-button-primary-border-disabled: #333333;
  --cre8-color-button-primary-inverse-border-disabled: #4d4d4d;
  --cre8-color-button-primary-content: #ffffff;
  --cre8-color-button-primary-inverse-content: #141414;
  --cre8-color-button-primary-content-hover: #ffffff;
  --cre8-color-button-primary-inverse-content-hover: #141414;
  --cre8-color-button-primary-content-active: #ffffff;
  --cre8-color-button-primary-inverse-content-active: #141414;
  --cre8-color-button-primary-content-disabled: #666666;
  --cre8-color-button-primary-inverse-content-disabled: #808080;
  --cre8-color-button-primary-outline: #0071eb;
  --cre8-color-button-primary-inverse-outline: #0071eb;

  /* ==========================================================================
   * BUTTON COLORS - PRIMARY DANGER
   * ========================================================================== */
  --cre8-color-button-primary-danger-bg: #E50914;
  --cre8-color-button-primary-danger-inverse-bg: #ff6b6b;
  --cre8-color-button-primary-danger-bg-hover: #ff1f2c;
  --cre8-color-button-primary-danger-inverse-bg-hover: #ff8585;
  --cre8-color-button-primary-danger-bg-active: #B81D24;
  --cre8-color-button-primary-danger-inverse-bg-active: #ffb3b3;
  --cre8-color-button-primary-danger-bg-disabled: #333333;
  --cre8-color-button-primary-danger-inverse-bg-disabled: #4d4d4d;
  --cre8-color-button-primary-danger-content: #ffffff;
  --cre8-color-button-primary-danger-inverse-content: #141414;
  --cre8-color-button-primary-danger-content-hover: #ffffff;
  --cre8-color-button-primary-danger-inverse-content-hover: #141414;
  --cre8-color-button-primary-danger-content-active: #ffffff;
  --cre8-color-button-primary-danger-inverse-content-active: #141414;
  --cre8-color-button-primary-danger-content-disabled: #666666;
  --cre8-color-button-primary-danger-inverse-content-disabled: #808080;
  --cre8-color-button-primary-danger-border: #E50914;
  --cre8-color-button-primary-danger-inverse-border: #ff6b6b;
  --cre8-color-button-primary-danger-border-hover: #ff1f2c;
  --cre8-color-button-primary-danger-inverse-border-hover: #ff8585;
  --cre8-color-button-primary-danger-border-active: #B81D24;
  --cre8-color-button-primary-danger-inverse-border-active: #ffb3b3;
  --cre8-color-button-primary-danger-border-disabled: #333333;
  --cre8-color-button-primary-danger-inverse-border-disabled: #4d4d4d;
  --cre8-color-button-primary-danger-outline: #0071eb;
  --cre8-color-button-primary-danger-inverse-outline: #0071eb;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY
   * ========================================================================== */
  --cre8-color-button-secondary-bg: rgba(20, 20, 20, 0.0);
  --cre8-color-button-secondary-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-bg-hover: rgba(255, 255, 255, 0.1);
  --cre8-color-button-secondary-inverse-bg-hover: rgba(255, 255, 255, 0.15);
  --cre8-color-button-secondary-bg-active: rgba(255, 255, 255, 0.2);
  --cre8-color-button-secondary-inverse-bg-active: rgba(255, 255, 255, 0.25);
  --cre8-color-button-secondary-bg-disabled: rgba(20, 20, 20, 0.0);
  --cre8-color-button-secondary-inverse-bg-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-border: #ffffff;
  --cre8-color-button-secondary-inverse-border: #ffffff;
  --cre8-color-button-secondary-border-hover: #ffffff;
  --cre8-color-button-secondary-inverse-border-hover: #ffffff;
  --cre8-color-button-secondary-border-active: #ffffff;
  --cre8-color-button-secondary-inverse-border-active: #ffffff;
  --cre8-color-button-secondary-border-disabled: #4d4d4d;
  --cre8-color-button-secondary-inverse-border-disabled: #4d4d4d;
  --cre8-color-button-secondary-content: #ffffff;
  --cre8-color-button-secondary-inverse-content: #ffffff;
  --cre8-color-button-secondary-content-hover: #ffffff;
  --cre8-color-button-secondary-inverse-content-hover: #ffffff;
  --cre8-color-button-secondary-content-active: #ffffff;
  --cre8-color-button-secondary-inverse-content-active: #ffffff;
  --cre8-color-button-secondary-content-disabled: #666666;
  --cre8-color-button-secondary-inverse-content-disabled: #666666;
  --cre8-color-button-secondary-outline: #0071eb;
  --cre8-color-button-secondary-inverse-outline: #0071eb;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY NEUTRAL
   * ========================================================================== */
  --cre8-color-button-secondary-neutral-bg: rgba(20, 20, 20, 0.0);
  --cre8-color-button-secondary-neutral-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-neutral-content: #b3b3b3;
  --cre8-color-button-secondary-neutral-inverse-content: #ffffff;
  --cre8-color-button-secondary-neutral-border: #808080;
  --cre8-color-button-secondary-neutral-inverse-border: #ffffff;
  --cre8-color-button-secondary-neutral-bg-hover: rgba(128, 128, 128, 0.2);
  --cre8-color-button-secondary-neutral-inverse-bg-hover: rgba(255, 255, 255, 0.15);
  --cre8-color-button-secondary-neutral-content-hover: #ffffff;
  --cre8-color-button-secondary-neutral-inverse-content-hover: #ffffff;
  --cre8-color-button-secondary-neutral-border-hover: #b3b3b3;
  --cre8-color-button-secondary-neutral-inverse-border-hover: #ffffff;
  --cre8-color-button-secondary-neutral-border-active: #ffffff;
  --cre8-color-button-secondary-neutral-inverse-border-active: #ffffff;
  --cre8-color-button-secondary-neutral-bg-active: rgba(128, 128, 128, 0.3);
  --cre8-color-button-secondary-neutral-inverse-bg-active: rgba(255, 255, 255, 0.25);
  --cre8-color-button-secondary-neutral-content-active: #ffffff;
  --cre8-color-button-secondary-neutral-inverse-content-active: #ffffff;
  --cre8-color-button-secondary-neutral-bg-disabled: #333333;
  --cre8-color-button-secondary-neutral-inverse-bg-disabled: #4d4d4d;
  --cre8-color-button-secondary-neutral-border-disabled: #333333;
  --cre8-color-button-secondary-neutral-inverse-border-disabled: #4d4d4d;
  --cre8-color-button-secondary-neutral-content-disabled: #666666;
  --cre8-color-button-secondary-neutral-inverse-content-disabled: #808080;
  --cre8-color-button-secondary-neutral-outline: #0071eb;
  --cre8-color-button-secondary-neutral-inverse-outline: #0071eb;

  /* ==========================================================================
   * BUTTON COLORS - SECONDARY DANGER
   * ========================================================================== */
  --cre8-color-button-secondary-danger-bg: rgba(20, 20, 20, 0.0);
  --cre8-color-button-secondary-danger-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-secondary-danger-bg-hover: #B81D24;
  --cre8-color-button-secondary-danger-inverse-bg-hover: #ff8585;
  --cre8-color-button-secondary-danger-bg-active: #8B0000;
  --cre8-color-button-secondary-danger-inverse-bg-active: #ffb3b3;
  --cre8-color-button-secondary-danger-bg-disabled: #333333;
  --cre8-color-button-secondary-danger-inverse-bg-disabled: #4d4d4d;
  --cre8-color-button-secondary-danger-content: #E50914;
  --cre8-color-button-secondary-danger-inverse-content: #ff6b6b;
  --cre8-color-button-secondary-danger-content-hover: #ffffff;
  --cre8-color-button-secondary-danger-inverse-content-hover: #141414;
  --cre8-color-button-secondary-danger-content-active: #ffffff;
  --cre8-color-button-secondary-danger-inverse-content-active: #141414;
  --cre8-color-button-secondary-danger-content-disabled: #666666;
  --cre8-color-button-secondary-danger-inverse-content-disabled: #808080;
  --cre8-color-button-secondary-danger-border: #E50914;
  --cre8-color-button-secondary-danger-inverse-border: #ff6b6b;
  --cre8-color-button-secondary-danger-border-hover: #B81D24;
  --cre8-color-button-secondary-danger-inverse-border-hover: #ff8585;
  --cre8-color-button-secondary-danger-border-active: #8B0000;
  --cre8-color-button-secondary-danger-inverse-border-active: #ffb3b3;
  --cre8-color-button-secondary-danger-border-disabled: #333333;
  --cre8-color-button-secondary-danger-inverse-border-disabled: #4d4d4d;
  --cre8-color-button-secondary-danger-outline: #0071eb;
  --cre8-color-button-secondary-danger-inverse-outline: #0071eb;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY
   * ========================================================================== */
  --cre8-color-button-tertiary-bg: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-bg-hover: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-inverse-bg-hover: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-bg-active: rgba(229, 9, 20, 0.15);
  --cre8-color-button-tertiary-inverse-bg-active: rgba(255, 255, 255, 0.15);
  --cre8-color-button-tertiary-bg-disabled: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-inverse-bg-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-border: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-inverse-border: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-border-hover: #E50914;
  --cre8-color-button-tertiary-inverse-border-hover: #ffffff;
  --cre8-color-button-tertiary-border-active: #E50914;
  --cre8-color-button-tertiary-inverse-border-active: #ffffff;
  --cre8-color-button-tertiary-border-disabled: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-inverse-border-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-content: #E50914;
  --cre8-color-button-tertiary-inverse-content: #ffffff;
  --cre8-color-button-tertiary-content-hover: #ff3d46;
  --cre8-color-button-tertiary-inverse-content-hover: #ffffff;
  --cre8-color-button-tertiary-content-active: #B81D24;
  --cre8-color-button-tertiary-inverse-content-active: #ffffff;
  --cre8-color-button-tertiary-content-disabled: #666666;
  --cre8-color-button-tertiary-inverse-content-disabled: #4d4d4d;
  --cre8-color-button-tertiary-outline: #0071eb;
  --cre8-color-button-tertiary-inverse-outline: #0071eb;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY NEUTRAL
   * ========================================================================== */
  --cre8-color-button-tertiary-neutral-bg: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-content: #b3b3b3;
  --cre8-color-button-tertiary-neutral-inverse-content: #ffffff;
  --cre8-color-button-tertiary-neutral-border: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-border: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-bg-hover: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-hover: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-content-hover: #ffffff;
  --cre8-color-button-tertiary-neutral-inverse-content-hover: #ffffff;
  --cre8-color-button-tertiary-neutral-border-hover: #b3b3b3;
  --cre8-color-button-tertiary-neutral-inverse-border-hover: #ffffff;
  --cre8-color-button-tertiary-neutral-border-active: #ffffff;
  --cre8-color-button-tertiary-neutral-inverse-border-active: #ffffff;
  --cre8-color-button-tertiary-neutral-bg-active: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-active: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-content-active: #ffffff;
  --cre8-color-button-tertiary-neutral-inverse-content-active: #ffffff;
  --cre8-color-button-tertiary-neutral-bg-disabled: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-bg-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-border-disabled: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-neutral-inverse-border-disabled: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-neutral-content-disabled: #666666;
  --cre8-color-button-tertiary-neutral-inverse-content-disabled: #4d4d4d;
  --cre8-color-button-tertiary-neutral-outline: #0071eb;
  --cre8-color-button-tertiary-neutral-inverse-outline: #0071eb;

  /* ==========================================================================
   * BUTTON COLORS - TERTIARY DANGER
   * ========================================================================== */
  --cre8-color-button-tertiary-danger-bg: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-danger-inverse-bg: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-danger-bg-hover: #B81D24;
  --cre8-color-button-tertiary-danger-inverse-bg-hover: #ff8585;
  --cre8-color-button-tertiary-danger-bg-active: #8B0000;
  --cre8-color-button-tertiary-danger-inverse-bg-active: #ffb3b3;
  --cre8-color-button-tertiary-danger-bg-disabled: #333333;
  --cre8-color-button-tertiary-danger-inverse-bg-disabled: #4d4d4d;
  --cre8-color-button-tertiary-danger-content: #E50914;
  --cre8-color-button-tertiary-danger-inverse-content: #ff6b6b;
  --cre8-color-button-tertiary-danger-content-hover: #ffffff;
  --cre8-color-button-tertiary-danger-inverse-content-hover: #141414;
  --cre8-color-button-tertiary-danger-content-active: #ffffff;
  --cre8-color-button-tertiary-danger-inverse-content-active: #141414;
  --cre8-color-button-tertiary-danger-content-disabled: #666666;
  --cre8-color-button-tertiary-danger-inverse-content-disabled: #4d4d4d;
  --cre8-color-button-tertiary-danger-border: rgba(20, 20, 20, 0.0);
  --cre8-color-button-tertiary-danger-inverse-border: rgba(255, 255, 255, 0.0);
  --cre8-color-button-tertiary-danger-border-hover: #B81D24;
  --cre8-color-button-tertiary-danger-inverse-border-hover: #ff8585;
  --cre8-color-button-tertiary-danger-border-active: #8B0000;
  --cre8-color-button-tertiary-danger-inverse-border-active: #ffb3b3;
  --cre8-color-button-tertiary-danger-border-disabled: #333333;
  --cre8-color-button-tertiary-danger-inverse-border-disabled: #4d4d4d;
  --cre8-color-button-tertiary-danger-outline: #0071eb;
  --cre8-color-button-tertiary-danger-inverse-outline: #0071eb;

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
  --cre8-font-family-default: "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --cre8-font-families-netflix-sans: "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --cre8-font-weights-netflix-sans-0: 700;
  --cre8-font-weights-netflix-sans-1: 600;
  --cre8-font-weights-netflix-sans-2: 400;
  --cre8-font-weights-netflix-sans-3: 500;

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
  --cre8-line-heights-2: 1.14;
  --cre8-line-heights-3: 1.2;
  --cre8-line-heights-4: 1.3;
  --cre8-line-heights-5: 1.33;
  --cre8-line-heights-6: 1.4;
  --cre8-line-heights-7: 1.5;
  --cre8-line-heights-8: 1.43;
  --cre8-line-heights-9: 1.11;
  --cre8-line-heights-10: 1.13;
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
  --cre8-letter-spacing-6: 1.5;

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
  --cre8-border-radius-small: 2px;
  --cre8-border-radius-default: 4px;
  --cre8-border-radius-large: 6px;
  --cre8-border-radius-round: 900px;
  --cre8-border-radius-button: 4px;
  --cre8-border-radius-badge: 2px;
  --cre8-border-radius-tabs: 4px;
  --cre8-border-radius-container: 6px;
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
  --cre8-border-width-tab-selected: 0.1875rem;
  --cre8-border-width-tab-default: 0.125rem;
  --cre8-border-style-default: solid;
  --cre8-border-style-button-tertiary-outline-focus: solid;

  /* Tertiary Button Borders */
  --cre8-border-button-tertiary-default: none;
  --cre8-border-button-tertiary-hover: 2px solid #E50914;
  --cre8-border-button-tertiary-active: 2px solid #E50914;
  --cre8-border-button-tertiary-disabled: none;

  /* ==========================================================================
   * SHADOWS
   * ========================================================================== */
  --cre8-shadow-none: none;
  --cre8-shadow-small: 0 1px 3px rgba(0, 0, 0, 0.5);
  --cre8-shadow-default: 0 4px 8px rgba(0, 0, 0, 0.6);
  --cre8-shadow-large: 0 10px 20px rgba(0, 0, 0, 0.7);
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
  --cre8-badge-padding-horizontal: 0.375rem;
  --cre8-badge-padding-vertical: 0.125rem;

  /* ==========================================================================
   * COMPONENT TOKENS - PROGRESS METER
   * ========================================================================== */
  --cre8-progress-meter-height: 0.25rem;

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
  --cre8-asset-font-netflix-sans-400-normal: "Netflix Sans Regular";
  --cre8-asset-font-netflix-sans-500-normal: "Netflix Sans Medium";
  --cre8-asset-font-netflix-sans-600-normal: "Netflix Sans SemiBold";
  --cre8-asset-font-netflix-sans-700-normal: "Netflix Sans Bold";
}`;
