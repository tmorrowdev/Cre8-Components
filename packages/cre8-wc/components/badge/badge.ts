import classnames from 'classnames';
import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import '../icon/icon';

import styles from './badge.module';

export enum status {
 'error', 'warning', 'success', 'info', 'attention', undefined
}
export enum variant {
  'light', 'white', undefined
}

/**
 * Status badges are used most often in tables or fat rows in a list.
 * These Components serve a contextual purpose and don't provide any functionality.
 * Badges should be organized inside a dedicated table row communicating status such as pending, approved or rejected.
 *
 */
export class Cre8Badge extends Cre8Element {
    static styles = [styles];

  /**
   * The badge text
   */
  @property({ type: String })
      text: string = undefined;

  /**
   * Status (a color variant prop)
   * - **neutral** (default) renders a badge with a neutral state treatment
   * - **success** renders a badge with success state treatment
   * - **warning** renders a badge with warning state treatment
   * - **error** renders a badge with error state treatment
   * - **info** renders a badge with information state treatment
   * - **attention** renders a badge with attention state treatment
   */
  @property({ type: String })
      status: string;

  /**
   * Background Style Variant
   *
   * - **dark|undefined** (default) renders a badge with a dark background
   * - **light** renders a badge with a light background
   * - **white** renders a badge with a white background
   */
  @property({ type: String })
      variant: string;

  /**
   * SVG as a raw string
   * - For badges with icons, the icon is defined by this prop
   * - Pass in a raw svg as a String. We use raw string loader for this but any method of getting raw svgs will do
   * - Import example:`import svgFeedback from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Feedback.svg?raw';`
   * - [cre8-icons Github repo](https://git.express-scripts.com/ExpressScripts/cre8-icons) This is the Github
   * repo for Cre8 icons, which includes a link to the storybook as well as relavant information for new icons
   */
  @property({ type: String })
      svg?: string;

  render() {
      const componentClassName = classnames('cre8-c-badge', {
          'cre8-c-badge--success': this.status === 'success',
          'cre8-c-badge--warning': this.status === 'warning',
          'cre8-c-badge--error': this.status === 'error',
          'cre8-c-badge--info': this.status === 'info',
          'cre8-c-badge--attention': this.status === 'attention',
          'cre8-c-badge--light': this.variant === 'light',
          'cre8-c-badge--white': this.variant === 'white',
      });

      return html`<div class="${componentClassName}">
        ${this.svg ? html` <cre8-icon 
            svg='${this.svg}' aria-hidden='true'></cre8-icon>
        </cre8-icon>` : ''} 
        ${this.text} 
        </div> `;
  }
}

if (customElements.get('cre8-badge') === undefined) {
    customElements.define('cre8-badge', Cre8Badge);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-badge': Cre8Badge;
  }
}
