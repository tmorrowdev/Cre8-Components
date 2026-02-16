import { css, CSSResult } from 'lit';
const styles = css`/**
 * Border-Box http:/paulirish.com/2012/box-sizing-border-box-ftw/
 */
*,
::slotted(*),
*:before,
*:after {
  box-sizing: border-box;
}

:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/*
=======
Animations
=======
*/
:host {
  --cre8-z-index-1: 1;
  --cre8-z-index-50: 50;
  --cre8-z-index-100: 100;
  --cre8-z-index-200: 200;
  --cre8-z-index-1030: 1030;
  --cre8-anim-fade-quick: 0.35s;
  --cre8-anim-ease: ease;
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
@keyframes slideIn {
  100% {
    transform: translateX(0);
  }
}
@keyframes slideInFwd {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideOutRight {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideUp {
  100% {
    transform: translateY(0);
  }
}
@media (width >= 481px) {
  @keyframes slideInFwd {
    100% {
      width: 417px;
      height: 417px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 417px;
      height: 417px;
    }
  }
}
@media (width >= 48rem) {
  @keyframes slideInFwd {
    100% {
      width: 330px;
      height: 330px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 330px;
      height: 330px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 60rem) {
  @keyframes slideInFwd {
    100% {
      width: 460px;
      height: 460px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 460px;
      height: 460px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 75rem) {
  @keyframes slideInFwd {
    100% {
      width: 592px;
      height: 591px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 87.5rem) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 120px));
    }
  }
}
@media (width >= 2200px) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 592px));
    }
  }
}
span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: var(--ripple-bg-color);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 1;
  }
}
:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
:host {
  display: block;
}

.cre8-c-multi-select {
  position: relative;
}

/**
 * Label
 */
.cre8-c-multi-select__label {
  font-family: var(--cre8-typography-label-small-font-family);
  font-size: var(--cre8-typography-label-small-font-size);
  font-weight: var(--cre8-typography-label-small-font-weight);
  line-height: var(--cre8-typography-label-small-line-height);
  -webkit-text-decoration: var(--cre8-typography-label-small-text-decoration);
          text-decoration: var(--cre8-typography-label-small-text-decoration);
  text-transform: var(--cre8-typography-label-small-text-transform);
  display: block;
  margin-bottom: 8px;
}

/**
 * Body
 * 1) The div that contains the input and icons
 */
.cre8-c-multi-select__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-family: var(--cre8-typography-body-default-font-family);
  font-size: var(--cre8-typography-body-default-font-size);
  font-weight: var(--cre8-typography-body-default-font-weight);
  line-height: var(--cre8-typography-body-default-line-height);
  -webkit-text-decoration: var(--cre8-typography-body-default-text-decoration);
          text-decoration: var(--cre8-typography-body-default-text-decoration);
  text-transform: var(--cre8-typography-body-default-text-transform);
  outline: var(--cre8-border-width-focus) solid transparent;
  outline-offset: 2px;
  -webkit-appearance: none;
  width: 100%;
  border-width: var(--cre8-border-width-default);
  border-style: solid;
  border-color: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: 12px 8px;
  color: var(--cre8-color-content-default);
  background-color: var(--cre8-color-bg-default);
  transition: outline-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), border-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), background-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  /**
   * Hover, focus, active, and focus-visible styles for default input elements
   */
  /**
   * Disabled styles for default input elements
   */
  /**
   * Placeholder styles for default input elements
   */
  /**
   * Error state for default input elements
   */
  /**
   * Success state for default input elements
   */
  padding: var(--cre8-spacing-8);
  padding-inline-end: 44px;
  min-width: 240px;
  cursor: pointer;
  min-height: 48px;
  height: -moz-fit-content;
  height: fit-content;
}
.cre8-c-multi-select__body:hover:not(:disabled), .cre8-c-multi-select__body:focus:not(:disabled), .cre8-c-multi-select__body:active:not(:disabled), .cre8-c-multi-select__body:focus-visible {
  outline: var(--cre8-border-width-focus) solid var(--cre8-color-border-active-outline);
  outline-offset: 2px;
  /**
   * Error state
   */
  /**
   * Success state
   */
}
.cre8-is-error .cre8-c-multi-select__body:hover:not(:disabled), .cre8-is-error .cre8-c-multi-select__body:focus:not(:disabled), .cre8-is-error .cre8-c-multi-select__body:active:not(:disabled), .cre8-is-error .cre8-c-multi-select__body:focus-visible {
  outline-color: var(--cre8-color-border-error);
}
.cre8-is-success .cre8-c-multi-select__body:hover:not(:disabled), .cre8-is-success .cre8-c-multi-select__body:focus:not(:disabled), .cre8-is-success .cre8-c-multi-select__body:active:not(:disabled), .cre8-is-success .cre8-c-multi-select__body:focus-visible {
  outline-color: var(--cre8-color-border-success);
}
.cre8-c-multi-select__body:disabled {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  color: var(--cre8-color-content-disabled);
  cursor: not-allowed;
  /**
   * Disabled text colors
   */
}
.cre8-c-multi-select__body:disabled::-moz-placeholder {
  color: var(--cre8-color-content-disabled);
}
.cre8-c-multi-select__body:disabled::placeholder {
  color: var(--cre8-color-content-disabled);
}
.cre8-c-multi-select__body::-moz-placeholder {
  color: var(--cre8-color-content-subtle);
}
.cre8-c-multi-select__body::placeholder {
  color: var(--cre8-color-content-subtle);
}
.cre8-is-error .cre8-c-multi-select__body {
  border-color: var(--cre8-color-border-error);
}
.cre8-is-success .cre8-c-multi-select__body {
  border-color: var(--cre8-color-border-success);
}
.cre8-is-disabled .cre8-c-multi-select__body {
  box-shadow: none;
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  cursor: not-allowed;
  outline: none;
}
.cre8-is-disabled .cre8-c-multi-select__body:hover, .cre8-is-disabled .cre8-c-multi-select__body:focus, .cre8-is-disabled .cre8-c-multi-select__body:active, .cre8-is-disabled .cre8-c-multi-select__body:focus-visible {
  outline: none;
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  color: var(--cre8-color-content-disabled);
}
.cre8-is-disabled .cre8-c-multi-select__body .cre8-c-multi-select__content {
  border-color: var(--cre8-color-border-disabled);
}

.cre8-c-multi-select__content {
  display: flex;
  min-height: 30px;
  width: 100%;
  border-right: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  padding-right: 44px;
}

.cre8-c-multi-select__tag-wrapper {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  gap: 4px;
}

.cre8-c-multi-select__icons-wrapper {
  display: flex;
  justify-content: end;
  margin-right: -36px;
  margin-left: -48px;
  gap: 24px;
  min-width: 96px;
}
.cre8-c-multi-select__icons-wrapper button {
  background-color: inherit;
  border: none;
  padding: none;
}
.cre8-is-disabled .cre8-c-multi-select__icons-wrapper button {
  cursor: not-allowed;
}

.cre8-c-multi-select--no-clear-icon .cre8-c-multi-select__clear_icon {
  display: none;
}

/**
 * Select Icon
 * 1) The icons within the body container positioned absolutely over the input
 */
cre8-icon {
  display: flex;
  pointer-events: none;
  color: var(--cre8-color-button-tertiary-content);
}
.cre8-is-disabled cre8-icon {
  color: var(--cre8-color-border-disabled);
}

.cre8-c-multi-select__dropdown {
  background-color: var(--cre8-color-bg-default);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  box-shadow: var(--cre8-shadow-default);
  border-radius: var(--cre8-border-radius-default);
  flex-direction: column;
  left: 0;
  min-width: 100%;
  position: absolute;
  top: 100%;
  white-space: nowrap;
  margin-top: var(--cre8-spacing-4);
  margin-left: 0;
  padding: var(--cre8-spacing-8);
}
.cre8-c-multi-select__dropdown ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.cre8-c-multi-select__dropdown li {
  font-family: var(--cre8-typography-body-default-font-family);
  font-size: var(--cre8-typography-body-default-font-size);
  font-weight: var(--cre8-typography-body-default-font-weight);
  line-height: var(--cre8-typography-body-default-line-height);
  -webkit-text-decoration: var(--cre8-typography-body-default-text-decoration);
          text-decoration: var(--cre8-typography-body-default-text-decoration);
  text-transform: var(--cre8-typography-body-default-text-transform);
  background-color: var(--cre8-color-bg-default);
  border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--cre8-color-border-transparent);
  border-radius: var(--cre8-border-radius-default);
  color: var(--cre8-color-content-default);
  width: 100%;
  cursor: pointer;
  margin: var(--cre8-spacing-0);
  padding: var(--cre8-spacing-8) var(--cre8-spacing-8);
  text-align: left;
}
.cre8-c-multi-select__dropdown li:active, .cre8-c-multi-select__dropdown li:hover, .cre8-c-multi-select__dropdown li:focus {
  background-color: var(--cre8-color-bg-brand-hover);
  color: var(--cre8-color-content-default);
  outline: var(--cre8-border-width-none);
  border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--cre8-color-border-active-outline);
}

/**
 * Select field notes
 */
.cre8-c-multi-select__field-note,
.cre8-c-multi-select__field-note-success,
.cre8-c-multi-select__field-note-error {
  flex-basis: 100%;
}
  /* sourceMappingURL=multi-select.module.css.map */
`;
export default styles;
