import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../form';
import { Cre8Form } from '../form';
import '../../field/field';

vi.mock('nanoid');

describe('Cre8Form', () => {
    test('wraps its children in a real form element', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form>
        <cre8-field name="email" label="Email"></cre8-field>
      </cre8-form>
    `);

        const form = el.querySelector('form');
        expect(form).toBeTruthy();
        // the child survived and now lives inside the form
        expect(form!.querySelector('cre8-field')).toBeTruthy();
        // browser validation is disabled so our submit handler always runs
        expect(form!.noValidate).toBe(true);
    });

    test('the control is form-associated with our form', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form>
        <cre8-field name="email" label="Email"></cre8-field>
      </cre8-form>
    `);

        const form = el.querySelector('form');
        const field = el.querySelector('cre8-field') as any;
        expect(field._internals.form).toBe(form);
    });
});
