import { html } from 'lit';
import '../../.storybook/components/f-po/f-po';
import { spread } from '../../directives/spread';
import './nav-container';

export default {
  title: 'DEPRECATED/DO NOT USE/Nav Container',
  component: 'cre8-nav-container',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-text-passage size="sm" ?capLinelength=${true}>
    <p>
      Nav container is used for the panel that can be toggled on/off on small screens with the header menu button. This is why it does not show up on
      small screens.
    </p>
  </cre8-text-passage>
  <cre8-nav-container ${spread(args)}>
    <f-po style="flex: 1 0 auto;">Nav container contents (primary nav, utility nav, etc.)</f-po>
  </cre8-nav-container>`;
