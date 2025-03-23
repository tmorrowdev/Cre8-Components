import classnames from 'classnames';
import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Cre8Element } from '../../../components/cre8-element';
import styles from './icon-description.scss';

/**
 * An example element.
 *
 */
@customElement('icon-description')
export class IconDescription extends Cre8Element {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  /**
   * Horizontal alignment variants
   * - **right** renders the icon and text horizontally aligned right
   */
  @property()
  align?: 'end';
  /**
   * Append to the class name. Used for passing in utility classes
   */
  @property()
  styleModifier?: string;

  /**
   * Size variants
   * - **sm** renders an icon and description smaller than the default
   */
  @property()
  size?: 'sm';

  /**
   * Vertical alignment variants
   * - **center** renders the icon and text vertically centered
   */
  @property()
  verticalAlign?: 'center';

  /**
   * Weight variant
   */
  @property()
  weight?: 'light';

  render() {
    const componentClassName = classnames('c-icon-description', this.styleModifier, {
      'c-icon-description--sm': this.size === 'sm',
      'c-icon-description--valign-center': this.verticalAlign === 'center',
      'c-icon-description--align-end': this.align === 'end',
      'c-icon-description--light': this.weight === 'light'
    });

    return html`
      <div class="${componentClassName}">
        ${this.slotNotEmpty('header') && html`<div class="c-icon-description__header"><slot name="header"></slot></div>`}
        <div class="c-icon-description__body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-description': IconDescription;
  }
}
