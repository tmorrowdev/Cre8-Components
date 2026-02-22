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
:host {
  display: block;
}

/**
 * 1) A card is an organized block that typically contains a title, image,
 * text, and/or calls to action. It is made up of an optional header slot, required
 * body slot, and optional footer slot to place other Components and content within.
 */
.cre8-c-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1.5rem;
  gap: 1rem;
  border-color: var(--cre8-color-border-default);
  border-style: var(--cre8-border-style-default);
  border-width: var(--cre8-border-width-default);
  border-radius: var(--cre8-border-radius-container);
  background: var(--cre8-color-bg-default);
}

/**
 * Horizontal card
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom
 */
.cre8-c-card--horizontal {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

/**
 * Bare card
 * 1) Organized block without a border, background, or padding
 */
.cre8-c-card--bare {
  border: 0;
  padding: 0;
  gap: 0;
  box-shadow: none;
}

/**
 * Horizontal-bare card
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom without a border, background, or padding
 */
.cre8-c-card--horizontal-bare {
  flex-direction: row;
  border: 0;
  padding: 0;
  gap: 0;
  box-shadow: none;
  align-items: center;
  justify-content: center;
}

/**
 * Center aligned card
 * 1) Center content and text within the card
 */
.cre8-c-card--align-center {
  text-align: center;
  /* 1 */
  align-items: center;
  /* 1 */
  justify-content: center;
  /* 1 */
}

/**
 * Slotted image within a card
 * 1) Make the image full width
 */
::slotted(img) {
  width: 100%;
}

/**
 * Card header
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-card__header {
  display: block;
  flex: none;
  /* 1 */
}

/**
 * Card body
 * 1) Flex applied to always fill the remaining space of the card
 */
.cre8-c-card__body {
  display: block;
  flex: 1 1 auto;
  /* 1 */
}

/**
 * Card footer
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-card__footer {
  display: block;
  flex: none;
  /* 1 */
}
.cre8-c-card--bare .cre8-c-card__footer {
  padding: 0;
}
.cre8-c-card--horizontal-bare .cre8-c-card__footer {
  padding: 0;
}`;
export { styles };
