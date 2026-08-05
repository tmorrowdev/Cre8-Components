# cre8-form Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `cre8-form` container component that groups the existing form-associated controls, aggregates their validation on submit, and orchestrates submit/reset.

**Architecture:** `cre8-form` renders into **light DOM** and imperatively wraps its author-supplied children in a real `<form>` element. Because the eight controls extending `Cre8FormElement` are already `formAssociated`, the browser routes their values into `FormData` with no extra code. The inner `<form>` sets `noValidate = true` so the browser never blocks submission — `cre8-form` always receives the `submit` event and owns the validation UX.

**Tech Stack:** Lit 3, TypeScript, Vitest + jsdom, `@open-wc/testing-helpers`, `element-internals-polyfill`.

**Design doc:** `docs/plans/2026-08-05-cre8-form-design.md`

---

## Before you start — context you need

**Where things live.** All components are in `packages/cre8-wc/components/<name>/`. Run every command below from `packages/cre8-wc` unless stated otherwise.

**Run one test file:**
```bash
cd packages/cre8-wc
npx vitest run components/form
```
Coverage is on by default and slow; `--coverage=false` keeps the loop fast.

**Test file location matters.** `vitest.config.ts` has `include: ['components/**/test/*.test.ts']`. The file must be `components/form/test/form.test.ts` or Vitest will not see it.

**Globals are on.** `vitest.config.ts` sets `globals: true`, so `describe`, `test`, `expect`, and `vi` are available without imports — match the surrounding suites and do not add imports for them.

**Form association works in tests.** `vitest.setup.ts` imports `element-internals-polyfill` first, so `attachInternals()` and form participation work under jsdom. This is the assumption the whole component rests on — Task 1 verifies it before anything else is built.

**Two things that will bite you:**

1. **No `static styles`.** Light-DOM Lit components ignore `static styles` (there is no shadow root to attach a stylesheet to). `cre8-form` therefore ships **no** `.module.scss` / `.styles.ts`. That is intentional: layout comes from the consumer nesting `cre8-grid` or `cre8-layout` inside the form. Do not add a styles file.

2. **Lit rendering vs. author children.** `createRenderRoot()` returns `this`, so Lit renders into the element itself. Children are moved into the `<form>` imperatively in `connectedCallback`, and `render()` returns `nothing`. Task 1 asserts children survive — if Lit's markers ever clear them, that test fails immediately.

**Conventions to copy** (see `components/section/section.ts` for a reference component):
- Registration guard at the bottom of the file
- `declare global { interface HTMLElementTagNameMap { ... } }`
- `export default Cre8Form;`
- Events are `<component>-<action>` kebab-case (`tab-select`, `popover-open`), **not** prefixed with `cre8-`

---

## Task 1: Scaffold the component and wrap children in a form

**Files:**
- Create: `packages/cre8-wc/components/form/form.ts`
- Test: `packages/cre8-wc/components/form/test/form.test.ts`

**Step 1: Write the failing test**

```ts
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../form';
import { Cre8Form } from '../form';
import '../../field/field';

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
        const field = form!.querySelector('cre8-field');
        expect(field).toBeTruthy();
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
```

**Step 2: Run it to make sure it fails**

```bash
cd packages/cre8-wc && npx vitest run components/form
```
Expected: FAIL — cannot resolve `../form`.

**Step 3: Write the minimal implementation**

Create `packages/cre8-wc/components/form/form.ts`:

