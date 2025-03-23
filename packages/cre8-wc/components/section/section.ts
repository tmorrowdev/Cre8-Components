import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './section.scss';
/**
 * The section component acts as a block level HTML element that takes a 'headline' property
 * that renders the section's heading which wraps around any HTML template
 * that is found under this heading in the page layout.
 *
 * # How to Use
 * 1. Use the headline attribute to create the section header, or if you need a more custom header
 *    there is a slot="header" that you can target for inserting a custom template.
 * 2. For the main body contents, any html template can be placed inside the cre8-section component
 *    and will automatically render below the header.
 *
 * Note: for a section with a dark background please control this with the internal Components' inverted attributes.
 *
 *
 * @slot The content of the section should go here.
 * It could be a cre8-text-passage, a cre8-card or any other block level html.
 */

export class cre8Section extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * The Headline will be rendered as the Section Headline with the correct brand styling applied
   */

  @property()
      headline?: string;

  render() {
      const componentClassName = this.componentClassNames('cre8-c-section', {});

      return html`
      <section class="${componentClassName}">
        ${this.headline
        ? html`<header class="cre8-c-section__header">
              <cre8-heading tagVariant="h2">${this.headline}</cre8-heading>
              <slot name="header"></slot>
            </header>`
        : html`<header class="cre8-c-section__header">
              <slot name="header"></slot>
            </header>`}
        <div class="cre8-c-section__body">
          <slot></slot>
        </div>
      </section>
    `;
  }
}

if (customElements.get('cre8-section') === undefined) {
    customElements.define('cre8-section', cre8Section);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-section': cre8Section;
  }
}

export default cre8Section;
