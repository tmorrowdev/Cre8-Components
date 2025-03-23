import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../tab';
import '../../tabs/tabs';
import '../../tab-panel/tab-panel';
import { cre8Tab } from '../tab';

describe('tab', () => {
  test('renders correctly', async () => {
    const el = await fixture<cre8Tab>(html`<cre8-tab></cre8-tab>`);
    expect(el.shadowRoot).toBeTruthy();
  });

  test('renders tab with default properties', async () => {
    const el = await fixture<cre8Tab>(html`
      <cre8-tab></cre8-tab>
    `);

    const tab = el.shadowRoot.querySelector('.cre8-c-tab');
    expect(tab.getAttribute('role')).toBe('tab');
    expect(tab.getAttribute('tabindex')).toBe('-1');
    expect(tab.getAttribute('aria-selected')).toBe('false');
    expect(tab.getAttribute('type')).toBe('button');
    expect(tab.classList.contains('cre8-is-active')).toBeFalsy();
    expect(tab.classList.contains('cre8-c-tab--small')).toBeFalsy();
  });

  test('renders tab with custom properties', async () => {
    const el = await fixture<cre8Tab>(html`
      <cre8-tab
        size="sm"
        isActive
        index="0"
        ariaLabelledBy="label-id"
      ></cre8-tab>
    `);
    const tab = el.shadowRoot.querySelector('.cre8-c-tab');
    expect(tab.getAttribute('role')).toBe('tab');
    expect(tab.getAttribute('tabindex')).toBe('0');
    expect(tab.getAttribute('aria-selected')).toBe('true');
    expect(tab.getAttribute('type')).toBe('button');
    expect(tab.classList.contains('cre8-is-active')).toBeTruthy();
    expect(tab.classList.contains('cre8-c-tab--small')).toBeTruthy();

    el.isActive = false;
    await el.updateComplete;
    expect(tab.getAttribute('tabindex')).toBe('-1');
    expect(tab.getAttribute('aria-selected')).toBe('false');
  });

  test('sets tab ID with ariaLabelledBy value', async () => {
    const el = await fixture<cre8Tab>(html`
      <cre8-tab ariaLabelledBy="label-id"></cre8-tab>
    `);

    const tab = el.shadowRoot.querySelector('.cre8-c-tab');
    expect(tab.getAttribute('id')).toBe('label-id');
  });

  test('dispatches tabSelected event on click', async () => {
    const el = await fixture<cre8Tab>(html`
      <cre8-tab></cre8-tab>
    `);

    const tabClick = () => el.shadowRoot.querySelector<HTMLButtonElement>('.cre8-c-tab').click();
    setTimeout(tabClick);
    const listener = await oneEvent(el, 'tabSelected');
    expect(listener).toBeTruthy();
  });

  describe('accessibility tests', () => {
    test('checking component is accessible', async () => {
      const el = await fixture<cre8Tab>(html`
      <cre8-tabs>
        <cre8-tab>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
      `);
      return expect(el).toBeAccessible();
    });

    test('checking active tab is accessible', async () => {
      const el = await fixture<cre8Tab>(html`
      <cre8-tabs>
        <cre8-tab isActive>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
      `);
      return expect(el).toBeAccessible();
    });

    test('checking active panel is accessible', async () => {
      const el = await fixture<cre8Tab>(html`
      <cre8-tabs>
        <cre8-tab isActive>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel" isActive>Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
      `);
      return expect(el).toBeAccessible();
    });

    test('checking Tabs active index is accessible', async () => {
      const el = await fixture<cre8Tab>(html`
      <cre8-tabs activeindex="1">
        <cre8-tab>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
      `);
      return expect(el).toBeAccessible();
    });

    test('checking Tabs overflow is accessible', async () => {
      const el = await fixture<cre8Tab>(html`
      <cre8-tabs activeindex="1">
        <cre8-tab isActive>Tab 1</cre8-tab>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab>Tab 4</cre8-tab>
        <cre8-tab>Tab 5</cre8-tab>
        <cre8-tab>Tab 6</cre8-tab>
        <cre8-tab>Tab 7</cre8-tab>
        <cre8-tab>Tab 8</cre8-tab>
        <cre8-tab>Tab 9</cre8-tab>
        <cre8-tab>Tab 10</cre8-tab>
        <cre8-tab>Tab 11</cre8-tab>
        <cre8-tab>Tab 12</cre8-tab>
        <cre8-tab-panel slot="panel" isActive>Tab content 1</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 4</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 5</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 6</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 7</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 8</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 9</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 10</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 11</cre8-tab-panel>
        <cre8-tab-panel slot="panel">Tab content 12</cre8-tab-panel>
      </cre8-tabs>
      `);
      return expect(el).toBeAccessible();
    });
  });
});
