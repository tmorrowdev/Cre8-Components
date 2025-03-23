/* eslint-disable max-len */
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { cre8DatePicker } from '../date-picker';
import '../date-picker';

jest.mock('nanoid');

describe('cre8DatePicker', () => {
    test('renders default date-picker with label', async () => {
        const el = await fixture<cre8DatePicker>(html` <cre8-date-picker label="Label"></cre8-date-picker> `);

        expect(el.label).toBe('Label');
        expect(el.value).toBeUndefined();
        expect(el.required).toBeUndefined();
        expect(el.disabled).toBeUndefined();
        expect(el.isError).toBeFalsy();
        expect(el.isSuccess).toBeFalsy();

        const input = el.shadowRoot.querySelector('input');
        expect(input.getAttribute('type')).toBe('date');
        expect(input.getAttribute('name')).toBeNull();
        expect(input.getAttribute('value')).toBeNull();
        expect(input.getAttribute('placeholder')).toBeNull();
        expect(input.getAttribute('required')).toBeNull();
        expect(input.getAttribute('disabled')).toBeNull();

        const label = el.shadowRoot.querySelector('.cre8-c-date-picker__label');
        expect(label.textContent).toBe('Label');
    });

    test('renders date-picker with provided attributes', async () => {
        const el = await fixture<cre8DatePicker>(html`
      <cre8-date-picker label="Date" name="date" value="01/01/2001" placeholder="Enter Date" required disabled></cre8-date-picker>
    `);

        expect(el.label).toBe('Date');
        expect(el.value).toBe('01/01/2001');
        expect(el.required).toBeTruthy();
        expect(el.disabled).toBeTruthy();
        expect(el.isError).toBeFalsy();
        expect(el.isSuccess).toBeFalsy();

        const input = el.shadowRoot.querySelector('input');
        expect(input.getAttribute('type')).toBe('date');
        expect(input.getAttribute('name')).toBe('date');
        expect(input.getAttribute('placeholder')).toBe('Enter Date');
        expect(input.hasAttribute('required')).toBeTruthy();
        expect(input.hasAttribute('disabled')).toBeTruthy();

        const label = el.shadowRoot.querySelector('.cre8-c-date-picker__label');
        expect(label.textContent).toBe('Date');
    });

    test('handles input event', async () => {
        const el = await fixture<cre8DatePicker>(html` <cre8-date-picker label="Label"></cre8-date-picker> `);

        const input = el.shadowRoot.querySelector('input');
        input.value = '2024-05-15';
        input.dispatchEvent(new Event('input'));
        expect(el.value).toBe('2024-05-15');
    });

    describe('accessibility tests', () => {
        test('should be accessible with default values', async () => {
            const el = await fixture<cre8DatePicker>(html` <cre8-date-picker label="Label"></cre8-date-picker> `);
            return expect(el).toBeAccessible();
        });
        test('disable state should be accessible', async () => {
            const el = await fixture<cre8DatePicker>(html` <cre8-date-picker label="Label" disabled="true"></cre8-date-picker> `);
            return expect(el).toBeAccessible();
        });
        test('readon;ly state should be accessible', async () => {
            const el = await fixture<cre8DatePicker>(html` <cre8-date-picker label="Label" readonly="true"></cre8-date-picker> `);
            return expect(el).toBeAccessible();
        });
        test('success note should be accessible', async () => {
            const el = await fixture<cre8DatePicker>(html` <cre8-date-picker label="Label" fieldNote="This is a field note" isSuccess successNote="Success message"></cre8-date-picker>`);
            return expect(el).toBeAccessible();
        });
        test('error note should be accessible', async () => {
            const el = await fixture<cre8DatePicker>(html` <cre8-date-picker label="Label" isError errorText="Error" errorNote="Error message"></cre8-date-picker> `);
            return expect(el).toBeAccessible();
        });
    });
});
