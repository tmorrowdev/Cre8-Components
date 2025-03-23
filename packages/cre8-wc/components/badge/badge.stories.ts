import { html } from 'lit';
import { spread } from '../../directives/spread';
import './badge';
import svgFeedback from '@cre8/cre8-icons/lib/icons/System/Regular/Feedback.svg?raw';

 const meta = {
  title: 'cre8 Components/Badge',
  component: 'cre8-badge',
  render: (args) => html`<cre8-badge ${spread(args)}></cre8-badge>`,
  parameters: { status: { type: 'inProgress' } },
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
  },
  args: {
    status: undefined,
    text: 'Badge',
    variant: undefined
  }
};
export default meta;

export const Default = {
  args: {
    text: 'Default',
  },
};

/**
* **Note** SVG is passed in as a raw string for badges with icons. The icon is defined by this argument 
* *Import example:*`import svgFeedback from '@cre8/cre8-icons/lib/icons/System/Regular/Feedback.svg?raw';
* 
*/
export const IconVariant = {
  args: {
    status: 'default',
    text: 'Icon Variant',
    svg: svgFeedback
  },
};

export const Success = {
  args: {
    status: 'success',
    text: 'Success',
  },
};

export const Warning = {
  args: {
    status: 'warning',
    text: 'Warning',
  },
};

export const Error = {
  args: {
    status: 'error',
    text: 'Error',
  },
};

export const Info = {
  args: {
    status: 'info',
    text: 'Info',
  },
};

/**
* **Note** Certain brands don't currently use the `Attention` status
*
*/

export const Attention = {
  args: {
    status: 'attention',
    text: 'Attention',
  },
};

export const Light = {
  args: {
    status: 'light',
    text: 'Light',
  },
};

export const SuccessLight = {
  args: {
    status: 'success',
    variant: 'light',
    text: 'Success Light',
  },
};

export const WarningLight = {
  args: {
    status: 'warning',
    variant: 'light',
    text: 'Warning Light',
  },
};

export const ErrorLight = {
  args: {
    status: 'error',
    variant: 'light',
    text: 'Error Light',
  },
};

export const InfoLight = {
  args: {
    status: 'info',
    variant: 'light',
    text: 'Info Light',
  },
};

/**
* **Note** Certain brands don't currently use the `Attention` status
*
*/

export const AttentionLight = {
  args: {
    status: 'attention',
    variant: 'light',
    text: 'Attention Light',
  },
};

export const White = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    variant: 'white',
    text: 'White',
  },
};

export const SuccessWhite = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    status: 'success',
    variant: 'white',
    text: 'Success White',
  },
};

export const WarningWhite = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    status: 'warning',
    variant: 'white',
    text: 'Warning White',
  },
};

export const ErrorWhite = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    status: 'error',
    variant: 'white',
    text: 'Error White',
  },
};

export const InfoWhite = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    status: 'info',
    variant: 'white',
    text: 'Info White',
  },
};

export const AttentionWhite = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    status: 'attention',
    variant: 'white',
    text: 'Attention White',
  },
};
