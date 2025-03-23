import {html} from 'lit';
import {spread} from '../../directives/spread';
import { withActions } from '@storybook/addon-actions/decorator';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../.storybook/components/f-po/f-po';
import '../button/button';
import './popover';
import { sanitizeInput } from '../../utilities/story-helpers';

export default {
  title: 'cre8 Components/Popover',
  component: 'cre8-popover',
  render: ({heading, header, body, footer, ...args}) => html`
  <cre8-popover ${spread(args)}>
    ${unsafeHTML(sanitizeInput(heading, 'f-po'))}
    ${unsafeHTML(sanitizeInput(header, 'cre8-button', 'f-po'))}
    ${unsafeHTML(sanitizeInput(body, 'f-po'))}
    ${unsafeHTML(sanitizeInput(footer, 'cre8-button', 'f-po'))}
  </cre8-popover>`,
  parameters: {
    status: {type: 'inProgress'},
    layout: 'centered',
    actions: {
      handles: ['open', 'close'],
    },
  },
  decorators: [withActions],
  args: {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    heading: 'Popover Heading',
    header: '<cre8-button slot="trigger" text="Open Popover" variant="primary"></cre8-button>',
  },
  argTypes: {
    isActive: {control: 'boolean'},
    isActiveDynamic: {control: 'boolean'},
    isDynamic: {control: 'boolean'},
    isVisibleOnScroll: {control: 'boolean'},
    position: {control: 'text'},
    handleOnClickOutside: { table: { disable: true }},
    removeActive: { table: { disable: true }},
    removeActiveOnScroll: { table: { disable: true }},
    isRTL: { table: { disable: true }},
    close: { table: { disable: true }},
    open: { table: { disable: true }}
  }
};

export const Default = {
  args: {
    footer: '<cre8-button slot="footer" variant="tertiary" text="Button" size="sm" style="margin-left: auto"></cre8-button>',
  }
};

export const DefaultNoButton = {}

export const  PositionLeftContainsSmallPrimaryButton = {
  args: {
    footer: '<cre8-button slot="footer" variant="primary" text="Button" size="sm" style="margin-left: auto"></cre8-button>',
    position: 'left'
  },
};

export const PositionLeftContainsSmallSecondaryButton = {
  args: {
    footer: '<cre8-button slot="footer" variant="secondary" text="Button" size="sm" style="margin-left: auto"></cre8-button>',
    position: 'left'
  },
};

export const  PositionLeftContainsSmallTertiaryButton = {
  args: {
    position: 'left'
  }
};

export const PositionTop = {
  args: {
    position: "top",
  },
};

export const PositionRight = {
  args: {
    position: "right"
  },
};

export const PositionDynamic = () => html`
  <div
    style="padding: 3rem; height: 100vh; width: 100%; display: flex; flex-direction: column; justify-content: space-between; align-items: center; position: relative; overflow: hidden;"
  >
    <div style="display: flex; width: 100%; align-items: center; justify-content: center;">
      <cre8-popover ?isDynamic=${true} heading="Popover Heading" position="top">
        <cre8-button slot="trigger" text="Open Popover" variant="primary"></cre8-button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8-button slot="footer" variant="secondary" text="Button" style="margin-left: auto"></cre8-button>
      </cre8-popover>
    </div>
    <div style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
      <cre8-popover ?isDynamic=${true} heading="Popover Heading" position="left">
        <cre8-button slot="trigger" text="Open Popover" variant="primary"></cre8-button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8-button slot="footer" variant="secondary" text="Button" style="margin-left: auto"></cre8-button>
      </cre8-popover>
      <cre8-popover ?isDynamic=${true} heading="Popover Heading" position="right">
        <cre8-button slot="trigger" text="Open Popover" variant="primary"></cre8-button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8-button slot="footer" variant="secondary" text="Button" style="margin-left: auto"></cre8-button>
      </cre8-popover>
    </div>
    <div style="display: flex; width: 100%; align-items: center; justify-content: center;">
      <cre8-popover ?isDynamic=${true} heading="Popover Heading">
        <cre8-button slot="trigger" text="Open Popover" variant="primary"></cre8-button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8-button slot="footer" variant="secondary" text="Button" style="margin-left: auto"></cre8-button>
      </cre8-popover>
    </div>
  </div>
`;

PositionDynamic.parameters = {
  layout: 'fullscreen',
}

export const WithVisibleOnScroll = {
  args: {
    isVisibleOnScroll: true,
  },
};

export const WithSlots = {
  args: {
    heading: `<f-po slot="header">Header</f-po>`,
    body: '<f-po>Body</f-po>',
    footer: '<f-po style="width: 100%;" slot="footer">Footer</f-po>'
  },
};
