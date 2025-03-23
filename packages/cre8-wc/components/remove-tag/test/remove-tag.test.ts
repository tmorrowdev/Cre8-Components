import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../remove-tag';
import { Shape, Color } from '../remove-tag';
import { cre8RemoveTag } from '../remove-tag';

describe('remove-tag', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8RemoveTag>(html`<cre8-remove-tag text="Default"></cre8-remove-tag>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with color', async () => {
        const colors = [Color.Neutral, Color.Branded, Color.NeutralHybrid];

        for (const color of colors) {
            const el = await fixture<cre8RemoveTag>(html`<cre8-remove-tag color="${color}"></cre8-remove-tag>`);
            const removeTag = el.shadowRoot!.querySelector('.cre8-c-remove-tag'); // Test for the class change
            expect(removeTag.classList.contains(`cre8-c-remove-tag--${color}`)).toBeTruthy();
        }
    });

    test('has the correct class names with shape', async () => {
        const shapes = [Shape.Round, Shape.Square];

        for (const shape of shapes) {
            const el = await fixture<cre8RemoveTag>(html`<cre8-remove-tag shape="${shape}"></cre8-remove-tag>`);
            const removeTag = el.shadowRoot!.querySelector('.cre8-c-remove-tag'); // Test for the class change
            expect(removeTag.classList.contains(`cre8-c-remove-tag--${shape}`)).toBeTruthy();
        }
    });

    test('dispatches an event when clicked', async () => {
        const el = await fixture(html`<cre8-remove-tag text="test tag"></cre8-remove-tag>`);
        const clickButton = () => el.shadowRoot.querySelector('button').click();
        setTimeout(clickButton);
        const listener = await oneEvent(el, 'click');
        expect(listener).toBeTruthy();
    });

    describe('accessibility -  Remove Tag', () => {
        test('tests accessibility for default remove tag', async () => {
            const el = await fixture<cre8RemoveTag>(html`<cre8-remove-tag text="Default"></cre8-remove-tag>`);
            return expect(el).toBeAccessible();
        });
    });
});
