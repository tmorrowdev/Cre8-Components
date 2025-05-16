import svgCheck from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Check.svg?raw';
import { html, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Cre8FormElement } from '../cre8-form-element';
import '../icon/icon';
import styles from './tag.scss';

/**
 * The tag component allows you to make selections, filter content, or trigger actions. While buttons are
 * expected to appear consistently and with familiar calls to actions, tags should appear dynamically
 * as a group of multiple interactions elements. It is a flexible
 * component that comes in the following types:
 *  - **radio**  Clicking a Radio Button causes it to change color. These tags only allow
 * one option to be chosen and can be used in place of radio button when they need to be listed
 * horizontally
 *
 *  - **checkbox** It allows for selecting options, It can be toggled on and off.
 */

export class Cre8Tag extends Cre8FormElement {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  @property()
      text: string;

  /**
   * Type of tag
   * **checkbox** renders a checkbox tag
   ***radio** renders a radio tag
   */

  @property()
      type: 'checkbox'| 'radio';

  /**
   * Color variant
   * **neutral** renders the default, unselected tag
   * **branded** renders a selected tag
   * **neutral-hybrid** renders a tag when mouse is hovering tag
   */

  @property()
      variant: 'neutral' | 'branded' | 'neutral-hybrid' = 'neutral';

  /**
   * shape of the tag, supports square and round, and default not mentioned its a square
   */
  @property()
      shape: 'square' | 'round' = 'square';

  /*
  * Disabled attribute
  * renders a greyed out tag that the user cannot interact with
  */
  @property({ type: Boolean })
      isDisabled?: boolean;

  /*
  * Selected attribute
  * renders a selected tag
  */
  @property({ type: Boolean })
      isSelected?: boolean;

  /**
  * Get the radio field item input
  */
  @query('input')
      field!: HTMLInputElement;

  /**
   * The fieldId attribute is assigned to the HTML input element of the radio button and the for attribute of the
   * corresponding label.
   */
  @property()
      fieldId?: string;

  /**
  * Initial checked for initial checked state
  */
  private initialSelected?: boolean;

  connectedCallback() {
      super.connectedCallback();
      this.fieldId = this.fieldId || nanoid();
      window.addEventListener('click', this._clickCheckHandler, false);
      window.addEventListener('click', this._clickRadioHandler, false);
      window.addEventListener('keydown', this._handleCheckKeyDown, false);
      window.addEventListener('keydown', this.handleRadioKeyDown, false);
  }

  disconnectedCallback() {
      super.disconnectedCallback();
      window.removeEventListener('click', this._clickCheckHandler, false);
      window.removeEventListener('click', this._clickRadioHandler, false);
      window.removeEventListener('keydown', this._handleCheckKeyDown, false);
      window.removeEventListener('keydown', this.handleRadioKeyDown, false);
  }

  renderCheckboxIcon() {
      if (this.type === 'checkbox' && this.isSelected) {
          return html`
    <cre8-icon svg="${svgCheck}" class="cre8-tag-icon" aria-hidden="true"></cre8-icon>
     `;
      }
      return null;
  }

  private _clickCheckHandler() {
      if (!this.isDisabled) {
          if (this.type === 'checkbox') {
              this.isSelected = !this.isSelected;
          }
          this.dispatchEvent(new CustomEvent('change', { detail: { isSelected: this.isSelected, type: this.type } }));
      }
  }

  private _handleCheckKeyDown(event: KeyboardEvent) {
      if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          this._clickCheckHandler();
      }
  }

/**
* Reset the radio tag field
*/
  public resetField() {
      this.internals.setFormValue(null);
  }

/**
* Reset the radio field tags tab indeces
*/
  resetTabIndeces(tags: Cre8Tag[]) {
      tags.forEach((element: HTMLElement) => {
          element.shadowRoot.querySelector('.cre8-c-tag').setAttribute('tabindex', '0');
      });
  }

/**
* Remove checked
* 1) Remove checked property from all tags and set tabindex to -1
* 2) Reset the form field to not checked
*/
  private _removeChecked() {
      if (this.parentNode) {
      /* 1 */
          const tags = this.parentNode.querySelectorAll('cre8-tag');
          tags.forEach((element: Cre8Tag) => {
              element.isSelected = false;
              element.shadowRoot.querySelector('.cre8-c-tag').setAttribute('tabindex', '-1');
              element.resetField();
          });
      }
  }

