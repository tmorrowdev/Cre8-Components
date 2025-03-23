import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../progress-meter';
import { cre8ProgressMeter } from '../progress-meter';

describe('progress-meter', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-progress-meter value="100"></cre8-progress-meter>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('renders correctly with fieldId', async () => {
        const el = await fixture(html`<cre8-progress-meter value="50" fieldId="Id"></cre8-progress-meter>`);
        expect(el.shadowRoot).toBeTruthy();

        const progressMeter = el.shadowRoot.querySelector('progress');
        expect(progressMeter.getAttribute('id')).toBe('Id');
    });

    test('has the correct class names with status', async () => {
        const statuses = ['error', 'warning', 'success'];

        for (const status of statuses) {
            const el = await fixture<cre8ProgressMeter>(
                html`<cre8-progress-meter status="${status}" value="100"></cre8-progress-meter>`
            );
            const progressMeter = el.shadowRoot!.querySelector('.cre8-c-progress-meter'); // Test for the class change
            expect(progressMeter.classList.contains(`cre8-c-progress-meter--${status}`)).toBeTruthy();
        }
    });

    describe('accessibility - Progress Meter', () => {
        test('tests accessibility for default Progress Meter', async () => {
            const el = await fixture<cre8ProgressMeter>(html`<cre8-progress-meter value="100"></cre8-progress-meter>`);
            return expect(el).toBeAccessible();
        });
    });
});
