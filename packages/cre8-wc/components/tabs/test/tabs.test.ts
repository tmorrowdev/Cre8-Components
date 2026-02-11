import { fixture } from '@open-wc/testing-helpers';
import userEvent from '@testing-library/user-event';
import { html } from 'lit';
import '../tabs';
import { cre8Tabs } from '../tabs';
import { cre8TabPanel } from '../../tab-panel/tab-panel';
import { cre8Tab } from '../../tab/tab';

jest.mock('nanoid');

describe('tabs', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'ltr',
        });
    });

    afterEach(() => {
        delete document.dir;
    });

    test('renders tabs with default properties', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab isActive>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;

        expect(el.size).toBeUndefined();
        expect(el.tabId).toContain('cre8-tabpanel-');
        expect(el.activeIndex).toBe(0);
        expect(el.isStart).toBeTruthy();
        expect(el.isEnd).toBeFalsy();
        expect(el.isRTL).toBeFalsy();

        const header = el.shadowRoot.querySelector('.cre8-c-tabs__header');
        expect(header).toBeDefined();
        const list = el.shadowRoot.querySelector('.cre8-c-tabs__list');
        expect(list).toBeDefined();
        expect(list.getAttribute('role')).toBe('tablist');
        const slots = el.shadowRoot.querySelectorAll('slot');
        expect(slots).toHaveLength(2);
    });

    test('renders tabs with custom properties', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs
        size="sm"
        activeIndex="1"
      >
        <cre8-tab isActive>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;

        expect(el.size).toBe('sm');
        expect(el.tabId).toBe('cre8-tabpanel-2');
        expect(el.activeIndex).toBe(1);

        const header = el.shadowRoot.querySelector('.cre8-c-tabs__header');
        expect(header).toBeDefined();
        const list = el.shadowRoot.querySelector('.cre8-c-tabs__list');
        expect(list).toBeDefined();
        expect(list.getAttribute('role')).toBe('tablist');
        const slots = el.shadowRoot.querySelectorAll('slot');
        expect(slots).toHaveLength(2);
    });

    test('sets active tab on firstUpdated', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs activeIndex="1">
        <cre8-tab>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;

        expect(el.activeTab).toBeDefined();
        expect(el.activeTab.index).toBe(1);
        const activeTab = el.shadowRoot.querySelector<cre8Tab>('cre8-tab.cre8-is-active');
        expect(activeTab).toBeDefined();
        const activeTabPanel = el.shadowRoot.querySelector<cre8TabPanel>('cre8-tab-panel.cre8-is-active');
        expect(activeTabPanel).toBeDefined();
    });

    test('updates isStart state on handleResize and handleScroll', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab isActive>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;

        expect(el.isStart).toBeTruthy();
        expect(el.isEnd).toBeFalsy();

        el.handleResize();
        expect(el.isStart).toBeTruthy();
        expect(el.isEnd).toBeFalsy();

        el.handleScroll();
        expect(el.isStart).toBeTruthy();
        expect(el.isEnd).toBeFalsy();
    });

    test('updates isStart state when scrollLeft is greater than zero', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab isActive>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;

    // Create a dummy element to mock _cre8TabsHeaderList
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8TabsHeaderList', 'get').mockReturnValue(dummyPanel);
        Object.defineProperty(dummyPanel, 'scrollLeft', { value: 10 });

        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'rtl',
        });
        el.handleScroll();
        await el.updateComplete;
        expect(el.isStart).toBeTruthy();

        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'ltr',
        });
        el.handleScroll();
        await el.updateComplete;
        expect(el.isStart).toBeFalsy();
    });

    test('updates isStart state when scrollLeft is zero', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab isActive>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;

    // Create a dummy element to mock _cre8TabsHeaderList
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8TabsHeaderList', 'get').mockReturnValue(dummyPanel);
        Object.defineProperty(dummyPanel, 'scrollLeft', { value: 0 });

        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'rtl',
        });
        el.handleScroll();
        await el.updateComplete;
        expect(el.isStart).toBeFalsy();

        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'ltr',
        });
        el.handleScroll();
        await el.updateComplete;
        expect(el.isStart).toBeTruthy();
    });

    test('handles keydown events', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab tabindex="0">Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;
        const firstTab = el.querySelectorAll<cre8Tab>('cre8-tab')[0];
        const secondTab = el.querySelectorAll<cre8Tab>('cre8-tab')[1];
        const thridTab = el.querySelectorAll<cre8Tab>('cre8-tab')[2];

        jest.spyOn(document, 'activeElement', 'get').mockReturnValue(firstTab);

        userEvent.type(firstTab, '{arrowright}');
        firstTab.focus();
        firstTab.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));
        await el.updateComplete;
        expect(el.activeTab).toEqual(secondTab);

        userEvent.type(firstTab, '{arrowleft}');
        firstTab.focus();
        firstTab.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
        await el.updateComplete;
        expect(el.activeTab).toEqual(thridTab);

        userEvent.type(firstTab, '{home}');
        firstTab.focus();
        firstTab.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home', bubbles: true }));
        await el.updateComplete;
        expect(el.activeTab).toEqual(firstTab);

        userEvent.type(firstTab, '{end}');
        firstTab.focus();
        firstTab.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', bubbles: true }));
        await el.updateComplete;
        expect(el.activeTab).toEqual(thridTab);

        userEvent.type(firstTab, '{esc}');
        firstTab.focus();
        firstTab.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', bubbles: true }));
        await el.updateComplete;
    });

    test('handles keydown events when false', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab tabindex="0">Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;
        const firstTab = el.querySelectorAll<cre8Tab>('cre8-tab')[0];
        jest.spyOn(document, 'activeElement', 'get').mockReturnValue(firstTab);

        const tabPanel = el.querySelectorAll<cre8TabPanel>('cre8-tab-panel')[0];
        jest.spyOn(document, 'activeElement', 'get').mockReturnValue(tabPanel);
        userEvent.type(firstTab, '{esc}');
        firstTab.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', bubbles: true }));
        await el.updateComplete;
    });

    test('handles click events', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab tabindex="0">Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;
        const firstTab = el.querySelectorAll<cre8Tab>('cre8-tab')[0];
        const secondTab = el.querySelectorAll<cre8Tab>('cre8-tab')[1];
        const thridTab = el.querySelectorAll<cre8Tab>('cre8-tab')[2];

        firstTab.click();
        await el.updateComplete;
        expect(el.activeTab).toEqual(firstTab);

        secondTab.click();
        await el.updateComplete;
        expect(el.activeTab).toEqual(secondTab);

        thridTab.click();
        await el.updateComplete;
        expect(el.activeTab).toEqual(thridTab);
    });

    test('sets selected to previous tab', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;
        const firstTab = el.querySelectorAll<cre8Tab>('cre8-tab')[0];
        const secondTab = el.querySelectorAll<cre8Tab>('cre8-tab')[1];
        const thridTab = el.querySelectorAll<cre8Tab>('cre8-tab')[2];

        el.activeTab = firstTab;
        el.activeIndex = 0;
        el.setSelectedToPreviousTab(firstTab);
        await el.updateComplete;
        expect(el.activeTab).toEqual(thridTab);

        el.activeTab = secondTab;
        el.activeIndex = 1;
        el.setSelectedToPreviousTab(secondTab);
        await el.updateComplete;
        expect(el.activeTab).toEqual(firstTab);
    });

    test('sets selected to next tab', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;
        const firstTab = el.querySelectorAll<cre8Tab>('cre8-tab')[0];
        const secondTab = el.querySelectorAll<cre8Tab>('cre8-tab')[1];
        const thridTab = el.querySelectorAll<cre8Tab>('cre8-tab')[2];

        el.activeTab = firstTab;
        el.activeIndex = 0;
        el.setSelectedToNextTab(firstTab);
        await el.updateComplete;
        expect(el.activeTab).toEqual(secondTab);

        el.activeTab = thridTab;
        el.activeIndex = 3;
        el.setSelectedToNextTab(thridTab);
        await el.updateComplete;
        expect(el.activeTab).toEqual(firstTab);
    });

    test('should set isEnd to true when isInViewport returns true', async () => {
        const el = await fixture<cre8Tabs>(html`
      <cre8-tabs>
        <cre8-tab>Tab 1</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 1</cre8-tab-panel>
        <cre8-tab>Tab 2</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 2</cre8-tab-panel>
        <cre8-tab>Tab 3</cre8-tab>
        <cre8-tab-panel slot="panel">Tab content 3</cre8-tab-panel>
      </cre8-tabs>
    `);
        await el.updateComplete;
        jest.spyOn(el, 'isInViewport').mockReturnValue(true);
        el.setIsEnd();
        expect(el.isEnd).toBeTruthy;
    });
});
