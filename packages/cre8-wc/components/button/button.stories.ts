import type { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { spread } from '../../directives/spread';
import './button';
import svgCaretUp from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Caret_Up.svg?raw';

const meta: Meta = {
  title: 'cre8 Components/Button',
  component: 'cre8-button',
  render: (args) => html`<cre8-button ${spread(args)}></cre8-button>`,
  parameters: {
    withDesign: {
      type: 'figma',
      url: 'https://www.figma.com/file/WkOaGhOMq5lOGwAUfASz8K/ESI-PBM-Web?node-id=4651%3A51525&t=3jUKYPYoGMClqBbL-1',
    },
    status: { type: 'inProgress' },
    actions: {
      handles: ['click', 'submit'],
    },
  },
  argTypes: {
    ariaLive: { options: ['assertive', 'polite'], control: 'radio' },
    buttonAriaExpanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    hideText: { control: 'boolean' },
    iconName: { control: 'text' }, // iconName will be deprecated
    svg: { control: 'text' },
    iconRotateDegree: { control: 'text' },
    iconPosition: {
      options: ['before', 'after'],
      control: { type: 'radio' },
    },
    inverse: { control: 'boolean' },
    loading: { control: 'boolean' },
    loadingComplete: { control: 'boolean' },
    text: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
  },
  args: {
    text: 'Button',
    loading: undefined,
    size: 'md',
  },
};
export default meta;

export const Primary = {
  args: {
    text: 'Primary',
  },
};

/**
 * Button defaults to type of `button`. By passing `submit` to `type`, the button can submit form data.
 */
export const PrimarySubmit = {
  args: {
    type: 'submit',
    text: 'Submit',
  },
};

export const PrimaryDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    buttonAriaExpanded: false,
  },
};

export const PrimaryInverse = {
  args: {
    text: 'Button',
    variant: 'primary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'primary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseLoading = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'primary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseSmall = {
  args: {
    text: 'Button',
    variant: 'primary',
    inverse: true,
    size: 'sm',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseIconOnly = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'primary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryInverseFullWidth = {
  args: {
    fullWidth: true,
    text: 'Button',
    variant: 'primary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconBefore = {
  args: {
    svg: svgCaretUp,
    iconRotateDegree: '-90',
    iconPosition: 'before',
    text: 'Button',
  },
};

export const IconAfter = {
  args: {
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button',
  },
};

export const Secondary = {
  args: {
    text: 'Button',
    variant: 'secondary',
  },
};

export const SecondaryDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
  },
};

export const SecondaryNeutral = {
  args: {
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutralDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutralLoading = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
  },
};

export const SecondaryNeutralInverse = {
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

export const SecondaryNeutralInverseDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryNeutralInverseLoading = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'secondary',
    neutral: true,
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverse = {
  args: {
    text: 'Button',
    variant: 'secondary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'secondary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseLoading = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'secondary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseSmall = {
  args: {
    text: 'Button',
    variant: 'secondary',
    inverse: true,
    size: 'sm',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseIconOnly = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'secondary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryInverseFullWidth = {
  args: {
    fullWidth: true,
    text: 'Button',
    variant: 'secondary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Tertiary = {
  args: {
    text: 'Button',
    variant: 'tertiary',
  },
};

export const TertiaryDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'tertiary',
  },
};

export const TertiaryNeutral = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    neutral: true,
  },
};

export const TertiaryNeutralDisabled = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    neutral: true,
    disabled: true,
  },
};

export const TertiaryNeutralLoading = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    neutral: true,
    loading: true,
  },
};

export const TertiaryInverse = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseNeutral = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    inverse: true,
    neutral: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseDisabled = {
  args: {
    disabled: true,
    text: 'Button',
    variant: 'tertiary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseLoading = {
  args: {
    loading: true,
    text: 'Button',
    variant: 'tertiary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseSmall = {
  args: {
    text: 'Button',
    variant: 'tertiary',
    inverse: true,
    size: 'sm',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseIconOnly = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'tertiary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryInverseFullWidth = {
  args: {
    fullWidth: true,
    text: 'Button',
    variant: 'tertiary',
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    text: 'Button',
  },
};

export const Small = {
  args: {
    size: 'sm',
    text: 'Button',
  },
};

export const SmallIconAfter = {
  args: {
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    size: 'sm',
    text: 'Button',
  },
};

export const Large = {
  args: {
    size: 'lg',
    text: 'Button',
  },
};

export const LargeIconAfter = {
  args: {
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    size: 'lg',
    text: 'Button',
  },
};

/**
 * When implementing an icon only button, passing `hideText` will visually hide the button's text while still allowing
 * it to be read by accessibility devices.
 */

export const IconOnlyPrimary = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'primary',
  },
};

export const IconOnlySecondary = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'secondary',
  },
};

export const IconOnlySecondaryNeutralInverse = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'secondary',
    inverse: true,
    neutral: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const IconOnlyTertiary = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'tertiary',
  },
};

export const IconOnlyNeutralTertiary = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'tertiary',
    neutral: true,
  },
};

export const IconOnlyNeutralInverseTertiary = {
  args: {
    hideText: true,
    svg: svgCaretUp,
    iconRotateDegree: '90',
    iconPosition: 'after',
    text: 'Button With Visually Hidden Text',
    variant: 'tertiary',
    neutral: true,
    inverse: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Loading = {
  args: {
    loading: true,
    text: 'Submit',
    variant: 'primary',
  },
};

export const LoadingComplete = {
  args: {
    loadingComplete: true,
    text: 'Submit',
    variant: 'primary',
  },
};
