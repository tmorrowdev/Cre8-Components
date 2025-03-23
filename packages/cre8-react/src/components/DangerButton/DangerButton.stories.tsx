/* eslint-disable import/no-unresolved */
import svgCaretLeft from '@cre8/cre8-icons/lib/icons/System/Regular/Caret Left.svg?raw';
import svgCaretRight from '@cre8/cre8-icons/lib/icons/System/Regular/Caret Right.svg?raw';
import svgArrowRight from '@cre8/cre8-icons/lib/icons/System/Regular/Arrow - Right.svg?raw';
import type { StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8DangerButton } from '../..';

export default {
  title: 'In Development/DangerButton',
  component: cre8DangerButton,
  parameters: { 
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  render: (args) => <cre8DangerButton {...args}></cre8DangerButton>,
  args: {
    text: 'Button',
    loading: false,
    onClick: action('click'),
    onSubmit: action('submit')
  }
};

export const Primary: StoryObj<typeof cre8DangerButton> = {
  args: {
    text: 'Primary'
  } 
};

export const PrimarySubmit: StoryObj<typeof cre8DangerButton> = {
  args: {
    type: 'submit',
    text: 'Submit'
  } 
};

export const PrimaryDisabled: StoryObj<typeof cre8DangerButton> = {
  args: {
    disabled: true,
    text: 'Button'
  } 
};

export const PrimaryInverted: StoryObj<typeof cre8DangerButton> = {
  args: {
    text: 'Primary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryDisabledInverted: StoryObj<typeof cre8DangerButton> = {
  args: {
    disabled: true,
    text: 'Button',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconBefore: StoryObj<typeof cre8DangerButton> = {
  args: {
    svg: svgCaretLeft,
    iconPosition: 'before',
    text: 'Button'
  } 
};

export const IconAfter: StoryObj<typeof cre8DangerButton> = {
  args: {
    svg: svgCaretRight,
    iconPosition: 'after',
    text: 'Button'
  } 
};

export const Secondary: StoryObj<typeof cre8DangerButton> = {
  args: {
    text: 'Button',
    variant: 'secondary'
  } 
};

export const SecondaryDisabled: StoryObj<typeof cre8DangerButton> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary'
  } 
};

export const SecondaryInverted: StoryObj<typeof cre8DangerButton> = {
  args: {
    text: 'Button',
    variant: 'secondary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInvertedDisabled: StoryObj<typeof cre8DangerButton> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Tertiary: StoryObj<typeof cre8DangerButton> = {
  args: {
    text: 'Button',
    variant: 'tertiary'
  } 
};

export const TertiaryDisabled: StoryObj<typeof cre8DangerButton> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'tertiary'
  } 
};

export const TertiaryInverted: StoryObj<typeof cre8DangerButton> = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInvertedDisabled: StoryObj<typeof cre8DangerButton> = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'tertiary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const FullWidth: StoryObj<typeof cre8DangerButton> = {
  args: {
    fullWidth: true,
    text: 'Button'
  } 
};

export const Small: StoryObj<typeof cre8DangerButton> = {
  args: {
    size: 'sm',
    text: 'Button'
  } 
};

export const SmallInverted: StoryObj<typeof cre8DangerButton> = {
  args: {
    size: 'sm',
    text: 'Button',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SmallIconAfter: StoryObj<typeof cre8DangerButton> = {
  args: {
    svg: svgCaretRight,
    iconPosition: 'after',
    size: 'sm',
    text: 'Button'
  } 
};

export const Large: StoryObj<typeof cre8DangerButton> = {
  args: {
    size: 'lg',
    text: 'Button'
  } 
};

export const LargeInverted: StoryObj<typeof cre8DangerButton> = {
  args: {
    size: 'lg',
    text: 'Button',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const LargeIconAfter: StoryObj<typeof cre8DangerButton> = {
  args: {
    svg: svgCaretRight,
    iconPosition: 'after',
    size: 'lg',
    text: 'Button'
  } 
};

export const IconOnlyPrimary: StoryObj<typeof cre8DangerButton> = {
  args: {
    hideText: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'primary'
  } 
};

export const IconOnlyPrimaryInverted: StoryObj<typeof cre8DangerButton> = {
  args: {
    hideText: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'primary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconOnlySecondary: StoryObj<typeof cre8DangerButton> = {
  args: {
    hideText: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'secondary'
  } 
};

export const IconOnlySecondaryInverted: StoryObj<typeof cre8DangerButton> = {
  args: {
    hideText: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'secondary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconOnlyTertiary: StoryObj<typeof cre8DangerButton> = {
  args: {
    hideText: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'tertiary'
  } 
};

export const IconOnlyTertiaryInverted: StoryObj<typeof cre8DangerButton> = {
  args: {
    hideText: true,
    svg: svgArrowRight,
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'tertiary',
    inverted: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Loading: StoryObj<typeof cre8DangerButton> = {
  args: {
    loading: true,
    text: 'Submit',
    variant: 'primary'
  } 
};

export const LoadingComplete: StoryObj<typeof cre8DangerButton> = {
  args: {
    loadingComplete: true,
    text: 'Submit',
    variant: 'primary'
  } 
};
