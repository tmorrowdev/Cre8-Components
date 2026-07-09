import { create } from '@storybook/theming';
import pkg from '../package.json';



export default create({
  base: 'light',

  colorPrimary: '#0357A3',
  colorSecondary: '#0357A3',

  // UI
  appBg: 'white',
  appContentBg: '#f4f4f4',
  appBorderColor: '#333333',
  appBorderRadius: 24,

  // Typography
  fontBase: '"Montserrat", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#333333',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#333333',
  barSelectedColor: '#0357A3',
  barBg: '#ffffff',

  // Form colors
  inputBg: 'white',
  inputBorder: '#333333',
  inputTextColor: 'black',
  inputBorderRadius: 24,

  brandTitle: `<img src="cre8-logo.png"/>
                <div class="header-title">
                    <span class="sub-title">Cre8 Web Components</span>
                    <span class="repo-name">@tmorrow/cre8-wc</span>
                    <span class="version">v${pkg.version}</span>
                </div>
              `,
  brandUrl: 'https://cre8.dev',
  brandTarget: 'https://cre8.dev',
});
