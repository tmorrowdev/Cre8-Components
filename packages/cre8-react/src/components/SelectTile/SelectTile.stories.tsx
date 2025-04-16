import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8SelectTile } from '../..';
import { Cre8IconLegacy } from '../../';

const iconStyle = { '--Cre8-icon-width': '56px', '--Cre8-icon-height': '56px', } as React.CSSProperties;

export default {
  title: 'IN DEVELOPMENT/SelectTile',
  component: Cre8SelectTile,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  render: (args) => (
    <Cre8SelectTile {...args}>
      <Cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
      <span slot="title">Heading text one</span>
      <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
    </Cre8SelectTile>
  ),
  args: {
    name: 'radio-name',
    value: 'radio-value',
  }
};

export const Default: StoryObj<typeof Cre8SelectTile> = { args: {} };

export const Horizontal: StoryObj<typeof Cre8SelectTile> = {
  args: {
    variant: 'horizontal'
  }
};

export const Centered: StoryObj<typeof Cre8SelectTile> = { args: {
  align: 'center'
} };

export const Checkbox: StoryObj<typeof Cre8SelectTile> = {
  args: {
    type: 'checkbox'
  }
};

export const RadioCheck: StoryObj<typeof Cre8SelectTile> = {
  args: {
    radioVariant: 'check',
    checked: true,
  }
};

export const LeftCheck: StoryObj<typeof Cre8SelectTile> = {
  args: {
    variant: 'horizontal',
    checkPosition: 'left',
  }
};

export const Success: StoryObj<typeof Cre8SelectTile> = {
  args: {
    isSuccess: true,
  }
};

export const Error: StoryObj<typeof Cre8SelectTile> = {
  args: {
    isError: true,
  }
};
