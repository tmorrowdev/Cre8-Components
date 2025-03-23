import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './link-list.scss';

/**
 * @slot - The link list items
 */
export class cre8LinkList extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

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
    customElements.define('cre8-link-list', cre8LinkList);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-link-list': cre8LinkList;
  }
}

export default cre8LinkList;
