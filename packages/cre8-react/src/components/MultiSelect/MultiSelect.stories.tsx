import type { StoryFn, StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8MultiSelect } from '../..';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'In Development/MultiSelect',
  component: Cre8MultiSelect,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
    actions: {
      handles: ['selectedItemsChange'],
    },
    docs: {
      story: {
        height: '350px',
      },
    },
    decorators: [withActions],
  },
  render: (args) => <Cre8MultiSelect {...args}></Cre8MultiSelect>,
  args: {
    id: 'selectId',
    label: 'Choose you favorite food:',
    items: ['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon'],
  },
};

export const Default: StoryObj<typeof Cre8MultiSelect> = { args: {} };

export const Wrapping: StoryFn = (args) => (
  <div style={{ width: '320px' }}>
    <Cre8MultiSelect
      items={['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon']}
      label="Wrapping"
    ></Cre8MultiSelect>
  </div>
);

export const PreSelected = {
  args: {
    label: 'PreSelected',
    items: ['Car', 'Crumbs', 'Coco', 'Creampuff', 'Clock'],
    preselectedItems: ['Car', 'Crumbs'],
  },
}

export const Disabled = {
  args: {
    disabled: true,
    label: 'Disabled',
  }
};

export const DisabledWithTags = {
  args: {
    disabled: true,
    label: 'Disabled',
    preselectedItems: ['Brisket'],
  }
};

export const Error = {
  args: {
    errorNote: "Short, clear error message.",
    isError: true,
    label: 'Error',
    items: ['Doll', 'Dice', 'Doctor', 'Dinger', 'Derby'],
  }
};

export const Success = {
  args: {
    isSuccess: true,
    successNote: "Short, clear success message",
    label: 'Success',
    items: ['Emu', 'Eggplant', 'Envy', 'Essence'],
    preselectedItems: ['Eevee'],
  }
};
