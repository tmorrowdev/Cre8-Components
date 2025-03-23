import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../global-nav-item/global-nav-item';
import './global-nav';

export default {
  title: 'DEPRECATED/DO NOT USE/Global Nav',
  component: 'cre8-global-nav',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-global-nav ${spread(args)}>Hello world</cre8-global-nav>`;
