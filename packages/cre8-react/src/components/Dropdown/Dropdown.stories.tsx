import type { StoryObj } from '@storybook/react';
import { Cre8Dropdown, Cre8DropdownItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'IN DEVELOPMENT/Dropdown',
  component: Cre8Dropdown,
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
} };

export const DropdownButton: StoryObj<typeof Cre8Dropdown> = { args: {
  buttonText: 'Button Dropdown',
  children: (
    <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      <Cre8DropdownItem>Item 4</Cre8DropdownItem>
    </>
  )
} };

export const DropdownButtonWithScrollBar: StoryObj<typeof Cre8Dropdown> = { args: {
  buttonText: 'Dropdown Scroll',
  maxHeight: '100px',
  children: (
    <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      <Cre8DropdownItem>Item 4</Cre8DropdownItem>
      <Cre8DropdownItem>Item 5</Cre8DropdownItem>
      <Cre8DropdownItem>Item 6</Cre8DropdownItem>
    </>
  )
} };

export const DropdownLink: StoryObj<typeof Cre8Dropdown> = { args: {
  buttonText: 'Link Dropdown',
  dropdownWithLink: true,
  children: (
    <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      <Cre8DropdownItem>Item 4</Cre8DropdownItem>
    </>
  )
} };

export const DropdownLinkWithScrollBar: StoryObj<typeof Cre8Dropdown> = { args: {
  buttonText: 'Dropdown Scroll',
  dropdownWithLink: true,
  maxHeight: '100px',
  children: (
    <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      <Cre8DropdownItem>Item 4</Cre8DropdownItem>
      <Cre8DropdownItem>Item 5</Cre8DropdownItem>
      <Cre8DropdownItem>Item 6</Cre8DropdownItem>
    </>
  )
} };

/***
 * A callback event will be triggered upon selecting an item from the dropdown.
 * Please check the console log for output of callback for this example.
 */
export const DropdownItemSelected: StoryObj<typeof Cre8Dropdown> = { args: {
  onDropdownItemSelected: (e) => {
    const dropdownElement = e.currentTarget;
    const dropdownItemElement = e.target;

    console.log('dropdown-item-selected', e, dropdownElement.dropdownContent, dropdownItemElement.ariaLabel);
  },
  children: (
    <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2 Item with longer text than default</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
    </>
  )
} };