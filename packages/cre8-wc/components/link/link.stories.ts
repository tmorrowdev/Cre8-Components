import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../badge/badge';
import './link';
import { Meta, StoryObj } from '@storybook/web-components';
import svgCalendar from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Calendar.svg?raw';
import svgCheck from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Check.svg?raw';
import svgInfoFilled from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Info.svg?raw';
import svgHelp from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Help.svg?raw';

const meta: Meta = {
  title: 'cre8 Components/Link',
  component: 'cre8-link',
  parameters: {
    withDesign: {
      type: 'figma',
      url: 'https://www.figma.com/file/L8rVyIvYfWAtNpgm2qps73/Evernorth-Base-Web-Library?node-id=19966%3A5158',
    },
    status: {type: 'inProgress'},
  },
  argTypes: {
    href: {value: '#'},
    noUnderline: {control: 'boolean'},
    ctaLink: {control: 'boolean'},
    inverted: {control: 'boolean'},
    iconName: {control: 'text'}, //iconName will be deprecated, use svg
    svg: {control: 'text'},
    iconRotateDegree: {control: 'text'},
    iconFlipDirection: {control: 'text'},
    iconPosition: {options: ['before', 'after'], control: {type: 'radio'}},
    size: {options: ['sm', 'lg'], control: {type: 'radio'}},
  },
  render: (args) => html`<cre8-link ${spread(args)}>Hello World</cre8-link>`,
};
export default meta;
export type Story = StoryObj;


export const Default: Story = {
  args: {
    href: '#',
  },
};

export const IconBefore: Story = {
  args: {
    href: '#',
    svg: svgCalendar,
    iconPosition: 'before',
  },
};

export const IconAfter: Story = {
  args: {
    href: '#',
    svg: svgCheck,
    iconPosition: 'after',
  },
};

export const BadgeLink: Story = {
  args: {
    href: '#',
  },
  render: (args) =>
    html`<cre8-link ${spread(args)}>Hello World<cre8-badge slot="badge" status="info" variant="light" text="17"></cre8-badge></cre8-link>`,
};

export const CallToActionLink: Story = {
  args: {
    href: '#',
    ctaLink: 'true',
    noUnderline: 'true',
  },
};
export const CallToActionLinkInverted: Story = {
  args: {
    href: '#',
    ctaLink: 'true',
    inverted: 'true'
,   noUnderline: 'true',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
export const NoUnderline: Story = {
  args: {
    href: '#',
    noUnderline: 'true',
  },
};

export const NoUnderlineWithIcon: Story = {
  args: {
    href: '#',
    svg: svgInfoFilled,
    iconPosition: 'after',
    NoUnderline: 'true',
  },
};

export const Inverted: Story = {
  args: {
    href: '#',
    inverted: 'true',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const InvertedWithIcon: Story = {
  args: {
    href: '#',
    inverted: 'true',
    svg: svgInfoFilled,
    iconPosition: 'after',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SmallLinkWithIcon: Story = {
  args: {
    href: '#',
    size: 'sm',
    svg: svgHelp,
    iconPosition: 'after',
  },
};

export const LargeLinkWithIcon: Story = {
  args: {
    href: '#',
    size: 'lg',
    svg: svgHelp,
    iconPosition: 'after',
  },
};
