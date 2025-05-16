import svgInfoFilled from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Info.svg?raw';
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../tooltip';
import { cre8Tooltip } from '../tooltip';
import '../../icon/icon';
import { cre8Section } from '../../section/section';
import '../../section/section';

const mock_id = 'myid';
const mock_nanoid = jest.fn();
mock_nanoid.mockReturnValue(mock_id);
jest.mock('nanoid', () => ({
    nanoid: () => mock_nanoid(),
}));

describe('tooltip', () => {
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
      <cre8-tooltip isActive>
        <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('renders svg icon correctly', async () => {
        const el = await fixture(html`
      <cre8-tooltip isActive svg="${svgInfoFilled}">
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with position', async () => {
        const positions = ['top', 'left', 'right'];

        for (const position of positions) {
            const el = await fixture<cre8Tooltip>(html`
        <cre8-tooltip position="${position}">
          <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
          Lorem ipsum dolor sit amet, sed do eiusmod tempor
        </cre8-tooltip>
      `);
            await el.updateComplete;
            const tooltip = el.shadowRoot!.querySelector('.cre8-c-tooltip');
            expect(tooltip.classList.contains(`cre8-c-tooltip--${position}`)).toBeTruthy();
        }
    });

    test('has the correct class names with position and svg icon', async () => {
      const positions = ['top', 'left', 'right'];

      for (const position of positions) {
        const el = await fixture<cre8Tooltip>(html`
        <cre8-tooltip position="${position}" svg="${svgInfoFilled}">
          Lorem ipsum dolor sit amet, sed do eiusmod tempor
        </cre8-tooltip>
        `);
          await el.updateComplete;
          const tooltip = el.shadowRoot!.querySelector('.cre8-c-tooltip');
          expect(tooltip.classList.contains(`cre8-c-tooltip--${position}`)).toBeTruthy();
      }
    });

    test('should remove active', async () => {
        const el = await fixture<cre8Tooltip>(html`
      <cre8-tooltip isActive>
        <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);
        await el.updateComplete;
        el.removeActive();
        expect(el.isActive).toBeFalsy();
    });

    test('should set position to "right" if tooltip panel breaks out the left side of the window', async () => {
        const el = await fixture<cre8Tooltip>(html`
      <cre8-tooltip>
        <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);

    // Set necessary properties and elements for testing
        el.isDynamic = true;
        el.position = 'left';
        await el.updateComplete;
        const bodyWidth = 1000;
        const tooltipPanelWidth = 200;

    // Mock the bounding client rect of the body
        jest.spyOn(document.querySelector('body'), 'getBoundingClientRect').mockReturnValue({
            width: bodyWidth,
        } as DOMRect);

    // Create a dummy element to mock _cre8TooltipPanel
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8TooltipPanel', 'get').mockReturnValue(dummyPanel);

    // Mock the bounding client rect of the tooltip panel
        jest.spyOn(dummyPanel, 'getBoundingClientRect').mockReturnValue({
            left: -tooltipPanelWidth,
            right: 0,
        } as DOMRect);

        el.dynamicPosition();
        expect(el.position).toBe('right');

    // Check that rtl positions properly
        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'rtl',
        });
        el.dynamicPosition();
        await el.updateComplete;
        expect(el.position).toBe('left');
    });

    test('should set position to "left" if tooltip panel breaks out the right side of the window', async () => {
        const el = await fixture<cre8Tooltip>(html`
      <cre8-tooltip>
        <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);

    // Set necessary properties and elements for testing
        el.isDynamic = true;
        el.position = 'right';
        const bodyWidth = 1000;
        const tooltipPanelWidth = 200;

    // Mock the bounding client rect of the body
        jest.spyOn(document.querySelector('body'), 'getBoundingClientRect').mockReturnValue({
            width: bodyWidth,
        } as DOMRect);

    // Create a dummy element to mock _cre8TooltipPanel
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8TooltipPanel', 'get').mockReturnValue(dummyPanel);

    // Mock the bounding client rect of the tooltip panel
        jest.spyOn(dummyPanel, 'getBoundingClientRect').mockReturnValue({
            left: bodyWidth - 1,
            right: bodyWidth + tooltipPanelWidth,
        } as DOMRect);

        el.dynamicPosition();
        expect(el.position).toBe('left');

    // Check that rtl positions properly
        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'rtl',
        });
        el.dynamicPosition();
        await el.updateComplete;
        expect(el.position).toBe('right');
    });

    test('should set position to "top" if tooltip panel breaks out the bottom side of the window', async () => {
        const el = await fixture<cre8Tooltip>(html`
      <cre8-tooltip>
        <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);

    // Set necessary properties and elements for testing
        el.isDynamic = true;
        el.position = null;
        const windowHeight = 800;
        const tooltipPanelHeight = 400;
        const bodyWidth = 1000;

    // Mock the bounding client rect of the body
        jest.spyOn(document.querySelector('body'), 'getBoundingClientRect').mockReturnValue({
            width: bodyWidth,
        } as DOMRect);

    // Mock the window's innerHeight
        Object.defineProperty(window, 'innerHeight', { value: windowHeight });

    // Create a dummy element to mock _cre8TooltipPanel
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8TooltipPanel', 'get').mockReturnValue(dummyPanel);

    // Mock the element clientHeight
        Object.defineProperty(el, 'clientHeight', { value: 200 });

    // Mock the bounding client rect of the tooltip panel
        jest.spyOn(dummyPanel, 'getBoundingClientRect').mockReturnValue({
            top: windowHeight,
            bottom: windowHeight + tooltipPanelHeight,
            left: 0,
            right: 100,
            height: 300,
        } as DOMRect);

        el.dynamicPosition();
        expect(el.position).toBe('top');
    });

    test('should set position to "bottom" if tooltip panel breaks out the top side of the window', async () => {
        const el = await fixture<cre8Tooltip>(html`
      <cre8-tooltip>
        <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);

    // Set necessary properties and elements for testing
        el.isDynamic = true;
        el.position = 'top';
        const windowHeight = 800;
        const tooltipPanelHeight = 200;

    // Mock the window's innerHeight
        Object.defineProperty(window, 'innerHeight', { value: windowHeight });

    // Create a dummy element to mock _cre8TooltipPanel
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8TooltipPanel', 'get').mockReturnValue(dummyPanel);

    // Mock the bounding client rect of the tooltip panel
        jest.spyOn(dummyPanel, 'getBoundingClientRect').mockReturnValue({
            top: -tooltipPanelHeight,
            left: 50,
            right: 100,
        } as DOMRect);

        el.dynamicPosition();
        expect(el.position).toBeNull();
    });

    test('toggle the active state', async () => {
        const el = await fixture<cre8Tooltip>(html`
      <cre8-tooltip>
        <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);
        await el.updateComplete;

        el.toggleActive();
        expect(el.isActive).toBeTruthy();
        el.toggleActive();
        expect(el.isActive).toBeFalsy();
    });

    test('closes the tooltip panel when Escape or Tab key is pressed and isActive is true', async () => {
        const el = await fixture<cre8Tooltip>(html`
      <cre8-tooltip>
        <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);
        el.isActive = true;
        await el.updateComplete;

        const tooltipTrigger = el.shadowRoot.querySelector<HTMLElement>('.cre8-c-tooltip__trigger');
        tooltipTrigger.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        expect(el.isActive).toBeFalsy();

        tooltipTrigger.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
        expect(el.isActive).toBeFalsy();

        tooltipTrigger.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
        expect(el.isActive).toBeTruthy();

        tooltipTrigger.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(el.isActive).toBeFalsy();
    });

    test('should set isActiveDynamic to true when either isActive and isDynamic is true', async () => {
        const el = await fixture<cre8Tooltip>(html`
      <cre8-tooltip>
        <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </cre8-tooltip>
    `);
        el.isDynamic = true;
        await el.updateComplete;

        jest.useFakeTimers();
        el.toggleActive();
        jest.advanceTimersByTime(2000);
        expect(el.isActiveDynamic).toBeTruthy();

        jest.useFakeTimers();
        el.toggleActive();
        jest.advanceTimersByTime(2000);
        expect(el.isActiveDynamic).toBeFalsy();

        jest.useRealTimers();
    });


    test('should set auto-generated ids in aria-describedBy attributes for a11y', async () => {
        const el = await fixture<cre8Section>(
            html`
        <cre8-section>
          <input type="text" id="field" />
          <cre8-tooltip ariaDescribes="field">
            <span>?</span>
            Some text to describe the field
          </cre8-tooltip>
        </cre8-section>
      `
        );
        await el.updateComplete;
        const field = el.querySelector('#field');
        expect(field.getAttribute('aria-describedby')).toEqual(mock_id);
    });

    test('should create a hidden tip element with an auto-generated id', async () => {
        const el = await fixture<cre8Section>(
            html`
        <cre8-section>
          <input type="text" id="field" />
          <cre8-tooltip ariaDescribes="field">
            <span>?</span>
            Some text to describe the field
          </cre8-tooltip>
        </cre8-section>
      `
        );
        await el.updateComplete;
        const a11yTip = el.querySelector(`#${mock_id}`);
        expect(a11yTip).toBeTruthy();
    });

    test('should chain ids in aria-describedBy attributes for a11y', async () => {
        mock_nanoid.mockReturnValueOnce(`${mock_id}_1`);
        mock_nanoid.mockReturnValueOnce(`${mock_id}_2`);
        const el = await fixture<cre8Section>(
            html`
        <cre8-section>
        <div>
          <input type="text" id="field" />
          <cre8-tooltip ariaDescribes="field" id="first-tool-tip">
            <span>?</span>
            Some text to describe the field
          </cre8-tooltip>
          <cre8-tooltip ariaDescribes="field">
            <span>?</span>
            Some additional text to describe the field
          </cre8-tooltip>
        </div>
        </cre8-section>
      `
        );
        await el.updateComplete;
        const field = el.querySelector('#field');
        expect(field.getAttribute('aria-describedby')).toBe(`${mock_id}_1 ${mock_id}_2`);
    });

    describe('accessibility - Tooltip', () => {
        test('Tooltip component is accessible', async () => {
            const el = await fixture(html`
        <cre8-tooltip>
          <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
          Lorem ipsum dolor sit amet, sed do eiusmod tempor
        </cre8-tooltip>
      `);
            return expect(el).toBeAccessible();
        });

        test('Tooltip component is accessible with cre8-icon', async () => {
          const el = await fixture(html`
          <cre8-tooltip svg="${svgInfoFilled}">
            Lorem ipsum dolor sit amet, sed do eiusmod tempor
          </cre8-tooltip>`);
          return expect(el).toBeAccessible();
        });

        test('Tooltip knockout variation is accessible', async () => {
            const el = await fixture(html`
        <cre8-tooltip knockout>
          <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
          Lorem ipsum dolor sit amet, sed do eiusmod tempor
        </cre8-tooltip>
      `);
            return expect(el).toBeAccessible();
        });

        test('testing isActive is accessible', async () => {
            const el = await fixture(html`
        <cre8-tooltip isActive>
          <cre8-icon-legacy slot="trigger" name="info" iconTitle="info"></cre8-icon-legacy>
          Lorem ipsum dolor sit amet, sed do eiusmod tempor
        </cre8-tooltip>
      `);
            return expect(el).toBeAccessible();
        });
    });
});