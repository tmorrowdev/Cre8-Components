import { property } from 'lit/decorators.js';
import { Cre8Element } from './cre8-element';

interface Cre8ElementInternals extends ElementInternals {
  formResetCallback: () => void;
  ariaRole: string;
}
export abstract class Cre8FormElement extends Cre8Element {
  /**
   * @internal
   *
   * Tells the browser to treat the element like a form field.
   * Ties the element to the HTML form it is in.
   *
   */
    static formAssociated = true;

  abstract type: string;

  /**
   * @protected
   * @internal
   *
   * An instance of element internals.
   * Contains properties and methods that allows the element
   * to participate fully in the HTML form it's in.
   */
  internals: Cre8ElementInternals;

  /**
   * @protected
   * @internal
   *
   * Stores the value for the `value` getter and setter.
   */
  internalValue: string;

  /**
   * @internal
   *
   * Stores the intial value of the field so that it can be reset
   */
  protected defaultValue: string | boolean;

  /**
   * @internal
   * The underlying HTML form field.
   * This should be implemented with `@query`
   * in the implementing class.
   */
  abstract field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement;

  /**
   * The value of the form field.
   */
  @property()
  get value() {
      return this.internalValue;
  }

  /**
   * Sets the value of the form field.
   * 1. Stores the new value so it can be retrieved by the getter.
   * 2. Sets the current value of the control.
   * 3. Updates the actual field.
   * 4. Rerenders the component.
   */
  set value(newValue: string) {
      const oldValue = this.value;

      this.internalValue = newValue; // 1

      if (this.type !== 'checkbox' && this.type !== 'radio') {
          this.internals.setFormValue(newValue); // 2
      }

      this.updateField(); // 3

      this.requestUpdate('value', oldValue); // 4
  }

  /**
   * update the actual field's value
   */
  protected updateField() {
      if (this.field) {
          this.field.value = this.value !== undefined ? this.value : '';
      }
  }

  protected firstUpdated() {
      if (this.type !== 'checkbox' && this.type !== 'radio') {
          this.defaultValue = this.value || this.getAttribute('value') || '';
      }
      this.updateField();
  }

  formResetCallback() {
      this.value = this.defaultValue as string;
      this.updateField();
  }

  constructor() {
      super();
      this.internals = this.attachInternals() as Cre8ElementInternals;
  }
}

export default Cre8FormElement;
