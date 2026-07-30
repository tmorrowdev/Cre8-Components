import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8Element } from '../cre8-element';
import { syncLightChildren, type ChildSpec } from '../utils/light-children';
import styles from './tag-list.styles.js';

/** One tag in a data-driven tag list. */
export interface Cre8TagData {
  text: string;
  variant?: 'neutral' | 'branded' | 'neutral-hybrid';
  shape?: 'square' | 'round';
  type?: 'checkbox' | 'radio';
  disabled?: boolean;
}

/**
 * Tag List must have children which are Tag components that are of type `checkbox` or `radio`.
 * The Tags must use the `neutral` variant and the `round` shape when they are inside a Tag List.
 * Tag List has a label that should be used to describe the purpose of the list.
 *
 * @slot - The `cre8-tag` children of the list
 */

export class Cre8TagList extends Cre8Element {
    static styles = [styles];

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
  /**
   * Tags for a data-driven tag list. Set this and the list builds its own
   * `cre8-tag` children in the light DOM. Leave it unset to compose them
   * yourself.
   */
  @property({ type: Array })
      tags?: Cre8TagData[];

  /** The composition the data property stands for. */
  private buildComposition(): ChildSpec[] | null {
      if (!this.tags) return null;
      return this.tags.map((tag) => ({
          tag: 'cre8-tag',
          props: {
              text: tag.text,
              variant: tag.variant,
              shape: tag.shape,
              type: tag.type,
              disabled: tag.disabled,
              name: this.fieldId,
          },
      }));
  }

  protected updated(changed: Map<string, unknown>): void {
      if (['tags', 'fieldId'].some((key) => changed.has(key))) {
          syncLightChildren(this, this.buildComposition());
      }
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
