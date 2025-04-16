import type { StoryObj } from '@storybook/react';
import { Cre8Dropdown, Cre8DropdownItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'IN DEVELOPMENT/DropdownItem',
  component: Cre8DropdownItem,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  render: (args) => (
    <Cre8Dropdown {...args}>
    </Cre8Dropdown>
  ),
  args: {
    buttonText: 'Select',
    onDropdownItemSelected: action('dropdown-item-selected'),
  },
};

export const Default: StoryObj<typeof Cre8Dropdown> = { args: {
  children: (
      <>
        <Cre8DropdownItem>Item 1</Cre8DropdownItem>
        <Cre8DropdownItem>Item 2 Item with longer text than default</Cre8DropdownItem>
        <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      </>
    )
  } 
};