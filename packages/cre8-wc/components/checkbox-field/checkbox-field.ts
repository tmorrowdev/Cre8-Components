import { html,  } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8Element } from '../cre8-element';
import { syncLightChildren, type ChildSpec } from '../utils/light-children';
import '../field-note/field-note';
import styles from './checkbox-field.styles.js';

/** One checkbox in a data-driven checkbox field. */
export interface Cre8CheckboxItemData {
  label: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
}

/**
 * Checkbox Field is the parent container for `checkbox-field-item`.
 * It is required to allow for grouping numerous checkboxes that need additional context (in the form of `<legend>`).
 * It also provides accessibility roles, aria attributes and field note messaging on the group.
 *
 * See `checkbox-field-item` for more guidance on its usage.
 *
 * @slot - The component content, which should be a set of `checkbox-field-item`s
 */

export class Cre8CheckboxField extends Cre8Element {
    static styles = [styles];

  /**
   * Checkbox container legend label
   */
  @property()
      label?: string;

  /**
   * Checkbox container fieldnote
   */
  @property()
      fieldNote?: string;

  /**
   * Checkbox container fieldnote aria describe by
   */
  @property()
      ariaDescribedBy?: string;

  /**
   * Checkbox container fieldnote icon name
   */
  @property()
      fieldNoteIconName?: string;

  /**
   * Checkbox container fieldnote knockout
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      fieldNoteKnockout?: boolean;

  /**
   * Checkbox container fieldnote isSuccess
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      fieldNoteIsSuccess?: boolean;

  /**
   * Checkbox container fieldnote isError
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      fieldNoteIsError?: boolean;

  connectedCallback() {
      super.connectedCallback();
      if (this.fieldNote) {
          this.ariaDescribedBy = this.ariaDescribedBy || nanoid();
      }
  }
  /**
   * Checkboxes for a data-driven field. Each becomes a
   * `cre8-checkbox-field-item`, sharing the field's `name` so they submit as a
   * group.
   */
  @property({ type: Array })
      items?: Cre8CheckboxItemData[];

  /** Form control name shared by every generated item. */
  @property()
      name?: string;

  /** The composition the data property stands for. */
  private buildComposition(): ChildSpec[] | null {
      if (!this.items) return null;
      return this.items.map((item) => ({
          tag: 'cre8-checkbox-field-item',
          props: {
              label: item.label,
              value: item.value,
              checked: item.checked,
              disabled: item.disabled,
              required: item.required,
              name: this.name,
          },
      }));
  }

  protected updated(changed: Map<string, unknown>): void {
      if (['items', 'name'].some((key) => changed.has(key))) {
          syncLightChildren(this, this.buildComposition());
      }
  }


  render() {
      const componentClassNames = this.componentClassNames('cre8-c-checkbox-field', {});

      return html`
      <fieldset class="${componentClassNames}" aria-describedby="${ifDefined(this.ariaDescribedBy)}">
      <legend class="cre8-c-checkbox-field__legend">${this.label}</legend>
        <div class="cre8-c-checkbox-field__body">
          <div class="cre8-c-checkbox-field__list" role="list">
            <slot></slot>
          </div>
        </div>
        ${this.fieldNote
        ? html`<cre8-field-note
          ?inverted=${this.fieldNoteKnockout}
          id=${ifDefined(this.ariaDescribedBy)}
          iconName=${ifDefined(this.fieldNoteIconName)}
          ?isSuccess=${this.fieldNoteIsSuccess}
          ?isError=${this.fieldNoteIsError}
        >
          ${this.fieldNote}
        </cre8-field-note>` : ''}
      </fieldset>
    `;
  }
}

if (customElements.get('cre8-checkbox-field') === undefined) {
    customElements.define('cre8-checkbox-field', Cre8CheckboxField);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-checkbox-field': Cre8CheckboxField;
  }
}

export default Cre8CheckboxField;
