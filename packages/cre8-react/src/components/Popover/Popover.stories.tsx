import type { Story, StoryObj } from '@storybook/react';
import { withActions } from '@storybook/addon-actions/decorator';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8Popover } from '../..';
import { Cre8Button } from '../..';
import { Fpo } from '../../../.storybook/components/Fpo/Fpo';
import { Props } from 'next/script';

export default {
  title: 'Cre8 Components/Popover',
  component: Cre8Popover,
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
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></Cre8Button>
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

export const Default: StoryObj<typeof Cre8Popover> = { args: {} };

export const DefaultWithNoButton: StoryObj<typeof Cre8Popover> = { args: {
  children: (
    <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </>
  )
} };

export const SmallPrimaryButton: StoryObj<typeof Cre8Popover> = { args: {
  children: (
    <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      <Cre8Button slot="footer" variant="primary" text="Button" size="sm" style={{ marginLeft: 'auto'}}></Cre8Button>
    </>
  )
} };

export const SmallSecondaryButton: StoryObj<typeof Cre8Popover> = { args: {
  children: (
    <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      <Cre8Button slot="footer" variant="secondary" text="Button" size="sm" style={{ marginLeft: 'auto'}}></Cre8Button>
    </>
  )
} };

export const SmallTertiaryButton: StoryObj<typeof Cre8Popover> = { args: {
  children: (
    <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      <Cre8Button slot="footer" variant="tertiary" text="Button" size="sm" style={{ marginLeft: 'auto'}}></Cre8Button>
    </>
  )
} };

export const PositionTop: StoryObj<typeof Cre8Popover> = { args: {
  position: 'top'
} };

export const PositionLeft: StoryObj<typeof Cre8Popover> = { args: {
  position: 'left'
} };

export const PositionRight: StoryObj<typeof Cre8Popover> = { args: {
  position: 'right'
} };

const PositionDynamicTemplate: Story<Props> = () => (
  <div style={{ padding: '3rem', height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Cre8Popover isDynamic={true} heading="Popover Heading" position="top">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></Cre8Button>
      </Cre8Popover>
    </div>
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
      <Cre8Popover isDynamic={true} heading="Popover Heading" position="left">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></Cre8Button>
      </Cre8Popover>
      <Cre8Popover isDynamic={true} heading="Popover Heading" position="right">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></Cre8Button>
      </Cre8Popover>
    </div>
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Cre8Popover isDynamic={true} heading="Popover Heading">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></Cre8Button>
      </Cre8Popover>
    </div>
  </div>
);
export const PositionDynamic = PositionDynamicTemplate.bind({});
PositionDynamic.args = {};
PositionDynamic.parameters = { layout: 'fullscreen' };

const WithVisibleOnScrollTemplate: Story<Props> = () => (
  <div style={{ minHeight: '150vw', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
    <div style={{ padding: '3rem', position: 'absolute', top: '0', left: '50%', transform: 'translateX(var(--rtlTranslateX, -50%))' }}>
      <Cre8Popover isVisibleOnScroll={true} heading="Popover Heading">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{ marginLeft: 'auto'}}></Cre8Button>
      </Cre8Popover>
    </div>
  </div>
);
export const WithVisibleOnScroll = WithVisibleOnScrollTemplate.bind({});
WithVisibleOnScroll.args = {};

export const WithSlots: StoryObj<typeof Cre8Popover> = { args: {
  heading: '',
  children: (
    <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      <Fpo slot="header"></Fpo>
      <Fpo ></Fpo>
      <Fpo slot="footer"></Fpo>
    </>
  )
} };
