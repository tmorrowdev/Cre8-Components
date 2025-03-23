import { html } from 'lit';
import { spread } from '../../directives/spread';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sanitizeInput } from '../../utilities/story-helpers';
import { withActions } from '@storybook/addon-actions/decorator';
import '../tab-panel/tab-panel';
import '../tab/tab';
import './tabs';
import '../../.storybook/components/f-po/f-po';

export default {
  title: 'cre8 Components/Tabs',
  component: 'cre8-tabs',
  render: ({ default: slot, panel, ...args} ) => html`
    <cre8-tabs ${spread(args)}>
      ${unsafeHTML(sanitizeInput(slot, 'cre8-tab'))}
      ${unsafeHTML(sanitizeInput(panel, 'cre8-tab-panel', 'f-po'))}
    </cre8-tabs>`,
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['tabChange', 'tabSelected'],
    },
  },
  decorators: [withActions],
  argTypes: {
    activeIndex: { control: { type: 'text' } },
    size: { control: { type: 'text' } },
    activeTab: { table: { disable: true } },
    emitEvent: { table: { disable: true } },
    handleResize: { table: { disable: true } },
    handleScroll: { table: { disable: true } },
    isEnd: { table: { disable: true } },
    isRTL: { table: { disable: true } },
    isStart: { table: { disable: true } },
    setIsStart: { table: { disable: true } },
    setIsEnd: { table: { disable: true } },
    tabChange: { table: { disable: true } },
    tabId: { table: { disable: true } },
  },
};

export const Default = {
  args: {
    default: `<cre8-tab>Tab 1</cre8-tab>
      <cre8-tab>Tab 2</cre8-tab>
      <cre8-tab>Tab 3</cre8-tab>`,
    panel: `<cre8-tab-panel slot="panel">
        <f-po>Tab 1 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 2 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 3 content</f-po>
      </cre8-tab-panel>`,
  }
};

export const fullWidth = {
  args: {
    ...Default.args,
    fullWidth: true,
  }
};

export const Small = {
  args: {
    ...Default.args,
    size: 'sm',
  }
};

export const WithActiveIndex = {
  args: {
    ...Default.args,
    activeIndex: '1',
  }
};

/**
 * Navigating through Tabs via scrolling is a becoming a popular interaction pattern.
 * However, it is generally only used for content heavy web sites, as opposed to table heavy software.
 * Be cautious if implementing this pattern, and be sure that it is only used where content is consistent across
 * all Tabs and moving from one to the next would be a natural organic experience, instead of disjointed or disconnected.
 */

export const WithOverflow = {
  args: {
    default: Default.args.default +
      `<cre8-tab>Tab 4</cre8-tab>
      <cre8-tab>Tab 5</cre8-tab>
      <cre8-tab>Tab 6</cre8-tab>
      <cre8-tab>Tab 7</cre8-tab>
      <cre8-tab>Tab 8</cre8-tab>
      <cre8-tab>Tab 9</cre8-tab>
      <cre8-tab>Tab 10</cre8-tab>
      <cre8-tab>Tab 11</cre8-tab>
      <cre8-tab>Tab 12</cre8-tab>`,
    panel: Default.args.panel +
      `<cre8-tab-panel slot="panel">
        <f-po>Tab 4 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 5 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 6 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 7 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 8 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 9 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 10 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 11 content</f-po>
      </cre8-tab-panel>
      <cre8-tab-panel slot="panel">
        <f-po>Tab 12 content</f-po>
      </cre8-tab-panel>`
  }
};
