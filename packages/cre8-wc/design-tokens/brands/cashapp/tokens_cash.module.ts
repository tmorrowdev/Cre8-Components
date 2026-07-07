import { css } from "lit"


export const cash = css`
/* ============================================================
   Brand Theme: Cash App
   Source: https://cash.app (live rendered DOM)
   Generated: 2026-06-26
   Extraction method: live computed styles via headless browser
     (Firecrawl CLI unavailable — anonymous IP blocked, no API key),
     so brand signals were read directly from the rendered page —
     dominant background colors, CTA computed styles, fonts, radii.
   ============================================================ */
  



:root {
  /* --- Colors: Brand ---------------------------------------- */
  /* High — #00E013 was the single dominant background color on the
     homepage by a wide margin (the signature Cash App green).
     (Cash App's published brand green is #00D632; the live site
     computes to #00E013 — using the extracted value.) */
  --cre8-color-bg-brand-strong: #00E013;
  /* Medium — darker shade for hover/pressed, derived (~18% darker) */
  --cre8-color-bg-brand-xstrong: #00B30F;
  /* Medium — light tint, derived */
  --cre8-color-bg-brand-subtle: #D9F9DE;
  /* Medium — green is low-contrast as text on white; using a darkened
     brand green for readable brand-colored text */
  --cre8-color-content-brand: #008A0C;

  /* --- Colors: Backgrounds ---------------------------------- */
  /* High — page/sections alternate white and the brand green */
  --cre8-color-bg-default: #FFFFFF;
  /* Medium — light surface for cards */
  --cre8-color-bg-subtle: #F4F6F5;
  /* Medium — muted surface */
  --cre8-color-bg-muted: #E9ECEA;
  /* High — Cash App leans heavily on full-black sections */
  --cre8-color-bg-inverse: #000000;

  /* --- Colors: Content (text) ------------------------------- */
  /* High — body and headings compute to pure black */
  --cre8-color-content-default: #000000;
  /* Medium — secondary text, derived */
  --cre8-color-content-subtle: #5B5F5C;
  /* Medium — placeholder/disabled, derived */
  --cre8-color-content-muted: #9AA0A6;
  /* High — text on green/black sections is white */
  --cre8-color-content-inverse: #FFFFFF;

  /* --- Colors: Borders -------------------------------------- */
  /* Medium — derived neutral borders (page is largely borderless) */
  --cre8-color-border-default: #E2E5E3;
  --cre8-color-border-subtle: #EFF1F0;
  --cre8-color-border-strong: #B7BCB8;
  --cre8-color-border-inverse: rgba(255,255,255,0.18);
  /* High — brand accent border */
  --cre8-color-border-brand: #00E013;

  /* --- Border Widths ---------------------------------------- */
  --cre8-border-width-default: 1px;   /* Low — standard default */
  --cre8-border-width-thick: 2px;     /* Low — standard default */

  /* --- Colors: Buttons -------------------------------------- */
  /* The brand's primary CTAs are fully-rounded pills. On green sections
     they're white-bg/black-text; on white sections they're black or
     outlined pills. Mapping the *brand* primary to a green fill with
     black text (Cash App pairs black text on green throughout the app). */
  --cre8-color-button-primary-background: #00E013;        /* High — brand green */
  --cre8-color-button-primary-background-hover: #00B30F;  /* Medium — derived */
  --cre8-color-button-primary-border: #00E013;            /* High */
  --cre8-color-button-primary-content: #000000;           /* High — black on green */
  /* High — secondary/“get started” CTA = white pill, black text */
  --cre8-color-button-secondary-background: #FFFFFF;
  --cre8-color-button-secondary-border: #FFFFFF;
  /* High — tertiary = transparent outlined pill */
  --cre8-color-button-tertiary-background: transparent;

  /* --- Colors: Links ---------------------------------------- */
  /* Low — homepage links computed to the UA default #0000EE (not brand-
     styled). Mapping links to the brand green instead, which matches
     Cash App's in-product link treatment. Review. */
  --cre8-color-link-default: #008A0C;
  --cre8-color-link-hover: #00B30F;
  /* --cre8-color-link-visited: ; */ /* Low — not detected */
  --cre8-color-link-inverse: #FFFFFF;

  /* --- Colors: Status — Error -------------------------------- */
  /* Low — no alert/status UI present on the homepage; standard semantic
     values used. Review against in-product components. */
  --cre8-color-bg-error: #FDECEC;
  --cre8-color-border-error: #F1AEAE;
  --cre8-color-content-error: #C8102E;

  /* --- Colors: Status — Warning ----------------------------- */
  --cre8-color-bg-warning: #FFF7E6;        /* Low — inferred */
  --cre8-color-border-warning: #F5C969;    /* Low — inferred */
  --cre8-color-content-warning: #9A6B00;   /* Low — inferred */

  /* --- Colors: Status — Success ----------------------------- */
  /* Medium — success reuses the brand green family (on-brand) */
  --cre8-color-bg-success: #D9F9DE;
  --cre8-color-border-success: #00E013;
  --cre8-color-content-success: #008A0C;

  /* --- Colors: Status — Info -------------------------------- */
  --cre8-color-bg-info: #E8F1FF;           /* Low — inferred */
  --cre8-color-border-info: #9CC2FF;       /* Low — inferred */
  --cre8-color-content-info: #1A5FD6;      /* Low — inferred */

  /* --- Colors: Status — Attention --------------------------- */
  --cre8-color-bg-attention: #FFF1E6;      /* Low — inferred */
  --cre8-color-border-attention: #F5B27A;  /* Low — inferred */
  --cre8-color-content-attention: #B5521A; /* Low — inferred */

  /* --- Typography ------------------------------------------- */
  /* High — extracted computed font stacks. "Cash Sans" is Cash App's own
     typeface, served from the Square CDN (cash-f.squarecdn.com) — load it
     via @font-face (see brand-summary.md for the snippet). The fallback
     chain keeps Helvetica Neue, which is what the site falls back to. */
  --cre8-font-family-default: "Cash Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --cre8-font-family-mono: "Cash Sans Mono", ui-monospace, "SF Mono", Menlo, monospace;
  /* --cre8-font-family-display: "Cash Sans Wide", "Helvetica Neue", sans-serif; */ /* extra: display face */
  --cre8-font-size-xs: 12px;   /* Low — standard scale (base 16px confirmed) */
  --cre8-font-size-sm: 14px;
  --cre8-font-size-md: 16px;   /* High — body computed 16px */
  --cre8-font-size-lg: 19px;   /* Medium — sub-CTA/body-large computed ~19px */
  --cre8-font-size-xl: 24px;
  --cre8-font-size-2xl: 32px;
  --cre8-font-size-3xl: 50px;  /* Medium — hero heading computed ~49.8px */
  --cre8-font-weight-normal: 400;   /* High — Cash Sans renders heavy at 400 */
  --cre8-font-weight-medium: 500;   /* High — CTA weight computed 500 */
  --cre8-font-weight-semibold: 600; /* Low — standard */
  --cre8-font-weight-bold: 700;     /* Low — standard */
  --cre8-line-height-tight: 1.1;    /* Medium — hero is tightly set */
  --cre8-line-height-default: 1.4;
  --cre8-line-height-relaxed: 1.7;

  /* --- Shape ------------------------------------------------ */
  /* High — buttons are full pills; cards ~19px */
  --cre8-border-radius-default: 12px;     /* Medium */
  --cre8-border-radius-lg: 19px;          /* High — recurring card radius */
  --cre8-border-radius-full: 999px;       /* High — pill */
  --cre8-border-radius-button: 999px;     /* High — CTAs are pills */
  --cre8-border-radius-card: 19px;        /* High */
  --cre8-border-radius-input: 999px;      /* Medium — pill inputs match CTA shape */

  /* --- Shadows ---------------------------------------------- */
  /* Low — flat design; minimal shadows detected. Conservative defaults. */
  --cre8-shadow-default: 0 1px 2px rgba(0,0,0,0.06);
  --cre8-shadow-card: 0 6px 20px rgba(0,0,0,0.08);
  --cre8-shadow-elevated: 0 16px 40px rgba(0,0,0,0.14);
  /* --cre8-shadow-button: ; */    /* Low — buttons are flat, no shadow */
  --cre8-shadow-dropdown: 0 10px 30px rgba(0,0,0,0.16);
  --cre8-shadow-modal: 0 -20px 60px rgba(0,0,0,0.30);

  /* --- Animation -------------------------------------------- */
  /* Low — no explicit durations captured; CRE8 system defaults. */
  --cre8-anim-fade-quick: 150ms;
  --cre8-anim-fade-default: 300ms;
  --cre8-anim-ease: cubic-bezier(0.2, 0.8, 0.2, 1);

  /* --- Component: Button ------------------------------------ */
  /* Medium — CTA padding computed ~12px x 18px; pill shape */
  --cre8-button-padding-x: 18px;
  --cre8-button-padding-y: 12px;
  /* --cre8-button-min-height: ; */ /* Low — not reliably measured */

  /* --- Component: Card -------------------------------------- */
  --cre8-card-border-radius: 19px;   /* High */
  /* --cre8-card-padding: ; */       /* Low — varies by section */

  /* --- Header ----------------------------------------------- */
  /* Medium — top nav sits on white/transparent over hero */
  --cre8-header-background: #FFFFFF;
  --cre8-color-header-bg-default: #FFFFFF;

 html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video {
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    border: 0;
    margin: 0;
    padding: 0
}

article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
    display: block
}

body {
    line-height: 1
}

ol,ul {
    list-style: none
}

blockquote,q {
    quotes: none
}

blockquote:before,blockquote:after,q:before,q:after {
    content: "";
    content: none
}

table {
    border-collapse: collapse;
    border-spacing: 0
}

html {
    box-sizing: border-box
}

*,:before,:after {
    box-sizing: inherit
}

@font-face {
    font-family: Cash Sans;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Regular.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSans-Regular.woff)format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap
}

@font-face {
    font-family: Cash Sans;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Medium.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSans-Medium.woff)format("woff");
    font-weight: 500;
    font-style: medium;
    font-display: swap
}

@font-face {
    font-family: Cash Sans;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Semibold.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSans-Semibold.woff)format("woff");
    font-weight: 600;
    font-style: semibold;
    font-display: swap
}

@font-face {
    font-family: Cash Sans;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Bold.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSans-Bold.woff)format("woff");
    font-weight: 700;
    font-style: bold;
    font-display: swap
}

@font-face {
    font-family: Cash Sans;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSans-Black.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSans-Black.woff)format("woff");
    font-weight: 900;
    font-style: black;
    font-display: swap
}

@font-face {
    font-family: Cash Sans Wide;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSansWide-Regular.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSansWide-Regular.woff)format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap
}

@font-face {
    font-family: Cash Sans Wide;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSansWide-Medium.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSansWide-Medium.woff)format("woff");
    font-weight: 500;
    font-style: medium;
    font-display: swap
}

@font-face {
    font-family: Cash Sans Wide;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSansWide-Semibold.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSansWide-Semibold.woff)format("woff");
    font-weight: 600;
    font-style: semibold;
    font-display: swap
}

@font-face {
    font-family: Cash Sans Wide;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSansWide-Bold.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSansWide-Bold.woff)format("woff");
    font-weight: 700;
    font-style: bold;
    font-display: swap
}

@font-face {
    font-family: Cash Sans Wide;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSansWide-Black.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSansWide-Black.woff)format("woff");
    font-weight: 900;
    font-style: black;
    font-display: swap
}

@font-face {
    font-family: Cash Sans Mono;
    src: url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff2/CashSansMono-Regular.woff2)format("woff2"),url(https://cash-f.squarecdn.com/static/fonts/cashsans/woff/CashSansMono-Regular.woff)format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-family: Cash Sans,Helvetica Neue,helvetica,sans-serif
}


body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-family: Cash Sans,Helvetica Neue,helvetica,sans-serif;
    font-size: 16px;
    font-weight: 400
}

html.lenis,html.lenis body {
    height: auto
}

.lenis:not(.lenis-autoToggle).lenis-stopped {
    overflow: clip
}
}`;