/**
* Reset form callback
* 1) Remove the checked state from all radio tags
* 2) Set the checked state to the initial checked state
* 3) Set the radio field input checked attribute to the initial checked state
*/
  formResetCallback(): void {
      this._removeChecked();
      this.isSelected = this.initialSelected;
      this.field.checked = this.initialSelected;
  }

  private _clickRadioHandler() {
      this._removeChecked();
      this.isSelected = !this.isSelected;
      const tagInput = this.shadowRoot?.querySelector<HTMLInputElement>('.cre8-c-tag');
      if (tagInput) {
          tagInput.setAttribute('tabindex', '0');
      }
      if (this.isSelected) {
          this.internals.setFormValue(this.value || 'on');
      } else {
          this.internals.setFormValue(null);
      }
  }

  private _updateSibling(event: KeyboardEvent, sibling: Element, element: HTMLElement) {
      event.preventDefault();
      this._removeChecked();
      element.focus();
      element.setAttribute('tabindex', '0');
      sibling.setAttribute('isSelected', '');
  }

  private _checkPreviousTag(event: KeyboardEvent) {
      let previous = this.previousElementSibling;
      while (previous) {
          const previousElement = previous?.shadowRoot?.querySelector<HTMLInputElement>(
              '.cre8-c-tag:not([aria-disabled="true"])'
          );

          if (previousElement) {
              this._updateSibling(event, previous, previousElement);
              return;
          }

          previous = previous.previousElementSibling;
      }
  }

  private _checkNextTag(event: KeyboardEvent) {
      let next = this.nextElementSibling;
      while (next) {
          const nextElement = next?.shadowRoot?.querySelector<HTMLInputElement>(
              '.cre8-c-tag:not([aria-disabled="true"])'
          );

          if (nextElement) {
              this._updateSibling(event, next, nextElement);
              return;
          }

          next = next.nextElementSibling;
      }
  }

  handleRadioKeyDown(event: KeyboardEvent) {
      if (event.code === 'ArrowLeft' || event.code === 'ArrowUp') {
          this._checkPreviousTag(event);
      } else if (event.code === 'ArrowRight' || event.code === 'ArrowDown') {
          this._checkNextTag(event);
      } else if (event.code === 'Tab' && !this.isSelected) {
          const tags = this.parentNode.querySelectorAll('cre8-tag');
          tags.forEach((element: HTMLElement) => {
              element.shadowRoot.querySelector('.cre8-c-tag').setAttribute('tabindex', '-1');
          });

      // After making tabbing away from the fieldset,
      // reset the items to be tabbable again so the user can come back to the fieldset
          setTimeout(this.resetTabIndeces, 100, tags);
      }
  }

  /**
  * access role when tag embedded in tag-list
  */
  private _getRole() {
      const tagContainer = this.closest('cre8-tag-list');
      if (tagContainer) {
          return 'listitem';
      }
      return '';
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-tag', {
          [`cre8-c-tag--${this.type}`]: true,
          [`cre8-c-tag--${this.shape}`]: true,
          [`cre8-c-tag--${this.variant}`]: true,
          [`cre8-c-tag--${this.variant}-selected`]: this.isSelected,
          'cre8-c-tag--disabled': this.isDisabled,
      });

      const isSelected = this.isSelected === true || this.initialSelected === true;

      return html` 
        <div role="${ifDefined(this._getRole())}">
            <div role="${ifDefined(this.type)}" aria-checked="${isSelected}" class="${componentClassNames}"
                aria-disabled="${ifDefined(this.isDisabled)}"
                @click="${this.type === 'radio' ? this._clickRadioHandler : this._clickCheckHandler}"
                @keydown="${this.type === 'radio' ? this.handleRadioKeyDown : this._handleCheckKeyDown}"
                tabindex="0"
            >
                ${this.renderCheckboxIcon()}
                <label 
                    @input="${this.type === 'radio' ? this._clickRadioHandler : this._clickCheckHandler}"
                    for="${this.fieldId}" class="cre8-tag-text">${this.text}
                </label>
            </div>
            <input
                class="cre8-c-tag__input" 
                type="${this.type}"
                id="${this.fieldId}"
                name=${this.text}
                .value="${this.text}"
                ?disabled="${this.isDisabled}"
                .checked = "${isSelected}"
            />
        </div>
  `;
  }
}

if (customElements.get('cre8-tag') === undefined) {
    customElements.define('cre8-tag', Cre8Tag);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-tag': Cre8Tag;
  }
}

export default Cre8Tag;
