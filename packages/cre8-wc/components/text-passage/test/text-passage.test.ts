import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../text-passage';
import { cre8TextPassage } from '../text-passage';

// Mock Element.attachInternals method
// @ts-ignore

describe('text-passage', () => {
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
      <cre8-text-passage>
        <h1>Page Display Text</h1>
        <p>
          A text passage contains arbitrary text that might come from a CMS. It should live within a container that caps the line length of the text
          to avoid a straining reading experience.
        </p>
        <h2>Default Headline</h2>
        <p>
          This is another paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <ul>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
        </ul>
        <h3>Secondary Headline</h3>
        <ol>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
        </ol>
        <p>
          <a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <blockquote>
          <p>This is a quotation from something.</p>
          <cite>Cite source</cite>
        </blockquote>
        <h4>Section Title</h4>
        <p>
          This is another paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h5>Default Large Meta Text</h5>
      </cre8-text-passage>
    `);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with size', async () => {
        const sizes = ['small', 'large'];

        for (const size of sizes) {
            const el = await fixture<cre8TextPassage>(html`
        <cre8-text-passage size="${size}">
          <h1>Page Display Text</h1>
          <p>
            A text passage contains arbitrary text that might come from a CMS. It should live within a container that caps the line length of the text
            to avoid a straining reading experience.
          </p>
          <h2>Default Headline</h2>
          <p>
            This is another paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <ul>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
          </ul>
          <h3>Secondary Headline</h3>
          <ol>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
          </ol>
          <p>
            <a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <blockquote>
            <p>This is a quotation from something.</p>
            <cite>Cite source</cite>
          </blockquote>
          <h4>Section Title</h4>
          <p>
            This is another paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <h5>Default Large Meta Text</h5>
        </cre8-text-passage>
      `);
            await el.updateComplete;
            const textPassage = el.shadowRoot!.querySelector('.cre8-c-text-passage');
            expect(textPassage?.classList.contains(`cre8-c-text-passage--${size}`)).toBeTruthy();
        }
    });

    test('has the correct class name with inverted', async () => {
        const el = await fixture<cre8TextPassage>(html`
      <cre8-text-passage inverted="true">
        <h1>Page Display Text</h1>
        <p>
          A text passage contains arbitrary text that might come from a CMS. It should live within a container that caps the line length of the text
          to avoid a straining reading experience.
        </p>
        <h2>Default Headline</h2>
        <p>
          This is another paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <ul>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
        </ul>
        <h3>Secondary Headline</h3>
        <ol>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
        </ol>
        <p>
          <a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <blockquote>
          <p>This is a quotation from something.</p>
          <cite>Cite source</cite>
        </blockquote>
        <h4>Section Title</h4>
        <p>
          This is another paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h5>Default Large Meta Text</h5>
      </cre8-text-passage>
    `);
        await el.updateComplete;
        const textPassage = el.shadowRoot!.querySelector('.cre8-c-text-passage');
        expect(textPassage?.classList.contains('cre8-c-text-passage--inverted')).toBeTruthy();
    });

    describe('accessibility tests', () => {
        test('checking component is accessible', async () => {
            const el = await fixture(html`
        <cre8-text-passage>
          <h1>Page Display Text</h1>
          <p>
            A text passage
          </p>
        </cre8-text-passage>
      `);
            return expect(el).toBeAccessible();
        });

        test('checking inverted component is accessible', async () => {
            const el = await fixture(html`
        <cre8-text-passage inverted="true">
          <h1>Page Display Text</h1>
          <p>
            A text passage
          </p>
        </cre8-text-passage>
      `);
            return expect(el).toBeAccessible();
        });
    });
});
