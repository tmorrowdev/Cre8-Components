import { create } from 'storybook/theming';
import pkg from '../package.json';

// Cre8 brand mark — blue→magenta gradient, inline SVG data URI so it is fully
// self-contained (the deployed Storybook runs under a strict CSP with no
// external image/font hosts).
const logo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%233B82F6'/%3E%3Cstop offset='1' stop-color='%23EC4899'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='8' fill='url(%23g)'/%3E%3C/svg%3E";

export default create({
  base: 'light',

  // Cre8 a2ui brand palette
  colorPrimary: '#3B82F6',
  colorSecondary: '#EC4899',

  // App chrome
  appBg: '#ffffff',
  appContentBg: '#F8FAFC',
  appPreviewBg: '#ffffff',
  appBorderColor: '#E2E8F0',
  appBorderRadius: 12,

  // Typography — Plus Jakarta Sans (self-hosted, see manager-head.html)
  fontBase: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'ui-monospace, "JetBrains Mono", "SF Mono", Menlo, monospace',

  // Text colors
  textColor: '#0F172A',
  textMutedColor: '#64748B',
  textInverseColor: '#F8FAFC',

  // Toolbar
  barTextColor: '#475569',
  barSelectedColor: '#3B82F6',
  barHoverColor: '#EC4899',
  barBg: '#ffffff',

  // Controls / forms
  buttonBg: '#F8FAFC',
  buttonBorder: '#E2E8F0',
  booleanBg: '#E2E8F0',
  booleanSelectedBg: '#3B82F6',
  inputBg: '#ffffff',
  inputBorder: '#E2E8F0',
  inputTextColor: '#0F172A',
  inputBorderRadius: 8,

  brandTitle: `<div class="cre8-brand">
      <img class="cre8-logo" src="${logo}" alt="Cre8" />
      <span class="cre8-name">Cre8</span>
      <span class="cre8-sub">design system</span>
      <span class="cre8-ver">v${pkg.version}</span>
    </div>`,
  brandUrl: '/?path=/docs/documentation-changelog--docs',
  brandTarget: '_self',
});
