import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Cre8FieldNote } from '../..';
import { Cre8TextLink } from '../TextLink/TextLink';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title:'Cre8 Components/Field Note',
  render: (args) => (
    <Cre8FieldNote {...args}>{args.children}</Cre8FieldNote>
  ),
  component: Cre8FieldNote,
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

export const Default: StoryObj<typeof Cre8FieldNote> = {
  args: { children: 'This is a field note.', },
};

export const BeginningLink: StoryObj<typeof Cre8FieldNote> = { args: {
  children: (
    <>
      <Cre8TextLink href="https://www.cigna.com">Helpful link</Cre8TextLink> at the beginning of a field note
    </>
  )
} };

export const MiddleLink: StoryObj<typeof Cre8FieldNote> = { args: {
  children: (
    <>
      This is a field note with a <Cre8TextLink href="https://www.cigna.com">helpful link</Cre8TextLink> in the middle of content
    </>
  )
} };

export const EndingLink: StoryObj<typeof Cre8FieldNote> = { args: {
  children: (
    <>
      This is a field note with an ending <Cre8TextLink href="https://www.cigna.com">helpful link</Cre8TextLink>
    </>
  )
} };

export const Error: StoryObj<typeof Cre8FieldNote> = { args: {
  isError: true,
  children: 'This is a field note with an error state.'
} };

export const Success: StoryObj<typeof Cre8FieldNote> = { args: {
  isSuccess: true,
  children: 'This is a field note with an success state.'
} };
