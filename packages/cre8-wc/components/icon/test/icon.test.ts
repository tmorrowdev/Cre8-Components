import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../icon';
import { Cre8Icon } from '../icon';

describe('icon', () => {
    test('renders correctly', async () => {
        const el = await fixture<Cre8Icon>(html`<cre8-icon name="help" iconTitle="Help"></cre8-icon>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    describe('accessibility -  Icon', () => {
        test('tests accessibility for default icon', async () => {
            const el = await fixture<Cre8Icon>(html`<cre8-icon name="help" iconTitle="Help"></cre8-icon>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for with an aria-label icon', async () => {
            const el = await fixture<Cre8Icon>(html`<cre8-icon name="testName" iconTitle="Help"></cre8-icon>`);
            return expect(el).toBeAccessible();
        });
    });
});
