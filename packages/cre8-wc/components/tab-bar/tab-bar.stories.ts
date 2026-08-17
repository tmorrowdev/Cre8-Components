import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../tab-bar-item/tab-bar-item';
import './tab-bar';

/**
 * The bar is `position: fixed` by design, so every story pins it to the bottom
 * of the preview frame. `fixed=false` shows it in flow, which is how you would
 * embed it inside a device frame that already positions it.
 */
const icon = (paths: string[]) => html`
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
       stroke-linecap="round" stroke-linejoin="round">
    ${paths.map((d) => html`<path d="${d}"></path>`)}
  </svg>
`;

const HOME = ['M3 11.5 12 4l9 7.5', 'M5.5 10v9.5h13V10'];
const SEARCH = ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'm16.5 16.5 4 4'];
const CHART = ['M3 16.5l5-5 3.5 3.5L21 6', 'M21 6h-5m5 0v5'];
const PROFILE = ['M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4.5 20.5a7.5 7.5 0 0 1 15 0'];

export default {
  title: 'cre8 Components/Tab Bar',
  component: 'cre8-tab-bar',
  render: (args) => html`
    <cre8-tab-bar ${spread(args)}>
      <cre8-tab-bar-item label="Home" value="home">${icon(HOME)}</cre8-tab-bar-item>
      <cre8-tab-bar-item label="Search" value="search">${icon(SEARCH)}</cre8-tab-bar-item>
      <cre8-tab-bar-item label="Activity" value="activity">${icon(CHART)}</cre8-tab-bar-item>
      <cre8-tab-bar-item label="Profile" value="profile">${icon(PROFILE)}</cre8-tab-bar-item>
    </cre8-tab-bar>`,
  parameters: {
    status: { type: 'inProgress' },
    actions: { handles: ['tab-bar-select'] },
    docs: {
      description: {
        component:
          'A bottom tab bar, in the shape iOS expects. Not a substitute for `cre8-tabs`: ' +
          'a tab strip sits above its content and scrolls away with the page, while a tab ' +
          'bar is pinned to the bottom for the life of the app, sits inside the thumb’s ' +
          'reach, and navigates the whole application rather than one screen. The bar owns ' +
          'its items’ state — it assigns each an index and clears the others on ' +
          'selection — so a host listens for one event and never syncs item state by hand.',
      },
    },
  },
  argTypes: {
    activeIndex: { control: { type: 'number' }, description: 'Index of the selected item.' },
    label: { control: { type: 'text' }, description: 'Accessible name for the navigation landmark.' },
    fixed: { control: { type: 'boolean' }, description: 'Pin to the bottom of the viewport.' },
  },
  args: {
    activeIndex: 0,
    label: 'Main',
    fixed: true,
  },
};

export const Default = {};

export const SecondSelected = {
  args: { activeIndex: 1 },
};

/** In flow rather than pinned, for embedding in a frame that positions it. */
export const InFlow = {
  args: { fixed: false },
};

/** A count on a destination. Anything above 99 renders as "99+". */
export const WithBadge = {
  render: (args) => html`
    <cre8-tab-bar ${spread(args)}>
      <cre8-tab-bar-item label="Home" value="home">${icon(HOME)}</cre8-tab-bar-item>
      <cre8-tab-bar-item label="Activity" value="activity" .badge=${3}>${icon(CHART)}</cre8-tab-bar-item>
      <cre8-tab-bar-item label="Profile" value="profile" .badge=${128}>${icon(PROFILE)}</cre8-tab-bar-item>
    </cre8-tab-bar>`,
};
