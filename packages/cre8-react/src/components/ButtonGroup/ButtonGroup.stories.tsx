import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8Button, Cre8ButtonGroup } from '../..';

export default {
  title: 'Cre8 Components/ButtonGroup',
  component: Cre8ButtonGroup,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8ButtonGroup> = { args: {
  children: (
    <>
      <Cre8Button variant="primary" text="Button"></Cre8Button>
      <Cre8Button variant="tertiary" text="Button"></Cre8Button>
    </>
  )
} };

export const ResponsiveFullWidth: StoryObj<typeof Cre8ButtonGroup> = { args: {
  orientation: "responsive-full-width",
  children: (
    <>
      <Cre8Button variant="primary" text="Button"></Cre8Button>
      <Cre8Button variant="tertiary" text="Button"></Cre8Button>
    </>
  )
} };
