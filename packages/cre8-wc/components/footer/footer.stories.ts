import { html } from 'lit';
import '../../.storybook/components/f-po/f-po';
import { spread } from '../../directives/spread';
import './footer';

export default {
  title: 'DEPRECATED/DO NOT USE/Footer',
  component: 'cre8-footer',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-footer ${spread(args)}>
  <f-po slot="top">Optional footer top</f-po>
  <f-po>Footer middle</f-po>
  <f-po slot="bottom">Optional footer bottom</f-po>
</cre8-footer>`;
