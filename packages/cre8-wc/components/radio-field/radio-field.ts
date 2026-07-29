import { html,  } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import { syncLightChildren, type ChildSpec } from '../utils/light-children';
import '../field-note/field-note';
import styles from './radio-field.styles.js';

/** One option in a data-driven radio field. */
export interface Cre8RadioItemData {
  label: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
}

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
    static styles = [styles];

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
  /**
   * Options for a data-driven radio field. Each becomes a
   * `cre8-radio-field-item` sharing the field's `name`, which is what the form
   * submits under. Exclusivity is enforced by the field itself — see
   * `enforceSingleSelection`, and do not assume `name` alone does it.
   */
  @property({ type: Array })
      items?: Cre8RadioItemData[];

  /** Form control name shared by every generated option. */
  @property()
      name?: string;

  /** The composition the data property stands for. */
  private buildComposition(): ChildSpec[] | null {
      if (!this.items) return null;
      return this.items.map((item) => ({
          tag: 'cre8-radio-field-item',
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

  connectedCallback(): void {
      super.connectedCallback();
      this.addEventListener('change', this.enforceSingleSelection as EventListener);
  }

  disconnectedCallback(): void {
      this.removeEventListener('change', this.enforceSingleSelection as EventListener);
      super.disconnectedCallback();
  }

  /**
   * Keep the group to one selection.
   *
   * A native radio group is formed by `name`, but only within one tree scope —
   * and each `cre8-radio-field-item` keeps its `input` in its own shadow root,
   * so the browser never sees them as siblings and every option stays checked
   * once clicked. That is true of a hand-written field too, not just a generated
   * one, which is why the fix lives here on the group rather than in the
   * flattened path.
   */
  private enforceSingleSelection = (event: Event): void => {
      const source = event.target as HTMLElement | null;
      if (!source) return;
      const items = [...this.querySelectorAll('cre8-radio-field-item')];
      const selected = items.find((item) => item === source || item.contains(source));
      if (!selected) return;
      for (const item of items) {
          if (item !== selected) (item as HTMLElement & { checked?: boolean }).checked = false;
      }
  };


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
