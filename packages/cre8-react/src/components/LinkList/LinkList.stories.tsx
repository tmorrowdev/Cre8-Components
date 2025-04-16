import type { StoryObj } from '@storybook/react';
import { Cre8LinkList } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/LinkList',
  component: Cre8LinkList,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8LinkList> = { args: {} };
