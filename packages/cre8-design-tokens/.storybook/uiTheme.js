import { create } from '@storybook/theming';
import '../lib/web/brands/cre8/css/tokens_cre8.css';
import pkg from '../package.json';

export default create({
    base: 'light',
    colorPrimary: '#0033ff',
    colorSecondary: '#5CC862',
    fontBase: 'Inter',
    fontCode: 'Inter',
    fontSize: '20',
    appBg: '#fff',
    appContentBg: '#fff',
    appBorderColor: '#eee',
    appBorderRadius: 0,
    barTextColor: '#333333',
    barSelectedColor: '#110081',
    barBg: '#F8F8F9',
    brandTitle: `<img src="./cre8.png"/>
                <div class="header-title">
                    <span class="sub-title">Design Tokens</span>
                    <span class="repo-name">(cre8-design-tokens)</span>
                    <span class="version">v${pkg.version}</span>
                </div>
              `,
});
