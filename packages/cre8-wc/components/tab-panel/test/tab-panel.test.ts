import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../tab-panel';
import { cre8TabPanel } from '../tab-panel';

describe('tab-panel', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8TabPanel>(html`<cre8-tab-panel></cre8-tab-panel>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('renders tab panel with default properties', async () => {
        const el = await fixture<cre8TabPanel>(html`
            <cre8-tab-panel></cre8-tab-panel>
    `);

        const tabPanel = el.shadowRoot.querySelector('.cre8-c-tab-panel');
        expect(tabPanel.getAttribute('role')).toBe('tabpanel');
        expect(tabPanel.classList.contains('cre8-is-active')).toBeFalsy();
    });

    test('renders tab panel with custom properties', async () => {
        const el = await fixture<cre8TabPanel>(html`
            <cre8-tab-panel slot="panel" isActive></cre8-tab-panel>
    `);

        const tabPanel = el.shadowRoot.querySelector('.cre8-c-tab-panel');
        expect(tabPanel.getAttribute('role')).toBe('tabpanel');
        expect(tabPanel.classList.contains('cre8-is-active')).toBeTruthy();
    });

    test('sets tabindex to 0 when skipFocusOnPanel is false', async () => {
        const el = await fixture<cre8TabPanel>(html`
            <cre8-tab-panel></cre8-tab-panel>
    `);

        const tabPanel = el.shadowRoot.querySelector('.cre8-c-tab-panel');
        expect(tabPanel.getAttribute('tabindex')).toBe('0');
    });

    test('does not set tabindex when skipFocusOnPanel is true', async () => {
        const el = await fixture<cre8TabPanel>(html`
            <cre8-tab-panel skipFocusOnPanel></cre8-tab-panel>
    `);

        const tabPanel = el.shadowRoot.querySelector('.cre8-c-tab-panel');
        expect(tabPanel.getAttribute('tabindex')).toBeNull();
    });
});
