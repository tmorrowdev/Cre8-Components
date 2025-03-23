import React from 'react';
import type { StoryObj } from '@storybook/react';
import { cre8FieldNote } from '../..';
import { cre8TextLink } from '../TextLink/TextLink';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title:'cre8 Components/Field Note',
  render: (args) => (
    <cre8FieldNote {...args}>{args.children}</cre8FieldNote>
  ),
  component: cre8FieldNote,
  parameters: { 
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  args: {
    children: undefined,
    isError: undefined,
    isSuccess: undefined
  },
  argTypes: {
    iconName: {control: 'text'}, // iconName will be deprecated
    isError: {control: 'boolean'},
    isSuccess: {control: 'boolean'},
  }
};

export const Default: StoryObj<typeof cre8FieldNote> = {
  args: { children: 'This is a field note.', },
};

export const BeginningLink: StoryObj<typeof cre8FieldNote> = { args: {
  children: (
    <>
      <cre8TextLink href="https://www.cigna.com">Helpful link</cre8TextLink> at the beginning of a field note
    </>
  )
} };

export const MiddleLink: StoryObj<typeof cre8FieldNote> = { args: {
  children: (
    <>
      This is a field note with a <cre8TextLink href="https://www.cigna.com">helpful link</cre8TextLink> in the middle of content
    </>
  )
} };

export const EndingLink: StoryObj<typeof cre8FieldNote> = { args: {
  children: (
    <>
      This is a field note with an ending <cre8TextLink href="https://www.cigna.com">helpful link</cre8TextLink>
    </>
  )
} };

export const Error: StoryObj<typeof cre8FieldNote> = { args: {
  isError: true,
  children: 'This is a field note with an error state.'
} };

export const Success: StoryObj<typeof cre8FieldNote> = { args: {
  isSuccess: true,
  children: 'This is a field note with an success state.'
} };
