import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE HEADER CELL
\*------------------------------------*/

/**
* Set the host to display the contents within the table header > table row wrapper
*/
:host {
  display: contents;
}

.cre8-c-table__header-cell {
  @include cre8-typography-label-small;

  border-bottom: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  padding: var(--cre8-spacing-8);
  text-align: left;
}`;
export default styles;
