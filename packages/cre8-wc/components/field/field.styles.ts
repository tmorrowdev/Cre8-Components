import { css } from 'lit';
const styles = css`
/**
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

/** 
 * Field Label 
 */
.cre8-c-field__label {
  font-family: var(--cre8-typography-label-small-font-family);
  font-size: var(--cre8-typography-label-small-font-size);
  font-weight: var(--cre8-typography-label-small-font-weight);
  line-height: var(--cre8-typography-label-small-line-height);
  -webkit-text-decoration: var(--cre8-typography-label-small-text-decoration);
          text-decoration: var(--cre8-typography-label-small-text-decoration);
  text-transform: var(--cre8-typography-label-small-text-transform);
  display: block;
  margin-bottom: 0.5rem;
  margin-left: var(--cre8-input-label-margin-left, 0px);
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
  font-family: var(--cre8-typography-body-default-font-family);
  font-size: var(--cre8-typography-body-default-font-size);
  font-weight: var(--cre8-typography-body-default-font-weight);
  line-height: var(--cre8-typography-body-default-line-height);
  -webkit-text-decoration: var(--cre8-typography-body-default-text-decoration);
          text-decoration: var(--cre8-typography-body-default-text-decoration);
  text-transform: var(--cre8-typography-body-default-text-transform);
  outline: var(--cre8-border-width-focus) solid transparent;
  outline-offset: 0.125rem;
  --size-base-unit: .5rem;
  -webkit-appearance: none;
  width: 100%;
  border-width: var(--cre8-border-width-default);
  border-style: solid;
  border-color: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: var(--cre8-input-padding, 0.75rem 0.5rem);
  color: var(--cre8-color-content-default);
  background-color: var(--cre8-color-bg-default);
  transition: outline-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), border-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), background-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  /**
   * Hover, focus, active, and focus-visible styles for default input elements
   */
}
.cre8-c-field__input:hover:not(:disabled), .cre8-c-field__input:focus:not(:disabled), .cre8-c-field__input:active:not(:disabled), .cre8-c-field__input:focus-visible {
  outline: var(--cre8-border-width-focus) solid var(--cre8-color-border-active-outline);
  outline-offset: 0.125rem;
  /**
   * Error state
   */
}
.cre8-is-error .cre8-c-field__input:hover:not(:disabled), .cre8-is-error .cre8-c-field__input:focus:not(:disabled), .cre8-is-error .cre8-c-field__input:active:not(:disabled), .cre8-is-error .cre8-c-field__input:focus-visible {
  outline-color: var(--cre8-color-border-error);
}
.cre8-c-field__input:hover:not(:disabled), .cre8-c-field__input:focus:not(:disabled), .cre8-c-field__input:active:not(:disabled), .cre8-c-field__input:focus-visible {
  /**
   * Success state
   */
}
.cre8-is-success .cre8-c-field__input:hover:not(:disabled), .cre8-is-success .cre8-c-field__input:focus:not(:disabled), .cre8-is-success .cre8-c-field__input:active:not(:disabled), .cre8-is-success .cre8-c-field__input:focus-visible {
  outline-color: var(--cre8-color-border-success);
}
.cre8-c-field__input {
  /**
   * Disabled styles for default input elements
   */
}
.cre8-c-field__input:disabled {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  color: var(--cre8-color-content-disabled);
  cursor: not-allowed;
  /**
   * Disabled text colors
   */
}
.cre8-c-field__input:disabled::-moz-placeholder {
  color: var(--cre8-color-content-disabled);
}
.cre8-c-field__input:disabled::placeholder {
  color: var(--cre8-color-content-disabled);
}
.cre8-c-field__input {
  /**
   * Placeholder styles for default input elements
   */
}
.cre8-c-field__input::-moz-placeholder {
  color: var(--cre8-color-content-subtle);
}
.cre8-c-field__input::placeholder {
  color: var(--cre8-color-content-subtle);
}
.cre8-c-field__input {
  /**
   * Error state for default input elements
   */
}
.cre8-is-error .cre8-c-field__input {
  border-color: var(--cre8-color-border-error);
}
.cre8-c-field__input {
  /**
   * Success state for default input elements
   */
}
.cre8-is-success .cre8-c-field__input {
  border-color: var(--cre8-color-border-success);
}
.cre8-c-field__input {
  /**
   * Readonly input styles
   */
}
.cre8-c-field__input:-moz-read-only {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  cursor: default;
}
.cre8-c-field__input:read-only {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  cursor: default;
}/*# sourceMappingURL=field.module.css.map */`;
export default styles;
