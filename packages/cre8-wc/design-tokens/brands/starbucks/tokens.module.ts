import { css } from "lit";

const styles = css`
:root {
    /* HEADER STYLES */
    --cre8-desktop-menu-padding-vertical-padding: 1rem;
    --cre8-desktop-menu-padding-horizontal-padding: 0.5rem;
    --cre8-color-header-bg-default: #ffffff;
    --cre8-color-header-bg-secondary: #00704A;
    --cre8-color-header-bg-tertiary: #1E3932;
    --cre8-color-header-menu-bg-default: #ffffff;
    --cre8-color-header-menu-bg-active: #00704A;
    --cre8-color-header-menu-bg-focus: #00704A;
    --cre8-color-header-menu-content-default: #1E3932;
    --cre8-color-header-menu-content-active: #ffffff;
    --cre8-color-header-menu-content-focus: #ffffff;
    --cre8-color-header-menu-border-default: rgba(45, 45, 45, 0.0);
    --cre8-color-header-menu-bg-hover: #00A862;
    --cre8-color-header-menu-content-hover: #00704A;
    --cre8-color-header-menu-border-hover: rgba(45, 45, 45, 0.0);
    --cre8-color-header-menu-bg-pressed: #1E3932;
    --cre8-color-header-menu-content-pressed: #ffffff;
    --cre8-color-header-menu-border-pressed: rgba(45, 45, 45, 0.0);
    --cre8-color-header-menu-border-active: rgba(45, 45, 45, 0.0);
    --cre8-color-header-menu-border-focus: rgba(45, 45, 45, 0.0);
    --cre8-color-header-submenu-bg-default: #ffffff;
    --cre8-color-header-submenu-bg-focus: #00704A;
    --cre8-color-header-submenu-content-default: #00704A;
    --cre8-color-header-submenu-bg-hover: #00A862;
    --cre8-color-header-submenu-content-hover: #ffffff;
    --cre8-color-header-submenu-content-focus: #ffffff;
    --cre8-color-header-submenu-bg-pressed: #1E3932;
    --cre8-color-header-submenu-content-pressed: #ffffff;
    
    /* FOOTER STYLES */
    --cre8-color-footer-bg-default: #F3F1E7;
    --cre8-color-footer-bg-secondary: #ffffff;
    --cre8-color-footer-content-default: #1E3932;
    --cre8-color-footer-content-secondary: #ffffff;
    --cre8-color-footer-link-default: #00704A;
    --cre8-color-footer-link-hover: #1E3932;
    
    /* SPACING */
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
    
    /* BUTTON STYLES */
    --cre8-color-button-primary-bg: #00704A;
    --cre8-color-button-primary-bg-hover: #00A862;
    --cre8-color-button-primary-bg-active: #1E3932;
    --cre8-color-button-primary-bg-disabled: #eaeaea;
    --cre8-color-button-primary-border: #00704A;
    --cre8-color-button-primary-border-hover: #00A862;
    --cre8-color-button-primary-border-active: #1E3932;
    --cre8-color-button-primary-border-disabled: #eaeaea;
    --cre8-color-button-primary-content: #ffffff;
    --cre8-color-button-primary-content-hover: #ffffff;
    --cre8-color-button-primary-content-active: #ffffff;
    --cre8-color-button-primary-content-disabled: #949494;
    --cre8-color-button-primary-outline: #1E3932;
    
    --cre8-color-button-secondary-bg: #D4E9E2;
    --cre8-color-button-secondary-bg-hover: #D4E9E2;
    --cre8-color-button-secondary-bg-active: #D4E9E2;
    --cre8-color-button-secondary-bg-disabled: #eaeaea;
    --cre8-color-button-secondary-border: #D4E9E2;
    --cre8-color-button-secondary-border-hover: #00704A;
    --cre8-color-button-secondary-border-active: #1E3932;
    --cre8-color-button-secondary-border-disabled: #ababab;
    --cre8-color-button-secondary-content: #00704A;
    --cre8-color-button-secondary-content-hover: #00704A;
    --cre8-color-button-secondary-content-active: #1E3932;
    --cre8-color-button-secondary-content-disabled: #949494;
    --cre8-color-button-secondary-outline: #1E3932;
    
    --cre8-color-button-tertiary-bg: rgba(45, 45, 45, 0.0);
    --cre8-color-button-tertiary-bg-hover: rgba(45, 45, 45, 0.0);
    --cre8-color-button-tertiary-bg-active: rgba(45, 45, 45, 0.0);
    --cre8-color-button-tertiary-bg-disabled: rgba(45, 45, 45, 0.0);
    --cre8-color-button-tertiary-border: rgba(45, 45, 45, 0.0);
    --cre8-color-button-tertiary-border-hover: #1E3932;
    --cre8-color-button-tertiary-border-active: #1E3932;
    --cre8-color-button-tertiary-border-disabled: rgba(45, 45, 45, 0.0);
    --cre8-color-button-tertiary-content: #00704A;
    --cre8-color-button-tertiary-content-hover: #1E3932;
    --cre8-color-button-tertiary-content-active: #1E3932;
    --cre8-color-button-tertiary-content-disabled: #949494;
    --cre8-color-button-tertiary-outline: #1E3932;
    
    /* BUTTON PADDING */
    --cre8-button-padding-vertical-small: 0.5rem;
    --cre8-button-padding-vertical-medium: 0.75rem;
    --cre8-button-padding-vertical-icon-only: 0.25rem;
    --cre8-button-padding-vertical-large: 1rem;
    --cre8-button-padding-horizontal-small: 1rem;
    --cre8-button-padding-horizontal-medium: 1.5rem;
    --cre8-button-padding-horizontal-large: 2rem;
    --cre8-button-padding-horizontal-icon-only: 0.25rem;
    
    /* BACKGROUND COLORS */
    --cre8-color-bg-default: #ffffff;
    --cre8-color-bg-subtle: #F3F1E7;
    --cre8-color-bg-strong: #1E3932;
    --cre8-color-bg-disabled: #eaeaea;
    --cre8-color-bg-success: #D4E9E2;
    --cre8-color-bg-success-strong: #00704A;
    --cre8-color-bg-error: #F7BFA0;
    --cre8-color-bg-error-strong: #D62B1F;
    --cre8-color-bg-warning: #FFF4D4;
    --cre8-color-bg-warning-strong: #EBA900;
    --cre8-color-bg-info: #D4E9E2;
    --cre8-color-bg-info-strong: #00704A;
    --cre8-color-bg-attention: #F3F1E7;
    --cre8-color-bg-attention-strong: #00704A;
    --cre8-color-bg-default-hover: #D4E9E2;
    --cre8-color-bg-brand: #00704A;
    --cre8-color-bg-brand-hover: #00A862;
    --cre8-color-bg-brand-strong: #1E3932;
    --cre8-color-bg-brand-strong-hover: #1E3932;
    --cre8-color-bg-brand-strong-active: #003D29;
    --cre8-color-bg-brand-xstrong: #003D29;
    --cre8-color-bg-brand-xstrong-hover: #00291B;
    --cre8-color-bg-brand-xstrong-active: #00291B;
    --cre8-color-bg-opacity-transparent: rgba(45, 45, 45, 0.0);
    --cre8-color-bg-opacity-default: rgba(45, 45, 45, 0.50);
    --cre8-color-bg-active: #1E3932;
    
    /* CONTENT COLORS */
    --cre8-color-content-default: #1E3932;
    --cre8-color-content-subtle: #6c6c6c;
    --cre8-color-content-disabled: #949494;
    --cre8-color-content-link-disabled: #949494;
    --cre8-color-content-knockout: #ffffff;
    --cre8-color-content-success: #00704A;
    --cre8-color-content-success-icon: #00704A;
    --cre8-color-content-error: #D62B1F;
    --cre8-color-content-error-icon: #D62B1F;
    --cre8-color-content-attention-icon: #EBA900;
    --cre8-color-content-brand-knockout: #D4E9E2;
    --cre8-color-content-brand: #00704A;
    --cre8-color-content-brand-strong: #1E3932;
    --cre8-color-content-link: #00704A;
    --cre8-color-content-link-hover: #00A862;
    --cre8-color-content-link-active: #1E3932;
    --cre8-color-content-link-visited: #00704A;
    --cre8-color-content-warning-icon: #EBA900;
    --cre8-color-content-info-icon: #00704A;
    
    /* BORDER COLORS */
    --cre8-color-border-default: #d5d5d5;
    --cre8-color-border-strong: #949494;
    --cre8-color-border-knockout: #ffffff;
    --cre8-color-border-disabled: #ababab;
    --cre8-color-border-success: #00704A;
    --cre8-color-border-error: #D62B1F;
    --cre8-color-border-warning: #EBA900;
    --cre8-color-border-info: #00704A;
    --cre8-color-border-attention: #EBA900;
    --cre8-color-border-brand: #00704A;
    --cre8-color-border-brand-subtle: #00A862;
    --cre8-color-border-brand-strong: #1E3932;
    --cre8-color-border-transparent: rgba(45, 45, 45, 0.0);
    --cre8-color-border-active-outline: #1E3932;
    
    /* FONT SIZES */
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
    
    /* LETTER SPACING */
    --cre8-letter-spacing-0: -1.5;
    --cre8-letter-spacing-1: -1;
    --cre8-letter-spacing-2: -0.5;
    --cre8-letter-spacing-3: 0;
    --cre8-letter-spacing-4: 2;
    --cre8-letter-spacing-5: 1;
    --cre8-letter-spacing-6: 1.5;
    
    /* PARAGRAPH SPACING */
    --cre8-paragraph-spacing-0: 0;
    
    /* TEXT CASE */
    --cre8-text-case-none: none;
    --cre8-text-case-uppercase: uppercase;
    
    /* TEXT DECORATION */
    --cre8-text-decoration-none: none;
    --cre8-text-decoration-underline: underline;
    
    /* PARAGRAPH INDENT */
    --cre8-paragraph-indent-0: 0px;
    
    /* BORDER RADIUS */
    --cre8-border-radius-small: 4px;
    --cre8-border-radius-default: 8px;
    --cre8-border-radius-large: 16px;
    --cre8-border-radius-round: 900px;
    --cre8-border-radius-button: 50px;
    --cre8-border-radius-badge: 4px;
    --cre8-border-radius-tabs: 8px;
    --cre8-border-radius-container: 16px;
    --cre8-border-radius-field: 8px;
    
    /* BORDER WIDTH */
    --cre8-border-width-none: 0rem;
    --cre8-border-width-default: 0.0625rem;
    --cre8-border-width-focus: 0.125rem;
    --cre8-border-width-large: 0.25rem;
    --cre8-border-width-button-tertiary-outline-focus: 0.125rem;
    --cre8-border-width-button-default: 0.125rem;
    --cre8-border-width-tab-selected: 0.125rem;
    
    /* BORDER STYLE */
    --cre8-border-style-button-tertiary-outline-focus: solid;
    --cre8-border-style-default: solid;
    
    /* SHADOWS */
    --cre8-shadow-default: 0 8px 6px 0 rgba(0,0,0,0.1);
    --cre8-shadow-button: none;
    --cre8-shadow-none: none;
    --cre8-shadow-large: 0 10px 12px 0 rgba(0,0,0,0.2);
    --cre8-shadow-small: 0 1px 2px 1px rgba(0,0,0,0.2);
    
    /* LINK COLORS */
    --cre8-color-link-bg-active: #333333;
    
    /* FONT FAMILIES */
    --cre8-font-families-nb-akademie: "Inter", "Helvetica Neue", Arial, sans-serif;
    --cre8-font-families-starbucks:"Inter", "Helvetica Neue", Arial, sans-serif;
    
    /* FONT WEIGHTS */
    --cre8-font-weights-nb-akademie-0: 400;
    --cre8-font-weights-nb-akademie-1: 500;
    --cre8-font-weights-nb-akademie-2: 700;
    --cre8-font-weights-starbucks-0: 400;
    --cre8-font-weights-starbucks-1: 500;
    --cre8-font-weights-starbucks-2: 700;
    
    /* LINE HEIGHTS */
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
    
    /* ICON SIZES */
    --cre8-icon-size-small: 0.875rem;
    --cre8-icon-size-default: 1rem;
    --cre8-icon-size-large: 1.125rem;
    
    /* BADGE PADDING */
    --cre8-badge-padding-horizontal: 0.375rem;
    --cre8-badge-padding-vertical: 0.125rem;
    
    /* PROGRESS METER */
    --cre8-progress-meter-height: 0.5rem;
    
    /* BREAKPOINTS */
    --cre8-breakpoints-bp-xsm: 23.4375rem;
    --cre8-breakpoints-bp-sm: 35rem;
    --cre8-breakpoints-bp-md: 48rem;
    --cre8-breakpoints-bp-lg: 60rem;
    --cre8-breakpoints-bp-xl: 75rem;
    --cre8-breakpoints-bp-xxl: 87.5rem;
    --cre8-typography-body-xlarge-font-family: #cccccc;
    --cre8-typography-body-xlarge-font-size: 1rem;
    --cre8-typography-body-xlarge-font-weight: #cccccc;
    --cre8-typography-body-xlarge-line-height: 1.5;
    --cre8-typography-body-xlarge-text-decoration: #cccccc;
    --cre8-typography-body-xlarge-text-transform: #cccccc;
    --cre8-typography-body-xlarge-strong-font-family: #cccccc;
    --cre8-typography-body-xlarge-strong-font-size: 1rem;
    --cre8-typography-body-xlarge-strong-font-weight: #cccccc;
    --cre8-typography-body-xlarge-strong-line-height: 1.5;
    --cre8-typography-body-xlarge-strong-text-decoration: #cccccc;
    --cre8-typography-body-xlarge-strong-text-transform: #cccccc;
    --cre8-typography-body-xlarge-link-font-family: #cccccc;
    --cre8-typography-body-xlarge-link-font-size: 1rem;
    --cre8-typography-body-xlarge-link-font-weight: #cccccc;
    --cre8-typography-body-xlarge-link-line-height: 1.5;
    --cre8-typography-body-xlarge-link-text-decoration: #cccccc;
    --cre8-typography-body-xlarge-link-text-transform: #cccccc;
    --cre8-typography-body-large-font-family: #cccccc;
    --cre8-typography-body-large-font-size: 1rem;
    --cre8-typography-body-large-font-weight: #cccccc;
    --cre8-typography-body-large-line-height: 1.5;
    --cre8-typography-body-large-text-decoration: #cccccc;
    --cre8-typography-body-large-text-transform: #cccccc;
    --cre8-typography-body-large-strong-font-family: #cccccc;
    --cre8-typography-body-large-strong-font-size: 1rem;
    --cre8-typography-body-large-strong-font-weight: #cccccc;
    --cre8-typography-body-large-strong-line-height: 1.5;
    --cre8-typography-body-large-strong-text-decoration: #cccccc;
    --cre8-typography-body-large-strong-text-transform: #cccccc;
    --cre8-typography-body-default-font-family: #cccccc;
    --cre8-typography-body-default-font-size: 1rem;
    --cre8-typography-body-default-font-weight: #cccccc;
    --cre8-typography-body-default-line-height: 1.5;
    --cre8-typography-body-default-text-decoration: #cccccc;
    --cre8-typography-body-default-text-transform: #cccccc;
    --cre8-typography-body-default-strong-font-family: #cccccc;
    --cre8-typography-body-default-strong-font-size: 1rem;
    --cre8-typography-body-default-strong-font-weight: #cccccc;
    --cre8-typography-body-default-strong-line-height: 1.5;
    --cre8-typography-body-default-strong-text-decoration: #cccccc;
    --cre8-typography-body-default-strong-text-transform: #cccccc;
    --cre8-typography-body-small-font-family: #cccccc;
    --cre8-typography-body-small-font-size: 1rem;
    --cre8-typography-body-small-font-weight: #cccccc;
    --cre8-typography-body-small-line-height: 1.5;
    --cre8-typography-body-small-text-decoration: #cccccc;
    --cre8-typography-body-small-text-transform: #cccccc;
    --cre8-typography-body-small-strong-font-family: #cccccc;
    --cre8-typography-body-small-strong-font-size: 1rem;
    --cre8-typography-body-small-strong-font-weight: #cccccc;
    --cre8-typography-body-small-strong-line-height: 1.5;
    --cre8-typography-body-small-strong-text-decoration: #cccccc;
    --cre8-typography-body-small-strong-text-transform: #cccccc;
    --cre8-typography-body-large-link-font-family: #cccccc;
    --cre8-typography-body-large-link-font-size: 1rem;
    --cre8-typography-body-large-link-font-weight: #cccccc;
    --cre8-typography-body-large-link-line-height: 1.5;
    --cre8-typography-body-large-link-text-decoration: #cccccc;
    --cre8-typography-body-large-link-text-transform: #cccccc;
    --cre8-typography-body-default-link-font-family: #cccccc;
    --cre8-typography-body-default-link-font-size: 1rem;
    --cre8-typography-body-default-link-font-weight: #cccccc;
    --cre8-typography-body-default-link-line-height: 1.5;
    --cre8-typography-body-default-link-text-decoration: #cccccc;
    --cre8-typography-body-default-link-text-transform: #cccccc;
    --cre8-typography-body-small-link-font-family: #cccccc;
    --cre8-typography-body-small-link-font-size: 1rem;
    --cre8-typography-body-small-link-font-weight: #cccccc;
    --cre8-typography-body-small-link-line-height: 1.5;
    --cre8-typography-body-small-link-text-decoration: #cccccc;
    --cre8-typography-body-small-link-text-transform: #cccccc;
    --cre8-typography-label-default-font-family: #cccccc;
    --cre8-typography-label-default-font-size: 1rem;
    --cre8-typography-label-default-font-weight: #cccccc;
    --cre8-typography-label-default-line-height: 1.5;
    --cre8-typography-label-default-text-decoration: #cccccc;
    --cre8-typography-label-default-text-transform: #cccccc;
    --cre8-typography-label-large-font-family: #cccccc;
    --cre8-typography-label-large-font-size: 1rem;
    --cre8-typography-label-large-font-weight: #cccccc;
    --cre8-typography-label-large-line-height: 1.5;
    --cre8-typography-label-large-text-decoration: #cccccc;
    --cre8-typography-label-large-text-transform: #cccccc;
    --cre8-typography-label-small-font-family: #cccccc;
    --cre8-typography-label-small-font-size: 1rem;
    --cre8-typography-label-small-font-weight: #cccccc;
    --cre8-typography-label-small-line-height: 1.5;
    --cre8-typography-label-small-text-decoration: #cccccc;
    --cre8-typography-label-small-text-transform: #cccccc;
    --cre8-typography-title-xlarge-font-family: #cccccc;
    --cre8-typography-title-xlarge-font-size: 1rem;
    --cre8-typography-title-xlarge-font-weight: #cccccc;
    --cre8-typography-title-xlarge-line-height: 1.5;
    --cre8-typography-title-xlarge-text-decoration: #cccccc;
    --cre8-typography-title-xlarge-text-transform: #cccccc;
    --cre8-typography-title-xlarge-mobile-font-family: #cccccc;
    --cre8-typography-title-xlarge-mobile-font-size: 1rem;
    --cre8-typography-title-xlarge-mobile-font-weight: #cccccc;
    --cre8-typography-title-xlarge-mobile-line-height: 1.5;
    --cre8-typography-title-xlarge-mobile-text-decoration: #cccccc;
    --cre8-typography-title-xlarge-mobile-text-transform: #cccccc;
    --cre8-typography-title-large-font-family: #cccccc;
    --cre8-typography-title-large-font-size: 1rem;
    --cre8-typography-title-large-font-weight: #cccccc;
    --cre8-typography-title-large-line-height: 1.5;
    --cre8-typography-title-large-text-decoration: #cccccc;
    --cre8-typography-title-large-text-transform: #cccccc;
    --cre8-typography-title-large-mobile-font-family: #cccccc;
    --cre8-typography-title-large-mobile-font-size: 1rem;
    --cre8-typography-title-large-mobile-font-weight: #cccccc;
    --cre8-typography-title-large-mobile-line-height: 1.5;
    --cre8-typography-title-large-mobile-text-decoration: #cccccc;
    --cre8-typography-title-large-mobile-text-transform: #cccccc;
    --cre8-typography-title-default-font-family: #cccccc;
    --cre8-typography-title-default-font-size: 1rem;
    --cre8-typography-title-default-font-weight: #cccccc;
    --cre8-typography-title-default-line-height: 1.5;
    --cre8-typography-title-default-text-decoration: #cccccc;
    --cre8-typography-title-default-text-transform: #cccccc;
    --cre8-typography-title-default-mobile-font-family: #cccccc;
    --cre8-typography-title-default-mobile-font-size: 1rem;
    --cre8-typography-title-default-mobile-font-weight: #cccccc;
    --cre8-typography-title-default-mobile-line-height: 1.5;
    --cre8-typography-title-default-mobile-text-decoration: #cccccc;
    --cre8-typography-title-default-mobile-text-transform: #cccccc;
    --cre8-typography-title-small-font-family: #cccccc;
    --cre8-typography-title-small-font-size: 1rem;
    --cre8-typography-title-small-font-weight: #cccccc;
    --cre8-typography-title-small-line-height: 1.5;
    --cre8-typography-title-small-text-decoration: #cccccc;
    --cre8-typography-title-small-text-transform: #cccccc;
    --cre8-typography-title-small-mobile-font-family: #cccccc;
    --cre8-typography-title-small-mobile-font-size: 1rem;
    --cre8-typography-title-small-mobile-font-weight: #cccccc;
    --cre8-typography-title-small-mobile-line-height: 1.5;
    --cre8-typography-title-small-mobile-text-decoration: #cccccc;
    --cre8-typography-title-small-mobile-text-transform: #cccccc;
    --cre8-typography-headline-large-font-family: #cccccc;
    --cre8-typography-headline-large-font-size: 1rem;
    --cre8-typography-headline-large-font-weight: #cccccc;
    --cre8-typography-headline-large-line-height: 1.5;
    --cre8-typography-headline-large-text-decoration: #cccccc;
    --cre8-typography-headline-large-text-transform: #cccccc;
    --cre8-typography-headline-large-mobile-font-family: #cccccc;
    --cre8-typography-headline-large-mobile-font-size: 1rem;
    --cre8-typography-headline-large-mobile-font-weight: #cccccc;
    --cre8-typography-headline-large-mobile-line-height: 1.5;
    --cre8-typography-headline-large-mobile-text-decoration: #cccccc;
    --cre8-typography-headline-large-mobile-text-transform: #cccccc;
    --cre8-typography-headline-default-font-family: #cccccc;
    --cre8-typography-headline-default-font-size: 1rem;
    --cre8-typography-headline-default-font-weight: #cccccc;
    --cre8-typography-headline-default-line-height: 1.5;
    --cre8-typography-headline-default-text-decoration: #cccccc;
    --cre8-typography-headline-default-text-transform: #cccccc;
    --cre8-typography-headline-default-mobile-font-family: #cccccc;
    --cre8-typography-headline-default-mobile-font-size: 1rem;
    --cre8-typography-headline-default-mobile-font-weight: #cccccc;
    --cre8-typography-headline-default-mobile-line-height: 1.5;
    --cre8-typography-headline-default-mobile-text-decoration: #cccccc;
    --cre8-typography-headline-default-mobile-text-transform: #cccccc;
    --cre8-typography-headline-small-font-family: #cccccc;
    --cre8-typography-headline-small-font-size: 1rem;
    --cre8-typography-headline-small-font-weight: #cccccc;
    --cre8-typography-headline-small-line-height: 1.5;
    --cre8-typography-headline-small-text-decoration: #cccccc;
    --cre8-typography-headline-small-text-transform: #cccccc;
    --cre8-typography-headline-small-mobile-font-family: #cccccc;
    --cre8-typography-headline-small-mobile-font-size: 1rem;
    --cre8-typography-headline-small-mobile-font-weight: #cccccc;
    --cre8-typography-headline-small-mobile-line-height: 1.5;
    --cre8-typography-headline-small-mobile-text-decoration: #cccccc;
    --cre8-typography-headline-small-mobile-text-transform: #cccccc;
    --cre8-typography-headline-xsmall-font-family: #cccccc;
    --cre8-typography-headline-xsmall-font-size: 1rem;
    --cre8-typography-headline-xsmall-font-weight: #cccccc;
    --cre8-typography-headline-xsmall-line-height: 1.5;
    --cre8-typography-headline-xsmall-text-decoration: #cccccc;
    --cre8-typography-headline-xsmall-text-transform: #cccccc;
    --cre8-typography-headline-xsmall-mobile-font-family: #cccccc;
    --cre8-typography-headline-xsmall-mobile-font-size: 1rem;
    --cre8-typography-headline-xsmall-mobile-font-weight: #cccccc;
    --cre8-typography-headline-xsmall-mobile-line-height: 1.5;
    --cre8-typography-headline-xsmall-mobile-text-decoration: #cccccc;
    --cre8-typography-headline-xsmall-mobile-text-transform: #cccccc;
    --cre8-typography-display-large-font-family: #cccccc;
    --cre8-typography-display-large-font-size: 1rem;
    --cre8-typography-display-large-font-weight: #cccccc;
    --cre8-typography-display-large-line-height: 1.5;
    --cre8-typography-display-large-text-decoration: #cccccc;
    --cre8-typography-display-large-text-transform: #cccccc;
    --cre8-typography-display-large-mobile-font-family: #cccccc;
    --cre8-typography-display-large-mobile-font-size: 1rem;
    --cre8-typography-display-large-mobile-font-weight: #cccccc;
    --cre8-typography-display-large-mobile-line-height: 1.5;
    --cre8-typography-display-large-mobile-text-decoration: #cccccc;
    --cre8-typography-display-large-mobile-text-transform: #cccccc;
    --cre8-typography-display-default-font-family: #cccccc;
    --cre8-typography-display-default-font-size: 1rem;
    --cre8-typography-display-default-font-weight: #cccccc;
    --cre8-typography-display-default-line-height: 1.5;
    --cre8-typography-display-default-text-decoration: #cccccc;
    --cre8-typography-display-default-text-transform: #cccccc;
    --cre8-typography-display-default-mobile-font-family: #cccccc;
    --cre8-typography-display-default-mobile-font-size: 1rem;
    --cre8-typography-display-default-mobile-font-weight: #cccccc;
    --cre8-typography-display-default-mobile-line-height: 1.5;
    --cre8-typography-display-default-mobile-text-decoration: #cccccc;
    --cre8-typography-display-default-mobile-text-transform: #cccccc;
    --cre8-typography-display-small-font-family: #cccccc;
    --cre8-typography-display-small-font-size: 1rem;
    --cre8-typography-display-small-font-weight: #cccccc;
    --cre8-typography-display-small-line-height: 1.5;
    --cre8-typography-display-small-text-decoration: #cccccc;
    --cre8-typography-display-small-text-transform: #cccccc;
    --cre8-typography-display-small-mobile-font-family: #cccccc;
    --cre8-typography-display-small-mobile-font-size: 1rem;
    --cre8-typography-display-small-mobile-font-weight: #cccccc;
    --cre8-typography-display-small-mobile-line-height: 1.5;
    --cre8-typography-display-small-mobile-text-decoration: #cccccc;
    --cre8-typography-display-small-mobile-text-transform: #cccccc;
    --cre8-typography-meta-default-font-family: #cccccc;
    --cre8-typography-meta-default-font-size: 1rem;
    --cre8-typography-meta-default-font-weight: #cccccc;
    --cre8-typography-meta-default-line-height: 1.5;
    --cre8-typography-meta-default-text-decoration: #cccccc;
    --cre8-typography-meta-default-text-transform: #cccccc;
    --cre8-typography-meta-default-sentence-case-font-family: #cccccc;
    --cre8-typography-meta-default-sentence-case-font-size: 1rem;
    --cre8-typography-meta-default-sentence-case-font-weight: #cccccc;
    --cre8-typography-meta-default-sentence-case-line-height: 1.5;
    --cre8-typography-meta-default-sentence-case-text-decoration: #cccccc;
    --cre8-typography-meta-default-sentence-case-text-transform: #cccccc;
    --cre8-typography-meta-large-font-family: #cccccc;
    --cre8-typography-meta-large-font-size: 1rem;
    --cre8-typography-meta-large-font-weight: #cccccc;
    --cre8-typography-meta-large-line-height: 1.5;
    --cre8-typography-meta-large-text-decoration: #cccccc;
    --cre8-typography-meta-large-text-transform: #cccccc;
    --cre8-typography-meta-small-font-family: #cccccc;
    --cre8-typography-meta-small-font-size: 1rem;
    --cre8-typography-meta-small-font-weight: #cccccc;
    --cre8-typography-meta-small-line-height: 1.5;
    --cre8-typography-meta-small-text-decoration: #cccccc;
    --cre8-typography-meta-small-text-transform: #cccccc;
}`

export default styles;