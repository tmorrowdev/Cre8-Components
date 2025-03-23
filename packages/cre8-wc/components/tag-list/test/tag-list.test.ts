import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../tag-list';
import { cre8TagList } from '../tag-list';

describe('tag-list', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8TagList>(html`<cre8-tag-list></cre8-tag-list>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('works with label', async () => {
        const el = await fixture<cre8TagList>(html`<cre8-tag-list label="test"></cre8-tag-list>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    describe('accessibility -  Tag List', () => {
        test('tests accessibility for default tag list', async () => {
            const el = await fixture<cre8TagList>(html`<cre8-tag-list>
      <cre8-tag label="Default"></cre8-tag>
      <cre8-tag label="Error"></cre8-tag>
            </cre8-tag-list>`);
            return expect(el).toBeAccessible();
        });
    });
});
