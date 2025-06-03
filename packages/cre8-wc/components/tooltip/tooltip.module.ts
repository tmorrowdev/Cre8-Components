import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';
/*------------------------------------*\
 #TOOLTIP
\*------------------------------------*/

:host {
  display: inline-flex;
}

/** 
 * Tooltip
 * The main container that holds the trigger and panel
 */
.cre8-c-tooltip {
  position: relative;
  display: table;
}

/** 
 * Tooltip panel
 * The container for the tooltip panel heading, content, and footer
 */
.cre8-c-tooltip__panel {
  @include cre8-typography-body-default();
  opacity: 0;
  visibility: hidden;
  position: absolute;
  word-wrap: break-word;
  inset-block-start: calc(100% + #{size(1.5)});
  inset-block-end: auto;
  inset-inline-start: 50%;
  inset-inline-end: auto;
  transform: translateX(var(--rtlTranslateX, -50%));
  display: flex;
  flex-direction: column;
  gap: size(1);
  width: max-content;
  max-width: size(35);
  z-index: 400;
  color: var(--cre8-color-content-knockout);
  background-color: var(--cre8-color-bg-strong);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: size(1);

  /**
   * Active state for tooltip panel
   */
  .cre8-is-active:not(.cre8-is-dynamic) &,
  .cre8-is-active.cre8-is-dynamic-active & {
    opacity: 1;
    visibility: visible;
  }

  /**
   * Tooltip panel positioned to the top of the trigger
   */
  .cre8-c-tooltip--top & {
    inset-block-start: auto;
    inset-block-end: calc(100% + #{size(1.5)});
    inset-inline-start: 50%;
    inset-inline-end: auto;
    transform: translateX(var(--rtlTranslateX, -50%));
  }

  /**
   * Tooltip panel positioned to the left of the trigger
   */
  .cre8-c-tooltip--left & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: calc(100% + #{size(1.5)});
    transform: translateY(-50%);
  }

  /**
   * Tooltip panel positioned to the right of the trigger
   */
  .cre8-c-tooltip--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc(100% + #{size(1.5)});
    inset-inline-end: auto;
    transform: translateY(-50%);
  }

  /**
   * Tooltip panel knockout
   */
  .cre8-c-tooltip--knockout & {
    background-color: var(--cre8-color-bg-default);
    color: var(--cre8-color-content-default);
  }
}

/**
 * Tooltip panel arrow
 */
.cre8-c-tooltip__panel::before {
  content: '';
  display: block;
  width: size(1.5);
  height: size(1.5);
  position: absolute;
  margin: auto;
  background-color: var(--cre8-color-bg-strong);
  border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  inset-block-start: calc((var(--cre8-border-width-default) + #{size(0.75)}) * -1);
  inset-inline-start: 50%;
  transform: translateX(var(--rtlTranslateX, -50%)) rotate(45deg);

  /**
   * Moves the tooltip panel arrow to the top of the panel
   */
  .cre8-c-tooltip--top & {
    inset-block-start: auto;
    inset-block-end: calc((var(--cre8-border-width-default) + #{size(0.75)}) * -1);
    border-block-start: none;
    border-inline-start: none;
    border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  }

  /**
   * Moves the tooltip panel arrow to the right side of the panel
   */
  .cre8-c-tooltip--left & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: calc((var(--cre8-border-width-default) + #{size(0.75)}) * -1);
    border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-start: none;
    border-block-end: none;
    border-inline-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    transform: translateY(-50%) rotate(var(--rtlRotate45Inverse, 45deg));
  }

  /**
   * Moves the tooltip panel arrow to the left side of the panel
   */
  .cre8-c-tooltip--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc((var(--cre8-border-width-default) + #{size(0.75)}) * -1);
    inset-inline-end: auto;
    border-block-start: none;
    border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-end: none;
    transform: translateY(-50%) rotate(var(--rtlRotate45Inverse, 45deg));
  }

  /**
   * Tooltip arrow knockout
   */
  .cre8-c-tooltip--knockout & {
    background-color: var(--cre8-color-bg-default);
  }
}

/**
 * Tooltip footer
 * 1) The footer container in the panel
 */
.cre8-c-tooltip__footer {
  display: flex;
  gap: size(2);
  justify-content: flex-end;
  flex-grow: 1;
}

/**
 * Tooltip trigger
 * 1) Add global focus state on keyboard focus
 */
.cre8-c-tooltip__trigger {
  cursor: pointer;

  &:focus-visible {
    @include focus;
  }
}

svg {
  display: flex;
  height: size(2);
  width: size(2);
}
`;
export default styles;
