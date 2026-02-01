import { css } from 'lit';
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
/*------------------------------------*\
 #TABS
\*------------------------------------*/
:host {
  display: block;
}

/**
 * Tabs header
 */
.cre8-c-tabs__header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  overflow: hidden;
  /**
   * Tabs inner where the beginning of the tabs list isn't fully in the viewport
   */
  /**
   * Tabs inner where the end of the tabs list isn't fully in the viewport
   */
}
.cre8-c-tabs:not(.cre8-is-start) .cre8-c-tabs__header {
  /**
   * Left overflow gradient for the tabs list
   */
}
.cre8-c-tabs:not(.cre8-is-start) .cre8-c-tabs__header::before {
  content: "";
  display: block;
  position: absolute;
  pointer-events: none;
  background: linear-gradient(var(--rtlGradientToRight, 90deg), var(--cre8-color-bg-default), rgba(255, 255, 255, 0.001) 30%);
  height: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  width: 48px;
  z-index: 1;
}
.cre8-c-tabs:not(.cre8-is-end) .cre8-c-tabs__header {
  /**
   * Right overflow gradient for the tabs list
   */
}
.cre8-c-tabs:not(.cre8-is-end) .cre8-c-tabs__header::after {
  content: "";
  display: block !important;
  position: absolute;
  pointer-events: none;
  background: linear-gradient(var(--rtlGradientToRight, 90deg), rgba(255, 255, 255, 0.001) 30%, var(--cre8-color-bg-default));
  height: 100%;
  inset-block-start: 0;
  inset-inline-end: 0;
  width: 48px;
  z-index: 1;
}

/**
 * Tabs list
 * 1) The div that contains the cre8-tab's
 */
.cre8-c-tabs__list {
  display: flex;
  overflow: auto;
  width: 100%;
  margin: 0;
  position: relative;
  padding: var(--cre8-border-width-focus);
  /**
   * Visually hides the scrollbar
   */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.cre8-c-tabs__list::-webkit-scrollbar {
  display: none;
}

/**
 * Tabs body
 * 1) The div that contains the tab panel content
 */
.cre8-c-tabs__body {
  padding-block-start: 16px;
  /**
   * Full Width Variant - border default bar across tabs
   */
}
.cre8-c-tabs--full-width .cre8-c-tabs__body {
  border-top: var(--cre8-border-width-tab-selected) var(--cre8-border-style-default) var(--cre8-color-border-default);
  margin-top: calc(var(--cre8-border-width-tab-selected) * -2);
}
/* sourceMappingURL=tabs.module.css.map */
`;
export default styles;
