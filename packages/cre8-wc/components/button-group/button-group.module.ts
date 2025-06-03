import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
 #BUTTON-GROUP
\*------------------------------------*/

:host {
  display: inline-flex;
}

/**
 * 1) Button Group
 */
.cre8-c-button-group {
  display: flex;
  flex-wrap: wrap;
  gap: size(2);
}

/**
  * Button group for Modals
  */
.cre8-c-button-group--responsive-full-width {
  flex-direction: column;
    --cre8-button-width: 100%;

  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
    --cre8-button-width: auto;
 }
}
`;
export default styles;
