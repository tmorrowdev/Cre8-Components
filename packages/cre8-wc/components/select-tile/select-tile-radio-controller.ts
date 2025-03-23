import { ReactiveController } from 'lit';
import { Cre8FormElement } from '../cre8-form-element';
import { cre8RadioFieldItem } from '../radio-field-item/radio-field-item';

type FormElement = Cre8FormElement & { form: HTMLFormElement, name?: string, checked?: boolean };

/**
 * Helper function to wrap indexes around, to help us treat the array as a ring.
 */
function wrapIndex(arr: unknown[], index: number) {
    if (index < 0) {
        return arr.length - 1;
    } if (index >= arr.length) {
        return 0;
    }
    return index;
}

/**
 * This Controller handles the special radio button logic.
 *
 * - Handle clicks and key presses, which involves
 *   - Unchecking other select-tile's when this one is checked, if they are in the same form.
 *   - Changing focus between `0` and `-1`, and moving focus correctly on key press
 *   - checking/unchecking on spacebar
 *
 * See also https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radio_role
 * and https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role
 *
 * Also see https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-autonomous-drawbacks
 *
 * This started out as a copy of radio-field-item.ts.
 *
 * Part of the reason I extracted this was to see if I could share this logic with radio-field-item,
 * but that would be separate refactor.
 *
 * It might also be good for the "checkbox" mode of select-tile.
 *
 * And it might also just be a cleaner separation of concerns.
 */
export class SelectTileRadioController implements ReactiveController {
    private host: FormElement;

    constructor(host: FormElement) {
        this.host = host;
        host.addController(this);
    }

    hostConnected(): void {
        this.host.internals.role = 'radio';
        // If we don't also do this, we can't use css selectors to find ourselves
        this.host.setAttribute('role', 'radio');
        this.host.setAttribute('tabindex', '0');

        this.host.addEventListener('click', this._clickHandler);
        this.host.addEventListener('keydown', this._handleKeyDown);
    }

    hostDisconnected(): void {
        this.host.internals.role = undefined;
        this.host.removeAttribute('role');
        this.host.removeAttribute('tabindex');

        this.host.removeEventListener('click', this._clickHandler);
        this.host.removeEventListener('keydown', this._handleKeyDown);
    }

    hostUpdate(): void {
        // TODO: do stuff if name, checked, etc change.
    }

    /**
     * Find all elements that are in the same "radio button group", following the HTML 5 spec,
     * except that we're looking at `[role="radio"]` instead of `input[type="radio"]`.
     *
     * - They have the attribute role="radio" set
     * - They have the same form owner, or both have no form owner
     * - They're in the same tree (same document, don't look at shadow dom)
     * - They both have non-empty name attributes, and the names are the same
     *
     */
    findAllElementsInSameRadioButtonGroup({ excludeDisabled }: { excludeDisabled?: boolean} = {}) {
        const name = this.host.name;
        const form = this.host.form;
        if (name && name.length > 0) {
            const document = this.host.ownerDocument;
            const matches = Array.from(
                document.querySelectorAll(`[role="radio"][name="${name}"]`)
            ).filter((element: HTMLElement & { form?: HTMLFormElement}) => element.form === form);

            if (excludeDisabled === true) {
                return matches
                    .filter((element: HTMLElement & { disabled?: boolean}) => !(
                        element.disabled || element.ariaDisabled === 'true'
                    ));
            }

            return matches;
        }
        return [];
    }

 /**
   * Remove checked
   * 1) Reset the form field to not checked
   * 2) Remove checked property from all items and set tabindex to -1
   */
    removeChecked() {
        const radioFieldItems = this.findAllElementsInSameRadioButtonGroup();
        radioFieldItems.forEach((element: cre8RadioFieldItem) => {
            element.checked = false; /* 1 */
            element.setAttribute('tabindex', '-1'); /* 2 */
        });
    }

  /**
   * Handle clicking on the radio button
   * @see _checkAndFocus
   */
    private _clickHandler = (e: MouseEvent | KeyboardEvent) => {
        e.preventDefault();
        this._checkAndFocus(this.host);
    };

  /**
   * Set the element to `checked`
   * 1) Remove `checked` and set tabindex to -1 on all elements in our radio group
   * 2) Set us to checked.
   * 3) Set our tabindex to 0
   */
    private _checkAndFocus = (target: HTMLElement & { checked?: boolean }) => {
        const wasChecked = target.checked;
        this.removeChecked(); /* 1 */
        target.focus();
        target.checked = true; /* 2 */
        target.setAttribute('tabindex', '0'); /* 3 */
        if (!wasChecked) {
            target.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
            target.dispatchEvent(new Event('change', { bubbles: true }));
        }
    };

  /**
   * Handle keydown
   * 1) If left or up arrow key is struck and radio field item exists before current item,
   *    remove checked from all items and add it to the next item
   * 2) If right or down arrow key is struck and radio field item exists after current item,
   *    remove checked from all items and add checked to the next item.
   *    Focus on this item and set tabindex for when focusing out of radio field and back onto checked item.
   * 3) If the element is in focused, then for event emission the
   *    current focues element should be clicked to emit event.
   * 4) If the Enter key is pressed, then check the radio if no other radio items are checked
   */
    private _handleKeyDown = (e: KeyboardEvent) => {
    // The arrow keys
        if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(e.code)) {
            this._handleArrowKeys(e);
        }
    // Enter and Space
        if (['Enter', ' '].includes(e.key)) {
            this._handleEnterSpace(e);
        }
    };

    private _handleArrowKeys = (e: KeyboardEvent) => {
        const siblings = this.findAllElementsInSameRadioButtonGroup({ excludeDisabled: true });

    // If we're the only radio-like element, nothing to do
        if (siblings.length <= 1) {
            return;
        }

        const ourIndex = siblings.findIndex((item) => item === this.host);
        let moveToElement: HTMLElement & { checked?: boolean };
        if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
            moveToElement = siblings[wrapIndex(siblings, ourIndex - 1)] as HTMLElement;
        } else if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
            moveToElement = siblings[wrapIndex(siblings, ourIndex + 1)] as HTMLElement;
        }

        this._checkAndFocus(moveToElement);

        e.preventDefault();
    };

  /**
   * Handle Enter and Space
   * @see _checkAndFocus
   */
    private _handleEnterSpace = (e: KeyboardEvent) => {
        this._checkAndFocus(this.host);
        e.preventDefault();
    };
}

export default SelectTileRadioController;
