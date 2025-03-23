import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../radio-field-item';
import { cre8RadioFieldItem } from '../radio-field-item';
import '../../radio-field/radio-field';
import { cre8RadioField } from '../../radio-field/radio-field';

describe('radio-field-item', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8RadioFieldItem>(html`<cre8-radio-field-item></cre8-radio-field-item>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with error', async () => {
        const el = await fixture<cre8RadioFieldItem>(html`<cre8-radio-field-item ?isError="${true}"></cre8-radio-field-item>`);
        const radioFieldItem = el.shadowRoot!.querySelector('.cre8-c-radio-field-item'); // Test for the class change
        expect(radioFieldItem.classList.contains('cre8-c-radio-field-item--error')).toBeTruthy();
    });

    test('has the correct class names with success', async () => {
        const el = await fixture<cre8RadioFieldItem>(html`<cre8-radio-field-item ?isSuccess="${true}"></cre8-radio-field-item>`);
        const radioFieldItem = el.shadowRoot!.querySelector('.cre8-c-radio-field-item'); // Test for the class change
        expect(radioFieldItem.classList.contains('cre8-c-radio-field-item--success')).toBeTruthy();
    });

    test('has the correct class names with disabled', async () => {
        const el = await fixture<cre8RadioFieldItem>(html`<cre8-radio-field-item ?disabled="${true}"></cre8-radio-field-item>`);
        const radioFieldItem = el.shadowRoot!.querySelector('.cre8-c-radio-field-item'); // Test for the class change
        expect(radioFieldItem.classList.contains('cre8-c-radio-field-item--disabled')).toBeTruthy();
    });

    test('renders field note when provided', async () => {
        const el = await fixture<cre8RadioFieldItem>(html` <cre8-radio-field-item label="Label" fieldNote="Field note"></cre8-radio-field-item> `);

        const fieldNote = el.shadowRoot.querySelector('cre8-field-note').textContent;
        expect(fieldNote).toContain('Field note');
    });

    test('should handle keydown ArrowDown', async () => {
        const el = await fixture<cre8RadioField>(html`<cre8-radio-field label="Legend">
            <cre8-radio-field-item label="1"></cre8-radio-field-item>
            <cre8-radio-field-item label="2"></cre8-radio-field-item>
            <cre8-radio-field-item label="3"></cre8-radio-field-item>
        </cre8-radio-field>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8RadioFieldItem = el.querySelector<cre8RadioFieldItem>('[label="1"]');

        topItem.handleKeyDown(mockKeydownEvent);
        expect(topItem.checked).toBeFalsy();
    });

    test('should handle keydown ArrowUp', async () => {
        const el = await fixture<cre8RadioField>(html`<cre8-radio-field label="Legend">
            <cre8-radio-field-item label="1"></cre8-radio-field-item>
            <cre8-radio-field-item label="2"></cre8-radio-field-item>
            <cre8-radio-field-item label="3"></cre8-radio-field-item>
        </cre8-radio-field>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8RadioFieldItem = el.querySelector<cre8RadioFieldItem>('[label="1"]');
        const middleItem: cre8RadioFieldItem = el.querySelector<cre8RadioFieldItem>('[label="2"]');

        middleItem.handleKeyDown(mockKeydownEvent);
        expect(topItem.checked).toBeTruthy();
    });

    test('should not tab to unchecked radio buttons', async () => {
        const el = await fixture<cre8RadioField>(html`<cre8-radio-field label="Legend">
            <cre8-radio-field-item label="1"></cre8-radio-field-item>
            <cre8-radio-field-item label="2"></cre8-radio-field-item>
            <cre8-radio-field-item label="3"></cre8-radio-field-item>
        </cre8-radio-field>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'Tab' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8RadioFieldItem = el.querySelector<cre8RadioFieldItem>('[label="1"]');
        const middleItem: cre8RadioFieldItem = el.querySelector<cre8RadioFieldItem>('[label="2"]');
        const bottomItem: cre8RadioFieldItem = el.querySelector<cre8RadioFieldItem>('[label="2"]');
        const middleFocusSpy = jest.spyOn(middleItem, 'focus');
        const bottomFocusSpy = jest.spyOn(bottomItem, 'focus');

        topItem.handleKeyDown(mockKeydownEvent);
        await el.updateComplete;

        await new Promise<void>((res) => setTimeout(() => {
            expect(middleFocusSpy).toHaveBeenCalledTimes(0);
            expect(bottomFocusSpy).toHaveBeenCalledTimes(0);
            res();
        }, 200));
    });

    test('form reset', async () => {
        const el = await fixture<cre8RadioFieldItem>(html` <cre8-radio-field-item label="Label"></cre8-radio-field-item> `);

        el.checked = true;
        el.formResetCallback();
        expect(el.checked).toBeFalsy();
    });

    describe('accessibility -  Radio Field Item', () => {
        test('should accessible with default values', async () => {
            const el = await fixture<cre8RadioFieldItem>(html`<cre8-radio-field-item label="Label"></cre8-radio-field-item>`);
            return expect(el).toBeAccessible();
        });

        test('verify accessibility for disable radio', async () => {
            const el = await fixture<cre8RadioFieldItem>(html`<cre8-radio-field-item label="Label" ?disabled="${true}"></cre8-radio-field-item>`);
            return expect(el).toBeAccessible();
        });
        test('verify accessibility for radio with fieldNote', async () => {
            const el = await fixture<cre8RadioFieldItem>(
                html`<cre8-radio-field-item label="Label" fieldNote="Note" ariaDescribedBy="Note">
                    <p slot="fieldNote">FieldNote</p>
                </cre8-radio-field-item>`
            );
            return expect(el).toBeAccessible();
        });
    });
});
