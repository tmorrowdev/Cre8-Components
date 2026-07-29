import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../split-button';
import '../../button/button';
import '../../dropdown/dropdown';
import '../../dropdown-item/dropdown-item';
import { Cre8SplitButton } from '../split-button';
import { Cre8Button } from '../../button/button';

describe('split-button', () => {
    const DROPDOWN_CLICK_EVENT_TYPE = 'split-button-dropdown-click';
    const TEXT_CLICK_EVENT_TYPE = 'split-button-text-click';

    test('renders correctly', async () => {
        const el = await fixture<Cre8SplitButton>(html`<cre8-split-button></cre8-split-button>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('emits only split-button-dropdown-click event after a click on arrow-button', async () => {
        const mockTextHandler = jest.fn();
        const mockOpenHandler = jest.fn();
        const el = await fixture<Cre8SplitButton>(html`<cre8-split-button buttonText="Button">
      <cre8-dropdown>
        <cre8-dropdown-item>Item 1</cre8-dropdown-item>
        <cre8-dropdown-item>Item 2</cre8-dropdown-item>
        <cre8-dropdown-item>Item 3</cre8-dropdown-item>
      </cre8-dropdown>
    </cre8-split-button>`);
        el.addEventListener(TEXT_CLICK_EVENT_TYPE, mockTextHandler);
        el.addEventListener(DROPDOWN_CLICK_EVENT_TYPE, mockOpenHandler);

        const arrowButton: Cre8Button = el.shadowRoot.querySelector('.cre8-c-split-button__arrow-button');
        arrowButton.shadowRoot.querySelector('button').click();

        expect(mockTextHandler).not.toHaveBeenCalled();
        expect(mockOpenHandler).toHaveBeenCalled();
    });

    test('emits only split-button-text-click event after a click on text-button', async () => {
        const mockTextHandler = jest.fn();
        const mockOpenHandler = jest.fn();
        const el = await fixture<Cre8SplitButton>(html`<cre8-split-button buttonText="Button">
      <cre8-dropdown>
        <cre8-dropdown-item>Item 1</cre8-dropdown-item>
        <cre8-dropdown-item>Item 2</cre8-dropdown-item>
        <cre8-dropdown-item>Item 3</cre8-dropdown-item>
      </cre8-dropdown>
    </cre8-split-button>`);
        el.addEventListener(TEXT_CLICK_EVENT_TYPE, mockTextHandler);
        el.addEventListener(DROPDOWN_CLICK_EVENT_TYPE, mockOpenHandler);

        const textButton: Cre8Button = el.shadowRoot.querySelector('.cre8-c-split-button__text-button');
        textButton.shadowRoot.querySelector('button').click();

        expect(mockOpenHandler).not.toHaveBeenCalled();
        expect(mockTextHandler).toHaveBeenCalled();
    });

    test('also emits the deprecated text-click and dropdown-click aliases', async () => {
        const mockLegacyTextHandler = jest.fn();
        const mockLegacyDropdownHandler = jest.fn();
        const el = await fixture<Cre8SplitButton>(html`<cre8-split-button buttonText="Button">
      <cre8-dropdown>
        <cre8-dropdown-item>Item 1</cre8-dropdown-item>
      </cre8-dropdown>
    </cre8-split-button>`);
        el.addEventListener('text-click', mockLegacyTextHandler);
        el.addEventListener('dropdown-click', mockLegacyDropdownHandler);

        const textButton: Cre8Button = el.shadowRoot.querySelector('.cre8-c-split-button__text-button');
        textButton.shadowRoot.querySelector('button').click();
        expect(mockLegacyTextHandler).toHaveBeenCalled();
        expect(mockLegacyDropdownHandler).not.toHaveBeenCalled();

        const arrowButton: Cre8Button = el.shadowRoot.querySelector('.cre8-c-split-button__arrow-button');
        arrowButton.shadowRoot.querySelector('button').click();
        expect(mockLegacyDropdownHandler).toHaveBeenCalled();
    });
});
