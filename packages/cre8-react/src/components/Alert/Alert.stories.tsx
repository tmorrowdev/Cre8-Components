import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview.js';
import { Cre8Alert, Cre8Button, Cre8Link } from '../..';

export default {
  title: 'IN DEVELOPMENT/Alert',
  component: Cre8Alert,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
    docs: {
      story: {
        height: '250px',
      },
    }
  },
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    status: {
      options: [
        'error',
        'info',
        'notification',
        'neutral',
        'success',
        'warning',
      ],
      control: { type: 'select' },
    },
    variant: {
      options: ['standalone', 'banner'],
      control: { type: 'radio' },
    },
    emphasis: {
      options: ['subtle', 'strong'],
      control: { type: 'radio' },
    },
    notDismissible: { control: 'boolean' },
  },
  args: {
    headerText: 'Default Alert',
    children: (
      <>
      <span>Lorem ipsum dolor sit amet, consectetuer adipiscing</span>
      <Cre8Button
        variant="secondary"
        slot="cta"
        text="Button"
        size="sm"
        neutral
      ></Cre8Button>
      </>

    ),
  },
};

export const Default: StoryObj<typeof Cre8Alert> = { args: {} };

export const DefaultWithLink: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Default Not Dismissible Alert',
    variant: 'standalone',
    notDismissible: true,
    emphasis: 'strong',
    children: (
      <>
      <span>Lorem ipsum dolor sit amet, consectetuer adipiscing</span>
      <Cre8Link
        slot="cta"
        href="#"
        inverted
      >Link</Cre8Link>
      </>
    ),
  }
};

export const DefaultNotDismissible: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Default Not Dismissible Alert',
    variant: 'standalone',
    notDismissible: true,
    children: (
      <>
      <span>Lorem ipsum dolor sit amet, consectetuer adipiscing</span>
      <Cre8Link
        slot="cta"
        href="#"
      >Link</Cre8Link>
      </>
    ),
  },
};

export const SubtleErrorStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Error Stand Alone',
    status: 'error',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleInfoStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Info Stand Alone',
    status: 'info',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleNotificationStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Notification Stand Alone',
    status: 'notification',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleNeutralStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Neutral Stand Alone',
    status: 'neutral',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleWarningStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Warning Stand Alone',
    status: 'warning',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleSuccessStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Success Stand Alone',
    status: 'success',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const StrongErrorStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Error Stand Alone',
    status: 'error',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongInfoStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Info Stand Alone',
    status: 'info',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongNotificationStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Notification Stand Alone',
    status: 'notification',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongNeutralStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Neutral Stand Alone',
    status: 'neutral',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongWarningStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Warning Stand Alone',
    status: 'warning',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongSuccessStandAlone: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Success Stand Alone',
    status: 'success',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const SubtleErrorBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Error Stand Alone',
    status: 'error',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleInfoBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Info Stand Alone',
    status: 'info',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleNotificationBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Notification Stand Alone',
    status: 'notification',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleNeutralBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Neutral Stand Alone',
    status: 'neutral',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleWarningBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Warning Stand Alone',
    status: 'warning',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleSuccessBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Success Stand Alone',
    status: 'success',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const StrongErrorBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Error Stand Alone',
    status: 'error',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongInfoBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Info Stand Alone',
    status: 'info',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongNotificationBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Notification Stand Alone',
    status: 'notification',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongNeutralBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Neutral Stand Alone',
    status: 'neutral',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongWarningBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Warning Stand Alone',
    status: 'warning',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongSuccessBanner: StoryObj<typeof Cre8Alert> = {
  args: {
    headerText: 'Success Stand Alone',
    status: 'success',
    variant: 'banner',
    emphasis: 'strong'
  },
};



