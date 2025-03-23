import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../table';
import { cre8Table } from '../table';

describe('table', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-table></cre8-table>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct caption text', async () => {
        const el = await fixture<cre8Table>(html`<cre8-table caption="Custom caption test"></cre8-table>`);
        const caption = el.shadowRoot.querySelector('.cre8-c-table__caption') as HTMLElement;
        expect(caption.textContent.trim()).toBe('Custom caption test');
    });

    describe('has the correct class names', () => {
        test('behavior', async () => {
            const behaviors = ['responsive'];

            for (const behavior of behaviors) {
                const el = await fixture<cre8Table>(
                    html`<cre8-table behavior="${behavior}"></cre8-table>`
                );
                const table = el.shadowRoot!.querySelector('.cre8-c-table');
                expect(table.classList.contains(`cre8-c-table--${behavior}`)).toBeTruthy();
            }
        });

        test('isHoverable', async () => {
            const el = await fixture<cre8Table>(html`<cre8-table isHoverable></cre8-table>`);
            const table = el.shadowRoot.querySelector('.cre8-c-table');
            expect(table.classList.contains('cre8-c-table--hoverable')).toBeTruthy();
        });
    });
});
