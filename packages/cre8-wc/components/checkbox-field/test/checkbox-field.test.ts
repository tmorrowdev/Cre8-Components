import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../checkbox-field';
import { cre8CheckboxField } from '../checkbox-field';

describe('checkbox-field', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8CheckboxField>(html`<cre8-checkbox-field></cre8-checkbox-field>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('works with fieldNote', async () => {
        const el = await fixture(
            html`<cre8-checkbox-field
        fieldNote="Note"
        iconNane="check"
        ariaDescribedBy="Note"
        ?fieldNoteKnockout="${true}"
        ?isSuccess="${true}"
      ></cre8-checkbox-field>`
        );
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
    });

    test('works with fieldNote and no ariaDescribe', async () => {
        const el = await fixture(
            html`<cre8-checkbox-field
        fieldNote="Note"
        iconNane="check"
        ?fieldNoteKnockout="${true}"
        ?isSuccess="${true}"
      ></cre8-checkbox-field>`
        );
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
    });

    test('works without fieldNote', async () => {
        const el = await fixture(html`<cre8-checkbox-field iconNane="check"></cre8-checkbox-field>`);
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeFalsy();
    });
    describe('accessibility tests', () => {
        test('should accessible with default values', async () => {
            const el = await fixture<cre8CheckboxField>(html`<cre8-checkbox-field></cre8-checkbox-field>`);
            return expect(el).toBeAccessible();
        });
        test('should accessible with checkbox field item', async () => {
            const el = await fixture<cre8CheckboxField>(
                html`<cre8-checkbox-field label="Legend">
          <cre8-checkbox-field-item label="Default"></cre8-checkbox-field-item>
          <cre8-checkbox-field-item label="Error" iserror=""></cre8-checkbox-field-item>
          <cre8-checkbox-field-item label="Disabled" disabled="" checked=""></cre8-checkbox-field-item>
        </cre8-checkbox-field>`
            );
            return expect(el).toBeAccessible();
        });
    });
});
