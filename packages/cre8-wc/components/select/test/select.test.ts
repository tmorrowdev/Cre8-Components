import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../select';
import { cre8Select } from '../select';

describe('select', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-select
      .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
    ></cre8-select>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('renders default select with label', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Choose an option"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);

        expect(el.label).toBe('Choose an option');
        expect(el.required).toBeUndefined();
        expect(el.disabled).toBeUndefined();
        expect(el.isError).toBeFalsy();
        expect(el.isSuccess).toBeFalsy();

        const select = el.shadowRoot.querySelector('select');
        expect(select.getAttribute('name')).toBe('');
        expect(select.hasAttribute('required')).toBeFalsy();
        expect(select.hasAttribute('disabled')).toBeFalsy();

        const label = el.shadowRoot.querySelector('.cre8-c-select__label');
        expect(label.textContent).toBe('Choose an option');
    });

    test('renders select with provided attributes and options', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Choose a color"
        name="color"
        required
        disabled
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);

        expect(el.label).toBe('Choose a color');
        expect(el.items).toEqual([
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            {
                label: 'Other Colors',
                options: [
                    { label: 'Green', value: 'green' },
                    { label: 'Yellow', value: 'yellow' },
                ],
            },
        ]);
        expect(el.required).toBeTruthy();
        expect(el.disabled).toBeTruthy();
        expect(el.isError).toBeFalsy();
        expect(el.isSuccess).toBeFalsy();

        const select = el.shadowRoot.querySelector('select');
        expect(select.getAttribute('name')).toBe('color');
        expect(select.hasAttribute('required')).toBeTruthy();
        expect(select.hasAttribute('disabled')).toBeTruthy();

        const label = el.shadowRoot.querySelector('.cre8-c-select__label');
        expect(label.textContent).toBe('Choose a color');

        const options = el.shadowRoot.querySelectorAll('option');
        expect(options).toHaveLength(4);
        expect(options[0].textContent).toBe('Red');
        expect(options[1].textContent).toBe('Blue');
        expect(options[2].textContent).toBe('Green');
        expect(options[3].textContent).toBe('Yellow');
    });

    test('handles change event', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Label"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);

        const select = el.shadowRoot.querySelector('select');
        select.options[1].selected = true;
        select.dispatchEvent(new Event('change'));
    });

    test('renders select note when provided', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Label"
        fieldNote="Field note"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);

        const selectNote = el.shadowRoot.querySelector(
            '.cre8-c-select__field-note'
        ).textContent;
        expect(selectNote).toBe('Field note');
    });

    test('renders success select note when isSuccess is true', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Label"
        isSuccess
        successNote="Success message"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        expect(el.isSuccess).toBeTruthy();
        const successFieldNote = el.shadowRoot
            .querySelector('.cre8-c-select__field-note-success')
            .textContent.replace(/\s/g, '');
        const successMessage = 'Success message';
        expect(successFieldNote).toEqual(successMessage.replace(/\s/g, ''));

        const successIcon = el.shadowRoot.querySelector(
            '.cre8-c-select__icon-success'
        );
        expect(successIcon).toBeDefined();
    });

    test('renders error select note when isError is true', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Label"
        isError
        errorNote="Error message"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        expect(el.isError).toBeTruthy();
        const errorFieldNote = el.shadowRoot
            .querySelector('.cre8-c-select__field-note-error')
            .textContent.replace(/\s/g, '');
        const errorMessage = 'Error message';
        expect(errorFieldNote).toEqual(errorMessage.replace(/\s/g, ''));
    });

    test('tests accessibility for default select', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        return expect(el).toBeAccessible();
    });

    test('tests accessibility for select with label and name attributes', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Choose a color"
        name="color"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        return expect(el).toBeAccessible();
    });

    test('tests accessibility for select with disabled attribute', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        return expect(el).toBeAccessible();
    });

    test('tests accessibility for select with label and name and disabled attributes', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Choose a color"
        name="color"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        return expect(el).toBeAccessible();
    });

    test('tests accessibility for select with fieldNote attribute', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        ariaDescribedBy="fieldnoteid"
        name="select"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      >
        <div slot="fieldNote" id="fieldnoteid">This is a field note</div>
      </cre8-select>
    `);
        return expect(el).toBeAccessible();
    });

    test('tests accessibility for select with disabled equals true', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        disabled="true"
        label="Choose a color"
        name="disabled"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        return expect(el).toBeAccessible();
    });

    test('tests accessibility for select with preselected option', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Choose a color"
        name="disabled"
        .items=${[
        { label: 'Red', value: 'red', selected: true },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        return expect(el).toBeAccessible();
    });

    test('tests that the selected attribute exists on specific option', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Label"
        isError
        errorNote="Error message"
        value="red"
        ,
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        const options = el.shadowRoot.querySelectorAll('option');
        const optionValue = options[0].value;
        const selectedValue = el.value;
        expect(optionValue).toMatch(selectedValue);
    });

    test('tests that the selected attribute is set to FALSE on specific option', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Label"
        isError
        errorNote="Error message"
        .items=${[
        { label: 'Red', value: 'red', selected: false },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        const options = el.shadowRoot.querySelectorAll('option');
        expect(options[0].hasAttribute('selected')).toBeFalsy();
    });

    test('tests that the selected attribute does NOT exist on specific option', async () => {
        const el = await fixture<cre8Select>(html`
      <cre8-select
        label="Label"
        isError
        errorNote="Error message"
        .items=${[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        {
            label: 'Other Colors',
            options: [
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
            ],
        },
    ]}
      ></cre8-select>
    `);
        const options = el.shadowRoot.querySelectorAll('option');
        expect(options[0].hasAttribute('selected')).toBeFalsy();
    });
});
