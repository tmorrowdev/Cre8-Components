import classnames from 'classnames';
import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Cre8Element } from '../../../components/cre8-element';
import '../../../components/card/card';
import '../../../components/icon/icon';
import styles from './medication-card.scss';

/**
 * An example element.
 *
 */
@customElement('medication-card')
export class MedicationCard extends Cre8Element {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  /**
   * Append to the class name. Used for passing in utility classes
   */
  @property()
  styleModifier?: string;

  render() {
    const componentClassName = classnames('c-medication-card', this.styleModifier, {});

    return html`
      <cre8-card class="${componentClassName}">
        <div slot="header" class="c-medication-card__header">
          <cre8-icon-legacy class="c-medication-card__icon" name="rx"></cre8-icon-legacy>
          <slot name="heading"></slot>
          ${this.slotNotEmpty('headingAfter') && html`<div class="c-medication-card__heading-after"><slot name="headingAfter"></slot></div> `}
        </div>
        <slot></slot>
        ${this.slotNotEmpty('footer') && html`<div slot="footer" class="c-medication-card__footer"><slot name="footer"></slot></div>`}
      </cre8-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'medication-card': MedicationCard;
  }
}
