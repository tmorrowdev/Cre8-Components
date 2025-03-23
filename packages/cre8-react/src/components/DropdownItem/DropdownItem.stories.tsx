import type { StoryObj } from '@storybook/react';
import { cre8Dropdown, cre8DropdownItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'IN DEVELOPMENT/DropdownItem',
  component: cre8DropdownItem,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  render: (args) => (
    <cre8Dropdown {...args}>
    </cre8Dropdown>
  ),
  args: {
    buttonText: 'Select',
    onDropdownItemSelected: action('dropdown-item-selected'),
  },
};

export const Default: StoryObj<typeof cre8Dropdown> = { args: {
  children: (
      <>
        <cre8DropdownItem>Item 1</cre8DropdownItem>
        <cre8DropdownItem>Item 2 Item with longer text than default</cre8DropdownItem>
        <cre8DropdownItem>Item 3</cre8DropdownItem>
      </>
    )
  } 
};