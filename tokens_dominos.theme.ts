import {css} from 'lit';

export const dominos = css`
@font-face {
  font-family: 'One Dot';
  src: url('https://www.dominos.com/static/1.115.0/fonts/OneDot.woff2') format('woff2'),
       url('https://www.dominos.com/static/1.115.0/fonts/OneDot.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'One Dot Bold';
  src: url('https://www.dominos.com/static/1.115.0/fonts/OneDot-Bold.woff2') format('woff2'),
       url('https://www.dominos.com/static/1.115.0/fonts/OneDot-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: 'One Dot Condensed Bold';
  src: url('https://www.dominos.com/static/1.115.0/fonts/OneDotCd-Bold.woff2') format('woff2'),
       url('https://www.dominos.com/static/1.115.0/fonts/OneDotCd-Bold.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'One Dot Condensed';
  src: url('https://www.dominos.com/static/1.115.0/fonts/OneDotCd.woff2') format('woff2'),
       url('https://www.dominos.com/static/1.115.0/fonts/OneDotCd.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
:root {
  /* --- Brand Colors --- */
  --cre8-color-bg-brand: #e31837;
  --cre8-color-bg-brand-hover: #c01126;
  --cre8-color-content-brand-subtle: #0078ae;

  /* --- Generic Color Tokens --- */
  --cre8-color-bg-default: #ffffff;
  --cre8-color-bg-subtle: #f5f5f5;
  --cre8-color-bg-inverse: #000000;
  --cre8-color-content-default: #555555;
  --cre8-color-content-subtle: #777777;
  --cre8-color-content-inverse: #ffffff;
  --cre8-color-border-default: #dddddd;
  --cre8-color-border-subtle: #eeeeee;
  --cre8-color-border-inverse: #000000;
  
  /* --- Header/Navigation Colors --- */
  --cre8-color-header-bg-default: #0078ae;
  --cre8-color-header-inverse-bg-default: #ffffff;
  --cre8-color-header-menu-bg-default: #0078ae;
  --cre8-color-header-menu-inverse-bg-default: #ffffff;
  --cre8-color-header-menu-bg-hover: #006699;
  --cre8-color-header-menu-inverse-bg-hover: #e31837;
  --cre8-color-header-menu-bg-focus: #006699;
  --cre8-color-header-menu-inverse-bg-focus: #e31837;
  --cre8-color-header-menu-bg-active: #e31837;
  --cre8-color-header-menu-inverse-bg-active: #ffffff;
  --cre8-color-header-menu-bg-pressed: #e31837;
  --cre8-color-header-menu-inverse-bg-pressed: #ffffff;
  --cre8-color-header-menu-bg-selected: #006699;
  --cre8-color-header-menu-inverse-bg-selected: #e31837;
  --cre8-color-header-menu-content-default: #ffffff;
  --cre8-color-header-menu-inverse-content-default: #0078ae;
  --cre8-color-header-menu-content-hover: #ffffff;
  --cre8-color-header-menu-inverse-content-hover: #ffffff;
  --cre8-color-header-menu-content-focus: #ffffff;
  --cre8-color-header-menu-inverse-content-focus: #ffffff;
  --cre8-color-header-menu-content-active: #ffffff;
  --cre8-color-header-menu-inverse-content-active: #ffffff;
  --cre8-color-header-menu-content-pressed: #ffffff;
  --cre8-color-header-menu-inverse-content-pressed: #ffffff;
  --cre8-color-header-menu-content-selected: #ffffff;
  --cre8-color-header-menu-inverse-content-selected: #ffffff;
  
  /* --- Footer Colors --- */
  --cre8-color-footer-bg-default: #0078ae;
  --cre8-color-footer-bg-secondary: #006699;
  --cre8-color-footer-content-secondary: #ffffff;
  --cre8-color-footer-link-hover: #e31837;
  --cre8-color-footer-link-default: #ffffff;
  
  /* --- Spacing --- */
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
  
  /* --- Button Styles --- */
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
  
  /* --- Primary Button --- */
  --cre8-color-button-primary-bg: #e31837;
  --cre8-color-button-primary-inverse-bg: #ffffff;
  --cre8-color-button-primary-bg-hover: #c01126;
  --cre8-color-button-primary-inverse-bg-hover: #ffffff;
  --cre8-color-button-primary-bg-active: #0078ae;
  --cre8-color-button-primary-inverse-bg-active: #ffffff;
  --cre8-color-button-primary-bg-disabled: #ececec;
  --cre8-color-button-primary-inverse-bg-disabled: #ababab;
  --cre8-color-button-primary-content: #ffffff;
  --cre8-color-button-primary-inverse-content: #e31837;
  --cre8-color-button-primary-content-hover: #ffffff;
  --cre8-color-button-primary-inverse-content-hover: #e31837;
  --cre8-color-button-primary-content-active: #ffffff;
  --cre8-color-button-primary-inverse-content-active: #e31837;
  --cre8-color-button-primary-content-disabled: #949494;
  --cre8-color-button-primary-inverse-content-disabled: #6c6c6c;
  --cre8-color-button-primary-border: #e31837;
  --cre8-color-button-primary-inverse-border: #ffffff;
  --cre8-color-button-primary-border-hover: #c01126;
  --cre8-color-button-primary-inverse-border-hover: #ffffff;
  --cre8-color-button-primary-border-active: #0078ae;
  --cre8-color-button-primary-inverse-border-active: #ffffff;
  --cre8-color-button-primary-border-disabled: #ececec;
  --cre8-color-button-primary-inverse-border-disabled: #ababab;
  --cre8-color-button-primary-outline: #e31837;
  --cre8-color-button-primary-inverse-outline: #ffffff;
  
  /* --- Secondary Button --- */
  --cre8-color-button-secondary-bg: #0078ae;
  --cre8-color-button-secondary-inverse-bg: rgba(0,0,0,0);
  --cre8-color-button-secondary-bg-hover: #006699;
  --cre8-color-button-secondary-inverse-bg-hover: rgba(0,0,0,0);
  --cre8-color-button-secondary-bg-active: #006699;
  --cre8-color-button-secondary-inverse-bg-active: #ffffff;
  --cre8-color-button-secondary-bg-disabled: #ececec;
  --cre8-color-button-secondary-inverse-bg-disabled: rgba(0,0,0,0);
  --cre8-color-button-secondary-content: #ffffff;
  --cre8-color-button-secondary-inverse-content: #0078ae;
  --cre8-color-button-secondary-content-hover: #ffffff;
  --cre8-color-button-secondary-inverse-content-hover: #0078ae;
  --cre8-color-button-secondary-content-active: #ffffff;
  --cre8-color-button-secondary-inverse-content-active: #0078ae;
  --cre8-color-button-secondary-content-disabled: #949494;
  --cre8-color-button-secondary-inverse-content-disabled: #ababab;
  --cre8-color-button-secondary-border: #0078ae;
  --cre8-color-button-secondary-inverse-border: #0078ae;
  --cre8-color-button-secondary-border-hover: #006699;
  --cre8-color-button-secondary-inverse-border-hover: #0078ae;
  --cre8-color-button-secondary-border-active: #006699;
  --cre8-color-button-secondary-inverse-border-active: #0078ae;
  --cre8-color-button-secondary-border-disabled: #ececec;
  --cre8-color-button-secondary-inverse-border-disabled: #ababab;
  --cre8-color-button-secondary-outline: #0078ae;
  --cre8-color-button-secondary-inverse-outline: #ffffff;
  
  /* --- Tertiary Button --- */
  --cre8-color-button-tertiary-bg: rgba(0,0,0,0);
  --cre8-color-button-tertiary-inverse-bg: rgba(0,0,0,0);
  --cre8-color-button-tertiary-bg-hover: rgba(0,0,0,0);
  --cre8-color-button-tertiary-inverse-bg-hover: rgba(0,0,0,0);
  --cre8-color-button-tertiary-bg-active: rgba(0,0,0,0);
  --cre8-color-button-tertiary-inverse-bg-active: #fff;
  --cre8-color-button-tertiary-bg-disabled: rgba(0,0,0,0);
  --cre8-color-button-tertiary-inverse-bg-disabled: rgba(0,0,0,0);
  --cre8-color-button-tertiary-content: #0078ae;
  --cre8-color-button-tertiary-inverse-content: #ffffff;
  --cre8-color-button-tertiary-content-hover: #e31837;
  --cre8-color-button-tertiary-inverse-content-hover: #e31837;
  --cre8-color-button-tertiary-content-active: #e31837;
  --cre8-color-button-tertiary-inverse-content-active: #e31837;
  --cre8-color-button-tertiary-content-disabled: #949494;
  --cre8-color-button-tertiary-inverse-content-disabled: #ababab;
  --cre8-color-button-tertiary-border: rgba(0,0,0,0);
  --cre8-color-button-tertiary-inverse-border: rgba(0,0,0,0);
  --cre8-color-button-tertiary-border-hover: #e31837;
  --cre8-color-button-tertiary-inverse-border-hover: #e31837;
  --cre8-color-button-tertiary-border-active: #e31837;
  --cre8-color-button-tertiary-inverse-border-active: #e31837;
  --cre8-color-button-tertiary-border-disabled: rgba(0,0,0,0);
  --cre8-color-button-tertiary-inverse-border-disabled: rgba(0,0,0,0);
  --cre8-color-button-tertiary-outline: #0078ae;
  --cre8-color-button-tertiary-inverse-outline: #ffffff;
  
  /* --- Typography --- */
  --cre8-typography-body-default-font-family: 'One Dot', Arial, Helvetica, sans-serif;
  --cre8-typography-body-default-font-size: 1rem;
  --cre8-typography-body-default-font-weight: 400;
  --cre8-typography-body-default-line-height: 1.25;
  --cre8-typography-body-default-letter-spacing: normal;
  --cre8-typography-body-default-text-transform: none;
  
  --cre8-typography-body-large-font-family: 'One Dot', Arial, Helvetica, sans-serif;
  --cre8-typography-body-large-font-size: 1.125rem;
  --cre8-typography-body-large-font-weight: 400;
  --cre8-typography-body-large-line-height: 1.5;
  --cre8-typography-body-large-letter-spacing: normal;
  --cre8-typography-body-large-text-transform: none;
  
  --cre8-typography-body-small-font-family: 'One Dot', Arial, Helvetica, sans-serif;
  --cre8-typography-body-small-font-size: 0.75rem;
  --cre8-typography-body-small-font-weight: 400;
  --cre8-typography-body-small-line-height: 1.25;
  --cre8-typography-body-small-letter-spacing: normal;
  --cre8-typography-body-small-text-transform: none;
  
  --cre8-typography-body-default-strong-font-family: 'One Dot Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-body-default-strong-font-size: 1rem;
  --cre8-typography-body-default-strong-font-weight: 700;
  --cre8-typography-body-default-strong-line-height: 1.25;
  --cre8-typography-body-default-strong-letter-spacing: normal;
  --cre8-typography-body-default-strong-text-transform: none;
  
  --cre8-typography-body-large-strong-font-family: 'One Dot Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-body-large-strong-font-size: 1.125rem;
  --cre8-typography-body-large-strong-font-weight: 700;
  --cre8-typography-body-large-strong-line-height: 1.5;
  --cre8-typography-body-large-strong-letter-spacing: normal;
  --cre8-typography-body-large-strong-text-transform: none;
  
  --cre8-typography-body-small-strong-font-family: 'One Dot Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-body-small-strong-font-size: 0.75rem;
  --cre8-typography-body-small-strong-font-weight: 700;
  --cre8-typography-body-small-strong-line-height: 1.25;
  --cre8-typography-body-small-strong-letter-spacing: normal;
  --cre8-typography-body-small-strong-text-transform: none;
  
  --cre8-typography-title-large-font-family: 'One Dot Condensed Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-title-large-font-size: 2rem;
  --cre8-typography-title-large-font-weight: 700;
  --cre8-typography-title-large-line-height: 1.2;
  --cre8-typography-title-large-letter-spacing: normal;
  --cre8-typography-title-large-text-transform: none;
  
  --cre8-typography-title-default-font-family: 'One Dot Condensed Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-title-default-font-size: 1.5rem;
  --cre8-typography-title-default-font-weight: 700;
  --cre8-typography-title-default-line-height: 1.2;
  --cre8-typography-title-default-letter-spacing: normal;
  --cre8-typography-title-default-text-transform: none;
  
  --cre8-typography-title-small-font-family: 'One Dot Condensed Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-title-small-font-size: 1.25rem;
  --cre8-typography-title-small-font-weight: 700;
  --cre8-typography-title-small-line-height: 1.2;
  --cre8-typography-title-small-letter-spacing: normal;
  --cre8-typography-title-small-text-transform: none;
  
  --cre8-typography-headline-large-font-family: 'One Dot Condensed Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-headline-large-font-size: 2.5rem;
  --cre8-typography-headline-large-font-weight: 700;
  --cre8-typography-headline-large-line-height: 1.1;
  --cre8-typography-headline-large-letter-spacing: normal;
  --cre8-typography-headline-large-text-transform: none;
  
  --cre8-typography-headline-default-font-family: 'One Dot Condensed Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-headline-default-font-size: 2rem;
  --cre8-typography-headline-default-font-weight: 700;
  --cre8-typography-headline-default-line-height: 1.1;
  --cre8-typography-headline-default-letter-spacing: normal;
  --cre8-typography-headline-default-text-transform: none;
  
  --cre8-typography-headline-small-font-family: 'One Dot Condensed Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-headline-small-font-size: 1.5rem;
  --cre8-typography-headline-small-font-weight: 700;
  --cre8-typography-headline-small-line-height: 1.1;
  --cre8-typography-headline-small-letter-spacing: normal;
  --cre8-typography-headline-small-text-transform: none;
  
  --cre8-typography-label-default-font-family: 'One Dot Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-label-default-font-size: 0.875rem;
  --cre8-typography-label-default-font-weight: 700;
  --cre8-typography-label-default-line-height: 1.2;
  --cre8-typography-label-default-letter-spacing: 0.05em;
  --cre8-typography-label-default-text-transform: none;
  
  --cre8-typography-label-large-font-family: 'One Dot Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-label-large-font-size: 1rem;
  --cre8-typography-label-large-font-weight: 700;
  --cre8-typography-label-large-line-height: 1.2;
  --cre8-typography-label-large-letter-spacing: 0.05em;
  --cre8-typography-label-large-text-transform: none;
  
  --cre8-typography-label-small-font-family: 'One Dot Bold', Arial, Helvetica, sans-serif;
  --cre8-typography-label-small-font-size: 0.75rem;
  --cre8-typography-label-small-font-weight: 700;
  --cre8-typography-label-small-line-height: 1.2;
  --cre8-typography-label-small-letter-spacing: 0.05em;
  --cre8-typography-label-small-text-transform: none;
  
  /* --- Border Radius & Shadows --- */
  --cre8-border-radius-default: 0.25rem;
  --cre8-shadow-default: 0 2px 4px 0 rgba(0,0,0,0.2);
}
`;
