/* eslint-disable indent */
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../multi-select';
import '../../remove-tag/remove-tag';
import '../../checkbox-field-item/checkbox-field-item';
import { cre8MultiSelect } from '../multi-select';

describe('remove-tag', () => {
  test('renders correctly', async () => {
    const items = ['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon'];
    const el = await fixture<cre8MultiSelect>(
      html`<cre8-multi-select .items="${items}"></cre8-multi-select>`
    );
    expect(el.shadowRoot).toBeTruthy();
  });

  test('renders error field note correctly', async () => {
    const items = ['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon'];
    const el = await fixture<cre8MultiSelect>(
      html`<cre8-multi-select .items="${items}" errorNote="Error!!" ?isError="${true}"></cre8-multi-select>`
    );
    expect(el.shadowRoot).toBeTruthy();
  });

  test('renders preselected multiselect correctly', async () => {
    const items = ['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon'];
    const preselectedItems = ['Bagel', 'Burger', 'Boat'];
    const el = await fixture<cre8MultiSelect>(
      html`<cre8-multi-select
        .items="${items}"
        .preselectedItems="${preselectedItems}"
      ></cre8-multi-select>`
    );

    await el.updateComplete;
    expect(el.selectedTagItems).toHaveLength(3);
  });

  test('click opens drowdown', async () => {
    const items = ['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon'];
    const el = await fixture<cre8MultiSelect>(
      html`<cre8-multi-select .items="${items}"></cre8-multi-select>`
    );

    const openDropdownButton = el.shadowRoot?.querySelector(
      '.cre8-c-multi-select__down_icon'
    );
    openDropdownButton.dispatchEvent(new MouseEvent('click'));
    await el.updateComplete;

    expect(el.dropdownOpen).toBeTruthy();
  });

  test('dispatched event and adds tag when dropdown click', async () => {
    const items = ['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon'];
    const el = await fixture<cre8MultiSelect>(
      html`<cre8-multi-select .items="${items}"></cre8-multi-select>`
    );
    await el.updateComplete;

    const emitSpy = jest.spyOn(el, 'dispatchEvent');
    const emittedItem = new CustomEvent('selectedItemsChange', {
      detail: { selectedItems: ['Bagel'] },
    });

    el.dropdownOpen = true;
    await el.updateComplete;
    const firstDropdownItem = el.shadowRoot?.querySelector(
      'cre8-checkbox-field-item'
    );
    firstDropdownItem.checked = true;
    await el.updateComplete;
    firstDropdownItem.dispatchEvent(
      new Event('input', { bubbles: true, cancelable: true })
    );

    await el.updateComplete;
    expect(el.selectedTagItems).toHaveLength(1);
    expect(emitSpy).toHaveBeenCalledWith(emittedItem);
  });

  test('dispatched event and removed tag when remove tag clicked', async () => {
    const items = ['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon'];
    const el = await fixture<cre8MultiSelect>(
      html`<cre8-multi-select .items="${items}"></cre8-multi-select>`
    );
    await el.updateComplete;

    el.dropdownOpen = true;
    await el.updateComplete;
    const firstDropdownItem = el.shadowRoot?.querySelector(
      'cre8-checkbox-field-item'
    );
    firstDropdownItem.checked = true;
    await el.updateComplete;
    firstDropdownItem.dispatchEvent(
      new Event('input', { bubbles: true, cancelable: true })
    );

    const emitSpy = jest.spyOn(el, 'dispatchEvent');
    const emittedItem = new CustomEvent('selectedItemsChange', {
      detail: { selectedItems: [] },
    });

    await el.updateComplete;
    const firstTagItem = el.shadowRoot
      ?.querySelector('cre8-remove-tag')
      .shadowRoot?.querySelector('button');
    firstTagItem.dispatchEvent(new MouseEvent('click'));

    await el.updateComplete;
    expect(emitSpy).toHaveBeenCalledWith(emittedItem);
    expect(el.selectedTagItems).toHaveLength(0);
  });

  describe('accessibility -  Remove Tag', () => {
    test('tests accessibility for default remove tag', async () => {
      const items = ['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon'];
      const el = await fixture<cre8MultiSelect>(
        html`<cre8-multi-select items="${items}"></cre8-multi-select>`
      );
      return expect(el).toBeAccessible();
    });
  });
});
