import type { StoryObj } from '@storybook/react-vite';
import { Cre8Icon } from '../../index';
import { excludeRegexArray } from '../../.storybook/preview';
import React from 'react';


export default {
  title: 'Cre8 Components/Icon',
  component: Cre8Icon,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
   },
};

export const Default: StoryObj<typeof Cre8Icon> = {
  render: (args) => (
    <>
    Cre8Icon Usage: <br />
    <Cre8Icon name="search"/>
    <p>Cre8Icon Usage: <br />
    <Cre8Icon name="search" /></p>
    </>
  )
};
