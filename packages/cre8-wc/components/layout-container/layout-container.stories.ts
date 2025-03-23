import { html } from 'lit';
import '../../.storybook/components/f-po/f-po';
import { spread } from '../../directives/spread';
import './layout-container';

export default {
  title: 'DEPRECATED/DO NOT USE/Layout Container',
  component: 'layout-container',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-layout-container ${spread(args)}>
  <f-po>Layout Container</f-po>
</cre8-layout-container>`;
