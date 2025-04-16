import type { StoryObj } from '@storybook/react';
import { Cre8Heading } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';

interface invertedStyle {
  style: React.CSSProperties;
}
const inverted: invertedStyle = {
  style: {
    background: '#000',
    padding: '20px',
  },
};
export default {
  title: 'Cre8 Components/Heading',
  component: Cre8Heading,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
  args: {
    type: String,
    tagVariant: String,
    children: 'Default Heading preset',
  },
  render: (args) => (
    <Cre8Heading
      type={args.type}
      tagVariant={args.tagVariant}
      brandColor={args.brandColor ? args.brandColor : null}
      inverted={args.inverted ? args.inverted : null}
    >
      <>{args.children}</>
    </Cre8Heading>
  ),
};
export const Default: StoryObj<typeof Cre8Heading> = {
  args: {
    children: 'Default Heading preset',
  },
};
export const DisplayDefault: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'display-default',
    children: 'Heading with display-default preset applied',
  },
};
export const DisplaySmall: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'display-small',
    children: 'Heading with display-small preset applied',
  },
};
export const HeadlineLarge: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'headline-large',
    children: 'Heading with headline-large preset applied',
  },
};
export const HeadlineDefault: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'headline-default',
    children: 'Heading with headline-default preset applied',
  },
};
export const HeadlineSmall: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'headline-small',
    children: 'Heading with headline-small preset applied',
  },
};
export const TitleXLarge: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'title-xlarge',
    children: 'Heading with title-xlarge preset applied',
  },
};
export const TitleLarge: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'title-large',
    children: 'Heading with title-large preset applied',
  },
};
export const TitleDefault: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'title-default',
    children: 'Heading with title-default preset applied',
  },
};
export const TitleSmall: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'title-small',
    children: 'Heading with title-small preset applied',
  },
};
export const LabelLarge: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'label-large',
    children: 'Heading with label-large preset applied',
  },
};
export const LabelDefault: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'label-default',
    children: 'Heading with label-default preset applied',
  },
};
export const LabelSmall: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'label-small',
    children: 'Heading with label-small preset applied',
  },
};
export const MetaLarge: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'meta-large',
    children: 'Heading with meta-large preset applied',
  },
};
export const MetaDefault: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'meta-default',
    children: 'Heading with meta-default preset applied',
  },
};
export const MetaSmall: StoryObj<typeof Cre8Heading> = {
  args: {
    type: 'meta-small',
    children: 'Heading with meta-small preset applied',
  },
};
export const H1: StoryObj<typeof Cre8Heading> = {
  args: {
    tagVariant: 'h1',
    children: 'tagVariant h1',
  },
};
export const H2: StoryObj<typeof Cre8Heading> = {
  args: {
    tagVariant: 'h2',
    children: 'tagVariant h2',
  },
};
export const H3: StoryObj<typeof Cre8Heading> = {
  args: {
    tagVariant: 'h3',
    children: 'tagVariant h3',
  },
};
export const H4: StoryObj<typeof Cre8Heading> = {
  args: {
    tagVariant: 'h4',
    children: 'tagVariant h4',
  },
};
export const H5: StoryObj<typeof Cre8Heading> = {
  args: {
    tagVariant: 'h5',
    children: 'tagVariant h5',
  },
};
export const H6: StoryObj<typeof Cre8Heading> = {
  args: {
    tagVariant: 'h6',
    children: 'tagVariant h6',
  },
};
export const BrandColored: StoryObj<typeof Cre8Heading> = {
  args: {
    brandColor: true,
    children: 'Heading with Brand Color applied to text',
  },
};
export const Inverted: StoryObj<typeof Cre8Heading> = {
  args: {
    inverted: true,
    children: 'Heading for Dark Backgrounds',
  },
  render: (args) => (
    <>
      <div style={inverted.style}>
        <Cre8Heading inverted={args.inverted}>{args.children}</Cre8Heading>
      </div>
    </>
  ),
};

export const BrandColorInverted: StoryObj<typeof Cre8Heading> = {
  args: {
    inverted: true,
    brandColor: true,
    children: 'Heading with Brand Color applied for dark backgrounds',
  },
  render: (args) => (
    <>
      <div style={inverted.style}>
        <Cre8Heading inverted={args.inverted} brandColor={args.brandColor}>
          {args.children}
        </Cre8Heading>
      </div>
    </>
  ),
};
