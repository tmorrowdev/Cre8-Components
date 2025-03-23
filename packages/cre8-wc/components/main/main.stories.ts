import { html } from 'lit';
import '../../.storybook/components/f-po/f-po';
import { spread } from '../../directives/spread';
import './main';

export default {
  title: 'DEPRECATED/DO NOT USE/Main',
  component: 'cre8-main',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-main ${spread(args)}><f-po>Main Content Block Between Header and Footer</f-po></cre8-main>`;
