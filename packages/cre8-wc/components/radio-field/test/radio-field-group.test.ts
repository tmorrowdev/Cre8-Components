import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../radio-field';
import '../../radio-field-item/radio-field-item';
import { Cre8RadioField } from '../radio-field';

/**
 * A native radio group is formed by `name`, but only inside one tree scope. Each
 * `cre8-radio-field-item` keeps its `input` in its own shadow root, so the
 * browser never sees them as siblings and every option stays checked once
 * clicked — including in a hand-composed field, which is why the field enforces
 * this itself rather than the flattened path doing it.
 */
describe('radio-field: single selection', () => {
    const clickItem = async (el: Cre8RadioField, index: number) => {
        const items = [...el.querySelectorAll('cre8-radio-field-item')];
        const input = items[index].shadowRoot?.querySelector('input') as HTMLInputElement;
        input.click();
        await el.updateComplete;
    };

    const checkedStates = (el: Cre8RadioField) =>
        [...el.querySelectorAll('cre8-radio-field-item')].map(
            (item) => (item as HTMLElement & { checked?: boolean }).checked === true
        );

    test('selecting one option clears the others, when composed by hand', async () => {
        const el = await fixture<Cre8RadioField>(html`
      <cre8-radio-field label="Plan">
        <cre8-radio-field-item label="Basic" value="basic" name="plan" checked></cre8-radio-field-item>
        <cre8-radio-field-item label="Pro" value="pro" name="plan"></cre8-radio-field-item>
      </cre8-radio-field>
    `);
        await el.updateComplete;
        expect(checkedStates(el)).toEqual([true, false]);

        await clickItem(el, 1);
        expect(checkedStates(el).filter(Boolean)).toHaveLength(1);
        expect(checkedStates(el)[1]).toBe(true);
    });

    test('and when built from the flattened items API', async () => {
        const el = await fixture<Cre8RadioField>(html`<cre8-radio-field label="Plan"></cre8-radio-field>`);
        el.name = 'plan';
        el.items = [
            { label: 'Basic', value: 'basic', checked: true },
            { label: 'Pro', value: 'pro' },
        ];
        await el.updateComplete;

        expect(el.querySelectorAll('cre8-radio-field-item')).toHaveLength(2);
        await clickItem(el, 1);
        expect(checkedStates(el).filter(Boolean)).toHaveLength(1);
    });

    test('every generated option shares the field name, so the form submits one value', async () => {
        const el = await fixture<Cre8RadioField>(html`<cre8-radio-field label="Plan"></cre8-radio-field>`);
        el.name = 'plan';
        el.items = [{ label: 'Basic' }, { label: 'Pro' }];
        await el.updateComplete;

        const names = [...el.querySelectorAll('cre8-radio-field-item')].map((i) => i.getAttribute('name'));
        expect(names).toEqual(['plan', 'plan']);
    });
});
