import { css, CSSResult } from 'lit';
const styles = css`@use '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE OBJECT
\*------------------------------------*/

:host {
    display: block;
}

.cre8-c-table-object__header {
    padding-top: var(--cre8-spacing-8);
    padding-bottom: var(--cre8-spacing-8);
}

.cre8-c-table-object__footer {
    padding-top: var(--cre8-spacing-8);
    padding-bottom: var(--cre8-spacing-8);
}
`;
export default styles;
