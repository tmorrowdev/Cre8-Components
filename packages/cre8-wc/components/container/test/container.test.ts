import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../container';
import { Cre8Container } from '../container';

describe('container', () => {
    test('renders correctly', async () => {
        const el = await fixture<Cre8Container>(html`<cre8-container></cre8-container>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('establishes inline-size containment by default', async () => {
        const el = await fixture<Cre8Container>(html`<cre8-container></cre8-container>`);
        const container = el.shadowRoot!.querySelector('.cre8-c-container');
        expect(container.classList.contains('cre8-c-container--size')).toBeFalsy();
        expect(container.classList.contains('cre8-c-container--normal')).toBeFalsy();
    });

    test('has the correct class name for the size type', async () => {
        const el = await fixture<Cre8Container>(html`<cre8-container type="size"></cre8-container>`);
        const container = el.shadowRoot!.querySelector('.cre8-c-container');
        expect(container.classList.contains('cre8-c-container--size')).toBeTruthy();
    });

    test('has the correct class name for the normal type', async () => {
        const el = await fixture<Cre8Container>(html`<cre8-container type="normal"></cre8-container>`);
        const container = el.shadowRoot!.querySelector('.cre8-c-container');
        expect(container.classList.contains('cre8-c-container--normal')).toBeTruthy();
    });

    test('sets container-name from the name property', async () => {
        const el = await fixture<Cre8Container>(html`<cre8-container name="sidebar"></cre8-container>`);
        const container = el.shadowRoot!.querySelector('.cre8-c-container') as HTMLElement;
        expect(container.style.getPropertyValue('container-name') || container.getAttribute('style')).toContain('sidebar');
    });

    describe('accessibility - Container', () => {
        test('tests accessibility for a simple composed container', async () => {
            const el = await fixture<Cre8Container>(html`<cre8-container><p>Content</p></cre8-container>`);
            return expect(el).toBeAccessible();
        });
    });
});
