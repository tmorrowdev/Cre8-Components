import { html } from 'lit';
import { spread } from '../../directives/spread';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sanitizeInput } from '../../utilities/story-helpers';
import '../../.storybook/components/f-po/f-po';
import '../text-passage/text-passage';
import './alert';

export default {
  title: 'In Development/Alert',
  component: 'cre8-alert',
  render: ({ bodyText, ctaBody, ...args }) =>
    html`<cre8-alert ${spread(args)}>
      ${unsafeHTML(sanitizeInput(bodyText))}
      ${unsafeHTML(sanitizeInput(ctaBody, 'cre8-link', 'cre8-button', 'f-po'))}
    </cre8-alert>`,
  parameters: {
    status: { type: 'inProgress' },
    layout: 'padded',
    actions: {
      handles: ['open', 'close'],
    },
    docs: {
      story: {
        height: '250px',
      },
    },
  },
  argTypes: {
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
  },
  args: {
    headerText: 'Badge',
    bodyText: 'Badge',
  },
};

export const Default = {
  args: {
    status: 'info',
    variant: 'standalone',
    headerText: 'Default Alert',
    bodyText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  },
};

export const DefaultWithLink = {
  args: {
    status: 'info',
    variant: 'standalone',
    emphasis: 'strong',
    headerText: 'Default Alert With Link',
    bodyText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    ctaBody:
      '<cre8-link slot="cta" href="#" inverted="true">Link</cre8-link>',
  },
};

export const DefaultNotDismissible = {
  args: {
    status: 'info',
    variant: 'standalone',
    headerText: 'Default Not Dismissible',
    bodyText: 'Message text',
    notDismissible: true,
  },
};

export const SubtleErrorStandAlone = {
  args: {
    status: 'error',
    variant: 'standalone',
    headerText: 'Subtle Error Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleInfoStandAlone = {
  args: {
    status: 'info',
    variant: 'standalone',
    headerText: 'Subtle Info Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleNotificationStandAlone = {
  args: {
    status: 'notification',
    variant: 'standalone',
    headerText: 'Subtle Notification Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleNeutralStandAlone = {
  args: {
    status: 'neutral',
    variant: 'standalone',
    headerText: 'Subtle Neutral Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleWarningStandAlone = {
  args: {
    status: 'warning',
    variant: 'standalone',
    headerText: 'Subtle Warning Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleSuccessStandAlone = {
  args: {
    status: 'success',
    variant: 'standalone',
    headerText: 'Subtle Success Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongErrorStandAlone = {
  args: {
    status: 'error',
    variant: 'standalone',
    emphasis: 'strong',
    headerText: 'Strong Error Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongInfoStandAlone = {
  args: {
    status: 'info',
    variant: 'standalone',
    emphasis: 'strong',
    headerText: 'Strong Info Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongNotificationStandAlone = {
  args: {
    status: 'notification',
    variant: 'standalone',
    emphasis: 'strong',
    headerText: 'Strong Notification Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongNeutralStandAlone = {
  args: {
    status: 'neutral',
    variant: 'standalone',
    emphasis: 'strong',
    headerText: 'Strong Neutral Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongWarningStandAlone = {
  args: {
    status: 'warning',
    variant: 'standalone',
    emphasis: 'strong',
    headerText: 'Strong Warning Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongSuccessStandAlone = {
  args: {
    status: 'success',
    variant: 'standalone',
    emphasis: 'strong',
    headerText: 'Strong Success Stand Alone',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleErrorBanner = {
  args: {
    status: 'error',
    variant: 'banner',
    headerText: 'Subtle Error Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleInfoBanner = {
  args: {
    status: 'info',
    variant: 'banner',
    headerText: 'Subtle Info Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleNotificationBanner = {
  args: {
    status: 'notification',
    variant: 'banner',
    headerText: 'Subtle Notification Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleNeutralBanner = {
  args: {
    status: 'neutral',
    variant: 'banner',
    headerText: 'Subtle Neutral Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleWarningBanner = {
  args: {
    status: 'warning',
    variant: 'banner',
    headerText: 'Subtle Warning Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const SubtleSuccessBanner = {
  args: {
    status: 'success',
    variant: 'banner',
    headerText: 'Subtle Success Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongErrorBanner = {
  args: {
    status: 'error',
    variant: 'banner',
    emphasis: 'strong',
    headerText: 'Strong Error Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongInfoBanner = {
  args: {
    status: 'info',
    variant: 'banner',
    emphasis: 'strong',
    headerText: 'Strong Info Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongNotificationBanner = {
  args: {
    status: 'notification',
    variant: 'banner',
    emphasis: 'strong',
    headerText: 'Strong Notification Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongNeutralBanner = {
  args: {
    status: 'neutral',
    variant: 'banner',
    emphasis: 'strong',
    headerText: 'Strong Neutral Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongWarningBanner = {
  args: {
    status: 'warning',
    variant: 'banner',
    emphasis: 'strong',
    headerText: 'Strong Warning Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};

export const StrongSuccessBanner = {
  args: {
    status: 'success',
    variant: 'banner',
    emphasis: 'strong',
    headerText: 'Strong Success Banner',
    bodyText: 'Message text',
    ctaBody:
      '<cre8-button variant="secondary" slot="cta" text="Button" size="sm" neutral></cre8-button>',
  }
};






