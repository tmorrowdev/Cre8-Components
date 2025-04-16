import type { StoryObj } from '@storybook/react';
import { Cre8TertiaryNav, Cre8TertiaryNavItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import { withActions } from '@storybook/addon-actions/decorator';
import React from 'react';

export default {
  title: 'Cre8 Components/Tertiary Nav',
  component: Cre8TertiaryNav,
  subcomponents: { Cre8TertiaryNavItem },
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['click']
    },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  decorators: [withActions],
  args: {
    children: (
      <>
        <Cre8TertiaryNavItem href="#" isCurrent={true}>Tertiary Nav Item 1</Cre8TertiaryNavItem>
        <Cre8TertiaryNavItem href="#">Tertiary Nav Item 2</Cre8TertiaryNavItem>
        <Cre8TertiaryNavItem href="#">Tertiary Nav Item 3</Cre8TertiaryNavItem>
        <Cre8TertiaryNavItem href="#">Tertiary Nav Item 4</Cre8TertiaryNavItem>
        <Cre8TertiaryNavItem href="#">Tertiary Nav Item 5</Cre8TertiaryNavItem>
      </>
    )
  }
};

export const Default: StoryObj<typeof Cre8TertiaryNav> = { args: {} };

export const FullWidth: StoryObj<typeof Cre8TertiaryNav> = { args: {
  fullWidth: true
} };

