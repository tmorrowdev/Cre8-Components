import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8SelectTile } from '../..';
import { cre8IconLegacy } from '../../';

const iconStyle = { '--cre8-icon-width': '56px', '--cre8-icon-height': '56px', } as React.CSSProperties;

export default {
  title: 'IN DEVELOPMENT/SelectTile',
  component: cre8SelectTile,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  render: (args) => (
    <cre8SelectTile {...args}>
      <cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
      <span slot="title">Heading text one</span>
      <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
    </cre8SelectTile>
  ),
  args: {
    name: 'radio-name',
    value: 'radio-value',
  }
};

export const Default: StoryObj<typeof cre8SelectTile> = { args: {} };

export const Horizontal: StoryObj<typeof cre8SelectTile> = {
  args: {
    variant: 'horizontal'
  }
};

export const Centered: StoryObj<typeof cre8SelectTile> = { args: {
  align: 'center'
} };

export const Checkbox: StoryObj<typeof cre8SelectTile> = {
  args: {
    type: 'checkbox'
  }
};

export const RadioCheck: StoryObj<typeof cre8SelectTile> = {
  args: {
    radioVariant: 'check',
    checked: true,
  }
};

export const LeftCheck: StoryObj<typeof cre8SelectTile> = {
  args: {
    variant: 'horizontal',
    checkPosition: 'left',
  }
};

export const Success: StoryObj<typeof cre8SelectTile> = {
  args: {
    isSuccess: true,
  }
};

export const Error: StoryObj<typeof cre8SelectTile> = {
  args: {
    isError: true,
  }
};
