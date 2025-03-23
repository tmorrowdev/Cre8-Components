import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../field';
import { cre8Field } from '../field';

jest.mock('nanoid');

describe('cre8Field', () => {
    test('renders default field with label', async () => {
        const el = await fixture<cre8Field>(html` <cre8-field label="Label"></cre8-field> `);

        expect(el.label).toBe('Label');
        expect(el.value).toBeUndefined();
        expect(el.required).toBeUndefined();
        expect(el.disabled).toBeUndefined();
        expect(el.isError).toBeFalsy();
        expect(el.isSuccess).toBeFalsy();

        const input = el.shadowRoot.querySelector('input');
        expect(input.getAttribute('type')).toBe('text');
        expect(input.getAttribute('name')).toBeNull();
        expect(input.getAttribute('value')).toBeNull();
        expect(input.getAttribute('placeholder')).toBeNull();
        expect(input.getAttribute('required')).toBeNull();
        expect(input.getAttribute('disabled')).toBeNull();

        const label = el.shadowRoot.querySelector('.cre8-c-field__label');
        expect(label.textContent).toBe('Label');
    });

    test('renders field with provided attributes', async () => {
        const el = await fixture<cre8Field>(html`
            <cre8-field
                label="Email"
                type="email"
                name="email"
                value="john@example.com"
                placeholder="Enter your email"
                required disabled
            >
            </cre8-field>`);

        expect(el.label).toBe('Email');
        expect(el.value).toBe('john@example.com');
        expect(el.required).toBeTruthy();
        expect(el.disabled).toBeTruthy();
        expect(el.isError).toBeFalsy();
        expect(el.isSuccess).toBeFalsy();

        const input = el.shadowRoot.querySelector('input');
        expect(input.getAttribute('type')).toBe('email');
        expect(input.getAttribute('name')).toBe('email');
        expect(input.getAttribute('placeholder')).toBe('Enter your email');
        expect(input.hasAttribute('required')).toBeTruthy();
        expect(input.hasAttribute('disabled')).toBeTruthy();

        const label = el.shadowRoot.querySelector('.cre8-c-field__label');
        expect(label.textContent).toBe('Email');
    });

    test('handles input event', async () => {
        const el = await fixture<cre8Field>(html` <cre8-field label="Label"></cre8-field> `);

        const input = el.shadowRoot.querySelector('input');
        input.value = 'value';
        input.dispatchEvent(new Event('input'));
        expect(el.value).toBe('value');
    });

    test('renders field note when provided', async () => {
        const el = await fixture<cre8Field>(html` <cre8-field label="Label" fieldNote="Field note"></cre8-field> `);

        const fieldNote = el.shadowRoot.querySelector('.cre8-c-field__field-note').textContent;
        expect(fieldNote).toBe('Field note');
    });

    test('renders success field note when isSuccess is true', async () => {
        const el = await fixture<cre8Field>(html`
      <cre8-field label="Label" fieldNote="This is a field note" isSuccess successNote="Success message"></cre8-field>
    `);
        expect(el.isSuccess).toBeTruthy();
        const successFieldNote = el.shadowRoot.querySelector('.cre8-c-field__field-note-success')
            .textContent.replace(/\s/g, '');
        const successMessage = 'Success message';
        expect(successFieldNote).toEqual(successMessage.replace(/\s/g, ''));

        const successIcon = el.shadowRoot.querySelector('.cre8-c-field__icon-success');
        expect(successIcon).toBeDefined();
    });

    test('renders error field note when isError is true', async () => {
        const el = await fixture<cre8Field>(html`
            <cre8-field
                label="Label"
                isError
                errorText="Error"
                errorNote="Error message"
            >
            </cre8-field> `);
        expect(el.isError).toBeTruthy();
        const errorFieldNote = el.shadowRoot
            .querySelector('.cre8-c-field__field-note-error').textContent.replace(/\s/g, '');
        const errorMessage = 'Error message';
        expect(errorFieldNote).toEqual(errorMessage.replace(/\s/g, ''));
    });
    describe('accessibility tests', () => {
        test('should accessible with default values', async () => {
            const el = await fixture<cre8Field>(html` <cre8-field label="Label"></cre8-field> `);
            return expect(el).toBeAccessible();
        });
        test('disable state should accessible', async () => {
            const el = await fixture<cre8Field>(html` <cre8-field label="Label" disabled="true"></cre8-field> `);
            return expect(el).toBeAccessible();
        });
        test('success note should accessible', async () => {
            const el = await fixture<cre8Field>(html`
                <cre8-field
                    label="Label"
                    fieldNote="This is a field note"
                    isSuccess
                    successNote="Success message"
                >
                </cre8-field>`);
            return expect(el).toBeAccessible();
        });
        test('error note should accessible', async () => {
            const el = await fixture<cre8Field>(html`
                <cre8-field
                    label="Label"
                    isError
                    errorText="Error"
                    errorNote="Error message"
                >
                </cre8-field>`);
            return expect(el).toBeAccessible();
        });
    });
});
