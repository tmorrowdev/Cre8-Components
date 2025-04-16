import type { StoryObj } from '@storybook/react';
import type { Meta } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8SelectTileList } from '../..';
import { Cre8SelectTile } from '../..';
import { Cre8IconLegacy } from '../..';

const iconStyle = { '--Cre8-icon-width': '56px', '--Cre8-icon-height': '56px', } as React.CSSProperties;

const meta: Meta = {
  title: 'IN DEVELOPMENT/SelectTileList',
  component: Cre8SelectTileList,
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
  <Cre8SelectTileList {...args}>
      <Cre8SelectTile name="t1" align="center" value="1" {...tileArgs}>
        <Cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
        <span slot="title">Heading text</span>
        <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
      </Cre8SelectTile>

      <Cre8SelectTile isSuccess name="t1" align="center" value="2" {...tileArgs}>
        <Cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
        <span slot="title">Heading text</span>
        <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
      </Cre8SelectTile>

      <Cre8SelectTile isError name="t1" align="center" value="3" {...tileArgs}>
        <Cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
        <span slot="title">Heading text</span>
        <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
      </Cre8SelectTile>

      <Cre8SelectTile disabled name="t1" align="center" value="4" {...tileArgs}>
        <Cre8IconLegacy slot="header" name="find-drug" style={iconStyle} />
        <span slot="title">Heading text</span>
        <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
      </Cre8SelectTile>
  </Cre8SelectTileList>
  )
};

export default meta;

export const Default: StoryObj<typeof Cre8SelectTileList> = { args: {} };

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

