import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview.js';
import { cre8Alert, cre8Button, cre8Link } from '../../index.js';

export default {
  title: 'IN DEVELOPMENT/Alert',
  component: cre8Alert,
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
      <cre8Button
        variant="secondary"
        slot="cta"
        text="Button"
        size="sm"
        neutral
      ></cre8Button>
      </>

    ),
  },
};

export const Default: StoryObj<typeof cre8Alert> = { args: {} };

export const DefaultWithLink: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Default Not Dismissible Alert',
    variant: 'standalone',
    notDismissible: true,
    emphasis: 'strong',
    children: (
      <>
      <span>Lorem ipsum dolor sit amet, consectetuer adipiscing</span>
      <cre8Link
        slot="cta"
        href="#"
        inverted
      >Link</cre8Link>
      </>
    ),
  }
};

export const DefaultNotDismissible: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Default Not Dismissible Alert',
    variant: 'standalone',
    notDismissible: true,
    children: (
      <>
      <span>Lorem ipsum dolor sit amet, consectetuer adipiscing</span>
      <cre8Link
        slot="cta"
        href="#"
      >Link</cre8Link>
      </>
    ),
  },
};

export const SubtleErrorStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Error Stand Alone',
    status: 'error',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleInfoStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Info Stand Alone',
    status: 'info',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleNotificationStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Notification Stand Alone',
    status: 'notification',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleNeutralStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Neutral Stand Alone',
    status: 'neutral',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleWarningStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Warning Stand Alone',
    status: 'warning',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const SubtleSuccessStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Success Stand Alone',
    status: 'success',
    variant: 'standalone',
    emphasis: 'subtle'
  },
};

export const StrongErrorStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Error Stand Alone',
    status: 'error',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongInfoStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Info Stand Alone',
    status: 'info',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongNotificationStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Notification Stand Alone',
    status: 'notification',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongNeutralStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Neutral Stand Alone',
    status: 'neutral',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongWarningStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Warning Stand Alone',
    status: 'warning',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const StrongSuccessStandAlone: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Success Stand Alone',
    status: 'success',
    variant: 'standalone',
    emphasis: 'strong'
  },
};

export const SubtleErrorBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Error Stand Alone',
    status: 'error',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleInfoBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Info Stand Alone',
    status: 'info',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleNotificationBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Notification Stand Alone',
    status: 'notification',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleNeutralBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Neutral Stand Alone',
    status: 'neutral',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleWarningBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Warning Stand Alone',
    status: 'warning',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const SubtleSuccessBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Success Stand Alone',
    status: 'success',
    variant: 'banner',
    emphasis: 'subtle'
  },
};

export const StrongErrorBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Error Stand Alone',
    status: 'error',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongInfoBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Info Stand Alone',
    status: 'info',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongNotificationBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Notification Stand Alone',
    status: 'notification',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongNeutralBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Neutral Stand Alone',
    status: 'neutral',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongWarningBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Warning Stand Alone',
    status: 'warning',
    variant: 'banner',
    emphasis: 'strong'
  },
};

export const StrongSuccessBanner: StoryObj<typeof cre8Alert> = {
  args: {
    headerText: 'Success Stand Alone',
    status: 'success',
    variant: 'banner',
    emphasis: 'strong'
  },
};



