import type { Story, StoryObj } from '@storybook/react';
import { withActions } from '@storybook/addon-actions/decorator';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8Popover } from '../..';
import { cre8Button } from '../..';
import { Fpo } from '../../../.storybook/components/Fpo/Fpo';
import { Props } from 'next/script';

export default {
  title: 'cre8 Components/Popover',
  component: cre8Popover,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}|^isRTL$|^removeActive$|^dynamicPosition$|^addAria$|^removeActiveOnScroll$|^onOpen$|^onClose$`)
    },
    layout: 'centered',
    actions: {
      handles: ['open', 'close']
    }
  },
  decorators: [withActions],
  args: {
    heading: 'Popover Heading',
    children: (
      <>
        <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></cre8Button>
      </>
    )
  },
  argTypes: {
    isActive: {control: 'boolean'},
    isActiveDynamic: {control: 'boolean'},
    isDynamic: {control: 'boolean'},
    isVisibleOnScroll: {control: 'boolean'},
    position: {control: 'text'},
  }
};

export const Default: StoryObj<typeof cre8Popover> = { args: {} };

export const DefaultWithNoButton: StoryObj<typeof cre8Popover> = { args: {
  children: (
    <>
      <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </>
  )
} };

export const SmallPrimaryButton: StoryObj<typeof cre8Popover> = { args: {
  children: (
    <>
      <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      <cre8Button slot="footer" variant="primary" text="Button" size="sm" style={{ marginLeft: 'auto'}}></cre8Button>
    </>
  )
} };

export const SmallSecondaryButton: StoryObj<typeof cre8Popover> = { args: {
  children: (
    <>
      <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      <cre8Button slot="footer" variant="secondary" text="Button" size="sm" style={{ marginLeft: 'auto'}}></cre8Button>
    </>
  )
} };

export const SmallTertiaryButton: StoryObj<typeof cre8Popover> = { args: {
  children: (
    <>
      <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      <cre8Button slot="footer" variant="tertiary" text="Button" size="sm" style={{ marginLeft: 'auto'}}></cre8Button>
    </>
  )
} };

export const PositionTop: StoryObj<typeof cre8Popover> = { args: {
  position: 'top'
} };

export const PositionLeft: StoryObj<typeof cre8Popover> = { args: {
  position: 'left'
} };

export const PositionRight: StoryObj<typeof cre8Popover> = { args: {
  position: 'right'
} };

const PositionDynamicTemplate: Story<Props> = () => (
  <div style={{ padding: '3rem', height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <cre8Popover isDynamic={true} heading="Popover Heading" position="top">
        <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></cre8Button>
      </cre8Popover>
    </div>
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
      <cre8Popover isDynamic={true} heading="Popover Heading" position="left">
        <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></cre8Button>
      </cre8Popover>
      <cre8Popover isDynamic={true} heading="Popover Heading" position="right">
        <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></cre8Button>
      </cre8Popover>
    </div>
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <cre8Popover isDynamic={true} heading="Popover Heading">
        <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></cre8Button>
      </cre8Popover>
    </div>
  </div>
);
export const PositionDynamic = PositionDynamicTemplate.bind({});
PositionDynamic.args = {};
PositionDynamic.parameters = { layout: 'fullscreen' };

const WithVisibleOnScrollTemplate: Story<Props> = () => (
  <div style={{ minHeight: '150vw', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
    <div style={{ padding: '3rem', position: 'absolute', top: '0', left: '50%', transform: 'translateX(var(--rtlTranslateX, -50%))' }}>
      <cre8Popover isVisibleOnScroll={true} heading="Popover Heading">
        <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></cre8Button>
      </cre8Popover>
    </div>
  </div>
);
export const WithVisibleOnScroll = WithVisibleOnScrollTemplate.bind({});
WithVisibleOnScroll.args = {};

export const WithSlots: StoryObj<typeof cre8Popover> = { args: {
  heading: '',
  children: (
    <>
      <cre8Button slot="trigger" text="Open Popover" variant="primary"></cre8Button>
      <Fpo slot="header"></Fpo>
      <Fpo ></Fpo>
      <Fpo slot="footer"></Fpo>
    </>
  )
} };
