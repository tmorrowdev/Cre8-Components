import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../form';
import { Cre8Form } from '../form';
import '../../field/field';
import '../../grid/grid';

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

    test('finds controls nested inside layout components', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form>
        <cre8-grid>
          <cre8-field name="email" label="Email"></cre8-field>
          <cre8-field name="name" label="Name"></cre8-field>
        </cre8-grid>
      </cre8-form>
    `);

        expect(el.controls).toHaveLength(2);
        expect(el.controls.map((c) => c.getAttribute('name'))).toEqual(['email', 'name']);
    });

    test('emits form-submit with FormData when all controls are valid', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form>
        <cre8-field name="email" label="Email"></cre8-field>
      </cre8-form>
    `);

        const field = el.querySelector('cre8-field') as any;
        field.value = 'a@b.com';
        await el.updateComplete;

        const onSubmit = vi.fn();
        el.addEventListener('form-submit', onSubmit);

        el.form!.requestSubmit();

        expect(onSubmit).toHaveBeenCalledTimes(1);
        const { detail } = onSubmit.mock.calls[0][0];
        expect(detail.data.get('email')).toBe('a@b.com');
        expect(detail.values).toEqual({ email: 'a@b.com' });
    });

    test('never triggers a native navigation', async () => {
        const el = await fixture<Cre8Form>(html`<cre8-form></cre8-form>`);
        const onNativeSubmit = vi.fn();
        el.form!.addEventListener('submit', onNativeSubmit);

        el.form!.requestSubmit();

        expect(onNativeSubmit.mock.calls[0][0].defaultPrevented).toBe(true);
    });

    test('blocks submit, flags errors, and focuses the first invalid control', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form>
        <cre8-field name="email" label="Email" required></cre8-field>
        <cre8-field name="name" label="Name"></cre8-field>
      </cre8-form>
    `);
        await el.updateComplete;

        const onSubmit = vi.fn();
        const onInvalid = vi.fn();
        el.addEventListener('form-submit', onSubmit);
        el.addEventListener('form-invalid', onInvalid);

        el.form!.requestSubmit();

        expect(onSubmit).not.toHaveBeenCalled();
        expect(onInvalid).toHaveBeenCalledTimes(1);

        const [required, optional] = el.controls;
        expect(required.isError).toBe(true);
        expect(optional.isError).toBe(false);
        expect(onInvalid.mock.calls[0][0].detail.invalidControls).toEqual([required]);

        // Focus is retargeted to the host when the inner field takes focus.
        expect(document.activeElement).toBe(required);
    });

    test('novalidate skips aggregate validation', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form novalidate>
        <cre8-field name="email" label="Email" required></cre8-field>
      </cre8-form>
    `);
        await el.updateComplete;

        const onSubmit = vi.fn();
        el.addEventListener('form-submit', onSubmit);

        el.form!.requestSubmit();

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(el.controls[0].isError).toBeFalsy();
    });

    test('reset clears error state and emits form-reset', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form>
        <cre8-field name="email" label="Email" required></cre8-field>
      </cre8-form>
    `);
        await el.updateComplete;

        el.form!.requestSubmit();
        expect(el.controls[0].isError).toBe(true);

        const onReset = vi.fn();
        el.addEventListener('form-reset', onReset);

        el.reset();

        expect(onReset).toHaveBeenCalledTimes(1);
        expect(el.controls[0].isError).toBe(false);
    });

    test('submit() triggers the same flow as a submit button', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form>
        <cre8-field name="email" label="Email"></cre8-field>
      </cre8-form>
    `);
        const onSubmit = vi.fn();
        el.addEventListener('form-submit', onSubmit);

        el.submit();

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    test('checkValidity reports validity without touching error state', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form>
        <cre8-field name="email" label="Email" required></cre8-field>
      </cre8-form>
    `);
        await el.updateComplete;

        expect(el.checkValidity()).toBe(false);
        expect(el.controls[0].isError).toBeFalsy();

        expect(el.reportValidity()).toBe(false);
        expect(el.controls[0].isError).toBe(true);
    });

    test('disabled propagates to every control', async () => {
        const el = await fixture<Cre8Form>(html`
      <cre8-form>
        <cre8-field name="email" label="Email"></cre8-field>
      </cre8-form>
    `);

        el.disabled = true;
        await el.updateComplete;
        expect(el.controls[0].disabled).toBe(true);

        el.disabled = false;
        await el.updateComplete;
        expect(el.controls[0].disabled).toBe(false);
    });
});
