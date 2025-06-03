import {css} from 'lit';
 
const femmecubator = css`
/**
 * femmecubator: all tokens
 */
 @font-face {
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	src: url('../assets/fonts/Inter-Regular.woff2') format('woff2'),
			 url('../assets/fonts/Inter-Regular.woff') format('woff');
	font-display: auto;
}

@font-face {
	font-family: 'Inter';
	font-style: medium;
	font-weight: 500;
	src: url('../assets/fonts/Inter-Medium.woff2') format('woff2'),
			 url('../assets/fonts/Inter-Medium.woff') format('woff');
	font-display: auto;
}

@font-face {
	font-family: 'Inter';
	font-style: medium;
	font-weight: 600;
	src: url('../assets/fonts/Inter-SemiBold.woff2') format('woff2'),
			 url('../assets/fonts/Inter-SemiBold.woff') format('woff');
	font-display: auto;
}

@font-face {
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
	src: url('../assets/fonts/Inter-Bold.woff2') format('woff2'),
			 url('../assets/fonts/Inter-Bold.woff') format('woff');
	font-display: auto;
}

:root {
    --cre8-color-base-color-blue-15: #b3d4f7;
  --cre8-color-base-color-blue-25: #81b7f2;
  --cre8-color-base-color-blue-35: #4e9aec;
  --cre8-color-base-color-blue-50: #026fe4;
  --cre8-color-base-color-blue-60: #0259b6;
  --cre8-color-base-color-blue-70: #014ea0;
  --cre8-color-base-color-blue-80: #013872;
  --cre8-color-base-color-blue-90: #012144;
  --cre8-color-base-color-blue-05: #e6f1fc;
  --cre8-color-base-color-green-15: #d4efdf;
  --cre8-color-base-color-green-30: #7dcea0;
  --cre8-color-base-color-green-50: #00875a;
  --cre8-color-base-color-green-70: #1f8b4d;
  --cre8-color-base-color-green-90: #17683a;
  --cre8-color-base-color-red-15: #fbdddd;
  --cre8-color-base-color-red-30: #f5abab;
  --cre8-color-base-color-red-50: #eb5757;
  --cre8-color-base-color-red-70: #bc4646;
  --cre8-color-base-color-red-90: #8d3434;
  --cre8-color-base-color-yellow-20: #fae9b7;
  --cre8-color-base-color-yellow-30: #f7df94;
  --cre8-color-base-color-yellow-50: #f2c94c;
  --cre8-color-base-color-yellow-70: #dab544;
  --cre8-color-base-color-yellow-95: #30280f;
  --cre8-color-base-color-sky-15: #c0e1f4;
  --cre8-color-base-color-sky-30: #81c4e9;
  --cre8-color-base-color-sky-50: #2d9cdb;
  --cre8-color-base-color-sky-70: #247daf;
  --cre8-color-base-color-sky-90: #174e6e;
  --cre8-color-base-color-white: #ffffff;
  --cre8-color-base-color-gray-10: #fafafa;
  --cre8-color-base-color-gray-20: #efefef;
  --cre8-color-base-color-gray-30: #e0e0e0;
  --cre8-color-base-color-gray-40: #cfcfcf;
  --cre8-color-base-color-gray-50: #bdbdbd;
  --cre8-color-base-color-gray-60: #9c9c9c;
  --cre8-color-base-color-gray-70: #828282;
  --cre8-color-base-color-gray-80: #4f4f4f;
  --cre8-color-base-color-gray-90: #333333;
  --cre8-color-base-color-transparent: #ffffff00;
  --cre8-color-base-color-wesparkle-red: #e43c4a;
  --cre8-base-spacing-4: 4px;
  --cre8-base-spacing-8: 8px;
  --cre8-base-spacing-12: 12px;
  --cre8-base-spacing-16: 16px;
  --cre8-base-spacing-20: 20px;
  --cre8-base-spacing-24: 28px;
  --cre8-base-spacing-32: 36px;
  --cre8-base-spacing-48: 48px;
  --cre8-base-spacing-56: 56px;
  --cre8-base-spacing-64: 64px;
  --cre8-base-border-radius-0: 0rem;
  --cre8-base-border-radius-4: 4px;
  --cre8-base-border-radius-16: 16px;
  --cre8-base-border-radius-60: 60px;
  --cre8-base-border-radius-900: 900px;
  --cre8-base-border-width-0: 0px;
  --cre8-base-border-width-1: 1px;
  --cre8-base-border-width-2: 2rem;
  --cre8-base-border-width-4: 4px;
  --cre8-base-border-width-6: 6px;
  --cre8-color-color-bg-strong: #828282;
  --cre8-color-color-bg-subtle: #333333;
  --cre8-color-color-bg-default: #4f4f4f;
  --cre8-color-color-bg-disabled: #e0e0e0;
  --cre8-color-color-bg-brand-default: #026fe4;
  --cre8-color-color-bg-brand-subtle: #e6f1fc;
  --cre8-color-color-bg-brand-hover: #81b7f2;
  --cre8-color-color-bg-brand-strong: #012144;
  --cre8-color-color-bg-success-default: #d4efdf;
  --cre8-color-color-bg-success-strong: #00875a;
  --cre8-color-color-bg-error-default: #fbdddd;
  --cre8-color-color-bg-error-strong: #eb5757;
  --cre8-color-color-bg-warning-default: #fae9b7;
  --cre8-color-color-bg-warning-strong: #f2c94c;
  --cre8-color-color-bg-info-default: #c0e1f4;
  --cre8-color-color-bg-info-strong: #2d9cdb;
  --cre8-color-color-bg-transparent: #ffffff00;
  --cre8-color-color-bg-active: #333333;
  --cre8-color-color-bg-logo: #e43c4a;
  --cre8-color-color-content-default: #ffffff;
  --cre8-color-color-content-subtle: #4f4f4f;
  --cre8-color-color-content-disabled: #9c9c9c;
  --cre8-color-color-content-knockout: #ffffff;
  --cre8-color-color-content-brand-default: #026fe4;
  --cre8-color-color-content-brand-subtle: #e6f1fc;
  --cre8-color-color-content-brand-strong: #81b7f2;
  --cre8-color-color-content-success-default: #17683a;
  --cre8-color-color-content-success-icon: #00875a;
  --cre8-color-color-content-error-default: #8d3434;
  --cre8-color-color-content-error-icon: #eb5757;
  --cre8-color-color-content-warning-default: #30280f;
  --cre8-color-color-content-warning-icon: #f2c94c;
  --cre8-color-color-content-info-default: #174e6e;
  --cre8-color-color-content-info-icon: #2d9cdb;
  --cre8-color-color-content-link-default: #026fe4;
  --cre8-color-color-content-link-strong: #012144;
  --cre8-color-color-content-link-subtle: #4f4f4f;
  --cre8-color-color-content-link-hover: #014ea0;
  --cre8-color-color-border-default: #9c9c9c;
  --cre8-color-color-border-strong: #4f4f4f;
  --cre8-color-color-border-disabled: #9c9c9c;
  --cre8-color-color-border-knockout: #ffffff;
  --cre8-color-color-border-success: #00875a;
  --cre8-color-color-border-error: #eb5757;
  --cre8-color-color-border-warning: #f2c94c;
  --cre8-color-color-border-info: #2d9cdb;
  --cre8-color-color-border-transparent: #ffffff00;
  --cre8-color-color-border-active: #333333;
  --cre8-color-color-border-brand-default: #026fe4;
  --cre8-color-color-border-brand-hover: #81b7f2;
  --cre8-color-color-border-brand-strong: #014ea0;
  --cre8-color-color-border-brand-subtle: #e6f1fc;
  --cre8-color-color-border-divider: #4f4f4f;
  --cre8-border-radius-none: 0rem;
  --cre8-border-radius-small: 4px;
  --cre8-border-radius-default: 16px;
  --cre8-border-radius-large: 60px;
  --cre8-border-radius-container: 60px;
  --cre8-border-radius-round: 900px;
  --cre8-border-width-none: 0px;
  --cre8-border-width-thin: 1px;
  --cre8-border-width-default: 2rem;
  --cre8-border-width-medium: 4px;
  --cre8-border-width-thick: 6px;
  --cre8-border-width-focus: 2rem;
  --cre8-spacing-3xs: 4px;
  --cre8-spacing-2xs: 8px;
  --cre8-spacing-xs: 12px;
  --cre8-spacing-s: 16px;
  --cre8-spacing-m: 20px;
  --cre8-spacing-l: 28px;
  --cre8-spacing-xl: 36px;
  --cre8-spacing-2xl: 48px;
  --cre8-spacing-3xl: 56px;
  --cre8-spacing-4xl: 64px;
  /* Background Colors - General */
  --cre8-color-bg-default: #4f4f4f;
  --cre8-color-bg-default-hover: #4f4f4f;
  --cre8-color-bg-default-active: #333333;
  --cre8-color-bg-subtle: #333333;
  --cre8-color-bg-moderate: #828282;
  --cre8-color-bg-strong: #828282;
  --cre8-color-bg-disabled: #e0e0e0;
  --cre8-color-bg-active: #333333;
  --cre8-color-bg-inverse-active: #ffffff;
  --cre8-color-bg-transparent: #ffffff00;
  --cre8-color-bg-logo: #e43c4a;
  
  /* Background Colors - Brand */
  --cre8-color-bg-brand: #026fe4;
  --cre8-color-bg-brand-default: #026fe4;
  --cre8-color-bg-brand-subtle: #e6f1fc;
  --cre8-color-bg-brand-hover: #81b7f2;
  --cre8-color-bg-brand-active: #026fe4;
  --cre8-color-bg-brand-strong: #012144;
  
  /* Background Colors - Status */
  --cre8-color-bg-success: #d4efdf;
  --cre8-color-bg-success-default: #d4efdf;
  --cre8-color-bg-success-strong: #00875a;
  --cre8-color-bg-error: #fbdddd;
  --cre8-color-bg-error-default: #fbdddd;
  --cre8-color-bg-error-strong: #eb5757;
  --cre8-color-bg-warning: #fae9b7;
  --cre8-color-bg-warning-default: #fae9b7;
  --cre8-color-bg-warning-strong: #f2c94c;
  --cre8-color-bg-info: #c0e1f4;
  --cre8-color-bg-info-default: #c0e1f4;
  --cre8-color-bg-info-strong: #2d9cdb;
  
  /* Content Colors - General */
  --cre8-color-content-default: #ffffff;
  --cre8-color-content-subtle: #4f4f4f;
  --cre8-color-content-disabled: #9c9c9c;
  --cre8-color-content-knockout: #ffffff;
  
  /* Content Colors - Brand */
  --cre8-color-content-brand: #026fe4;
  --cre8-color-content-brand-default: #026fe4;
  --cre8-color-content-brand-subtle: #e6f1fc;
  --cre8-color-content-brand-strong: #81b7f2;
  
  /* Content Colors - Status */
  --cre8-color-content-success: #17683a;
  --cre8-color-content-success-default: #17683a;
  --cre8-color-content-success-icon: #00875a;
  --cre8-color-content-error: #8d3434;
  --cre8-color-content-error-default: #8d3434;
  --cre8-color-content-error-icon: #eb5757;
  --cre8-color-content-warning: #30280f;
  --cre8-color-content-warning-default: #30280f;
  --cre8-color-content-warning-icon: #f2c94c;
  --cre8-color-content-info: #174e6e;
  --cre8-color-content-info-default: #174e6e;
  --cre8-color-content-info-icon: #2d9cdb;
  
  /* Content Colors - Link */
  --cre8-color-content-link: #026fe4;
  --cre8-color-content-link-default: #026fe4;
  --cre8-color-content-link-strong: #012144;
  --cre8-color-content-link-subtle: #4f4f4f;
  --cre8-color-content-link-hover: #014ea0;
  --cre8-color-content-link-focus: #026fe4;
  --cre8-color-content-link-active: #014ea0;
  --cre8-color-content-link-visited: #014ea0;
  --cre8-color-content-link-disabled: #9c9c9c;
  --cre8-color-content-inverse-link: #ffffff;
  --cre8-color-content-inverse-link-hover: #ffffff;
  --cre8-color-content-inverse-link-focus: #ffffff;
  --cre8-color-content-inverse-link-active: #ffffff;
  --cre8-color-content-inverse-link-visited: #ffffff;
  --cre8-color-content-inverse-link-disabled: #9c9c9c;
  
  /* Border Colors - General */
  --cre8-color-border-default: #9c9c9c;
  --cre8-color-border-strong: #4f4f4f;
  --cre8-color-border-disabled: #9c9c9c;
  --cre8-color-border-knockout: #ffffff;
  --cre8-color-border-transparent: #ffffff00;
  --cre8-color-border-active: #333333;
  --cre8-color-border-divider: #4f4f4f;
  --cre8-color-border-active-outline: #026fe4;
  --cre8-color-border-inverse-active-outline: #ffffff;
  
  /* Border Colors - Brand */
  --cre8-color-border-brand: #026fe4;
  --cre8-color-border-brand-default: #026fe4;
  --cre8-color-border-brand-hover: #81b7f2;
  --cre8-color-border-brand-strong: #014ea0;
  --cre8-color-border-brand-subtle: #e6f1fc;
  
  /* Border Colors - Status */
  --cre8-color-border-success: #00875a;
  --cre8-color-border-error: #eb5757;
  --cre8-color-border-warning: #f2c94c;
  --cre8-color-border-info: #2d9cdb;
  
  /* Border Radius */
  --cre8-border-radius-none: 0rem;
  --cre8-border-radius-small: 0.25rem;
  --cre8-border-radius-default: 1rem;
  --cre8-border-radius-large: 3.75rem;
  --cre8-border-radius-container: 3.75rem;
  --cre8-border-radius-round: 56.25rem;
  --cre8-border-radius-button: 1rem;
  --cre8-border-radius-badge: 0.25rem;
  --cre8-border-radius-tabs: 1rem;
  --cre8-border-radius-field: 1rem;
  --cre8-border-radius-field-brand: 1rem;
  --cre8-border-radius-brand: 1rem;
  
  /* Border Width */
  --cre8-border-width-none: 0rem;
  --cre8-border-width-thin: 0.062rem;
  --cre8-border-width-default: 0.125rem;
  --cre8-border-width-medium: 0.25rem;
  --cre8-border-width-thick: 0.375rem;
  --cre8-border-width-focus: 0.125rem;
  --cre8-border-width-button-default: 0.125rem;
  --cre8-border-width-tab-default: 0.125rem;
  --cre8-border-width-tab-selected: 0.125rem;
  --cre8-border-width-button-tertiary-outline-focus: 0.125rem;
  
  /* Border Style */
  --cre8-border-style-default: solid;
  --cre8-border-style-button-tertiary-outline-focus: solid;
  
  /* Spacing */
  --cre8-spacing-0: 0rem;
  --cre8-spacing-2: 0.25rem; /* 3xs */
  --cre8-spacing-4: 0.5rem; /* 2xs */
  --cre8-spacing-6: 0.75rem; /* xs */
  --cre8-spacing-8: 1rem; /* s */
  --cre8-spacing-12: 1.25rem; /* m */
  --cre8-spacing-16: 1.5rem; /* l */
  --cre8-spacing-24: 2rem; /* xl */
  --cre8-spacing-32: 3rem; /* 2xl */
  --cre8-spacing-40: 3.5rem; /* 3xl */
  --cre8-spacing-48: 4rem; /* 4xl */
  
  /* Using femmecubator's original spacing names as reference */
  --cre8-spacing-3xs: 0.25rem;
  --cre8-spacing-2xs: 0.5rem;
  --cre8-spacing-xs: 0.75rem;
  --cre8-spacing-s: 1rem;
  --cre8-spacing-m: 1.25rem;
  --cre8-spacing-l: 1.5rem;
  --cre8-spacing-xl: 2rem;
  --cre8-spacing-2xl: 3rem;
  --cre8-spacing-3xl: 3.5rem;
  --cre8-spacing-4xl: 4rem;
  
  /* Button Padding - Mapping from spacing tokens */
  --cre8-button-padding-vertical-small: 0.5rem;
  --cre8-button-padding-vertical-medium: 0.75rem;
  --cre8-button-padding-vertical-large: 1rem;
  --cre8-button-padding-vertical-icon-only: 0.5rem;
  --cre8-button-padding-vertical-small-icon-only: 0.5rem;
  --cre8-button-padding-vertical-medium-icon-only: 0.75rem;
  --cre8-button-padding-vertical-large-icon-only: 1rem;
  --cre8-button-padding-horizontal-small: 1rem;
  --cre8-button-padding-horizontal-medium: 1.5rem;
  --cre8-button-padding-horizontal-large: 2rem;
  --cre8-button-padding-horizontal-icon-only: 0.5rem;
  --cre8-button-padding-horizontal-small-icon-only: 0.5rem;
  --cre8-button-padding-horizontal-medium-icon-only: 0.75rem;
  --cre8-button-padding-horizontal-large-icon-only: 1rem;
  
  /* Shadow */
  --cre8-shadow-default: none;
  --cre8-shadow-button: none;
  --cre8-shadow-none: none;
  --cre8-shadow-small: none;
  --cre8-shadow-large: none;
  
  /* Breakpoints */
  --cre8-breakpoint-xsm: 375px;
  --cre8-breakpoint-sm: 560px;
  --cre8-breakpoint-md: 768px;
  --cre8-breakpoint-lg: 960px;
  --cre8-breakpoint-xl: 1200px;
  --cre8-breakpoint-xxl: 1400px;
}
`;
export default femmecubator;