import type { StoryObj } from '@storybook/react';
import { cre8IconLegacy } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import cre8Icon from '@cre8/cre8-icons/lib/react/cre8Icon/';
import React from 'react';
import svgInfoFilled from '@cre8/cre8-icons/lib/icons/System/Filled/Info.svg?raw';


export default {
  title: 'cre8 Components/Icon',
  component: cre8IconLegacy,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
   },
};

export const Default: StoryObj<typeof cre8IconLegacy> = {
  render: (args) => (
    <>
    cre8Icon Usage: <br />
    <cre8Icon svg={ svgInfoFilled } />
    <p>cre8IconLegacy Usage: <br />
    <cre8IconLegacy name="search" /></p>
    </>
  )
};
