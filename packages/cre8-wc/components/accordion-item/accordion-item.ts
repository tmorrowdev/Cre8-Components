import svgCaretUp from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Caret Up.svg?raw';
import { html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import classnames from 'classnames';
import { Cre8Element } from '../cre8-element';
import '../icon/icon';
import '../button/button';
import styles from './accordion-item.scss';

/**
 *
 * The accordion item component delivers large amounts of content in a small space
 * through progressive disclosure. That is, the user gets key details about the
 * underlying content and can choose to expand that content within the constraints
 * of the accordion item. Accordion Items work especially well on mobile interfaces or
 * whenever vertical space is at a premium.
 *
 * ## HOW TO USE
 * Avoid “nested” accordion items—that is, collapsible content within collapsible content.
 * This type of pattern goes against UX best practices.
 *
 * The Cre8 accordion item header allows for two sizes:
 * 'sm' [cre8-typography-title-default] or 'lg' [cre8-typography-title-large]
 *
 * A chevron is used to indicate the “expand/collapse” action, though the entire
 * header area is clickable for the same action.
 *
 * **NOTE**: The header of the accordion item uses h tags so be sure to choose the headingTagVariant that
 * fits into the hierarchy of your html page layout. THIS WILL NOT CHANGE THE APPEARANCE OF THE HEADER.
 *
 * @slot The body of the accordion item will be any valid html
 * inserted between the cre8-accordion-item opening and closing tags.
 *
 *
 * @csspart ::part('header') - The container around the interactive header.
 * @csspart ::part('button') - The button containing the header text and the animated icon.
 * @csspart ::part('icon') - The animated icon that revolves on click.
 * @csspart ::part('body') - The container around the expanding body section.
 * @csspart ::part('body-inner') - The container around the slot into which any user provided HTML is inserted.
 *
 */

export class Cre8AccordionItem extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   *
   * When true, the Accordion Item is opens, when false it closes;
   * @prop {boolean} isActive
   *
   */

  @property({ type: Boolean, reflect: true })
      isActive? = false;


  /**
   *
   * Optional custom id for the accordion item, if one is not set, a random id is generated for you.
   * @prop {string} accordionItemId
   *
   *
   */
  @property({ type: String, reflect: true })
      accordionItemId?: string;

  /**
   *
   * Controls the positioning of the dropdown icon in relation to the text, true puts the icon before the text
   * and false/undefined default the icon to the opposite side of the accordion item
   * @prop {boolean} iconBefore
   *
   *
   */
  @property({ type: Boolean, reflect: true })
      iconBefore?: boolean;

  /**
   *
   * Controls the appearance  of dropdown icon as being an icon-only button. true renders the tertiary variant and
   * false/undefined renders the default secondary appearance.
   * @prop {boolean} tertiaryIcon
   *
   *
   */
  @property({ type: Boolean, reflect: true })
      tertiaryIcon?: boolean;

  /**
   *
   * Users can choose between two header sizes:  'sm' [title-default] or 'lg' [title-large].
   * @prop {'sm' | 'lg'} size
   *
   *
   */
  @property({ reflect: true })
      size: 'sm' | 'lg' = 'sm';

  /**
   *
   * Purely meant to help the user structure the HTML page hierarchy. Does not change the
   * header size. Defaults to 'h3'
   * @prop {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} headingTagVariant
   *
   *
   */

  @property({ reflect: true })
      headingTagVariant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h3';

  /**
   *
   * Controls the text content of the Accordion Item heading.
   * @prop {string} heading
   *
   *
   */
  @property({ type: String })
      heading!: string;

  /**
   *
   * Controls whether the header takes on the theme's 'brand-strong' color
   * @prop {boolean} brandHeader
   *
   *
   */
  @property({ type: Boolean })
      brandHeader?: boolean;

  /**
   *
   * The aria attribute to which is assigned the id of the details section which is revealed via interaction
   * with the header.
   * @private _ariaControls
   *
   *
   */
  @property({ attribute: 'aria-controls' })
  private _ariaControls!: string;

  /**
   *
   * Private internal state which indicates the current _height of the accordion item panel.
   * @private _height
   *
   *
   */
  @state()
  private _height!: string;

  /**
   *
   * Private internal state which Indicates if the accordion item panel is completely open.
   * @private _fullyOpen
   *
   *
   */

  @state()
  private _fullyOpen?: boolean;

  constructor() {
      super();
      const randomId = Math.floor(Math.random() * 900000) + 100000;
      this._ariaControls = `cre8-accordion-item-details-${randomId}`;
      this.accordionItemId = this.accordionItemId ?? `cre8-accordion-item-${randomId}`;
  }

  override connectedCallback() {
      super.connectedCallback();
      this._setContentHeight();
      if (this.isActive) {
          this._fullyOpen = true;
          this._setContentHeight();
      }
  }

  private async _setContentHeight() {
      await this.updateComplete;

      if ((this.isActive && !this._fullyOpen) || (!this.isActive && this._fullyOpen)) {
          this._height = `${this.shadowRoot?.querySelector('.cre8-c-accordion-item__body-inner')?.scrollHeight}px`;
      } else if (this.isActive && this._fullyOpen) {
          this._height = 'auto';
      } else if (!this.isActive && !this._fullyOpen) {
          this._height = '0';
      }
  }

  private _toggleAccordionItem() {
      this.isActive = !this.isActive;

      if (this.isActive) {
          this._setContentHeight();
          setTimeout(() => {
              this._fullyOpen = true;
              this._setContentHeight();
          }, 350);
      } else {
          this._setContentHeight();
          setTimeout(() => {
              this._fullyOpen = false;
              this._setContentHeight();
          }, 50);
      }
  }


  render() {
      const componentClassNames = this.componentClassNames('cre8-c-accordion-item', {
          'cre8-is-active': this.isActive,
          'cre8-c-accordion-item--icon-before': this.iconBefore,
          'cre8-c-accordion-item--small': this.size === 'sm',
          'cre8-c-accordion-item--large': this.size === 'lg',
      });

      const buttonClassNames = classnames('cre8-c-accordion-item__button', {
          'cre8-is-active': this.isActive,
          'cre8-u-justify-content-start': this.iconBefore,
          'cre8-brand-color': this.brandHeader === true,
      });

      return html` <div id=${this.accordionItemId} class="${componentClassNames}">
      <cre8-heading
        type=${this.size === 'lg' ? 'title-large' : 'title-default'}
        part="heading"
        ?brandColor=${(this.brandHeader)}
        tagVariant="${this.headingTagVariant ?? 'h3'}"
        class="cre8-c-accordion-item__header"
      >
        <button
          class="${buttonClassNames}"
          aria-expanded="${ifDefined(this.isActive)}"
          aria-controls="${this._ariaControls}"
          part="button"
          role="button"
          id="${this.id}"
          @click=${this._toggleAccordionItem}
        >
          ${this.iconBefore
        ? html`
            <div class="cre8-c-accordion-item--icon-before-heading-text">
                <div
                  class=${this.tertiaryIcon
        ? 'cre8-c-accordion-item__tertiary-icon cre8-c-accordion-item__icon-before'
        : 'cre8-c-accordion-item__icon cre8-c-accordion-item__icon-before'}
                >
                  <cre8-icon rotate="180" svg='${svgCaretUp}' aria-hidden="true"></cre8-icon>
                </div>
                ${this.heading ?? html` <slot name="heading"></slot>`}
            </div>
              `
        : html`
          <div class="cre8-c-accordion-item--icon-after-heading-text">
            ${this.heading ?? html` <slot name="heading"></slot>`}
                <div
                  class=${this.tertiaryIcon
        ? 'cre8-c-accordion-item__tertiary-icon cre8-c-accordion-item__icon-after'
        : 'cre8-c-accordion-item__icon cre8-c-accordion-item__icon-after'}
                >
                  <cre8-icon rotate="180" svg='${svgCaretUp}' aria-hidden="true"></cre8-icon>
                </div>
            </div>`}
        </button>
      </cre8-heading>
      <div
        class="cre8-c-accordion-item__body"
        aria-hidden="${!this.isActive}"
        id="${this._ariaControls}"
        part="body"
        style=${`height: ${this._height}`}
      >
        <div class="cre8-c-accordion-item__body-inner" part="body-inner">
          <slot></slot>
        </div>
      </div>
    </div>`;
  }
}

if (customElements.get('cre8-accordion-item') === undefined) {
    customElements.define('cre8-accordion-item', Cre8AccordionItem);
}
declare global {
  interface HTMLElementTagNameMap {
    'cre8-accordion-item': Cre8AccordionItem;
  }
}

export default Cre8AccordionItem;
