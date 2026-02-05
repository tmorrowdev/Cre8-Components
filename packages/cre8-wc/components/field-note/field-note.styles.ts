import { css, CSSResult } from 'lit';
const styles = css`@use '../../design-tokens/core/scss/theming/component';

:host {
  display: flex;
}

/**
 * Field Note
 * 1) Messaging associated with the form field usually located below the form field input
 */
.cre8-c-field-note {
  display: flex;
  align-items: flex-start;
  gap: calc(8px * 0.5);
  color: var(--cre8-color-content-default);
  margin-top: calc(8px * 0.5);
}

.cre8-field-note-icon {
  margin-top: calc(8px * 0.5);
  height: calc(8px * 2);
  width: calc(8px * 2);
}

/**
 * Field Note Error State
 */
.cre8-c-field-note.cre8-is-error {
  color: var(--cre8-color-content-error);
}

/**
 * Field Note Success State
 */
.cre8-c-field-note.cre8-is-success {
  color: var(--cre8-color-content-success);
}

/**
 * Inverted field note
 */
.cre8-c-field-note--inverted {
  color: var(--cre8-color-content-knockout);
}
`;
export default styles;
