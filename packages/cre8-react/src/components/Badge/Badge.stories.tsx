import type { StoryObj } from '@storybook/react';
import { cre8Badge } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import svgFeedback from '@cre8/cre8-icons/lib/icons/System/Regular/Feedback.svg?raw';

export default {
  title: 'cre8 Components/Badge',
  component: cre8Badge,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  argTypes: {
    text: {
      control: 'text'
    },
    status: {
        options: ['neutral', 'error', 'warning', 'success', 'info', 'attention'],
        control: { type: 'select' }
    },
    variant: {
      options: ['default', 'light', 'white'],
      control: { type: 'radio' }
    }
  }
};

export const Default: StoryObj<typeof cre8Badge> = {
  args: { text: 'Badge' },
};

export const IconVariant: StoryObj<typeof cre8Badge> = {
  args: { 
    text: 'Icon Variant',
    svg: svgFeedback,
  },
};

export const Success: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'Success',
    status: 'success',
  },
};

export const Warning: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'Warning',
    status: 'warning',
  },
};

export const Error: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'Error',
    status: 'error',
  },
};

export const Info: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'Info',
    status: 'info',
  },
};

export const Attention: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'Attention',
    status: 'attention',
  },
};

export const Light: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'Light',
    variant: 'light',
  },
};

export const SuccessLight: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'Light',
    variant: 'light',
    status: 'success'
  },
};

export const WarningLight: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'WarningLight',
    variant: 'light',
    status: 'warning'
  },
};

export const ErrorLight: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'ErrorLight',
    variant: 'light',
    status: 'error'
  },
};

export const InfoLight: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'InfoLight',
    variant: 'light',
    status: 'info'
  },
};

export const AttentionLight: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'AttentionLight',
    variant: 'light',
    status: 'attention'
  },
};

export const White: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'White',
    variant: 'white',
  },
};

export const SuccessWhite: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'SuccessWhite',
    variant: 'white',
    status: 'success',
  },
};

export const WarningWhite: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'WarningWhite',
    variant: 'white',
    status: 'warning',
  },
};

export const ErrorWhite: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'ErrorWhite',
    variant: 'white',
    status: 'error',
  },
};

export const InfoWhite: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'InfosWhite',
    variant: 'white',
    status: 'info',
  },
};

export const AttentionWhite: StoryObj<typeof cre8Badge> = {
  args: {
    text: 'AttentionWhite',
    variant: 'white',
    status: 'attention',
  },
};
