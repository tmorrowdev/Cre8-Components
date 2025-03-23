import type { StoryObj } from '@storybook/react';
import { cre8Dropdown, cre8DropdownItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'IN DEVELOPMENT/Dropdown',
  component: cre8Dropdown,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    },
    docs: {
      story: {
        height: '200px',
      },
    },
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
} };

export const DropdownButton: StoryObj<typeof cre8Dropdown> = { args: {
  buttonText: 'Button Dropdown',
  children: (
    <>
      <cre8DropdownItem>Item 1</cre8DropdownItem>
      <cre8DropdownItem>Item 2</cre8DropdownItem>
      <cre8DropdownItem>Item 3</cre8DropdownItem>
      <cre8DropdownItem>Item 4</cre8DropdownItem>
    </>
  )
} };

export const DropdownButtonWithScrollBar: StoryObj<typeof cre8Dropdown> = { args: {
  buttonText: 'Dropdown Scroll',
  maxHeight: '100px',
  children: (
    <>
      <cre8DropdownItem>Item 1</cre8DropdownItem>
      <cre8DropdownItem>Item 2</cre8DropdownItem>
      <cre8DropdownItem>Item 3</cre8DropdownItem>
      <cre8DropdownItem>Item 4</cre8DropdownItem>
      <cre8DropdownItem>Item 5</cre8DropdownItem>
      <cre8DropdownItem>Item 6</cre8DropdownItem>
    </>
  )
} };

export const DropdownLink: StoryObj<typeof cre8Dropdown> = { args: {
  buttonText: 'Link Dropdown',
  dropdownWithLink: true,
  children: (
    <>
      <cre8DropdownItem>Item 1</cre8DropdownItem>
      <cre8DropdownItem>Item 2</cre8DropdownItem>
      <cre8DropdownItem>Item 3</cre8DropdownItem>
      <cre8DropdownItem>Item 4</cre8DropdownItem>
    </>
  )
} };

export const DropdownLinkWithScrollBar: StoryObj<typeof cre8Dropdown> = { args: {
  buttonText: 'Dropdown Scroll',
  dropdownWithLink: true,
  maxHeight: '100px',
  children: (
    <>
      <cre8DropdownItem>Item 1</cre8DropdownItem>
      <cre8DropdownItem>Item 2</cre8DropdownItem>
      <cre8DropdownItem>Item 3</cre8DropdownItem>
      <cre8DropdownItem>Item 4</cre8DropdownItem>
      <cre8DropdownItem>Item 5</cre8DropdownItem>
      <cre8DropdownItem>Item 6</cre8DropdownItem>
    </>
  )
} };

/***
 * A callback event will be triggered upon selecting an item from the dropdown.
 * Please check the console log for output of callback for this example.
 */
export const DropdownItemSelected: StoryObj<typeof cre8Dropdown> = { args: {
  onDropdownItemSelected: (e) => {
    const dropdownElement = e.currentTarget;
    const dropdownItemElement = e.target;

    console.log('dropdown-item-selected', e, dropdownElement.dropdownContent, dropdownItemElement.ariaLabel);
  },
  children: (
    <>
      <cre8DropdownItem>Item 1</cre8DropdownItem>
      <cre8DropdownItem>Item 2 Item with longer text than default</cre8DropdownItem>
      <cre8DropdownItem>Item 3</cre8DropdownItem>
    </>
  )
} };