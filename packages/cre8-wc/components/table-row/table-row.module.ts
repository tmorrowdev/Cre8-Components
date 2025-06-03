import { css } from 'lit';
const styles = css`
@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE ROW
\*------------------------------------*/

/**
* Set the host to display the contents within the table header or table body wrapper
*/
:host {
    display: contents;
}

/**
* 1) Row of the cre8 table
*/
.cre8-c-table__row {
    display: var(--cre8-table-row-display, table-row);
    border-bottom: var(--cre8-table-row-border-bottom);

    /**
    * Table row hover state
    * 1) Set the row hover background via custom property to allow
    * the table variant to control the color
    */
    &:hover {
        background: var(--cre8-table-row-hover-background);
    }

    /**
    * Table row within odd cre8-table-row wrappers
    * 1) Set the odd row and odd row hover background via
    * custom property to allow the table variant to control the color
    */
    :host(:nth-child(odd)) & {
        background: var(--cre8-table-row-odd-background, none);

        &:hover {
            background: var(--cre8-table-row-odd-hover-background, inherit);
        }
    }

    @media all and (min-width:$cre8-breakpoint-md) {
        border-bottom: inherit;
        display: table-row;
    }
}

/**
 * Bare variant to remove border
 */
.cre8-c-table__row--bare {
    --cre8-table-cell-border-bottom-color: transparent;
}

/**
* Slotted table row in expanded content following expandable table row
* 1) Don't show the collapsed table row by default
*/
.cre8-c-table__row--expandable + ::slotted(cre8-table-row) {
    display: none; /* 1 */
}

.cre8-c-table__row--expandable.cre8-is-expanded {
    --cre8-table-cell-border-bottom-color: transparent;
}

/**
* Slotted table row in expanded content following expanded table row class
* 1) Display contents to get the proper table-row display for the row
*/
.cre8-c-table__row--expandable.cre8-is-expanded + ::slotted(cre8-table-row) {
    display: contents; /* 1 */
}

/**
* Button that expands the next table row
*/
.cre8-c-table__expand-button {
    background-color: var(--cre8-color-bg-transparent);
    border-width: var(--cre8-border-width-none);
}

/**
* Text within the button that expands the next table row
*/
.cre8-c-table__expand-button-text {
    @include visuallyHidden;
}

/**
* Icon within the button that expands the next table row
*/
.cre8-c-table__expand-button-icon {
    display: block;
    transition: transform 0.2s ease;

    /**
    * Icon within the button that expands the next table row when the table row is expanded
    * 1) Rotate the icon to show that it's open
    */
    .cre8-is-expanded & {
        transform: rotate(90deg); /* 1 */
    }
}
`;
export default styles;
