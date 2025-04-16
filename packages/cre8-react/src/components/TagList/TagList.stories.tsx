import type { StoryObj } from '@storybook/react';
import { Cre8TagList, Cre8Tag } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';

export default {
  title: 'IN DEVELOPMENT/TagList',
  component: Cre8TagList,
  subcomponents: { Cre8Tag },
  render: (args) => <Cre8TagList { ...args } />,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  args: {
    label: undefined,
  },
};

export const Default: StoryObj<typeof Cre8TagList> = { 
  args: {
    label: 'Fruits',
    children: (
      <React.Fragment>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Orange"></Cre8Tag>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Apple"></Cre8Tag>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Pear"></Cre8Tag>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Banana"></Cre8Tag>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Peach"></Cre8Tag>
      </React.Fragment>
    ),
  }
};

export const CheckBox: StoryObj<typeof Cre8TagList> = { 
  args: {
    label: 'Animals',
    children: (
      <React.Fragment>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Dog"></Cre8Tag>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Cat"></Cre8Tag>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Cow"></Cre8Tag>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Fish"></Cre8Tag>
        <Cre8Tag type="checkbox" variant="neutral" shape="round" text="Bear"></Cre8Tag>
      </React.Fragment>
    ),
  }
};

export const Radio: StoryObj<typeof Cre8TagList> = { 
  args: {
    label: 'Emotions',
    children: (
      <React.Fragment>
        <Cre8Tag type="radio" variant="neutral" shape="round" text="Happy"></Cre8Tag>
        <Cre8Tag type="radio" variant="neutral" shape="round" text="Sad"></Cre8Tag>
        <Cre8Tag type="radio" variant="neutral" shape="round" text="Scared"></Cre8Tag>
        <Cre8Tag type="radio" variant="neutral" shape="round" text="Angry"></Cre8Tag>
        <Cre8Tag type="radio" variant="neutral" shape="round" text="Confused"></Cre8Tag>
      </React.Fragment>
    ),
  }
};
