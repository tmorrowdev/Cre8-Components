/* eslint-disable import/no-duplicates */
/* eslint-disable no-duplicate-imports */
/* eslint-disable lit/no-template-arrow */
/* eslint-disable indent */

import { ifDefined } from 'lit-html/directives/if-defined.js';
import { html, nothing, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import svgCaretDown from '@cre8/cre8-icons/lib/icons/System/Regular/Caret Down.svg?raw';
import svgClear from '@cre8/cre8-icons/lib/icons/System/Regular/Clear X.svg?raw';
import styles from './multi-select.scss';
import { Cre8Element } from '../cre8-element';
import '@cre8/cre8-icons';
import '../remove-tag/remove-tag';
import '../field-note/field-note';
import '../button/button';
import '../checkbox-field-item/checkbox-field-item';
// eslint-disable-next-line import/no-named-as-default
import cre8CheckboxFieldItem from '../checkbox-field-item/checkbox-field-item';

/**
 * Multiselect is used when multiple options can be chosen from a static dropdown
 * This component has a list of items in the dropdown that can be added as "selected tags"
 * The checkbox will always reflect the selected nature of the item and is not removed
 * from the dropdown when clicked, the tags will be added and removed based on their state.
 *
 * Event `selectedItemsChange` emits whenever a tag is added or remove from the list and the
 * current list after the change is given in the detail.
 */
export class cre8MultiSelect extends Cre8Element {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  /**
   * The list of string items the user can choose in the dropdown
   *
   * Note: For passing props containing arrays and complex types, you should pass the props using a
   * period in from of the prop like so: `.items="[]"`
   * (this is only needed for Web Components and not the React version)
   * @attr {string[]}
   */
  @property({ type: Array })
  items: string[] = [];

  @state()
  selectedTagItems: string[] = [];

  /**
   * The list of string items that are initially in the selected list of tags
   * Note: This list MUST be a subset of the array of items to function.
   * i.e. if items=['cat', 'dog', 'bird'], preselectedItems=['cat'] is valid
   * while preselectedItems=['cat', 'goat'] is not and will break the component.
   *
   * Note: For passing props containing arrays and complex types, you should pass the props using a
   * period in from of the prop like so: `.items="[]"`
   * (this is only needed for Web Components and not the React version)
   * @attr {string[]}
   */
  @property({ type: Array })
  preselectedItems: string[];

  @state()
  dropdownOpen: boolean = false;

  /**
   * The required label that appears above the multiselect
   * @attr {string}
   */
  @property()
  label: string;

  /**
   * The unique id of the select
   * @attr {string}
   */

  @property()
  fieldId?: string;

  /**
   * Optional field note text can be added to provide additional field guidance.
   * @attr {string}
   */
  @property()
  fieldNote?: string;

  /**
   * Used to connect the field note in text field to the text menu for accessibility
   * @attr {string}
   */
  @property()
  ariaDescribedBy?: string;

  /**
   * Additional aria-describedby connection to id for additional success and error notes to be accessible
   * @attr {string}
   */
  @property()
  validationAriaDescribedBy?: string;

  /**
   * The disabled attribute on the select
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
  disabled?: boolean;

  /**
   * Changes the component's treatment to represent an error state
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
  isError?: boolean;

  /**
   * The error field note that appears below the default field note
   * @attr {string}
   */
  @property()
  errorNote?: string;

  /**
   * Changes the component's treatment to represent a success state
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
  isSuccess?: boolean;

  /**
   * The success field note that appears below the default field note
   * @attr {string}
   */
  @property()
  successNote?: string;

  /* Life Cycle Methods */

  constructor() {
    super();
    this._handleOnClick = this._handleOnClick.bind(this);
  }

  firstUpdated() {
    if (this.preselectedItems) this.setPreselectedItemsinDropdown();
    this.selectedTagItems = this.preselectedItems || [];
    this._initializeAria();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._handleOnClick, false);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('click', this._handleOnClick, false);
  }

  /* HTML Content functions */

  private _renderDropdownItems() {
    return this.items.map(
      // Note: Keyboard can already navigate to the checkbox
      // eslint-disable-next-line lit-a11y/click-events-have-key-events
      (item, index) => html`<li
        @click="${(e: MouseEvent) => this._handleListItemClick(e, index)}"
      >
        <cre8-checkbox-field-item
          .checked="${!!this.selectedTagItems.includes(item)}"
          label=${item}
          id=${index}
          @input="${(e: InputEvent) => this._handleDropdownItemInput(item, e)}"
        >
        </cre8-checkbox-field-item>
      </li>`
    );
  }

  private _renderSelectedTags() {
    if (!this.selectedTagItems.length) {
      return nothing;
    }
    return this.selectedTagItems.map(
      (item) => html`<li>
        <cre8-remove-tag
          text="${item}"
          color="neutral"
          shape="square"
          ?disabled="${this.disabled}"
          @removeTagClicked="${() => this._handleRemoveTagClick(item)}"
        ></cre8-remove-tag>
      </li>`
    );
  }

  /* Helper Functions */

  private setPreselectedItemsinDropdown() {
    this.preselectedItems.forEach((item) => {
      this.selectedTagItems = this.selectedTagItems.concat(item);
    });
  }

  private clearAllTags() {
    if (!this.disabled) {
      if (this.dropdownOpen) {
        this.selectedTagItems.forEach((item) => {
          this.shadowRoot
            ?.querySelector(`cre8-checkbox-field-item[label="${item}"]`)
            .shadowRoot?.querySelector('input')
            .click();
        });
      }
      this.selectedTagItems = [];

      this.emitSelectedItems();
    }
  }

  private emitSelectedItems(): void {
    const customEvent = new CustomEvent('selectedItemsChange', {
      detail: {
        selectedItems: this.selectedTagItems,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  }

  private toggleDropDown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /* Click Event Functions */

  private _handleOnClick(event?: MouseEvent) {
    if (!this.shadowRoot?.host) {
      throw Error(
        'Could not determine navigation context during click handler'
      );
    }

    const didClickInside = event.composedPath().includes(this.shadowRoot.host);
    const label = this.renderRoot.querySelector(
      '.cre8-c-multi-select__label'
    );
    const buttonsWrapper = this.renderRoot.querySelector(
      '.cre8-c-multi-select__icons-wrapper'
    );
    const removeTagWrapper = this.shadowRoot?.querySelector(
      '.cre8-c-multi-select__tag-wrapper'
    );
    const dropdownWrapper = this.shadowRoot?.querySelector(
      '.cre8-c-multi-select__dropdown'
    );

    if (!didClickInside) {
      this.dropdownOpen = false;
    } else if (
      !event.composedPath().includes(label)
      && !event.composedPath().includes(removeTagWrapper)
      && !event.composedPath().includes(buttonsWrapper)
      && !event.composedPath().includes(dropdownWrapper)
      && !this.disabled
    ) {
      this.toggleDropDown();
    }
  }

  private _handleListItemClick(e: MouseEvent, index: number) {
    if (
      e.target
      !== this.shadowRoot?.querySelector(`cre8-checkbox-field-item[id="${index}"]`)
    ) {
      this.shadowRoot
        ?.querySelector(`cre8-checkbox-field-item[id="${index}"]`)
        .shadowRoot?.querySelector('input')
        .click();
    }
  }

  private _handleDropdownItemInput(item: string, e: InputEvent) {
    const targetCheckbox = e.target as cre8CheckboxFieldItem;

    if (targetCheckbox.checked) {
      this.selectedTagItems = this.selectedTagItems.concat(item);
    } else {
      this.selectedTagItems = this.selectedTagItems.filter((i) => i !== item);
    }

    this.emitSelectedItems();
  }

  private async _handleRemoveTagClick(item: string) {
    if (!this.disabled) {
      this.selectedTagItems = this.selectedTagItems.filter((i) => i !== item);
      this.shadowRoot
        ?.querySelector(`cre8-checkbox-field-item[label="${item}"]`)
        .shadowRoot?.querySelector('input')
        .click();
      await this.updateComplete;

      this.emitSelectedItems();
    }
  }

  private dropdownArrowClick() {
    if (!this.disabled) {
      this.toggleDropDown();
    }
  }

  private _handleButtonToListKeydown(e: KeyboardEvent): void {
    if (e.code === 'Escape') {
      e.preventDefault();
      this.toggleDropDown();
    }
  }


  private _handleListKeydown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      e.preventDefault();
      this.toggleDropDown();
    }
  }

  private _initializeAria() {
    this.fieldId = this.fieldId || nanoid();
    if (this.fieldNote || this.slotNotEmpty('fieldNote')) {
      this.ariaDescribedBy = this.ariaDescribedBy || nanoid();
    }
    if (this.successNote || this.errorNote) {
      this.validationAriaDescribedBy = this.validationAriaDescribedBy || nanoid();
    }
  }

  /**
   * Aria describedby string based on field notes and error/success notes
   * 1) If both validationAriaDescribedBy (error/success note) and field note exists,
   * render both in the input's `aria-describedby` attribute
   * 2) Otherwise, if only validationAriaDescribedBy exists, then render only that as
   * the `aria-describedby` attribute (input without field note initially, but then error/success is added).
   * 3) Otherwise, render only the `ariaDescribedBy` property (field note only)
   */
  private _fieldNoteAria() {
    if (this.validationAriaDescribedBy && this.ariaDescribedBy) {
      return `${this.ariaDescribedBy} ${this.validationAriaDescribedBy}`; /* 1 */
    }
    if (this.validationAriaDescribedBy && !this.ariaDescribedBy) {
      return this.validationAriaDescribedBy; /* 2 */
    }
    return this.ariaDescribedBy; /* 3 */
  }

  /**
   * Render the success or error field notes
   * 1. If there is a successNote, then return the field note with the success message and state.
   * 2. If there is a errorNote, then return the field note with the error message and state.
   */
  private _renderSuccessErrorFieldNote() {
    if (this.successNote) {
      /* 1 */
      return html` <cre8-field-note
        ?isSuccess=${this.isSuccess}
        id=${this.validationAriaDescribedBy}
        class="cre8-c-multi-select__field-note-success"
        iconName="success"
      >
        ${this.successNote}
      </cre8-field-note>`;
    }
    if (this.errorNote) {
      /* 2 */
      return html` <cre8-field-note
        ?isError=${this.isError}
        id=${this.validationAriaDescribedBy}
        class="cre8-c-multi-select__field-note-error"
        iconName="error-alt"
      >
        ${this.errorNote}
      </cre8-field-note>`;
    }
    return null;
  }

  render() {
    const componentClassNames = this.componentClassNames(
      'cre8-c-multi-select',
      {
        'cre8-is-error': this.isError,
        'cre8-is-success': this.isSuccess,
        'cre8-is-disabled': this.disabled,
        'cre8-c-multi-select--no-clear-icon': !this.selectedTagItems.length,
      }
    );

    return html`
      <div class="${componentClassNames}">
        <label class="cre8-c-multi-select__label" id="${this.fieldId}"
          >${this.label}</label
        >
        <div class="cre8-c-multi-select__body" ?disabled=${this.disabled}>
          <div
            class="cre8-c-multi-select__content"
            aria-describedby="${ifDefined(this._fieldNoteAria())}"
          >
            <ul
              class="cre8-c-multi-select__tag-wrapper"
              aria-label="selected items"
            >
              ${this._renderSelectedTags()}
            </ul>
          </div>
          <div class="cre8-c-multi-select__icons-wrapper">
            <cre8-button
              hideText="true"
              svg="${svgClear}"
              text="Clear All"
              variant="tertiary"
              ?disabled="${this.disabled}"
              class="cre8-c-multi-select__clear_icon"
              @click="${this.clearAllTags}"
            >
            </cre8-button>
            <cre8-button
              hideText="true"
              svg="${svgCaretDown}"
              variant="tertiary"
              ?disabled="${this.disabled}"
              class="cre8-c-multi-select__down_icon"
              @click="${this.dropdownArrowClick}"
              @keydown="${this._handleButtonToListKeydown}"
              text="Open Dropdown"
              aria-expanded="${this.dropdownOpen}"
              aria-labelledby="${this.fieldId}"
            >
            </cre8-button>
          </div>
        </div>
        ${this.dropdownOpen
          ? html`
            <fieldset class="cre8-c-multi-select__dropdown" aria-describedby="${this.fieldId}">
              <ul
                aria-label="available items"
                @keydown="${this._handleListKeydown}"
              >
                ${this._renderDropdownItems()}
              </ul>
            </fieldset>`
          : nothing}
      </div>
      ${this.fieldNote || this.slotNotEmpty('fieldNote')
        ? html`<cre8-field-note
            id=${this.ariaDescribedBy}
            class="cre8-c-multi-select__field-note"
          >
            <slot name="fieldNote">${this.fieldNote}</slot>
          </cre8-field-note>`
        : nothing}
      ${this._renderSuccessErrorFieldNote()}
    `;
  }
}

if (customElements.get('cre8-multi-select') === undefined) {
  customElements.define('cre8-multi-select', cre8MultiSelect);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-multi-select': cre8MultiSelect;
  }
}

export default cre8MultiSelect;
