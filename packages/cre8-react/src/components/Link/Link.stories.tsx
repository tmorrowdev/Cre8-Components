import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8Badge, Cre8Link } from '../..';
import svgCalendar from '@Cre8/Cre8-icons/lib/icons/System/Regular/Calendar.svg?raw';
import svgCheck from '@Cre8/Cre8-icons/lib/icons/System/Regular/Check.svg?raw';
import svgInfoFilled from '@Cre8/Cre8-icons/lib/icons/System/Filled/Info.svg?raw';
import svgHelp from '@Cre8/Cre8-icons/lib/icons/System/Regular/Help.svg?raw';

export default {
  title: 'Cre8 Components/Link',
  component: Cre8Link,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
  argTypes: {
    href: { value: '#' },
    noUnderline: { control: 'boolean' },
    ctaLink: { control: 'boolean' },
    inverted: { control: 'boolean' },
    iconName: { control: 'text' }, //iconName will be deprecated, use svg
    svg: {control: 'text'},
    iconRotateDegree: {control: 'text'},
    iconFlipDirection: {control: 'text'},
    iconPosition: { options: ['before', 'after'], control: { type: 'radio' } },
    size: { options: ['sm', 'lg'], control: { type: 'radio' } },
  },
};



export const Default: StoryObj<typeof Cre8Link> = {
  args: { children: <>Hello World</> },
};

export const IconBefore: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    svg: svgCalendar,
    iconPosition: 'before',
    children: <>Hello World</>,
  },
};

export const IconAfter: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    svg: svgCheck,
    iconPosition: 'after',
    children: <>Hello World</>,
  },
};

export const BadgeLink: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    children: (
      <>
        Hello World
        <Cre8Badge
          text="17"
          slot="badge"
          status="info"
          variant="light"
        ></Cre8Badge>
      </>
    ),
  },
};

export const CallToActionLink: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    ctaLink: true,
    noUnderline: true,
    children: <>Hello World</>,
  },
};

export const CallToActionLinkInverted: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    ctaLink: true,
    inverted: true,
    noUnderline: true,
    children: <>Hello World</>,
  },
};

export const NoUnderline: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    noUnderline: true,
    children: <>Hello World</>,
  },
};

export const NoUnderlineWithIcon: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    noUnderline: true,
    svg: svgInfoFilled,
    iconPosition: 'after',
    children: <>Hello World</>,
  },
};

export const Inverted: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    inverted: true,
    children: <>Hello World</>,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const InvtertedWithIcon: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    inverted: true,
    svg: svgInfoFilled,
    iconPosition: 'after',
    children: <>Hello World</>,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SmallLinkWithIcon: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    size: 'sm',
    svg: svgHelp,
    iconPosition: 'after',
    children: <>Hello World</>,
  },
};

export const LargeLinkWithIcon: StoryObj<typeof Cre8Link> = {
  args: {
    href: '#',
    size: 'lg',
    svg: svgHelp,
    iconPosition: 'after',
    children: <>Hello World</>,
  },
};
