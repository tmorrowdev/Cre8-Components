import { html } from 'lit';
import { spread } from '../../directives/spread';
import './icon';
import svgInfoFilled from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Info.svg?raw';

export default {
  title: 'cre8 Components/Icon/Icon',
  component: 'cre8-icon-legacy',
  parameters: { status: { type: 'inProgress' } },
  args: {
    name: 'add',
  }
};

export const Default = (args) => {
  return html`
  <p><strong>cre8-icon usage:</strong></p>
  <cre8-icon svg="${svgInfoFilled}" width="48" height="48" fill="currentColor"></cre8-icon>
  <p><strong>cre8-icon-legacy usage:</strong></p>
  <cre8-icon-legacy ${spread(args)}></cre8-icon-legacy>`;
};
