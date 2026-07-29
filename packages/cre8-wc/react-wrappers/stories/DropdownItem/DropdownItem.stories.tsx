import type { StoryObj } from '@storybook/react-vite';
import { Cre8Dropdown, Cre8DropdownItem } from '../../index';
import { excludeRegexArray } from '../../.storybook/preview';
import React from 'react';
import { action } from 'storybook/actions';

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
    onDropdownItemSelect: action('dropdown-item-select'),
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