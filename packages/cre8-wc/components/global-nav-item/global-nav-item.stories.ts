import {html} from 'lit';
import {spread} from '../../directives/spread';
import './global-nav-item';

export default {
  title: 'DEPRECATED/DO NOT USE/Global Nav Item',
  component: 'cre8-global-nav-item',
  parameters: { status: { type: 'inProgress' } },
};

export const Default = (args) => html`<cre8-global-nav-item ${spread(args)}>Hello world</cre8-global-nav-item>`
