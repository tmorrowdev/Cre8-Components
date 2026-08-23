import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../../.storybook/components/f-po/f-po';
import './container';

export default {
  title: 'cre8 Components/Container',
  component: 'cre8-container',
  parameters: { status: { type: 'inProgress' } },
  argTypes: {
    type: {
      options: ['inline-size', 'size', 'normal'],
      control: { type: 'radio' },
    },
  },
};

export const Default = (args) => html`<cre8-container ${spread(args)} style="resize: horizontal; overflow: auto; border: 1px dashed var(--cre8-color-border-default); padding: 8px; width: 480px;">
  <f-po>This box is resizable - drag its right edge. The label inside is styled with a plain <code>@container</code> query keyed to this element's width, not the viewport.</f-po>
</cre8-container>`;

export const NamedContainer = {
  args: {
    name: 'demo',
  },
  render: (args) => Default(args),
};
