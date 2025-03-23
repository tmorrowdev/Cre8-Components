import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './table.scss';

/**
 * @slot - The component content
 */

export class cre8Table extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Specifies the caption/title of the table, visible to all users.
   * Increases accessibility of table.
   */
  @property()
      caption?: string;

  /**
   * Behavior variants
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**responsive** stacks column headers with respective table cells on small screens</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      behavior?: 'responsive';

  /**
   * Hoverable rows variant
   * 1) Allows the table rows to be styled on hover
   */
  @property({ type: Boolean, reflect: true })
      isHoverable?: boolean;

  /**
   * Style variants
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**striped** add zebra-striping to table rows within the `<tbody>`</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'striped';

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-table', {
          'cre8-c-table--hoverable': this.isHoverable,
          'cre8-c-table--striped': this.variant === 'striped',
          'cre8-c-table--responsive': this.behavior === 'responsive',
      });

      return html`
      <table role="table" class="${componentClassNames}">
        ${this.caption
        ? html`<caption class="cre8-c-table__caption">
            ${this.caption}
          </caption>`
        : ''}
        ${html`<slot></slot>`}
      </table>
    `;
  }
}

if (customElements.get('cre8-table') === undefined) {
    customElements.define('cre8-table', cre8Table);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-table': cre8Table;
  }
}

export default cre8Table;
