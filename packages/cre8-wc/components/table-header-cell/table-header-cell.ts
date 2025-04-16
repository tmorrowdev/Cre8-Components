import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Cre8Element } from '../cre8-element';
import styles from './table-header-cell.scss';

/**
 * @slot - The component content
 */

export class Cre8TableHeaderCell extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Colspan attribute on th
   */
  @property()
    public colspan?: number;

  /**
   * Adds inline width style to th
   * Sets width of entire column
   */
  @property()
  public width?: string;

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-table__header-cell', {});

      return html`
      <th
        role="columnheader"
        colspan=${ifDefined(this.colspan)}
        class="${componentClassNames}"
        style="width: ${ifDefined(this.width)}"
      >
        ${html`<slot></slot>`}
      </th>
    `;
  }
}

if (customElements.get('cre8-table-header-cell') === undefined) {
    customElements.define('cre8-table-header-cell', Cre8TableHeaderCell);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-table-header-cell': Cre8TableHeaderCell;
  }
}

export default Cre8TableHeaderCell;
