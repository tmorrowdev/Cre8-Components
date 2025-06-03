import { html } from 'lit';
import '../icon/icon';
import '../heading/heading';
import './accordion';
import type { Meta, StoryObj } from '@storybook/web-components';
import './accordion';
import { spread } from '../../directives/spread';
import type Cre8Accordion from './accordion';
interface Props extends Cre8Accordion {
}
type Story = StoryObj<Props>;

const meta = {
  title: 'cre8 Components/Accordion/Accordion',
  component: 'cre8-accordion',
  argTypes: {
    borderType: {
      options: ['none','rectangle', 'rounded-bottom', 'rounded'],
      control: {type: 'radio'}
    },
    hasDivider: {
      options: [true, false],
      control: {type: 'radio'}
    }
  },

  render: (args) =>
    html`
    <cre8-accordion ${spread(args)}>
      <cre8-accordion-item heading="Accordion Item Heading" isActive>
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </cre8-accordion-item>
      <cre8-accordion-item heading="Accordion Item Heading" >
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </cre8-accordion-item>
      <cre8-accordion-item heading="Accordion Item Heading" >
      <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </cre8-accordion-item>
    </cre8-accordion>
`,
} satisfies Meta<Props>;
export default meta;

export const Default: Story = {args:{
  borderType: 'none',
  hasDivider: false
}};

export const DefaultDivider: Story = {args:{
  borderType: 'none',
  hasDivider: true
}};

export const Rectangle: Story = {args:{
  borderType: 'rectangle',
  hasDivider: false
}};

export const RectangleDivider: Story = {args:{
  borderType: 'rectangle',
  hasDivider: true
}};

export const RoundedBottom: Story = {args:{
  borderType: 'rounded-bottom',
  hasDivider: false
}};

export const RoundedBottomDivider: Story = {args:{
  borderType: 'rounded-bottom',
  hasDivider: true
}};

export const Rounded: Story = {args:{
  borderType: 'rounded',
  hasDivider: false
}};

export const RoundedDivider: Story = {args:{
  borderType: 'rounded',
  hasDivider: true
}};
