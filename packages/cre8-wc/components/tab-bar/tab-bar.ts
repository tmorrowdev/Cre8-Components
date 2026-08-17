import { html } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './tab-bar.styles.js';
import type { Cre8TabBarItem } from '../tab-bar-item/tab-bar-item.js';

/**
 * A bottom tab bar, in the shape iOS expects.
 *
 * This is deliberately not `cre8-tabs`. A tab strip sits above its content and
 * scrolls away with the page; a tab bar is pinned to the bottom of the viewport
 * for the life of the app, sits inside the thumb's reach, and is the primary
 * navigation of the whole application rather than a control on one screen.
 * Trying to serve both from one component gets you something that is wrong in
 * both places.
 *
 * The bar owns its children's state: it assigns each item its index and clears
 * the others when one is chosen, so a host only listens for one event and never
 * has to keep item state in sync by hand.
 *
 * @slot - `cre8-tab-bar-item` children.
 *
 * @fires tab-bar-select - Fires when an item is chosen. `event.detail.index` is
 *   its position and `event.detail.value` its `value`, if it has one.
 */
export class Cre8TabBar extends Cre8Element {
    static styles = [styles];

  /**
   * Index of the selected item. Set it to move the selection; read it back
   * after a `tab-bar-select`.
   */
  @property({ type: Number, reflect: true })
      activeIndex = 0;

  /**
   * Accessible name for the navigation landmark. A bar with no name is one more
   * unlabelled `nav` for a screen reader to disambiguate.
   */
  @property()
      label = 'Main';

  /**
   * Floats the bar over the content instead of sitting in flow. This is the
   * iOS shape and the default; unset it when embedding the bar inside a frame
   * that already positions it.
   */
  @property({ type: Boolean, reflect: true })
      fixed = true;

  @queryAssignedElements({ selector: 'cre8-tab-bar-item' })
      private _items!: Cre8TabBarItem[];

  /**
   * Push index and selection down to the items.
   *
   * Runs on every update and on slot change, so items added later — a tab
   * behind a feature flag, say — are numbered correctly without the host
   * doing anything.
   */
  private _syncItems() {
      this._items.forEach((item, index) => {
          item.index = index;
          item.isActive = index === this.activeIndex;
      });
  }

  protected updated() {
      this._syncItems();
  }

  private _handleSelect(event: Event) {
      const detail = (event as CustomEvent<{ index: number; value?: string }>).detail;
      if (typeof detail?.index !== 'number') return;
      this.activeIndex = detail.index;
      this._syncItems();
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-tab-bar', {
          'cre8-c-tab-bar--fixed': this.fixed,
      });

      return html`
      <nav class="${componentClassNames}" aria-label="${this.label}">
        <div class="cre8-c-tab-bar__items" role="tablist">
          <slot @slotchange=${this._syncItems} @tab-bar-select=${this._handleSelect}></slot>
        </div>
      </nav>
    `;
  }
}

if (customElements.get('cre8-tab-bar') === undefined) {
    customElements.define('cre8-tab-bar', Cre8TabBar);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-tab-bar': Cre8TabBar;
  }
}

export default Cre8TabBar;
