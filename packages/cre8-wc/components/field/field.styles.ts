import { css, CSSResult } from 'lit';
const styles = css`
:host {
  display: block;
}

/**
 * Field Label
 */
.cre8-c-field__label {
  font-family: var(--cre8-typography-label-small-font-family);
  font-size: var(--cre8-typography-label-small-font-size);
  font-weight: var(--cre8-typography-label-small-font-weight);
  line-height: var(--cre8-typography-label-small-line-height);
  text-decoration: var(--cre8-typography-label-small-text-decoration);
  text-transform: var(--cre8-typography-label-small-text-transform);
  display: block;
  margin-bottom: calc(8px * 1);
}

/**
 * Field Body
 * 1) The div that contains the input and icons
 */
.cre8-c-field__body {
  position: relative;
}

/**
 * Field Input
 * 1) The html5 input element
 */
.cre8-c-field__input {
  /* Typography */
  font-family: var(--cre8-typography-body-default-font-family);
  font-size: var(--cre8-typography-body-default-font-size);
  font-weight: var(--cre8-typography-body-default-font-weight);
  line-height: var(--cre8-typography-body-default-line-height);
  text-decoration: var(--cre8-typography-body-default-text-decoration);
  text-transform: var(--cre8-typography-body-default-text-transform);

  /* Focus transparent base */
  outline: var(--cre8-border-width-focus) solid transparent;
  outline-offset: calc(8px * 0.25);

  /* Input styles */
  -webkit-appearance: none;
  width: 100%;
  border-width: var(--cre8-border-width-default);
  border-style: solid;
  border-color: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: calc(8px * 1.5) calc(8px * 1);
  color: var(--cre8-color-content-default);
  background-color: var(--cre8-color-bg-default);
  transition: outline-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), border-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), background-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
}

/**
 * Hover, focus, active, and focus-visible styles for default input elements
 */
.cre8-c-field__input:hover:not(:disabled),
.cre8-c-field__input:focus:not(:disabled),
.cre8-c-field__input:active:not(:disabled),
.cre8-c-field__input:focus-visible {
  outline: var(--cre8-border-width-focus) solid var(--cre8-color-border-active-outline);
  outline-offset: calc(8px * 0.25);
}

/**
 * Error state focus
 */
.cre8-is-error .cre8-c-field__input:hover:not(:disabled),
.cre8-is-error .cre8-c-field__input:focus:not(:disabled),
.cre8-is-error .cre8-c-field__input:active:not(:disabled),
.cre8-is-error .cre8-c-field__input:focus-visible {
  outline-color: var(--cre8-color-border-error);
}

/**
 * Success state focus
 */
.cre8-is-success .cre8-c-field__input:hover:not(:disabled),
.cre8-is-success .cre8-c-field__input:focus:not(:disabled),
.cre8-is-success .cre8-c-field__input:active:not(:disabled),
.cre8-is-success .cre8-c-field__input:focus-visible {
  outline-color: var(--cre8-color-border-success);
}

/**
 * Disabled styles for default input elements
 */
.cre8-c-field__input:disabled {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  color: var(--cre8-color-content-disabled);
  cursor: not-allowed;
}

/**
 * Disabled placeholder text colors
 */
.cre8-c-field__input:disabled::placeholder {
  color: var(--cre8-color-content-disabled);
}

/**
 * Placeholder styles for default input elements
 */
.cre8-c-field__input::placeholder {
  color: var(--cre8-color-content-subtle);
}

/**
 * Error state for default input elements
 */
.cre8-is-error .cre8-c-field__input {
  border-color: var(--cre8-color-border-error);
}

/**
 * Success state for default input elements
 */
.cre8-is-success .cre8-c-field__input {
  border-color: var(--cre8-color-border-success);
}

/**
 * Readonly input styles
 */
.cre8-c-field__input:read-only {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  cursor: default;
}
`;
export default styles;
