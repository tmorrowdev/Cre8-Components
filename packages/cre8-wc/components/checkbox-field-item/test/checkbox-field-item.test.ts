import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../checkbox-field-item';
import { cre8CheckboxFieldItem } from '../checkbox-field-item';

describe('checkbox-field-item', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8CheckboxFieldItem>(html`<cre8-checkbox-field-item></cre8-checkbox-field-item>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('works with fieldNote', async () => {
        const el = await fixture<cre8CheckboxFieldItem>(
            html`<cre8-checkbox-field-item fieldNote="Note" ariaDescribedBy="Note">
        <p slot="fieldNote">FieldNote</p>
      </cre8-checkbox-field-item>`
        );
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
    });

    test('works with fieldNote, no aria describe', async () => {
        const el = await fixture<cre8CheckboxFieldItem>(html`<cre8-checkbox-field-item fieldNote="Note" ?checked=${true}> </cre8-checkbox-field-item>`);
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
        await el.updateComplete;
        const input: HTMLInputElement = el.shadowRoot.querySelector('input');
        expect(input.getAttribute('aria-describedby')).toBeTruthy();
    });

    test('works with validationAriaDescribeBy and fieldNote', async () => {
        const el = await fixture<cre8CheckboxFieldItem>(
            html`<cre8-checkbox-field-item fieldNote="Note" ariaDescribedBy="Note" validationAriaDescribedBy="Note">
        <p slot="fieldNote">FieldNote</p>
      </cre8-checkbox-field-item>`
        );
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
        const input: HTMLInputElement = el.shadowRoot.querySelector('input');
        expect(input.getAttribute('aria-describedby')).toBe('Note Note');
    });

    test('has the correct class names with error', async () => {
        const el = await fixture<cre8CheckboxFieldItem>(
            html`<cre8-checkbox-field-item errorNote="Error Note" ?isError="${true}"></cre8-checkbox-field-item>`
        );

        const checkboxFieldItem = el.shadowRoot!.querySelector('.cre8-c-checkbox-field-item'); // Test for the class change
        expect(checkboxFieldItem.classList.contains('cre8-c-checkbox-field-item--error')).toBeTruthy();
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
    });

    test('has the correct class names with success', async () => {
        const el = await fixture<cre8CheckboxFieldItem>(
            html`<cre8-checkbox-field-item successNote="Success Note" ?isSuccess=${true}></cre8-checkbox-field-item>`
        );
        const checkboxFieldItem = el.shadowRoot!.querySelector('.cre8-c-checkbox-field-item'); // Test for the class change
        expect(checkboxFieldItem.classList.contains('cre8-c-checkbox-field-item--success')).toBeTruthy();
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
    });

    test('has the correct class names with disabled', async () => {
        const el = await fixture<cre8CheckboxFieldItem>(html`<cre8-checkbox-field-item ?disabled="${true}"></cre8-checkbox-field-item>`);
        const checkboxFieldItem = el.shadowRoot!.querySelector('.cre8-c-checkbox-field-item'); // Test for the class change
        expect(checkboxFieldItem.classList.contains('cre8-c-checkbox-field-item--disabled')).toBeTruthy();
    });

    test('disabled attribute is implemented correctly: is not added to the DOM when false', async () => {
      const el = await fixture<cre8CheckboxFieldItem>(html`<cre8-checkbox-field-item ?disabled="${false}"></cre8-checkbox-field-item>`);
      const checkboxFieldItem: cre8CheckboxFieldItem = el.shadowRoot!.querySelector('.cre8-c-checkbox-field-item'); // Test for the class change
      expect(checkboxFieldItem.disabled).toBeUndefined();
    });

    test('form reset', async () => {
        const el = await fixture<cre8CheckboxFieldItem>(html` <cre8-checkbox-field-item label="Label"></cre8-checkbox-field-item> `);

        el.checked = true;
        el.formResetCallback();
        expect(el.checked).toBeFalsy();
    });
    describe('accessibility tests', () => {
        test('should accessible with default values', async () => {
            const el = await fixture<cre8CheckboxFieldItem>(html`<cre8-checkbox-field-item label="Label"></cre8-checkbox-field-item>`);
            return expect(el).toBeAccessible();
        });
        test('verify accessibility for disable checkbox', async () => {
            const el = await fixture<cre8CheckboxFieldItem>(html`<cre8-checkbox-field-item label="Label" ?disabled="${true}"></cre8-checkbox-field-item>`);
            return expect(el).toBeAccessible();
        });
        test('verify accessibility for checkbox with fieldNote', async () => {
            const el = await fixture<cre8CheckboxFieldItem>(
                html`<cre8-checkbox-field-item label="Label" fieldNote="Note" ariaDescribedBy="Note">
          <p slot="fieldNote">FieldNote</p>
        </cre8-checkbox-field-item>`
            );
            return expect(el).toBeAccessible();
        });
    });
});
