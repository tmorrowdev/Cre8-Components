import {html} from 'lit';
import './icon-grid';

export default {
  title: 'cre8 Components/Icon/cre8 Icon Library',
  component: 'icon-grid',
};

export const IconGrid = (args, context) => html`<icon-grid theme=${context.globals.theme}></icon-grid>`;
