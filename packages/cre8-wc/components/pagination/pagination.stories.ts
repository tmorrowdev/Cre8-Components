import './pagination';
import './page-counter/page-counter';
import type { Meta, StoryObj } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { withActions } from 'storybook/actions/decorator';
import type { Cre8Pagination } from './pagination';

// `getStorybookHelpers` derives controls from the Custom Elements Manifest,
// including the layout design tokens this component exposes:
// `--pagination-display`, `--pagination-justify-content` and
// `--pagination-align-items`. See https://wc-toolkit.com/integrations/storybook/
const { args, argTypes, template } = getStorybookHelpers('cre8-pagination');

type Story = StoryObj<Cre8Pagination>;

const meta: Meta<Cre8Pagination> = {
  title: 'cre8 Components/Pagination',
  component: 'cre8-pagination',
  args: {
    ...args,
    currentPage: 1,
    totalResults: 300,
    pageSize: 10,
    visiblePages: 5,
    display: 'default',
  },
  argTypes: {
    ...argTypes,
    display: {
      ...argTypes.display,
      options: ['compact', 'icon-only', 'range', 'default'],
      control: { type: 'select' },
    },
  },
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['pagination.click', 'button.handleOnBlur', 'pagination.keydown'],
    },
  },
  decorators: [withActions],
  render: (args) => template(args),
};
export default meta;

export const Default: Story = {
  args: {
    display: 'default',
    currentPage: 1,
    totalResults: 300,
    pageSize: 25
  }
};

export const Compact: Story = {
  args: {
    display: 'compact',
    currentPage: 1,
    totalResults: 43,
    pageSize: 10,
  }
}

export const IconOnly: Story = {
  args: {
    display: 'icon-only'
  }
}

export const HideFirstAndLastButtons: Story = {
  args: {
    display: 'default',
    currentPage: 1,
    totalResults: 300,
    pageSize: 25,
    hideLastAndFirstButtons: true
  }
}