```ts
import { nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';

/**
 * The form component groups form-associated Cre8 controls, aggregates their
 * validation on submit, and orchestrates submit and reset.
 *
 * # How to Use
 * 1. Place any Cre8 form controls inside `cre8-form`. They may be nested inside
 *    layout components such as `cre8-grid` or `cre8-layout`.
 * 2. Add a `cre8-button` with `type="submit"` to submit the form.
 * 3. Listen for `form-submit` to receive the collected `FormData`.
 *
 * Note: this component renders to light DOM. A form-associated control's form
 * owner is the nearest `<form>` in its own node tree, so a shadow-DOM `<form>`
 * would own nothing and `new FormData(form)` would come back empty.
 *
 * @slot The form's controls and layout.
 */
export class Cre8Form extends Cre8Element {
    /**
     * Skips aggregate validation on submit.
     */
    @property({ type: Boolean, reflect: true })
        novalidate?: boolean;

    /**
     * Disables every control in the form, for example while submitting.
     */
    @property({ type: Boolean, reflect: true })
        disabled?: boolean;

    private _form: HTMLFormElement | null = null;

    /** Renders to light DOM so child controls are owned by the form. */
    createRenderRoot() {
        return this;
    }

    render() {
        return nothing;
    }

    connectedCallback() {
        super.connectedCallback();
        this._ensureForm();
    }

    private _ensureForm() {
        if (this._form?.isConnected) {
            return;
        }

        const form = document.createElement('form');
        form.className = 'cre8-c-form';
        // We own validation UX. Without this the browser blocks submission on
        // invalid controls and our submit handler never runs.
        form.noValidate = true;

        while (this.firstChild) {
            form.appendChild(this.firstChild);
        }

        this.appendChild(form);
        this._form = form;
    }

    /** The wrapped native form element. */
    get form(): HTMLFormElement | null {
        return this._form;
    }
}

if (customElements.get('cre8-form') === undefined) {
    customElements.define('cre8-form', Cre8Form);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-form': Cre8Form;
  }
}

export default Cre8Form;
```

**Step 4: Run the tests to verify they pass**

```bash
cd packages/cre8-wc && npx vitest run components/form
```
Expected: PASS, 2 tests.

If the second test fails with `field._internals.form` being `null`, stop and report it — the polyfill is not associating controls, and the rest of the plan depends on it.

**Step 5: Commit**

```bash
git add packages/cre8-wc/components/form/
git commit -m "Add cre8-form scaffold with light-DOM form wrapping"
```

---

## Task 2: Discover participating controls

**Files:**
- Modify: `packages/cre8-wc/components/form/form.ts`
- Test: `packages/cre8-wc/components/form/test/form.test.ts`

**Step 1: Write the failing test**

Add to the existing `describe`:

```ts
import '../../grid/grid';

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
```

**Step 2: Run it to verify it fails**

Expected: FAIL — `el.controls` is undefined.

**Step 3: Implement**

Add to `Cre8Form`:

```ts
    /**
     * Every form-associated Cre8 control owned by this form, in document order.
     * Reaches through layout components because slotting does not move nodes
     * out of the light-DOM tree.
     */
    get controls(): Cre8FormElement[] {
        if (!this._form) {
            return [];
        }
        return Array.from(this.querySelectorAll<HTMLElement>('*')).filter(
            (el) => (el as unknown as Cre8FormElement)._internals?.form === this._form
        ) as unknown as Cre8FormElement[];
    }
```

Add the import at the top:

```ts
import type { Cre8FormElement } from '../cre8-form-element';
```

**Step 4: Run to verify it passes**

Expected: PASS, 3 tests.

**Step 5: Commit**

```bash
git add packages/cre8-wc/components/form/
git commit -m "Add control discovery to cre8-form"
```

---

## Task 3: Emit form-submit when every control is valid

**Files:**
- Modify: `packages/cre8-wc/components/form/form.ts`
- Test: `packages/cre8-wc/components/form/test/form.test.ts`

**Step 1: Write the failing test**

```ts
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
```

**Step 2: Run to verify it fails**

Expected: FAIL — `form-submit` never fires.

**Step 3: Implement**

Wire the listener in `_ensureForm`, just after `this._form = form;`:

```ts
        form.addEventListener('submit', this._onSubmit);
```

Add the handler and the `values` getter:

```ts
    /** The form's current values, derived from FormData. */
    get values(): Record<string, FormDataEntryValue | FormDataEntryValue[]> {
        const out: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
        if (!this._form) {
            return out;
        }
        for (const [key, value] of new FormData(this._form).entries()) {
            const existing = out[key];
            if (existing === undefined) {
                out[key] = value;
            } else if (Array.isArray(existing)) {
                existing.push(value);
            } else {
                out[key] = [existing, value];
            }
        }
        return out;
    }

    private _onSubmit = (event: Event) => {
        // This component never performs a native navigation.
        event.preventDefault();

        this.dispatchEvent(
            new CustomEvent('form-submit', {
                detail: {
                    data: new FormData(this._form!),
                    values: this.values,
                    form: this._form,
                },
                bubbles: true,
                composed: true,
            })
        );
    };
```

