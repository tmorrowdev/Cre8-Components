import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './skeleton-loader.scss';

/**
 * Skeleton Loader allows for the ability to create placeholder UI loading states.
 * Developers are encouraged to pass into the Skeleton Loader their own parameters
 * to create simple (or complex) loading screens.
 *
 * ## How to Use
 * Skeleton states are simplified versions of components used on an initial page load
 * to indicate that the information on the page has not fully loaded yet.
 * They only appear for only a few seconds, disappearing once components and content populate the page.
 * These loaders use motion to convey that the page is not stuck and that data is still being loaded.
 * This can help to reduce user uncertainty. Skeleton objects should generally be visualized
 * by simple primitives which mimic the original content in a recognizable way.
 * It is recommended to use a more elaborate form if that is needed to make the component recognizable.
 *
 * Never represent toast notifications, overflow menus, dropdown items, modals, and loaders with skeleton states.
 * Elements inside a modal may have a skeleton state, but the modal itself should not.
 *
 * **IMPORTANT!** This is not a loading element and will provide no value to a screen reader user,
 * this is a decorative element only!
 */

export class cre8SkeletonLoader extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

/**
 * Style variant
 * - **rectangle** renders a featureless rectangle as a placeholder for loading elements
 * - **square** renders a featureless square as a placeholder for loading elements
 * - **circle** renders a featureless circle as a placeholder for loading elements
 * @type {"rectangle" | "square" | "circle"}
 * @attr {string}
 */
@property()
    variant?: 'rectangle' | 'square' | 'circle' = 'rectangle';

/**
 * Height inline style
 * 1. Used to set a height on the skeleton if specific size is needed
 * @attr {string}
 */
@property()
    height?: string;

/**
 * Width inline style
 * 1. Used to set a width on the skeleton if specific size is needed
 * @attr {string}
 */
@property()
    width?: string;

render() {
    const componentClassNames = this.componentClassNames('cre8-c-skeleton-loader', {
        'cre8-c-skeleton-loader--rectangle': this.variant === 'rectangle',
        'cre8-c-skeleton-loader--square': this.variant === 'square',
        'cre8-c-skeleton-loader--circle': this.variant === 'circle',
    });

    return html`
    <div
        class="${componentClassNames}"
        style="height: ${this.height ?? 'auto'}; width: ${this.width ?? 'auto'}"
    ></div>
    `;
}
}

if (customElements.get('cre8-skeleton-loader') === undefined) {
    customElements.define('cre8-skeleton-loader', cre8SkeletonLoader);
}

declare global {
    interface HTMLElementTagNameMap {
        'cre8-skeleton-loader': cre8SkeletonLoader;
    }
}

export default cre8SkeletonLoader;
