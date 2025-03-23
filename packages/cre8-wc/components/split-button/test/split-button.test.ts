import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../split-button';
import '../../button/button';
import '../../dropdown/dropdown';
import '../../dropdown-item/dropdown-item';
import { cre8SplitButton } from '../split-button';
import { cre8Button } from '../../button/button';

describe('split-button', () => {
    const DROPDOWN_CLICK_EVENT_TYPE = 'dropdown-click';
    const TEXT_CLICK_EVENT_TYPE = 'text-click';

    test('renders correctly', async () => {
        const el = await fixture<cre8SplitButton>(html`<cre8-split-button></cre8-split-button>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('emits only dropdown-click event after a click on arrow-button', async () => {
        const mockTextHandler = jest.fn();
        const mockOpenHandler = jest.fn();
        const el = await fixture<cre8SplitButton>(html`<cre8-split-button buttonText="Button">
      <cre8-dropdown>
        <cre8-dropdown-item>Item 1</cre8-dropdown-item>
        <cre8-dropdown-item>Item 2</cre8-dropdown-item>
        <cre8-dropdown-item>Item 3</cre8-dropdown-item>
      </cre8-dropdown>
    </cre8-split-button>`);
        el.addEventListener(TEXT_CLICK_EVENT_TYPE, mockTextHandler);
        el.addEventListener(DROPDOWN_CLICK_EVENT_TYPE, mockOpenHandler);

        const arrowButton: cre8Button = el.shadowRoot.querySelector('.cre8-c-split-button__arrow-button');
        arrowButton.shadowRoot.querySelector('button').click();

        expect(mockTextHandler).not.toHaveBeenCalled();
        expect(mockOpenHandler).toHaveBeenCalled();
    });

    test('emits only text-click event after a click on text-button', async () => {
        const mockTextHandler = jest.fn();
        const mockOpenHandler = jest.fn();
        const el = await fixture<cre8SplitButton>(html`<cre8-split-button buttonText="Button">
      <cre8-dropdown>
        <cre8-dropdown-item>Item 1</cre8-dropdown-item>
        <cre8-dropdown-item>Item 2</cre8-dropdown-item>
        <cre8-dropdown-item>Item 3</cre8-dropdown-item>
      </cre8-dropdown>
    </cre8-split-button>`);
        el.addEventListener(TEXT_CLICK_EVENT_TYPE, mockTextHandler);
        el.addEventListener(DROPDOWN_CLICK_EVENT_TYPE, mockOpenHandler);

        const textButton: cre8Button = el.shadowRoot.querySelector('.cre8-c-split-button__text-button');
        textButton.shadowRoot.querySelector('button').click();

        expect(mockOpenHandler).not.toHaveBeenCalled();
        expect(mockTextHandler).toHaveBeenCalled();
    });
});
