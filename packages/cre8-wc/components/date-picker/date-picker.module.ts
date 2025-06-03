import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';
@import '../../design-tokens/core/scss/theming/component';
@import "design-tokens/core/scss/utilities/visibility";

:host {
  display: block;
}

/** 
 * Date Field Label 
 */
.cre8-c-date-picker__label {
  @include label-styles;
}

/** 
 * Date Field Body
 * 1) The div that contains the input and icons 
 */
.cre8-c-date-picker__body {
  position: relative;
  display: flex;
  align-items: center;
}

/** 
 * Date Field Default Calendar Icon Button
 * 1) Removes default calendar button and default calendar in Chrome
 */
input::-webkit-calendar-picker-indicator {
  display: none;
}

input[type="date"]::-webkit-input-placeholder {
  visibility: hidden !important;
}

.cre8-c-date-picker__calendar-icon-button {
  position: absolute;
  right: size(1);
  background: var(--cre8-color-bg-default);
  border: none;
  border-radius: 0;

  --cre8-icon-height: size(3);
  --cre8-icon-width: size(3); 

  .cre8-c-date-picker--disabled &, .cre8-c-date-picker--read-only & {
    background: var(--cre8-color-bg-disabled);
  }
}

/** 
 * Date Field Input 
 * 1) The html5 input element
 */
.cre8-c-date-picker__input {
  @include input-styles;

  /**
   * Readonly input styles
   */
  &:read-only {
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
    cursor: default;
  }
}
`;
export default styles;
