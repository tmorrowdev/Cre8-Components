import type { StoryObj } from '@storybook/react';
import type { Meta } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8SelectTileList } from '../..';
import { cre8SelectTile } from '../..';
import { cre8IconLegacy } from '../..';

const iconStyle = { '--cre8-icon-width': '56px', '--cre8-icon-height': '56px', } as React.CSSProperties;

const meta: Meta = {
  title: 'IN DEVELOPMENT/SelectTileList',
  component: cre8SelectTileList,
  parameters: {
    status: { type: 'beta' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  decorators: [(Story) => <form><Story /></form>],
  args: {
  },
  render: ({ tileArgs, ...args}) => (
  <cre8SelectTileList {...args}>
      <cre8SelectTile name="t1" align="center" value="1" {...tileArgs}>
        <cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
        <span slot="title">Heading text</span>
        <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
      </cre8SelectTile>

      <cre8SelectTile isSuccess name="t1" align="center" value="2" {...tileArgs}>
        <cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
        <span slot="title">Heading text</span>
        <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
      </cre8SelectTile>

      <cre8SelectTile isError name="t1" align="center" value="3" {...tileArgs}>
        <cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
        <span slot="title">Heading text</span>
        <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
      </cre8SelectTile>

      <cre8SelectTile disabled name="t1" align="center" value="4" {...tileArgs}>
        <cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
        <span slot="title">Heading text</span>
        <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
      </cre8SelectTile>
  </cre8SelectTileList>
  )
};

export default meta;

export const Default: StoryObj<typeof cre8SelectTileList> = { args: {} };

export const Rows: StoryObj = { args: {
  variant: 'rows',
  tileArgs: {
    variant: 'horizontal'
  }
} };

export const RadioCheck: StoryObj = { args: {
  tileArgs: {
    radioVariant: 'check'
  }
} };

export const Checkboxes: StoryObj = { args: {
  tileArgs: {
    type: 'checkbox'
  }
} };

