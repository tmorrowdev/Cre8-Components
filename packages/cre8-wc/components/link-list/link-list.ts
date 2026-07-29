import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import { syncLightChildren, type ChildSpec } from '../utils/light-children';
import styles from './link-list.styles.js';

/** One link in a data-driven link list. */
export interface Cre8LinkData {
  text: string;
  href: string;
  isActive?: boolean;
}

/**
 * @slot - The link list items
 */

export class Cre8LinkList extends Cre8Element {
    static styles = [styles];

  /**
   * Behavioral variant
   * - **responsive** renders a horizontal wrapping link list that converts to a stacked link list on large screens
   * - **horizontal** renders a horizontal wrapping link list on all screens
   */
  @property()
      behavior?: 'responsive' | 'horizontal';

  /**
   * Inverted variant
   * 1. Used for dark backgrounds
   */
  @property({ type: Boolean, reflect: true })
      inverted?: boolean;

  /**
   * Size variants
   * - **sm** renders a link list with a smaller typography
   */
  @property()
      size?: 'sm';

  /**
   * Spacing between link list items
   * - **condensed** renders a link list with a more compact display
   */
  @property()
      spacing?: 'condensed';

  /**
   * Style variants
   * - **secondary** renders a link list with a more subtle visual treatment
   * - **display** renders a link list with a display treatment (e.g. article title)
   */
  @property()
      variant?: 'secondary' | 'display';
  /**
   * Links for a data-driven list. Each becomes a `cre8-link-list-item`.
   *
   * Worth knowing if you compose these by hand: the label goes in the item's
   * default slot, *not* its `text` prop. That prop is declared and documented
   * but never rendered, so setting it produces an empty link that passes every
   * check — see the drift ledger in `docs/kb/07-research.md`. This API routes
   * around it.
   */
  @property({ type: Array })
      items?: Cre8LinkData[];

  /** The composition the data property stands for. */
  private buildComposition(): ChildSpec[] | null {
      if (!this.items) return null;
      return this.items.map((item) => ({
          tag: 'cre8-link-list-item',
          props: { href: item.href, isActive: item.isActive },
          text: item.text,
      }));
  }

  protected updated(changed: Map<string, unknown>): void {
      if (['items'].some((key) => changed.has(key))) {
          syncLightChildren(this, this.buildComposition());
      }
  }


  render() {
      const componentClassName = this.componentClassNames('cre8-c-link-list', {
          'cre8-c-link-list--secondary': this.variant === 'secondary',
          'cre8-c-link-list--display': this.variant === 'display',
          'cre8-c-link-list--inverted': this.inverted === true,
          'cre8-c-link-list--responsive': this.behavior === 'responsive',
          'cre8-c-link-list--horizontal': this.behavior === 'horizontal',
          'cre8-c-link-list--condensed': this.spacing === 'condensed',
          'cre8-c-link-list--sm': this.size === 'sm',
      });

      return html`
      <ul class="${componentClassName}">
        <slot></slot>
      </ul>
    `;
  }
}

if (customElements.get('cre8-link-list') === undefined) {
    customElements.define('cre8-link-list', Cre8LinkList);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-link-list': Cre8LinkList;
  }
}

export default Cre8LinkList;
