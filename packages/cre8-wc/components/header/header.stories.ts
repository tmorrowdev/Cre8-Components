import { html } from 'lit';
import '../../.storybook/components/f-po/f-po';
import { spread } from '../../directives/spread';
import './header';

export default {
  title: 'Cre8 Components/Header',
  component: 'cre8-header',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-header ${spread(args)}>
  <f-po slot="top">Optional header top</f-po>
  <f-po>Header middle</f-po>
  <f-po slot="bottom">Optional header bottom</f-po>
</cre8-header>`;
