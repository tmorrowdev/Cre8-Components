import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../accordion-item';
import { cre8AccordionItem } from '../accordion-item';


describe('accordion-item', () => {
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
        const el = await fixture<cre8AccordionItem>(html`
    <cre8-accordion-item heading="Accordion Item Heading"  isActive>
    <span
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur.</span
    >
  </cre8-accordion-item>
    `);
        expect(el.shadowRoot).toBeTruthy();
    });
    test('has the correct classname as the small size', async () => {
        const smallSize = 'sm';
        const el = await fixture<cre8AccordionItem>(html`
        <cre8-accordion-item size="${smallSize}" heading="Accordion Item Heading" isActive>
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </cre8-accordion-item>`);
        const heading = el.shadowRoot.querySelector('cre8-heading[tagVariant="h5"]');
        expect(heading).toBeDefined();
    });
    test('has the correct classname as the large size', async () => {
        const largeSize = 'lg';
        const el = await fixture<cre8AccordionItem>(html`
        <cre8-accordion-item size="${largeSize}" heading="Accordion Item Heading" isActive>
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </cre8-accordion-item>`);
        const heading = el.shadowRoot.querySelector('cre8-heading[tagVariant="h4"]');
        expect(heading).toBeDefined();
    });
    test('has the correct icon placement if iconPosition equals before', async () => {
        const iconPosition = 'before';
        const el = await fixture<cre8AccordionItem>(html`
        <cre8-accordion-item iconPosition="${iconPosition}" heading="Accordion Item Heading" isActive>
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </cre8-accordion-item>`);
        const icon = el.shadowRoot?.querySelector('.cre8-c-accordion__icon-before');
        expect(icon).toBeDefined();
    });
    test('has the correct icon placement if iconPosition equals after', async () => {
        const iconPosition = 'after';
        const el = await fixture<cre8AccordionItem>(html`
        <cre8-accordion-item iconPosition="${iconPosition}" heading="Accordion Item Heading" isActive>
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </cre8-accordion-item>`);

        const icon = el.shadowRoot?.querySelector('.cre8-c-accordion__icon-after');
        expect(icon).toBeDefined();
    });
    test('has the tertiary icon placement if tertiaryIcon equals true', async () => {
        const el = await fixture<cre8AccordionItem>(html`
        <cre8-accordion-item heading="Accordion Item Heading" tertiaryIcon isActive>
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</span
        >
      </cre8-accordion-item>`);

        const icon = el.shadowRoot?.querySelector('.cre8-c-arrordion-panel__tertiary-icon');
        expect(icon).toBeDefined();
    });
    describe('accessibility tests', () => {
        test('should be accessible with default props', async () => {
            const el = await fixture<cre8AccordionItem>(html`
        <cre8-accordion-item heading="Accordion Item Heading"  isActive>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,  et dolore pariatur.
          </span>
        </cre8-accordion-item>`);
            return expect(el).toBeAccessible();
        });
        test('should accessible with tertiaryIcon', async () => {
            const el = await fixture<cre8AccordionItem>(html`
            <cre8-accordion-item heading="Accordion Item Heading" tertiaryIcon>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,  et dolore pariatur.
          </span>
        </cre8-accordion-item>`);
            return expect(el).toBeAccessible();
        });
        test('aria-expanded is accessible with size icon', async () => {
            const largeSize = 'lg';
            const el = await fixture<cre8AccordionItem>(html`
        <cre8-accordion-item size="${largeSize}" heading="Accordion Item Heading" isActive>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,  et dolore pariatur.
          </span>
        </cre8-accordion-item>`);
            return expect(el).toBeAccessible();
        });
    });
});
