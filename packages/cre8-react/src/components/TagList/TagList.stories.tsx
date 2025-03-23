import type { StoryObj } from '@storybook/react';
import { cre8TagList, cre8Tag } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';

export default {
  title: 'IN DEVELOPMENT/TagList',
  component: cre8TagList,
  subcomponents: { cre8Tag },
  render: (args) => <cre8TagList { ...args } />,
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

export const Default: StoryObj<typeof cre8TagList> = { 
  args: {
    label: 'Fruits',
    children: (
      <React.Fragment>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Orange"></cre8Tag>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Apple"></cre8Tag>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Pear"></cre8Tag>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Banana"></cre8Tag>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Peach"></cre8Tag>
      </React.Fragment>
    ),
  }
};

export const CheckBox: StoryObj<typeof cre8TagList> = { 
  args: {
    label: 'Animals',
    children: (
      <React.Fragment>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Dog"></cre8Tag>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Cat"></cre8Tag>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Cow"></cre8Tag>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Fish"></cre8Tag>
        <cre8Tag type="checkbox" variant="neutral" shape="round" text="Bear"></cre8Tag>
      </React.Fragment>
    ),
  }
};

export const Radio: StoryObj<typeof cre8TagList> = { 
  args: {
    label: 'Emotions',
    children: (
      <React.Fragment>
        <cre8Tag type="radio" variant="neutral" shape="round" text="Happy"></cre8Tag>
        <cre8Tag type="radio" variant="neutral" shape="round" text="Sad"></cre8Tag>
        <cre8Tag type="radio" variant="neutral" shape="round" text="Scared"></cre8Tag>
        <cre8Tag type="radio" variant="neutral" shape="round" text="Angry"></cre8Tag>
        <cre8Tag type="radio" variant="neutral" shape="round" text="Confused"></cre8Tag>
      </React.Fragment>
    ),
  }
};
