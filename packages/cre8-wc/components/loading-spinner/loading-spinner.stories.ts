import { html } from 'lit';
import './loading-spinner';
import type { Meta, StoryObj } from '@storybook/web-Components';
import type { cre8LoadingSpinner } from './loading-spinner';

interface Props extends Pick<cre8LoadingSpinner, 'size' | 'inverse' | 'determinate' | 'progress' | 'label' | 'neutral' | 'buttonVariant'> {
}

type Story = StoryObj<Props>;

const meta = {
  title: 'cre8 Components/LoadingSpinner',
  component: 'cre8-loading-spinner',
  argTypes: {
    buttonVariant: {
      options: ['primary','secondary','tertiary'],
      control: {
        type: 'radio',
      }
    },
    determinate: {
      control: 'boolean'
    },
    inverse: {
      defaultValue: false,
      control: {
        type: 'boolean',
      }
    },
    neutral: {
      control: {
        type: 'boolean'
      }
    },
    label: {
      defaultValue: 'Loading ...',
      control: 'text'
    },
    progress: {
      control: {
        type: 'number',
      },
    },
    size: {
      options: ['large', 'small'],
      control: {
        type: 'inline-radio'
      },
    },
  },
  args: {
    label: 'Loading…',
    size: 'large',
  },
  render: ({ size, inverse, determinate, progress, label, neutral, buttonVariant }) => {
    return html`<cre8-loading-spinner
      size="${size}"
      ?inverse="${inverse}"
      ?neutral="${neutral}"
      buttonVariant="${buttonVariant}"
      ?determinate="${determinate}"
      progress="${progress}"
      label="${label}"
      ></cre8-loading-spinner
    >`;
  },
} satisfies Meta<Props>;

export default meta;

export const large: Story = {};

export const small: Story = {
  args: { size: 'small' },
};

export const neutral: Story = {
  args: { neutral: true },
};

export const primaryButtonInverseVariant: Story = {
  args: { buttonVariant: 'primary' },
};

export const secondaryButtonInverseVariant: Story = {
  args: { buttonVariant: 'secondary' },
};

export const tertiaryButtonInverseVariant: Story = {
  args: { buttonVariant: 'tertiary' },
};

export const secondaryNeutralInverse: Story = {
  args: {
    buttonVariant: 'secondary',
    neutral: true,
    inverse: true
  },
};

export const determinate: Story = {
  args: {
    determinate: true,
    progress: 75,
  },
};

export const indeterminate: Story = {
  args: {
    determinate: false,
  },
};
