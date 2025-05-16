import type { StoryObj } from '@storybook/react';
import { Cre8Button } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import { action } from '@storybook/addon-actions'
import React from 'react';
import svgCaretUp from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Caret Up.svg?raw';

export default {
  title: 'Cre8 Components/Button',
  component: Cre8Button,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  render: (args) => (
    <Cre8Button {...args}>
    </Cre8Button>
  ),
  args: {
    text: 'Button',
    loading: false,
    onClick: action('click'),
    onSubmit: action('submit')
  },
};

export const Primary: StoryObj<typeof Cre8Button> = {
  args: {
    variant: 'primary',
    text: 'Primary'
  },
};

export const PrimarySubmit: StoryObj<typeof Cre8Button> = {
  args: {
    type: 'submit',
  },
  decorators: [
    (Story) => (
        <form onSubmit={action('submit')}><Story /></form>
    )
  ]
};

export const PrimaryDisabled: StoryObj<typeof Cre8Button> = {
  args: {
    disabled: true,
    text: 'Disabled'
  },
};

export const PrimaryInverse: StoryObj<typeof Cre8Button> = {
  args: {
    text: 'Button',
    variant: 'primary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseDisabled: StoryObj<typeof Cre8Button> = {
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

export const PrimaryInverseLoading: StoryObj<typeof Cre8Button> = {
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

export const PrimaryInverseSmall: StoryObj<typeof Cre8Button> = {
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

export const PrimaryInverseIconOnly: StoryObj<typeof Cre8Button> = {
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

export const PrimaryInverseFullWidth: StoryObj<typeof Cre8Button> = {
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

export const IconBefore: StoryObj<typeof Cre8Button> = {
  args: {
    iconPosition: 'before',
    svg: svgCaretUp,
    iconRotateDegree: (-90),
    text: 'IconBefore'
  },
};

export const IconAfter: StoryObj<typeof Cre8Button> = {
  args: {
    iconPosition: 'after',
    svg: svgCaretUp,
    iconRotateDegree: 90,
    text: 'IconAfter'
  },
};

export const Secondary: StoryObj<typeof Cre8Button> = {
  args: {
    text: 'Button',
    variant: 'secondary',
  },
};

export const SecondaryDisabled: StoryObj<typeof Cre8Button> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutral: StoryObj<typeof Cre8Button> = {
  args: {
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutralDisabled: StoryObj<typeof Cre8Button> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutralLoading: StoryObj<typeof Cre8Button> = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutralInverse: StoryObj<typeof Cre8Button> = {
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

export const SecondaryNeutralInverseDisabled: StoryObj<typeof Cre8Button> = {
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

export const SecondaryNeutralInverseloading: StoryObj<typeof Cre8Button> = {
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

export const SecondaryInverse: StoryObj<typeof Cre8Button> = {
  args: {
    text: 'Button',
    variant: 'secondary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseDisabled: StoryObj<typeof Cre8Button> = {
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

export const SecondaryInverseLoading: StoryObj<typeof Cre8Button> = {
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

export const SecondaryInverseSmall: StoryObj<typeof Cre8Button> = {
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

export const SecondaryInverseIconOnly: StoryObj<typeof Cre8Button> = {
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

export const SecondaryInverseFullWidth: StoryObj<typeof Cre8Button> = {
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

export const Tertiary: StoryObj<typeof Cre8Button> = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary'
  },
};

export const TertiaryDisabled: StoryObj<typeof Cre8Button> = {
  args: {
    disabled: true,
    variant: 'tertiary',
    text: 'Tertiary'
  },
};

export const TertiaryNeutral: StoryObj<typeof Cre8Button> = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary',
    neutral: true
  },
};

export const TertiaryNeutralDisabled: StoryObj<typeof Cre8Button> = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary',
    neutral: true,
    disabled: true
  },
};

export const TertiaryNeutralLoading: StoryObj<typeof Cre8Button> = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary',
    neutral: true,
    loading: true
  },
};

export const TertiaryInverse: StoryObj<typeof Cre8Button> = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    inverse: true
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseNeutral: StoryObj<typeof Cre8Button> = {
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

export const TertiaryInverseDisabled: StoryObj<typeof Cre8Button> = {
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

export const TertiaryInverseLoading: StoryObj<typeof Cre8Button> = {
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

export const TertiaryInverseSmall: StoryObj<typeof Cre8Button> = {
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

export const TertiaryInverseIconOnly: StoryObj<typeof Cre8Button> = {
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

export const TertiaryInverseFullWidth: StoryObj<typeof Cre8Button> = {
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

export const FullWidth: StoryObj<typeof Cre8Button> = {
  args: {
    fullWidth: true,
    text: 'FullWidth'
  },
};

export const Small: StoryObj<typeof Cre8Button> = {
  args: {
    size: 'sm',
    text: 'Small'
  },
};

export const SmallIconAfter: StoryObj<typeof Cre8Button> = {
  args: {
    iconPosition: 'after',
    svg: svgCaretUp,
    iconRotateDegree: 90,
    size: 'sm',
    text: 'SmallIconAfter'
  },
};

export const Large: StoryObj<typeof Cre8Button> = {
  args: {
    size: 'lg',
    text: 'Large'
  },
};

export const LargeIconAfter: StoryObj<typeof Cre8Button> = {
  args: {
    iconPosition: 'after',
    svg: svgCaretUp,
    iconRotateDegree: 90,
    size: 'lg',
    text: 'LargeIconAfter'
  },
};

export const IconOnlyPrimary: StoryObj<typeof Cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlyPrimary',
    iconName: 'keyboard-arrow-right'
  },
};

export const IconOnlySecondary: StoryObj<typeof Cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlySecondary',
    iconName: 'keyboard-arrow-right',
    variant: 'secondary'
  },
};

export const IconOnlySecondaryNeutralInverse: StoryObj<typeof Cre8Button> = {
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

export const IconOnlyTertiary: StoryObj<typeof Cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlyTertiary',
    iconName: 'keyboard-arrow-right',
    variant: 'tertiary'
  },
};

export const IconOnlyNeutralTertiary: StoryObj<typeof Cre8Button> = {
  args: {
    hideText: true,
    text: 'IconOnlyNeutralTertiary',
    iconName: 'keyboard-arrow-right',
    variant: 'tertiary',
    neutral: true
  },
};

export const IconOnlyNeutralInverseTertiary: StoryObj<typeof Cre8Button> = {
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

export const Loading: StoryObj<typeof Cre8Button> = {
  args: {
    text: 'Submit',
    loading: true,
  },
};

export const loadingComplete: StoryObj<typeof Cre8Button> = {
  args: {
    text: 'Submit',
    loadingComplete: true,
  },
};
