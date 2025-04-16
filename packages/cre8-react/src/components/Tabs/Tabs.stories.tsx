import type { StoryObj } from '@storybook/react';
import { withActions } from '@storybook/addon-actions/decorator';
import { Cre8Tabs } from '../..';
import { Cre8Tab } from '../Tab/Tab';
import { Cre8TabPanel } from '../TabPanel/TabPanel';
import { Fpo } from '../../../.storybook/components/Fpo/Fpo';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';

export default {
  title: 'Cre8 Components/Tabs',
  component: Cre8Tabs,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}|^activeTab$|^emitEvent$|^handleResize$|^handleScroll$|^isEnd$|^isRTL$|^isStart$|^setIsStart$|^setIsEnd$|^tabChange$|^tabId$|^activeTab$|^isInViewport$|^setTabVariant$|^setTabAttributes$|^setActiveTab$|^setActiveTabFocus$|^setSelectedToPreviousTab$|^setSelectedToNextTab$|^removePreviousActiveTab$|^emitEvent$`)
    },
    actions: {
      handles: ['tabChange', 'tabSelected']
    }
  },
  decorators: [withActions],
  args: {
    children: (
      <>
        <Cre8Tab>Tab 1</Cre8Tab>
        <Cre8TabPanel slot="panel">
          <Fpo>Tab 1 content</Fpo>
        </Cre8TabPanel>
        <Cre8Tab>Tab 2</Cre8Tab>
        <Cre8TabPanel slot="panel">
          <Fpo>Tab 2 content</Fpo>
        </Cre8TabPanel>
        <Cre8Tab>Tab 3</Cre8Tab>
        <Cre8TabPanel slot="panel">
          <Fpo>Tab 3 content</Fpo>
        </Cre8TabPanel>
      </>
    )
  },
  argTypes: {
    size: { control: { type: 'text' } }
  }
};

export const Default: StoryObj<typeof Cre8Tabs> = { args: {} };

export const FullWidth: StoryObj<typeof Cre8Tabs> = { args: {
  fullWidth: true,
} };

export const Small: StoryObj<typeof Cre8Tabs> = { args: {
  size: 'sm'
} };

export const WithActiveIndex: StoryObj<typeof Cre8Tabs> = { args: {
  activeIndex: 1
} };

/**
 * Navigating through Tabs via scrolling is a becoming a popular interaction pattern.
 * However, it is generally only used for content heavy web sites, as opposed to table heavy software.
 * Be cautious if implementing this pattern, and be sure that it is only used where content is consistent across 
 * all Tabs and moving from one to the next would be a natural organic experience, instead of disjointed or disconnected.
 */

export const WithOverflow: StoryObj<typeof Cre8Tabs> = { args: {
  children: (
    <>
      <Cre8Tab>Tab 1</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 1 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 2</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 2 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 3</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 3 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 4</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 4 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 5</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 5 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 6</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 6 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 7</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 7 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 8</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 8 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 9</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 9 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 10</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 10 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 11</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 11 content</Fpo>
      </Cre8TabPanel>
      <Cre8Tab>Tab 12</Cre8Tab>
      <Cre8TabPanel slot="panel">
        <Fpo>Tab 12 content</Fpo>
      </Cre8TabPanel>
    </>
  )
} };
