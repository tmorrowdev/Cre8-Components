import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import '../field-note/field-note';
import styles from './radio-field.scss';

/**
 * Radio Field is the parent container for `radio-field-item`.
 * It is required to allow for grouping numerous radio fields that need additional context (in the form of `<legend>`).
 * It also provides accessibility roles, aria attributes and field note messaging on the group.
 *
 * See [radio-field-item](?path=/story/cre8-components-radio-field-item--default) for more guidance on its usage.
 *
 * @slot - The component content, which should be a set of `radio-field-item`s
 */

export class Cre8RadioField extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Radio Field Note
   * @attr {string}
   */
  @property()
      fieldNote?: string;

  /**
   * Radio container fieldnote aria describe by
   * @attr {string}
   */
  @property()
      ariaDescribedBy?: string;

  /**
   * Radio container fieldnote icon name
   * @attr {string}
   */
  @property()
      fieldNoteIconName?: string;

  /**
   * Radio container fieldnote knockout
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      fieldNoteKnockout?: boolean;

  /**
   * Radio container fieldnote isSuccess
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      isSuccess?: boolean;

  /**
   * Radio container fieldnote isError
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      isError?: boolean;

  /**
   * Radio field legend label
   */
  @property()
      label?: string;

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-radio-field', {});

      return html`
      <fieldset class="${componentClassNames}" aria-describedby="${ifDefined(this.ariaDescribedBy)}">
        <legend class="cre8-c-radio-field__legend">${this.label}</legend>
        <div class="cre8-c-radio-field__body">
          <ul class="cre8-c-radio-field__list" role="list">
            <slot></slot>
          </ul>
        </div>
        ${this.fieldNote
        ? html`<cre8-field-note
          ?inverted=${this.fieldNoteKnockout}
          id=${ifDefined(this.ariaDescribedBy)}
          iconName=${ifDefined(this.fieldNoteIconName)}
          ?isSuccess=${this.isSuccess}
          ?isError=${this.isError}
        >
          ${this.fieldNote}
        </cre8-field-note>` : ''}
      </fieldset>
    `;
  }
}

if (customElements.get('cre8-radio-field') === undefined) {
    customElements.define('cre8-radio-field', Cre8RadioField);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-radio-field': Cre8RadioField;
  }
}

export default Cre8RadioField;
