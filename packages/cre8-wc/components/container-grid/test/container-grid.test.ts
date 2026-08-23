import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../container-grid';
import { Cre8ContainerGrid } from '../container-grid';

describe('container-grid', () => {
    test('renders correctly', async () => {
        const el = await fixture<Cre8ContainerGrid>(html`<cre8-container-grid></cre8-container-grid>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with variant', async () => {
        const variants = ['side-by-side', '2up', '3up', '1-3up', '4up', '1-4up', '1-2-4up', '2-4-6up'];

        for (const variant of variants) {
            const el = await fixture<Cre8ContainerGrid>(html`<cre8-container-grid variant="${variant}"></cre8-container-grid>`);
            const grid = el.shadowRoot!.querySelector('.cre8-c-container-grid');
            expect(grid.classList.contains(`cre8-c-container-grid--${variant}`)).toBeTruthy();
        }
    });

    test('has the correct class names with gap', async () => {
        const gaps = ['none', 'sm', 'lg'];

        for (const gap of gaps) {
            const el = await fixture<Cre8ContainerGrid>(html`<cre8-container-grid gap="${gap}"></cre8-container-grid>`);
            const grid = el.shadowRoot!.querySelector('.cre8-c-container-grid');
            expect(grid.classList.contains(`cre8-c-container-grid--gap-${gap}`)).toBeTruthy();
        }
    });

    test('has the correct class names with break', async () => {
        const breaks = ['faster', 'slower'];

        for (const brk of breaks) {
            const el = await fixture<Cre8ContainerGrid>(html`<cre8-container-grid break="${brk}"></cre8-container-grid>`);
            const grid = el.shadowRoot!.querySelector('.cre8-c-container-grid');
            expect(grid.classList.contains(`cre8-c-container-grid--break-${brk}`)).toBeTruthy();
        }
    });

    describe('accessibility - Container Grid', () => {
        test('tests accessibility for a simple composed container grid', async () => {
            const el = await fixture<Cre8ContainerGrid>(html`<cre8-container-grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </cre8-container-grid>`);
            return expect(el).toBeAccessible();
        });
    });
});
