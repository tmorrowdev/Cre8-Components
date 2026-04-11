import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/**
 * !!! DO NOT USE THIS FILE for styling specific elements within text passage.
 * Use text-passage-ligh-dom.scss to for styling.!!!
 */

 :host {
  display: inline-flex;
 }

.cre8-c-text-passage--small {
  @include cre8-typography-body-small();

  /**
    * Unordered list within small text passage
    */
}
.cre8-c-text-passage--large {
  @include cre8-typography-body-large();

  /**
    * Unordered list within small text passage
    */
}
.cre8-c-text-passage--inverted {
  color: var(--cre8-color-content-knockout);
}
::slotted(.header) {
  margin-bottom: size(1.5);
}
`;
export default styles;
