import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import classnames from 'classnames';
import '../../../components/text-passage/text-passage';
import '../../../components/badge/badge';
import '../../../components/card/card';
import '../../../components/heading/heading';
import styles from './example-drug-card.scss';

/**
 * An example element.
 *
 */
@customElement('example-drug-card')
export class ExampleDrugCard extends LitElement {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  /**
   * Append to the class name. Used for passing in utility classes
   */
  @property()
  styleModifier?: string;

  render() {
    const componentClassName = classnames('c-example-drug-card', this.styleModifier, {});

    return html`
      <div style="max-width: 286px;">
        <cre8-card class="${componentClassName}">
          <cre8-badge variant="light" status="info" text="RECIEVED"></cre8-badge>
          <div class="drug-info">
            <cre8-heading class="drug-name" variant="title-small">Amoxapine</cre8-heading>
            <cre8-text-passage class="drug-price">$0.00</cre8-text-passage>
          </div>
          <cre8-heading class="date" variant="title-small">August 9, 2023</cre8-heading>
        </cre8-card>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'example-drug-card': ExampleDrugCard;
  }
}
