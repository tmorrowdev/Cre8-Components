import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../select-tile-list';
import { cre8SelectTileList } from '../select-tile-list';

describe('select-tile-list', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8SelectTileList>(html`<cre8-select-tile-list></cre8-select-tile-list>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('rows variant', async () => {
        const el = await fixture<cre8SelectTileList>(html`<cre8-select-tile-list variant="rows"></cre8-select-tile-list>`);
        expect(el.shadowRoot).toBeTruthy();
        expect(el.shadowRoot.querySelector('.cre8-c-select-tile-list__rows')).toBeTruthy();
    });

    test('works with fieldNote', async () => {
        const el = await fixture(
            html`<cre8-select-tile-list
        fieldNote="Note"
        iconNane="check"
        ariaDescribedBy="Note"
        ?fieldNoteKnockout="${true}"
        ?isSuccess="${true}"
      ></cre8-select-tile-list>`
        );
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
    });

    test('works with fieldNote and no ariaDescribe', async () => {
        const el = await fixture(
            html`<cre8-select-tile-list
        fieldNote="Note"
        iconNane="check"
        ?fieldNoteKnockout="${true}"
        ?isSuccess="${true}"
      ></cre8-select-tile-list>`
        );
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeTruthy();
    });

    test('works without fieldNote', async () => {
        const el = await fixture(html`<cre8-select-tile-list iconNane="check"></cre8-select-tile-list>`);
        const fieldNote = el.shadowRoot.querySelector('cre8-field-note');
        expect(fieldNote).toBeFalsy();
    });
});
