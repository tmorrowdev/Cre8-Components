import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../accordion';
import { cre8Accordion } from '../accordion';

describe('accordion', () => {
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
        const el = await fixture<cre8Accordion>(html`
          <cre8-accordion>
            <cre8-accordion heading="Accordion Heading" isActive>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
            </cre8-accordion>
          </cre8-accordion>
        `);
        expect(el.shadowRoot).toBeTruthy();
    });

    describe('accessibility tests', () => {
        test('should be accessible with default values', async () => {
            const el = await fixture<cre8Accordion>(html`
              <cre8-accordion>
                <cre8-accordion-item heading="Accordion Heading" isActive>
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                </cre8-accordion-item>
                <cre8-accordion-item heading="Accordion Heading Two" >
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,olore magna aliqua.</span>
                </cre8-accordion-item>
                <cre8-accordion-item heading="Accordion Heading Three" >
                  <span>Lorem ipsum dolor sit amet, voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                </cre8-accordion-item>
              </cre8-accordion>
            `);
            return expect(el).toBeAccessible();
        });

        test('should be accessible with out active open accordion', async () => {
            const el = await fixture<cre8Accordion>(html`
              <cre8-accordion>
                <cre8-accordion-item heading="Accordion Heading">
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur.</span
                  >
                </cre8-accordion-item>
                <cre8-accordion-item heading="Accordion Heading Two" >
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,olore magna aliqua.</span>
                </cre8-accordion-item>
                <cre8-accordion-item heading="Accordion Heading Three" >
                  <span>Lorem ipsum dolor sit amet, voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                </cre8-accordion-item>
              </cre8-accordion>
            `);
            return expect(el).toBeAccessible();
        });
    });
});
