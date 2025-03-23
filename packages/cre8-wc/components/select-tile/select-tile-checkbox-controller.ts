import { ReactiveController } from 'lit';
import { Cre8FormElement } from '../cre8-form-element';

type FormElement = Cre8FormElement & { form: HTMLFormElement, name?: string, checked?: boolean };


/**
 * This Controller handles the special checkbox logic.
 * This should be a lot simpler than the radio version.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role
 */
export class SelectTileCheckboxController implements ReactiveController {
    private host: FormElement;

    constructor(host: FormElement) {
        this.host = host;
        host.addController(this);
    }

    hostConnected(): void {
        this.host.internals.role = 'checkbox';
        this.host.setAttribute('tabindex', '0');

        this.host.addEventListener('click', this._clickHandler);
        this.host.addEventListener('keydown', this._handleKeyDown);
    }

    hostDisconnected(): void {
        this.host.internals.role = undefined;
        this.host.removeAttribute('tabindex');

        this.host.removeEventListener('click', this._clickHandler);
        this.host.removeEventListener('keydown', this._handleKeyDown);
    }

  /**
   * Handle clicking on the radio button
   * @see _checkAndFocus
   */
    private _clickHandler = (e: MouseEvent | KeyboardEvent) => {
        this._checkAndFocus();
        e.preventDefault();
    };

  /**
   * Set the element to `checked`
   * 2) Set us to checked.
   */
    private _checkAndFocus = () => {
        this.host.checked = !this.host.checked;
        this.host.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.host.dispatchEvent(new Event('change', { bubbles: true }));
    };

  /**
   * Handle keydown
   */
    private _handleKeyDown = (e: KeyboardEvent) => {
    // Enter and Space
        if (['Enter', ' '].includes(e.key)) {
            this._handleEnterSpace(e);
        }
    };

  /**
   * Handle Enter and Space
   * @see _checkAndFocus
   */
    private _handleEnterSpace = (e: KeyboardEvent) => {
        this._checkAndFocus();
        e.preventDefault();
    };
}

export default SelectTileCheckboxController;
