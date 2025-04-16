import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './progress-steps-item.scss';

/**
 * The Progress Steps Item component is used to display a single step in a multi-step process.
 * It should be used as a child component of `cre8-progress-steps`.
 * These Components serve a contextual purpose and don't provide any functionality.
 *
 * @property {string} message - Optional message to display under the step name.
 * @property {string} name - The name of the step.
 * @property {string} state - The state of the step: 'incomplete', 'current', 'complete', 'error', 'warning';
 * @property {string} svg - An SVG string to use as the step icon.
 *
 * @slot - The component content
 */
export class Cre8ProgressStepsItem extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

    /**
     * Optional message to display under the step name.
     * @type {string}
     */
    @property()
        message?: string;

    /**
     * The name of the step.
     * @type {string}
     */
    @property()
        name: string;

    /**
     * The state of the step: 'complete', 'current', 'error',' incomplete', 'warning';
     * @type {string}
     */
    @property()
        state: 'complete' | 'current' | 'error' | 'incomplete' | 'warning';

    /**
     * An SVG string to use as the step icon.
     * @type {string}
     */
    @property()
        svg: string;

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-progress-steps-item', {
            'cre8-c-progress-steps-item--complete': this.state === 'complete',
            'cre8-c-progress-steps-item--current': this.state === 'current',
            'cre8-c-progress-steps-item--error': this.state === 'error',
            'cre8-c-progress-steps-item--incomplete': this.state === 'incomplete',
            'cre8-c-progress-steps-item--warning': this.state === 'warning',
        });

        return html`
        <div class='${componentClassNames}'>
            <div class='cre8-c-progress-steps-item__top-container'>
              <div class='cre8-c-progress-steps-item__divider--left' part='left-divider'></div>
              <span class='cre8-c-progress-steps-item__svg'>
                <cre8-icon svg='${this.svg}' aria-hidden='true'>
              </span>
              <div class='cre8-c-progress-steps-item__divider--right' part='right-divider'></div>
            </div>
            <div class='cre8-c-progress-steps-item__name'>${this.name}</div>
            <div class='cre8-c-progress-steps-item__message'>${this.message}</div>
        </div>
        `;
    }
}

if (customElements.get('cre8-progress-steps-item') === undefined) {
    customElements.define('cre8-progress-steps-item', Cre8ProgressStepsItem);
}

declare global { interface HTMLElementTagNameMap { 'cre8-progress-steps-item': Cre8ProgressStepsItem; } }

export default Cre8ProgressStepsItem;
