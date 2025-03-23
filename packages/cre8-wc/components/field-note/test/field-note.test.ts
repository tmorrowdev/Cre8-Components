import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../field-note';
import { cre8FieldNote } from '../field-note';

describe('cre8FieldNote', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8FieldNote>(html` <cre8-field-note>Info</cre8-field-note> `);
        expect(el.shadowRoot).toBeTruthy();
    });
    test('has the correct class names with error', async () => {
        const el = await fixture<cre8FieldNote>(html`<cre8-field-note ?isError="${true}">error message</cre8-field-note>`);
        const fieldNoteItem = el.shadowRoot!.querySelector('.cre8-c-field-note');
        expect(fieldNoteItem.classList.contains('cre8-is-error')).toBeTruthy();
    });
    test('has the correct class names with success', async () => {
        const el = await fixture<cre8FieldNote>(html`<cre8-field-note ?isSuccess="${true}">success message</cre8-field-note>`);
        const fieldNoteItem = el.shadowRoot!.querySelector('.cre8-c-field-note');
        expect(fieldNoteItem.classList.contains('cre8-is-success')).toBeTruthy();
    });
    test('renders icon', async () => {
        const el = await fixture<cre8FieldNote>(html`<cre8-field-note ?isSuccess="${true}">success message</cre8-field-note>`);
        const icon = el.shadowRoot!.querySelector('cre8-icon');
        expect(icon).toBeTruthy();
    });
    describe('accessibility tests', () => {
        test('should accessible with default props', async () => {
            const el = await fixture<cre8FieldNote>(html` <cre8-field-note>Info</cre8-field-note> `);
            return expect(el).toBeAccessible();
        });
        test('should accessible when note has icon', async () => {
            const el = await fixture<cre8FieldNote>(html` <cre8-field-note ?isSuccess="${true}">Info</cre8-field-note> `);
            return expect(el).toBeAccessible();
        });
        test('should accessible with success note', async () => {
            const el = await fixture<cre8FieldNote>(html` <cre8-field-note ?isSuccess="true">Info</cre8-field-note> `);
            return expect(el).toBeAccessible();
        });
    });
});
