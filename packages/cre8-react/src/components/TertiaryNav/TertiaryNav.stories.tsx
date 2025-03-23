import type { StoryObj } from '@storybook/react';
import { cre8TertiaryNav, cre8TertiaryNavItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import { withActions } from '@storybook/addon-actions/decorator';
import React from 'react';

export default {
  title: 'DEPRECATED/DO NOT USE/Tertiary Nav',
  component: cre8TertiaryNav,
  subcomponents: { cre8TertiaryNavItem },
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
        <cre8TertiaryNavItem href="#" isCurrent={true}>Tertiary Nav Item 1</cre8TertiaryNavItem>
        <cre8TertiaryNavItem href="#">Tertiary Nav Item 2</cre8TertiaryNavItem>
        <cre8TertiaryNavItem href="#">Tertiary Nav Item 3</cre8TertiaryNavItem>
        <cre8TertiaryNavItem href="#">Tertiary Nav Item 4</cre8TertiaryNavItem>
        <cre8TertiaryNavItem href="#">Tertiary Nav Item 5</cre8TertiaryNavItem>
      </>
    )
  }
};

export const Default: StoryObj<typeof cre8TertiaryNav> = { args: {} };

export const FullWidth: StoryObj<typeof cre8TertiaryNav> = { args: {
  fullWidth: true
} };

