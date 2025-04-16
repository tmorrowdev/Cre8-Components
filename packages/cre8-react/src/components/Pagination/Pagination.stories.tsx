import type { StoryObj } from '@storybook/react';
import { withActions } from '@storybook/addon-actions/decorator';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8Pagination } from '../..';

export default {
  title: 'Cre8 Components/Pagination',
  component: Cre8Pagination,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    },
    action:{
      handles: ['click', 'resize']
    },
    layout: 'centered'

  },
  decorators: [withActions],
  args: {
    currentPage: 1,
    totalResults: 300,
    pageSize: 10,
    visiblePages: 5,
    display: 'default',
  },
  argTypes: {
    display: {
      control: {
        type: 'select'
      },
      defaultValue: 'default',
      options: ['compact', 'icon-only', 'default']
    }
  }
};

export const Default: StoryObj<typeof Cre8Pagination> = { args: {} };
export const Compact: StoryObj<typeof Cre8Pagination> = { args: {
  display: 'compact'
} };

export const IconOnly: StoryObj<typeof Cre8Pagination> = { args: {
  display: 'icon-only'
} };
export const HideLastAndFirstButtons: StoryObj<typeof Cre8Pagination> = { args: {
  display: 'default',
  hideLastAndFirstButtons: true
} };
