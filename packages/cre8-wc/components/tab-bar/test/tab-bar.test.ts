import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../tab-bar';
import '../../tab-bar-item/tab-bar-item';
import { Cre8TabBar } from '../tab-bar';
import { Cre8TabBarItem } from '../../tab-bar-item/tab-bar-item';

const bar = () => html`
  <cre8-tab-bar label="Sections">
    <cre8-tab-bar-item label="Today" value="today"></cre8-tab-bar-item>
    <cre8-tab-bar-item label="Trends" value="trends"></cre8-tab-bar-item>
    <cre8-tab-bar-item label="Goals" value="goals"></cre8-tab-bar-item>
  </cre8-tab-bar>
`;

const items = (el: Cre8TabBar) =>
  Array.from(el.querySelectorAll('cre8-tab-bar-item')) as Cre8TabBarItem[];

describe('tab-bar', () => {
  test('renders a labelled navigation landmark', async () => {
    const el = await fixture<Cre8TabBar>(bar());
    const nav = el.shadowRoot.querySelector('nav');
    expect(nav).toBeTruthy();
    // An unnamed nav is one more landmark for a screen reader to disambiguate.
    expect(nav.getAttribute('aria-label')).toBe('Sections');
  });

  test('is fixed to the bottom by default', async () => {
    const el = await fixture<Cre8TabBar>(bar());
    expect(el.fixed).toBe(true);
    expect(
      el.shadowRoot.querySelector('nav').classList.contains('cre8-c-tab-bar--fixed')
    ).toBe(true);
  });

  test('numbers its items and selects the first', async () => {
    const el = await fixture<Cre8TabBar>(bar());
    await el.updateComplete;
    const all = items(el);
    expect(all.map((i) => i.index)).toEqual([0, 1, 2]);
    expect(all.map((i) => !!i.isActive)).toEqual([true, false, false]);
  });

  test('selecting an item moves the selection off every other one', async () => {
    // The whole reason the bar owns this: an item that decided its own state
    // would let two be active at once.
    const el = await fixture<Cre8TabBar>(bar());
    await el.updateComplete;
    items(el)[2].shadowRoot.querySelector('button').click();
    await el.updateComplete;

    expect(el.activeIndex).toBe(2);
    expect(items(el).map((i) => !!i.isActive)).toEqual([false, false, true]);
  });

  test('reports the index and value of the chosen item', async () => {
    const el = await fixture<Cre8TabBar>(bar());
    await el.updateComplete;
    const seen: Array<{ index: number; value?: string }> = [];
    el.addEventListener('tab-bar-select', (e: Event) =>
      seen.push((e as CustomEvent).detail)
    );

    items(el)[1].shadowRoot.querySelector('button').click();
    await el.updateComplete;
    expect(seen).toEqual([{ index: 1, value: 'trends' }]);
  });

  test('setting activeIndex from the host moves the selection', async () => {
    const el = await fixture<Cre8TabBar>(bar());
    await el.updateComplete;
    el.activeIndex = 1;
    await el.updateComplete;
    expect(items(el).map((i) => !!i.isActive)).toEqual([false, true, false]);
  });

  test('items added later are numbered too', async () => {
    // A destination behind a feature flag should not need the host to
    // renumber anything by hand.
    const el = await fixture<Cre8TabBar>(bar());
    await el.updateComplete;
    const extra = document.createElement('cre8-tab-bar-item') as Cre8TabBarItem;
    extra.label = 'More';
    el.appendChild(extra);
    await el.updateComplete;
    expect(extra.index).toBe(3);
  });
});

describe('tab-bar-item', () => {
  test('exposes selection state to assistive technology', async () => {
    const el = await fixture<Cre8TabBar>(bar());
    await el.updateComplete;
    const button = items(el)[0].shadowRoot.querySelector('button');
    expect(button.getAttribute('role')).toBe('tab');
    expect(button.getAttribute('aria-selected')).toBe('true');
  });

  test('caps the badge rather than letting it widen the item', async () => {
    const el = await fixture<Cre8TabBarItem>(
      html`<cre8-tab-bar-item label="Log" .badge=${128}></cre8-tab-bar-item>`
    );
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.cre8-c-tab-bar-item__badge').textContent.trim()).toBe('99+');
  });

  test('renders no badge when there is nothing to count', async () => {
    const el = await fixture<Cre8TabBarItem>(
      html`<cre8-tab-bar-item label="Log"></cre8-tab-bar-item>`
    );
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.cre8-c-tab-bar-item__badge')).toBeNull();
  });
});
