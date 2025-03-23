import { html } from 'lit';
import '../icon/icon';
import '../heading/heading';
import './accordion-item';
import type { Meta, StoryObj } from '@storybook/web-Components';
import type { cre8AccordionItem } from '../accordion-item/accordion-item';
import { spread } from '../../directives/spread';

interface Props extends cre8AccordionItem {
}
type Story = StoryObj<Props>;

const meta = {
  title: 'cre8 Components/Accordion/Accordion Item',
  component: 'cre8-accordion-item',
  argTypes: {
    heading: {
      control: {type: 'text'}
    },
    iconBefore: {
      control: {type: 'boolean'}
    },
    tertiaryIcon: {
      control: {type: 'boolean'}
    },
    brandHeader: {
      control: {type: 'boolean'}
    },
    size: {
      defaultValue: 'sm',
      options: ['sm', 'lg'],
      control: {type: 'radio'}
    },
    headingTagVariant: {
      defaultValue: 'h4',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      controls: {type: 'select'}
    }
  },
  args: {
    heading: 'Accordion Item Heading',
    iconBefore: undefined,
    tertiaryIcon: undefined,
    brandHeader: undefined,
    size: undefined,
    headingTagVariant: undefined
  },

  render: ({...args}) =>
    html`
      <cre8-accordion-item ${spread(args)} isActive>
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </cre8-accordion-item>`,
} satisfies Meta<Props>;
export default meta;

export const Default: Story = {};

export const IconBefore: Story = {args: {
  heading: 'Accordion Item Header',
  iconBefore: true,
  brandHeader: false,
}};

export const TertiaryIcon: Story = {args: {
  heading: 'Accordion Item Header',
  tertiaryIcon: true
}};

export const TertiaryIconBefore: Story = {args: {
  heading: 'Accordion Item Header',
  tertiaryIcon: true,
  iconBefore: true,
  brandHeader: false
}};

export const SizeLarge: Story = {args: {
  heading: 'Accordion Item Header',
  size: 'lg',
  brandHeader: false
}};

export const HeadingTagH2: Story = {args: {
  heading: 'Accordion Item Header',
  headingTagVariant: 'h2'
}}

export const BrandColoredHeader: Story = {args: {
  heading: 'Accordion Item Header',
  size: 'sm',
  brandHeader: true
}};
