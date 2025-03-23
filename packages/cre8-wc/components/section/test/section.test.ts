import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../section';
import { cre8Section } from '../section';

// Mock Element.attachInternals method
// @ts-ignore

describe('section', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'ltr',
        });
    });

    afterEach(() => {
        delete document.dir;
    });

    test('renders correctly', async () => {
        const el = await fixture(html`
      <cre8-section headline="Section Heading">
        <p>Section content</p>
      </cre8-section>
    `);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('renders a heading when headline is input', async () => {
        const el = await fixture<cre8Section>(html`
      <cre8-section headline="Section Heading">
        <p>Section content</p>
      </cre8-section>
    `);
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('cre8-heading');
        expect(header).toBeDefined();
    });

    describe('accessibility - Section', () => {
        test('Section component is accessible', async () => {
            const el = await fixture(html`
        <cre8-section headline="Section Heading">
          <p>Section content</p>
        </cre8-section>
      `);
            return expect(el).toBeAccessible();
        });

        test('inside Section component content is accessible', async () => {
            const el = await fixture(html`
        <cre8-section headline="Section Heading">
          <p>
            <a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing elit.
          </p>
        </cre8-section>
      `);
            return expect(el).toBeAccessible();
        });

        test('checking if slotted heading is accessible', async () => {
            const el = await fixture(html`
        <cre8-section headline="">
          <cre8-heading tagVariant="h2" slot="header"> Section Heading </cre8-heading>
          <p>
            <a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing elit.
          </p>
        </cre8-section>
      `);
            return expect(el).toBeAccessible();
        });
    });
});
