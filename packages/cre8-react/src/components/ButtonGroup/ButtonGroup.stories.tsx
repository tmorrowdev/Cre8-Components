import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8Button, cre8ButtonGroup } from '../..';

export default {
  title: 'Cre8 Components/ButtonGroup',
  component: cre8ButtonGroup,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8ButtonGroup> = { args: {
  children: (
    <>
      <cre8Button variant="primary" text="Button"></cre8Button>
      <cre8Button variant="tertiary" text="Button"></cre8Button>
    </>
  )
} };

export const ResponsiveFullWidth: StoryObj<typeof cre8ButtonGroup> = { args: {
  orientation: "responsive-full-width",
  children: (
    <>
      <cre8Button variant="primary" text="Button"></cre8Button>
      <cre8Button variant="tertiary" text="Button"></cre8Button>
    </>
  )
} };
