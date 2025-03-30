import type { StoryObj } from '@storybook/react';
import { cre8LinkList } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/LinkList',
  component: cre8LinkList,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8LinkList> = { args: {} };
