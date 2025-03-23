import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8Heading, cre8Modal } from '../..';
import { Fpo } from '../../../.storybook/components/Fpo/Fpo';
import { action } from '@storybook/addon-actions';

export default {
  title: 'cre8 Components/Modal',
  component: cre8Modal,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    },
    docs: {
      story:  {
        inline: false,
        height: '300px',
      },
    },
  },
  render: (args) => (
    <cre8Modal {...args}>
    </cre8Modal>
  ),
  args: {
    onClose: action('close-modal')
  },
};

export const Default: StoryObj<typeof cre8Modal> = { args: {
  isActive: true,
  ariaLabel: "This text describes modal to screen reader when focused on",
  children: (
    <>
    <cre8Heading type="title-large" slot="header">Modal Heading</cre8Heading>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  )
} };

export const NotDismissible: StoryObj<typeof cre8Modal> = { args: {
  isActive: true,
  notDismissible: true,
  ariaLabel: "This text describes modal to screen reader when focused on",
  children: (
    <>
    <cre8Heading type="title-large" slot="header">Modal Heading</cre8Heading>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  )
} };

export const Error: StoryObj<typeof cre8Modal> = { args: {
  status: 'error',
  isActive: true,
  ariaLabel: "This text describes modal to screen reader when focused on",
  utilityModalTitle: 'Modal Heading',
  children: (
    <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  )
} };

export const Warning: StoryObj<typeof cre8Modal> = { args: {
  status: 'warning',
  isActive: true,
  ariaLabel: "This text describes modal to screen reader when focused on",
  utilityModalTitle: 'Modal Heading',
  children: (
    <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  )
} };

export const Success: StoryObj<typeof cre8Modal> = { args: {
  status: 'success',
  isActive: true,
  ariaLabel: "This text describes modal to screen reader when focused on",
  utilityModalTitle: 'Modal Heading',
  children: (
    <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  )
} };

export const Info: StoryObj<typeof cre8Modal> = { args: {
  status: 'info',
  isActive: true,
  ariaLabel: "This text describes modal to screen reader when focused on",
  utilityModalTitle: 'Modal Heading',
  children: (
    <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo>Modal footer</Fpo>

 </div> </>
  )
} };

export const Help: StoryObj<typeof cre8Modal> = { args: {
  status: 'help',
  isActive: true,
  ariaLabel: "This text describes modal to screen reader when focused on",
  utilityModalTitle: 'Modal Heading',
  children: (
    <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo>Modal footer</Fpo>

 </div> </>
  )
} };
