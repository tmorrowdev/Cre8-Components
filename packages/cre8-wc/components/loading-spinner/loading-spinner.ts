import { html, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './loading-spinner.module';

/**
 * A loading spinner notifies the user that their request is being processed while the front end is retrieving data
 * or performing slow computations.
 *
 * Providing visibility of a system's status is one of the most important rules of UI design. When the user has to
 * guess or assume that the system is responding to their input, they may send a command such as submit multiple
 * times, while also being anxious that the application is frozen or not working.
 *
 * While it is most ideal to improve system performance such that there is no perceptible delay, in some cases this
 * is not possible. In these cases, the immediate response should be a progress indicator to give a visual indication
 * that their command was received and that the application is working.
 *
 * The length of time for the system response is a good general guideline for which progress indicator to use.
 *
 * ## Determinable vs indeterminate progress
 *
 * A progress meter provides feedback that the system is working and gives the user an indication of how much time
 * they will wait. This indicator should be used when the system response time is longer and determinable. See
 * ProgressMeter component for further examples and accessibility considerations.
 *
 * ## How to Use
 *
 * The loading-spinner component can be used to indicate loading state on the component level all the way up to the
 * page level. There are two loading styles: determinate (loading progress represents percentage of total load time)
 * and indeterminate (a spinning animation that persists while loading continues)
 *
 * 1. Choose determinate or indeterminate. UX best practices leans more towards recommending the indeterminate
 * progress indicator if load time is unknown, while determinate is less user friendly unless the label indicates
 * the percentage loaded as well.
 * 2. Choose a size and use it according to context, guidance should be given by your design or content team.
 * 3. A common label to use is `Loading…`, guidance should be given by your design content team.
 * 4. If you choose to use the determinate loader then you must also control the progress attribute's value which
 * controls the percentage of the circle that shows (values 0-100 accepted);
 * 5. For dark backgrounds, add the `inverse` attribute to the `<cre8-loading-spinner>` tag.
 * 6. For accessibility reasons, always include a label input unless explicitly informed to do otherwise by design or
 * accessibility teams.
 * 7. The lg variant is usually suitable for containers or block level loading placeholders while the sm size is
 * meant for more inline loading states.
 *
 */
export class Cre8LoadingSpinner extends Cre8Element {
    static styles = unsafeCSS(styles);

  /**
   * Mode of the spinner, defaults to indeterminate.
   * If true, renders a standard progress indicator, fills via the progress property from 0% to 100%.
   * If false or undefined, renders indeterminate spinner which animates in a spinning motion until component is
   * destroyed.
   */
  @property({ type: Boolean, reflect: true })
      determinate?: boolean;

  /**
   * Inverse property used for dark backgrounds.
   */
  @property({ type: Boolean, reflect: true })
      inverse?: boolean;

  /**
   * Neutral property used for secondary neutral loading button.
   */
  @property({ type: Boolean, reflect: true })
      neutral?: boolean;

  /**
   * Property that specifies which button variant is using the loading spinner
   */
  @property()
      buttonVariant? : 'primary' | 'secondary' | 'tertiary';

  /**
   * Label to show along with progress indicator.
   * This is required to meet accessibility requirements for this component.
   */
  @property()
      label?: string;

  /**
   * Progress to display, between 0 and 100. Requires determinate property to be set to true.
   * */
  @property({ reflect: true, type: Number })
      progress = 0;

  /**
   * Size of the progress indicator and position of the label, if a label has been defined using the label property.
   * - **large** renders a large progress indicator at 72px in width/height with the label below.
   * - **small** renders a small progress indicator at 24px in width/height with the label to the right.
   */
  @property()
      size?: 'large' | 'small' = 'large';

  private labelId: string;

  constructor() {
      super();
      const randomId = Math.floor(Math.random() * 900000) + 100000;
      this.labelId = `cre8-spinner-${randomId}`;
  }

  private renderDeterminateSpinner() {
      const progress = Math.max(Math.min(100, this.progress === 0 ? (this.progress = 1) : this.progress), 0);
      const dashOffset = 2 * 3.1415926 * 45 - (progress / 100) * (2 * 3.1415926 * 45);

      return html` ${this.size === 'small'
          ? html`
          <svg class="cre8-c-spinner__icon cre8-c-spinner__icon-small" aria-hidden="true" viewBox="0 0 100 100">
            <circle cx="50%" cy="50%" r="43" stroke-dashoffset="${dashOffset}"></circle>
          </svg>
        `
          : html` <svg class="cre8-c-spinner__icon" aria-hidden="true" viewBox="0 0 100 100">
          <circle cx="50%" cy="50%" r="45" stroke-dashoffset="${dashOffset}"></circle>
        </svg>`}`;
  }

  private renderInDeterminateSpinner() {
      return html` ${this.size === 'small'
          ? html`
          <svg class="cre8-c-spinner__icon cre8-c-spinner__icon-small" aria-hidden="true" viewBox="0 0 100 100">
            <circle cx="50%" cy="50%" r="43"></circle>
          </svg>
        `
          : html` <svg class="cre8-c-spinner__icon" aria-hidden="true" viewBox="0 0 100 100">
          <circle cx="50%" cy="50%" r="45"></circle>
        </svg>`}`;
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-spinner', {
          'cre8-c-spinner--large': this.size === 'large',
          'cre8-c-spinner--small': this.size === 'small',
          'cre8-c-spinner--inverse': this.inverse,
          'cre8-c-spinner--neutral': this.neutral,
          'cre8-c-spinner--primary': this.buttonVariant === 'primary',
          'cre8-c-spinner--secondary': this.buttonVariant === 'secondary',
          'cre8-c-spinner--tertiary': this.buttonVariant === 'tertiary',
          'cre8-c-spinner--determinate': this.determinate,
          'cre8-c-spinner--indeterminate': !this.determinate,
      });
      return html`
      <div
        class="${componentClassNames}"
        role="progressbar"
        aria-labelledby="${this.labelId}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.determinate ? this.progress : nothing}"
        part="base"
      >
        ${this.determinate ? this.renderDeterminateSpinner() : this.renderInDeterminateSpinner()}
        <div
          id="${this.labelId}"
          class="${!this.label ? 'cre8-c-spinner__hidden-label' : 'cre8-c-spinner__label'}"
          part="label"
        >
          ${this.label}
        </div>
      </div>
    `;
  }
}
if (customElements.get('cre8-loading-spinner') === undefined) {
    customElements.define('cre8-loading-spinner', Cre8LoadingSpinner);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-loading-spinner': Cre8LoadingSpinner;
  }
}

export default Cre8LoadingSpinner;
