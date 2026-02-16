import { css, CSSResult } from 'lit';
const styles = css`@use '../../design-tokens/core/scss/theming/component';

/**
 * 1) Container used to cap the width of a passage of text to be readable
 */
.cre8-c-linelength-container {
  max-width: var(--cre8-l-linelength-width);
}
`;
export default styles;
