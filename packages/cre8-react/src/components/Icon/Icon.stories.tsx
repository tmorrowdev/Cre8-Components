import type { StoryObj } from '@storybook/react';
import { Cre8IconLegacy } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import Cre8Icon from '@cre8_dev/cre8-icons';
import React from 'react';
import svgInfoFilled from '@cre8_dev/cre8-icons';


export default {
  title: 'Cre8 Components/Icon',
  component: Cre8Icon,
  subComponents:[Cre8IconLegacy],
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
   },
};

export const Default: StoryObj<typeof Cre8IconLegacy> = {
  render: (args) => (
    <>
    Cre8Icon Usage: <br />
    <Cre8Icon name="search"/>
    <p>Cre8IconLegacy Usage: <br />
    <Cre8IconLegacy name="search" /></p>
    </>
  )
};
