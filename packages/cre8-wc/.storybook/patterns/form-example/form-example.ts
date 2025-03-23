import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import styles from './form-example.scss';
import '../../../components/field/field';
import '../../../components/checkbox-field/checkbox-field';
import '../../../components/checkbox-field-item/checkbox-field-item';
import '../../../components/radio-field/radio-field';
import '../../../components/radio-field-item/radio-field-item';
import '../../../components/select/select';
import '../../../components/button-group/button-group';
import '../../../components/button/button';

/**
 * An example element.
 *
 */
@customElement('form-example')
export class FormExample extends LitElement {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  @state()
  formData: string = '';

  handleSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string | string[]> = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });
    this.formData = JSON.stringify(data, null, 2);
  }

  render() {

    const items = [
      {
        label: 'Option Group',
        options: [
          {
            label: 'Option Group Item 1',
            value: 'option-group-item-1'
          },
          {
            label: 'Option Group Item 2',
            value: 'option-group-item-2',
          },
          {
            label: 'Option Group Item 3',
            value: 'option-group-item-3'
          }
        ]
      },
      {
        label: 'No option group item 1',
        value: 'no-option-group-item-1'
      },
      {
        label: 'No option group item 2',
        value: 'no-option-group-item-2'
      }
    ]
    return html`
    <!-- Iframe for data display demo purposes only -->
      <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
      <form id="form-example" action="#" target="dummyframe" @submit=${this.handleSubmit}>
        <cre8-field class="cre8-u-display-block cre8-u-margin-bottom-lg" name="name" label="Enter your name"></cre8-field>
        <cre8-field class="cre8-u-display-block cre8-u-margin-bottom-lg" name="textfield2" value="Council of Ricks" label="cre8 team"></cre8-field>
        <cre8-checkbox-field class="cre8-u-display-block cre8-u-margin-bottom-lg" label="Checkbox field">
          <cre8-checkbox-field-item name="checkbox-example" value="1" label="Checkbox field item 1"></cre8-checkbox-field-item>
          <cre8-checkbox-field-item name="checkbox-example" value="2" label="Checkbox field item 2" checked></cre8-checkbox-field-item>
          <cre8-checkbox-field-item name="checkbox-example" value="3" label="Checkbox field item 3"></cre8-checkbox-field-item>
        </cre8-checkbox-field>
        <cre8-radio-field class="cre8-u-display-block cre8-u-margin-bottom-lg" label="radio-field">
          <cre8-radio-field-item name="radio-example" label="On" value="on"></cre8-radio-field-item>
          <cre8-radio-field-item name="radio-example" label="Off" value="off"></cre8-radio-field-item>
        </cre8-radio-field>
        <cre8-select class="cre8-u-display-block cre8-u-margin-bottom-lg" .items=${items} name="select" fieldNote="This is a field note."></cre8-select>
        <cre8-button-group>
          <cre8-button text="Submit" type="submit"></cre8-button>
          <cre8-button text="Reset" type="reset"></cre8-button>
        </cre8-button-group>
      </form>
      ${this.formData
        ? html`
            <cre8-heading>Submitted form data</cre8-heading>
            <pre>
              ${this.formData}
            </pre
            >
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'form-example': FormExample;
  }
}