**Step 4: Run to verify it passes**

Expected: PASS, 5 tests.

If `detail.data.get('email')` is `null`, the polyfill is not writing values into `FormData`. Fall back to building `data` from `controls` (`name` + `value`) and note the deviation in the test file.

**Step 5: Commit**

```bash
git add packages/cre8-wc/components/form/
git commit -m "Emit form-submit with collected FormData"
```

---

## Task 4: Block submit on invalid controls

**Files:**
- Modify: `packages/cre8-wc/components/form/form.ts`
- Test: `packages/cre8-wc/components/form/test/form.test.ts`

**Step 1: Write the failing test**

```ts
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
});
```

**Step 2: Run to verify it fails**

Expected: FAIL — `form-submit` fires even though a required field is empty.

**Step 3: Implement**

Replace the body of `_onSubmit` with:

```ts
    private _onSubmit = (event: Event) => {
        event.preventDefault();

        if (!this.novalidate && !this._validate()) {
            return;
        }

        this.dispatchEvent(
            new CustomEvent('form-submit', {
                detail: {
                    data: new FormData(this._form!),
                    values: this.values,
                    form: this._form,
                },
                bubbles: true,
                composed: true,
            })
        );
    };

    /**
     * Checks every control, reflects the result onto their `isError` state,
     * focuses the first invalid one, and emits `form-invalid`.
     * Returns true when the form is valid.
     */
    private _validate(): boolean {
        const controls = this.controls;
        const invalid = controls.filter((control) => !control.checkValidity());

        controls.forEach((control) => {
            control.isError = invalid.includes(control);
        });

        if (invalid.length === 0) {
            return true;
        }

        (invalid[0] as unknown as HTMLElement).focus?.();
        this.dispatchEvent(
            new CustomEvent('form-invalid', {
                detail: { invalidControls: invalid },
                bubbles: true,
                composed: true,
            })
        );
        return false;
    }
```

**Step 4: Run to verify it passes**

Expected: PASS, 6 tests.

**Step 5: Commit**

```bash
git add packages/cre8-wc/components/form/
git commit -m "Block submit and flag invalid controls"
```

---

## Task 5: Honour novalidate

**Files:**
- Test only: `packages/cre8-wc/components/form/test/form.test.ts`

**Step 1: Write the test** (the implementation already handles it — this locks the behaviour in)

```ts
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
```

**Step 2: Run it**

Expected: PASS immediately. If it fails, `novalidate` is not reflecting — check the `@property({ type: Boolean, reflect: true })` decorator.

**Step 3: Commit**

```bash
git add packages/cre8-wc/components/form/test/form.test.ts
git commit -m "Cover novalidate behaviour"
```

---

## Task 6: Reset

**Files:**
- Modify: `packages/cre8-wc/components/form/form.ts`
- Test: `packages/cre8-wc/components/form/test/form.test.ts`

**Step 1: Write the failing test**

```ts
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
```

**Step 2: Run to verify it fails**

Expected: FAIL — `el.reset` is not a function.

**Step 3: Implement**

Register the listener in `_ensureForm`, after the submit listener:

```ts
        form.addEventListener('reset', this._onReset);
```

Add:

```ts
    private _onReset = () => {
        this.controls.forEach((control) => {
            control.isError = false;
        });
        this.dispatchEvent(
            new CustomEvent('form-reset', { bubbles: true, composed: true })
        );
    };

    /** Resets the form to its default values. */
    reset() {
        this._form?.reset();
    }
```

**Step 4: Run to verify it passes**

Expected: PASS, 8 tests.

**Step 5: Commit**

```bash
git add packages/cre8-wc/components/form/
git commit -m "Add reset orchestration to cre8-form"
```

---

## Task 7: Public API — submit, checkValidity, reportValidity, disabled

**Files:**
- Modify: `packages/cre8-wc/components/form/form.ts`
- Test: `packages/cre8-wc/components/form/test/form.test.ts`

**Step 1: Write the failing tests**

```ts
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
```

**Step 2: Run to verify they fail**

Expected: FAIL — `el.submit`, `el.checkValidity` are not functions.

**Step 3: Implement**

