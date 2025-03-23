import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../icon';
import { cre8IconLegacy } from '../icon';

describe('icon', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8IconLegacy>(html`<cre8-icon-legacy name="help" iconTitle="Help"></cre8-icon-legacy>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    describe('accessibility -  Icon', () => {
        test('tests accessibility for default icon', async () => {
            const el = await fixture<cre8IconLegacy>(html`<cre8-icon-legacy name="help" iconTitle="Help"></cre8-icon-legacy>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for with an aria-label icon', async () => {
            const el = await fixture<cre8IconLegacy>(html`<cre8-icon-legacy name="testName" iconTitle="Help"></cre8-icon-legacy>`);
            return expect(el).toBeAccessible();
        });
    });
});
