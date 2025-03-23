import type { StoryObj } from '@storybook/react';
import { cre8TextLink } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'DEPRECATED/DO NOT USE/TextLink',
  component: cre8TextLink,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8TextLink> = { args: {} };