```ts
    /** Submits the form, running aggregate validation unless `novalidate`. */
    submit() {
        this._form?.requestSubmit();
    }

    /** True when every control is valid. Does not change error state. */
    checkValidity(): boolean {
        return this.controls.every((control) => control.checkValidity());
    }

    /** Like `checkValidity`, but flags errors and focuses the first invalid control. */
    reportValidity(): boolean {
        return this._validate();
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('disabled')) {
            this.controls.forEach((control) => {
                control.disabled = this.disabled;
            });
        }
    }
```

Add `PropertyValues` to the lit import:

```ts
import { nothing, type PropertyValues } from 'lit';
```

**Step 4: Run to verify they pass**

Expected: PASS, 11 tests.

**Step 5: Commit**

```bash
git add packages/cre8-wc/components/form/
git commit -m "Add cre8-form public API and disabled propagation"
```

---

## Task 8: Export the component

**Files:**
- Modify: `packages/cre8-wc/index.ts`
- Modify: `packages/cre8-wc/cdn-entry.ts`

**Step 1: Add the library export**

In `packages/cre8-wc/index.ts`, alongside the other component exports:

```ts
export { Cre8Form } from './components/form/form.js';
```

**Step 2: Add the CDN import**

In `packages/cre8-wc/cdn-entry.ts`, alongside the other imports:

```ts
import { Cre8Form } from './components/form/form';
```

Follow the file's existing pattern — if imported names are also re-exported or referenced in a list further down, add `Cre8Form` there too.

**Step 3: Verify both builds resolve**

```bash
cd packages/cre8-wc && npx tsc --noEmit -p tsconfig.json 2>&1 | grep -i "components/form" || echo "no form errors"
```
Expected: `no form errors`.

**Step 4: Commit**

```bash
git add packages/cre8-wc/index.ts packages/cre8-wc/cdn-entry.ts
git commit -m "Export cre8-form from lib and CDN entry points"
```

---

## Task 9: Stories

**Files:**
- Create: `packages/cre8-wc/components/form/form.stories.ts`

**Step 1: Write the stories**

Copy the structure of a neighbouring `*.stories.ts` file (for example `components/section/section.stories.ts`) so the meta shape matches the local Storybook setup. Cover:

- **Default** — two `cre8-field`s and a `cre8-button type="submit"`, with a `form-submit` listener logging the values
- **Validation** — a `required` field, showing the block-and-focus behaviour
- **WithLayout** — fields wrapped in `cre8-grid` to demonstrate that layout composes and form ownership survives nesting
- **Disabled** — the `disabled` attribute set, showing every control disabled

**Step 2: Verify in Storybook**

```bash
cd packages/cre8-wc && pnpm run storybook
```
Check each story renders and that submitting the Validation story focuses the empty required field rather than submitting.

**Step 3: Commit**

```bash
git add packages/cre8-wc/components/form/form.stories.ts
git commit -m "Add cre8-form stories"
```

---

## Task 10: Full verification

**Step 1: Run the whole cre8-wc suite**

```bash
cd packages/cre8-wc && npx vitest run
```
Expected: no new failures. If pre-existing failures show up, confirm they also fail on `a2ui` before treating them as yours.

**Step 2: Regenerate the custom elements manifest**

The manifest feeds Storybook controls and the MCP catalog, so it must include the new component:

```bash
cd packages/cre8-wc && pnpm run build:custom-elements.json
```

**Step 3: Confirm cre8-form is in the manifest**

```bash
grep -c '"cre8-form"' packages/cre8-wc/.storybook/custom-elements.json
```
Expected: at least 1.

**Step 4: Commit**

```bash
git add packages/cre8-wc/.storybook/custom-elements.json packages/cre8-wc/custom-elements.json
git commit -m "Regenerate custom elements manifest for cre8-form"
```

---

## Known limitations (documented, not bugs)

- **`disabled` stomps per-control state.** Toggling the form's `disabled` off re-enables every control, including any that were individually disabled. Track per-control state before overriding it only if a real use case appears.
- **No error summary.** Errors surface only inline on each control. The WCAG error-summary pattern is deliberately out of scope for this version.
- **jsdom fidelity.** Form association relies on `element-internals-polyfill`. Behaviour that the polyfill cannot reproduce is covered in Storybook rather than Vitest.
