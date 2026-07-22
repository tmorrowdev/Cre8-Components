import { create } from 'storybook/theming';
import pkg from '../package.json';

// Cre8 brand mark — cobalt infinity logo, inline SVG data URI so it is fully
// self-contained (the deployed Storybook runs under a strict CSP with no
// external image/font hosts).
const logo =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%20130%20512%20252%22%20role%3D%22img%22%20aria-label%3D%22Cre8%22%3E%3Cpath%20d%3D%22M256%20256%20C%20200%20168%2078%20172%2078%20256%20C%2078%20340%20200%20344%20256%20256%20C%20312%20168%20434%20172%20434%20256%20C%20434%20340%20312%20344%20256%20256%20Z%22%20fill%3D%22none%22%20stroke%3D%22%231F2BEC%22%20stroke-width%3D%2266%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E";

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
