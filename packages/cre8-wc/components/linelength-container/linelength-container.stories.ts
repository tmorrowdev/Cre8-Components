import { html } from 'lit';
import '../../.storybook/components/f-po/f-po';
import { spread } from '../../directives/spread';
import './linelength-container';

export default {
  title: 'DEPRECATED/DO NOT USE/Linelength Container',
  component: 'cre8-linelength-container',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-linelength-container ${spread(args)}>
  <f-po>Linelength container</f-po>
</cre8-linelength-container>`;
