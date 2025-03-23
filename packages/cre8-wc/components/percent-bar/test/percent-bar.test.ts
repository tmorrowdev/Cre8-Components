import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../percent-bar';
import '../../button/button';
import { cre8PercentBar } from '../percent-bar';

describe('percent-bar', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8PercentBar>(html`<cre8-percent-bar value="2" max="10"></cre8-percent-bar>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('dispatched event when action button clicked', async () => {
        const el = await fixture<cre8PercentBar>(html`<cre8-percent-bar value="5" max="10"></cre8-percent-bar>`);
        await el.updateComplete;

        const emitSpy = jest.spyOn(el, 'dispatchEvent');
        const emittedItem = new Event('leftActionButtonClick', { });

        const actionButton = el.shadowRoot!.querySelector('cre8-button');
        actionButton.dispatchEvent(new MouseEvent('click'));

        await el.updateComplete;
        expect(emitSpy).toHaveBeenCalledWith(emittedItem);
    });

    describe('accessibility -  Percent Bar', () => {
        test('tests accessibility for default percent bar with no action', async () => {
            const el = await fixture<cre8PercentBar>(html`<cre8-percent-bar value="1" max="10"></cre8-percent-bar>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for default percent bar with previous action', async () => {
            const el = await fixture<cre8PercentBar>(html`<cre8-percent-bar value="5" max="10"></cre8-percent-bar>`);
            return expect(el).toBeAccessible();
        });
    });
});
