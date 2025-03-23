import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../radio-field';
import { cre8RadioField } from '../radio-field';

describe('radio-field', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8RadioField>(html`<cre8-radio-field></cre8-radio-field>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('works with fieldNote', async () => {
        const el = await fixture(
            html`<cre8-radio-field
        fieldNote="Note"
        iconNane="check"
        ariaDescribedBy="Note"
        ?fieldNoteKnockout="${true}"
        ?isSuccess="${true}"
      ></cre8-radio-field>`
        );
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
    });

    test('works without fieldNote', async () => {
        const el = await fixture(html`<cre8-radio-field iconNane="check"></cre8-radio-field>`);
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeFalsy();
    });

    describe('accessibility -  Radio Field', () => {
        test('tests accessibility for default radio field', async () => {
            const el = await fixture<cre8RadioField>(html`<cre8-radio-field>
      <cre8-radio-field-item label="Default"></cre8-radio-field-item>
      <cre8-radio-field-item label="Error" ?isError=${true}></cre8-radio-field-item>
    </eaf-radio-field>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for default radio field with field note', async () => {
            const el = await fixture<cre8RadioField>(html` <cre8-radio-field
        fieldNote="Note"
        iconNane="check"
        ariaDescribedBy="Note"
        ?fieldNoteKnockout="${true}"
        ?isSuccess="${true}"
      >
        <cre8-radio-field-item label="Default"></cre8-radio-field-item>
        <cre8-radio-field-item label="Error" ?isError=${true}></cre8-radio-field-item>
      </cre8-radio-field>`);
            return expect(el).toBeAccessible();
        });
    });
});
