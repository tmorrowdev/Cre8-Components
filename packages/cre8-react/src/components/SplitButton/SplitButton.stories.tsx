import type { StoryObj } from '@storybook/react';
import { cre8Dropdown, cre8DropdownItem, cre8SplitButton } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'DEPRECATED/DO NOT USE/SplitButton',
  component: cre8SplitButton,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8SplitButton> = { args: {
  buttonText: "SplitButton",
  children: (
    <cre8Dropdown>
      <cre8DropdownItem>Item 1</cre8DropdownItem>
      <cre8DropdownItem>Item 2</cre8DropdownItem>
      <cre8DropdownItem>Item 3</cre8DropdownItem>
    </cre8Dropdown>
  )
} };

export const Large: StoryObj<typeof cre8SplitButton> = { args: {
  buttonText: "Large SplitButton",
  size: 'lg',
  children: (
    <cre8Dropdown>
      <cre8DropdownItem>Item 1</cre8DropdownItem>
      <cre8DropdownItem>Item 2</cre8DropdownItem>
      <cre8DropdownItem>Item 3</cre8DropdownItem>
    </cre8Dropdown>
  )
} };

export const Small: StoryObj<typeof cre8SplitButton> = { args: {
  buttonText: "Button",
  size: 'sm',
  children: (
    <cre8Dropdown>
      <cre8DropdownItem>Item 1</cre8DropdownItem>
      <cre8DropdownItem>Item 2</cre8DropdownItem>
      <cre8DropdownItem>Item 3</cre8DropdownItem>
    </cre8Dropdown>
  )
} };
