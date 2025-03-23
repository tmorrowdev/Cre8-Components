import type { StoryObj } from '@storybook/react';
import { cre8Button } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import { action } from '@storybook/addon-actions'
import React from 'react';
import svgCaretUp from '@cre8/cre8-icons/lib/icons/System/Regular/Caret Up.svg?raw';

export default {
  title: 'cre8 Components/Button',
  component: cre8Button,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  render: (args) => (
    <cre8Button {...args}>
    </cre8Button>
  ),
  args: {
    text: 'Button',
    loading: false,
    onClick: action('click'),
    onSubmit: action('submit')
  },
};

export const Primary: StoryObj<typeof cre8Button> = {
  args: {
    variant: 'primary',
    text: 'Primary'
  },
};

export const PrimarySubmit: StoryObj<typeof cre8Button> = {
  args: {
    type: 'submit',
  },
  decorators: [
    (Story) => (
        <form onSubmit={action('submit')}><Story /></form>
    )
  ]
};

export const PrimaryDisabled: StoryObj<typeof cre8Button> = {
  args: {
    disabled: true,
    text: 'Disabled'
  },
};

export const PrimaryInverse: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'primary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseDisabled: StoryObj<typeof cre8Button> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'primary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseLoading: StoryObj<typeof cre8Button> = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'primary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseSmall: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'primary',
    inverse: true,
    size: 'sm'
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseIconOnly: StoryObj<typeof cre8Button> = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'primary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseFullWidth: StoryObj<typeof cre8Button> = {
  args: {
    fullWidth: true,
    text: 'Button',
    variant: 'primary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconBefore: StoryObj<typeof cre8Button> = {
  args: {
    iconPosition: 'before',
    svg: svgCaretUp,
    iconRotateDegree: (-90),
    text: 'IconBefore'
  },
};

export const IconAfter: StoryObj<typeof cre8Button> = {
  args: {
    iconPosition: 'after',
    svg: svgCaretUp,
    iconRotateDegree: 90,
    text: 'IconAfter'
  },
};

export const Secondary: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'secondary',
  },
};

export const SecondaryDisabled: StoryObj<typeof cre8Button> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutral: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutralDisabled: StoryObj<typeof cre8Button> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutralLoading: StoryObj<typeof cre8Button> = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutralInverse: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'secondary',
    neutral: true,
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryNeutralInverseDisabled: StoryObj<typeof cre8Button> = {
  args: {
    disabled:true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryNeutralInverseloading: StoryObj<typeof cre8Button> = {
  args: {
    loading:true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverse: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'secondary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseDisabled: StoryObj<typeof cre8Button> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseLoading: StoryObj<typeof cre8Button> = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'secondary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseSmall: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'secondary',
    inverse: true,
    size: 'sm'
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseIconOnly: StoryObj<typeof cre8Button> = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'secondary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseFullWidth: StoryObj<typeof cre8Button> = {
  args: {
    fullWidth: true,
    text: 'Button',
    variant: 'secondary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Tertiary: StoryObj<typeof cre8Button> = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary'
  },
};

export const TertiaryDisabled: StoryObj<typeof cre8Button> = {
  args: {
    disabled: true,
    variant: 'tertiary',
    text: 'Tertiary'
  },
};

export const TertiaryNeutral: StoryObj<typeof cre8Button> = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary',
    neutral: true
  },
};

export const TertiaryNeutralDisabled: StoryObj<typeof cre8Button> = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary',
    neutral: true,
    disabled: true
  },
};

export const TertiaryNeutralLoading: StoryObj<typeof cre8Button> = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary',
    neutral: true,
    loading: true
  },
};

export const TertiaryInverse: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseNeutral: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    neutral: true,
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseDisabled: StoryObj<typeof cre8Button> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'tertiary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseLoading: StoryObj<typeof cre8Button> = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'tertiary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseSmall: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    inverse: true,
    size: 'sm'
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseIconOnly: StoryObj<typeof cre8Button> = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'tertiary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseFullWidth: StoryObj<typeof cre8Button> = {
  args: {
    fullWidth: true,
    text: 'Button',
    variant: 'tertiary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const FullWidth: StoryObj<typeof cre8Button> = {
  args: {
    fullWidth: true,
    text: 'FullWidth'
  },
};

export const Small: StoryObj<typeof cre8Button> = {
  args: {
    size: 'sm',
    text: 'Small'
  },
};

export const SmallIconAfter: StoryObj<typeof cre8Button> = {
  args: {
    iconPosition: 'after',
    svg: svgCaretUp,
    iconRotateDegree: 90,
    size: 'sm',
    text: 'SmallIconAfter'
  },
};

export const Large: StoryObj<typeof cre8Button> = {
  args: {
    size: 'lg',
    text: 'Large'
  },
};

export const LargeIconAfter: StoryObj<typeof cre8Button> = {
  args: {
    iconPosition: 'after',
    svg: svgCaretUp,
    iconRotateDegree: 90,
    size: 'lg',
    text: 'LargeIconAfter'
  },
};

export const IconOnlyPrimary: StoryObj<typeof cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlyPrimary',
    iconName: 'keyboard-arrow-right'
  },
};

export const IconOnlySecondary: StoryObj<typeof cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlySecondary',
    iconName: 'keyboard-arrow-right',
    variant: 'secondary'
  },
};

export const IconOnlySecondaryNeutralInverse: StoryObj<typeof cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlySecondary',
    iconName: 'keyboard-arrow-right',
    variant: 'secondary',
    neutral: true,
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconOnlyTertiary: StoryObj<typeof cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlyTertiary',
    iconName: 'keyboard-arrow-right',
    variant: 'tertiary'
  },
};

export const IconOnlyNeutralTertiary: StoryObj<typeof cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlyNeutralTertiary',
    iconName: 'keyboard-arrow-right',
    variant: 'tertiary',
    neutral: true
  },
};

export const IconOnlyNeutralInverseTertiary: StoryObj<typeof cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlyNeutralInverseTertiary',
    iconName: 'keyboard-arrow-right',
    variant: 'tertiary',
    neutral: true,
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Loading: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Submit',
    loading: true,
  },
};

export const loadingComplete: StoryObj<typeof cre8Button> = {
  args: {
    text: 'Submit',
    loadingComplete: true,
  },
};
