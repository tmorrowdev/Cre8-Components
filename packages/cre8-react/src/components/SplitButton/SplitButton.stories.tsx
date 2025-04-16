import type { StoryObj } from '@storybook/react';
import { Cre8Dropdown, Cre8DropdownItem, Cre8SplitButton } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/SplitButton',
  component: Cre8SplitButton,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8SplitButton> = { args: {
  buttonText: "SplitButton",
  children: (
    <Cre8Dropdown>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
    </Cre8Dropdown>
  )
} };

export const Large: StoryObj<typeof Cre8SplitButton> = { args: {
  buttonText: "Large SplitButton",
  size: 'lg',
  children: (
    <Cre8Dropdown>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
    </Cre8Dropdown>
  )
} };

export const Small: StoryObj<typeof Cre8SplitButton> = { args: {
  buttonText: "Button",
  size: 'sm',
  children: (
    <Cre8Dropdown>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
    </Cre8Dropdown>
  )
} };
