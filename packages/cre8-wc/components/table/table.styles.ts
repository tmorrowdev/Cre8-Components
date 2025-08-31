import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE
\*------------------------------------*/

:host {
    display: block;
}

/**
 * 1) Data table containing columns and rows
 */
.cre8-c-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    max-width: 100%;
    background-color: var(--cre8-color-bg-transparent);
}

/**
 * Custom properties passed to table-row for striped variant
 */
.cre8-c-table--striped {
    --cre8-table-row-odd-background: var(--cre8-color-bg-subtle);
    --cre8-table-row-odd-hover-background: var(--cre8-color-bg-subtle);
}

/**
 * Custom properties passed to table-row for isHoverable property
 */
.cre8-c-table--hoverable {
    --cre8-table-row-hover-background: var(--cre8-color-bg-default-hover);
    --cre8-table-row-odd-hover-background: var(--cre8-color-bg-default-hover);
}

/**
 * Custom properties passed to child Components for responsive behavior
 */
.cre8-c-table--responsive {
    --cre8-table-cell-before-content: attr(data-header);
    --cre8-table-header-display: none;
    --cre8-table-row-display: block;
    --cre8-table-cell-display: block;
    --cre8-table-cell-border-bottom-width: 0;
    --cre8-table-row-border-bottom: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-default);

    @media all and (min-width:$cre8-breakpoint-md) {
        --cre8-table-cell-border-bottom-width: var(--cre8-border-width-default);
    }
}
`;
export default styles;
