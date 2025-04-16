import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8Element } from '../cre8-element';
import styles from './tag-list.scss';

/**
 * Tag List must have children which are Tag components that are of type `checkbox` or `radio`.
 * The Tags must use the `neutral` variant and the `round` shape when they are inside a Tag List.
 * Tag List has a label that should be used to describe the purpose of the list.
 */
export class Cre8TagList extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Tag list legend label
   */
  @property()
      label?: string;

  /**
   * The unique id of the select
   * @attr {string}
   */
  @property()
      fieldId?: string;

  firstUpdated() {
      this._initializeAria();
  }

  private _initializeAria() {
      this.fieldId = this.fieldId || nanoid();
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-tag-list', { });

      return html`
      <fieldset class="${componentClassNames}">
        <legend class="cre8-c-tag-list__legend">${this.label}</legend>
        <div class="cre8-c-tag-list__list" role="list">   
          <slot></slot>
        </div>
      </fieldset>
      `;
  }
}

if (customElements.get('cre8-tag-list') === undefined) {
    customElements.define('cre8-tag-list', Cre8TagList);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-tag-list': Cre8TagList;
  }
}

export default Cre8TagList;
