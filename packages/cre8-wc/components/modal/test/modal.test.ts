import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../modal';
import { cre8Modal } from '../modal';

describe('modal', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8Modal>(html` <cre8-modal ariaLabel="Label">
      <cre8-heading type="title-large" slot="header">Help Modal</cre8-heading>
      <cre8-text-passage>Lorem ipsum </cre8-text-passage>
      <cre8-button-group slot="footer" orientation="responsive-full-width">
        <cre8-button variant="primary" text="Button"></cre8-button>
        <cre8-button variant="tertiary" text="Button"></cre8-button>
      </cre8-button-group>
    </cre8-modal>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with status', async () => {
        const statuses = ['error', 'warning', 'success', 'info', 'help'];

        for (const status of statuses) {
            const el = await fixture<cre8Modal>(html`<cre8-modal status="${status}"></cre8-modal>`);
            const modal = el.shadowRoot!.querySelector('.cre8-c-modal'); // Test for the class change
            expect(modal.classList.contains(`cre8-c-modal--${status}`)).toBeTruthy();
        }
    });

    test('should handle click outside', async () => {
        const el = await fixture<cre8Modal>(html`<cre8-modal ariaLabel="Label">
      <cre8-heading type="title-large" slot="header">Help Modal</cre8-heading>
      <cre8-text-passage>Lorem ipsum </cre8-text-passage>
      <cre8-button-group slot="footer" orientation="responsive-full-width">
        <cre8-button variant="primary" text="Button"></cre8-button>
        <cre8-button variant="tertiary" text="Button"></cre8-button>
      </cre8-button-group>
    </cre8-modal>`);
        await el.updateComplete;
        el.isActive = true;

        const mockClickEvent = new Event('click');
        jest.spyOn(mockClickEvent, 'composedPath').mockReturnValue([]);
        jest.spyOn(mockClickEvent, 'target', 'get').mockReturnValue(el);
        const dispatchSpy = jest.spyOn(el, 'dispatch');
        el.classList.add('cre8-c-modal');

        el.handleOnClickOutside(mockClickEvent);

        expect(el.isActive).toBeFalsy();
        expect(dispatchSpy).toHaveBeenCalled();
    });

    test('should handle keydown Escape', async () => {
        const el = await fixture<cre8Modal>(html`<cre8-modal></cre8-modal>`);
        await el.updateComplete;
        el.isActive = true;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'Escape' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);
        const dispatchSpy = jest.spyOn(el, 'dispatch');

        el.handleKeydown(mockKeydownEvent);
        expect(el.isActive).toBeFalsy();
        expect(dispatchSpy).toHaveBeenCalled();
    });

    test('modal update', async () => {
        const el = await fixture<cre8Modal>(html` <cre8-modal></cre8-modal>`);
        const updateSpy = jest.spyOn(el, 'updated');

        el.isActive = false;
        el.isActive = true;
        await el.updateComplete;

        const modal = el.shadowRoot!.querySelector('.cre8-c-modal'); // Test for the class change

        expect(updateSpy).toHaveBeenCalled();
        expect(modal.classList.contains('cre8-is-active')).toBeTruthy();
    });

    test('modal disconnect', async () => {
        const el = await fixture<cre8Modal>(html`<cre8-modal></cre8-modal>`);
        el.isActive = true;
        const dispatchSpy = jest.spyOn(el, 'dispatch');

        el.disconnectedCallback();

        expect(el.isActive).toBeFalsy();
        expect(dispatchSpy).toHaveBeenCalledTimes(0);
    });
});
