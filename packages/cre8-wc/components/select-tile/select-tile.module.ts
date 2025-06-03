import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

// #SELECT-TILE

:host {
  display: inline-flex;
}

.cre8-c-select-tile {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: size(2);
  gap: 1rem;
  border-color: var(--cre8-color-border-default);
  border-width: var(--cre8-border-width-default);
  border-radius: var(--cre8-border-radius-default);
  border-style: solid;
  background: var(--cre8-color-bg-default);
  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    background: var(--cre8-color-bg-default-hover);
    border-color: var(--cre8-color-border-brand);
  }
  &:focus,
  &:focus-visible {
    @includefocus();
  }

  &.cre8-c-select-tile--error {
    border-color: var(--cre8-color-border-error);
    background: var(--cre8-color-bg-error);
  }

  &.cre8-c-select-tile--success {
    border-color: var(--cre8-color-border-success);
    background: var(--cre8-color-bg-success);
  }

  &.cre8-c-select-tile--disabled {
    border-color: var(--cre8-color-border-disabled);
    background: var(--cre8-color-bg-disabled);
    cursor: not-allowed;
  }
}

input:checked + .cre8-c-select-tile {
  border-width: 2px;
  border-color: var(--cre8-color-border-brand);
}

.cre8-c-select-tile__input {
  display: none;
}

/**
 * Horizontal select-tile
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom
 */
 .cre8-c-select-tile--horizontal {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

@mixin cre8-c-select-tile--vertical-at-bp($breakpoint) {
  @media all and (max-width: $breakpoint) {
    flex-direction: column;

    .cre8-c-select-tile__custom-radio {
      position: absolute;
      top: size(1);
      right: size(1);
    }
  }
}

.cre8-c-select-tile--vertical-at-sm {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-sm);
}
.cre8-c-select-tile--vertical-at-sm-2 {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-sm);
}
.cre8-c-select-tile--vertical-at-md {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-md);
}
.cre8-c-select-tile--vertical-at-lg {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-lg);
}
.cre8-c-select-tile--vertical-at-xl {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-xl);
}
.cre8-c-select-tile--vertical-at-xxl {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-xxl);
}


/**
 * Bare select-tile
 * 1) Organized block without a border, background, or padding
 */
.cre8-c-select-tile--bare {
  border: var(--cre8-border-width-none);
  padding: var(--cre8-spacing-0);
  box-shadow: none;
}
/**
 * Horizontal-bare select-tile
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom without a border, background, or padding
 */
.cre8-c-select-tile--horizontal-bare {
  flex-direction: row;
  border: var(--cre8-border-width-none);
  padding: var(--cre8-spacing-0);
  box-shadow: none;
  align-items: center;
  justify-content: center;
 }
/**
 * Center aligned select-tile
 * 1) Center content and text within the select-tile
 */
.cre8-c-select-tile--align-center {
  text-align: center; /* 1 */
  align-items: center; /* 1 */
  justify-content: center; /* 1 */
}

/**
 * Slotted image within a select-tile
 * 1) Make the image full width
 */
::slotted(img) {
  width: 100%;
}

/**
 * Select tile header
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-select-tile__header {
  display: block;
  flex: none; /* 1 */
}

/**
 * Select Tile body
 * 1) Flex applied to always fill the remaining space of the select-tile
 */
.cre8-c-select-tile__body {
  display: block;
  flex: 1 1 auto; /* 1 */

  /**
  * Select Tile body within bare select-tile
  * 1) Remove padding
  */
  .cre8-c-select-tile--bare & {
    padding: var(--cre8-spacing-0);
  }
  .cre8-c-select-tile--horizontal-bare & {
    padding: var(--cre8-spacing-0);
  }

  .cre8-c-select-tile__body_title {
    @include cre8-typography-title-default();
  }
  .cre8-c-select-tile__body_body {
    @include cre8-typography-body-default();
  }
}

/**
 * Select Tile footer
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-select-tile__footer {
  display: flex;
  flex: none; /* 1 */

  .cre8-c-select-tile--bare & {
    padding: var(--cre8-spacing-0);
  }
  .cre8-c-select-tile--horizontal-bare & {
    padding: var(--cre8-spacing-0);
  }
}

.cre8-c-select-tile__custom-radio, .cre8-c-select-tile__custom-checkbox  {

  /**
   * Render the checkmark/radio button on the left instead of the right.
   * Since it is only visual and the "checked" state is also set via aria,
   * there are hopefully no a11y issues with using order here.
   */
  &.cre8-c-select-tile__custom-radio-left {
    order: -1;
  }

  &.cre8-c-select-tile__custom-radio-none {
    display: none;
  }
}

@mixin cre8-c-select-radio-top-right($breakpoint: 0) {
  position: absolute;
  top: size(1);
  right: size(1);
  @if $breakpoint != 0 {
    @media all and (min-width: $breakpoint) {
      position: static;
    }
  }
}

/**
* Radio field item custom radio container
*/
.cre8-c-select-tile__custom-radio {
  display: flex;
  flex: none;
  height: size(3);
  width: size(3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: var(--cre8-border-radius-round);
  border-width: var(--cre8-border-width-default);
  border-style:  var(--cre8-border-style-default);
  background-color: var(--cre8-color-bg-default);
  border-color: var(--cre8-color-border-default);

  /**
  * Radio field item custom radio focus visible  custom outline
  */
  .cre8-c-select-tile__input:focus-visible + & {
    border-color: var(--cre8-color-border-strong);
    @include focus;

    .cre8-c-select-tile--error & {
      @include focusError;
      border-color: var(--cre8-color-border-error);
    }
  }

  /**
  * Radio field item custom radio within radio field with error
  */
  .cre8-c-select-tile--error & {
    border-color: var(--cre8-color-border-error);
  }

  /**
  * Radio field item custom radio within radio field disabled
  */
  .cre8-c-select-tile--disabled & {
    cursor: not-allowed;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
  }
}

.cre8-c-select-tile__custom-radio-top-right {
  @include technology.cre8-c-select-radio-top-right();
}

/**
 * Check radio variant
 */
.cre8-c-select-tile__custom-radio-check {
    .cre8-c-select-tile__icon {
      display: flex;
    }
}

/**
 * Radio field item inner circle
 */
.cre8-c-select-tile__inner-circle {
  display: none;

  cursor: pointer;
  height: size(1.5);
  width: size(1.5);
  background: var(--cre8-color-content-brand);
  border-radius: var(--cre8-border-radius-round);

  /** Check radio variant */
  .cre8-c-select-tile__custom-radio-check & {
    flex: none;
    height: size(3);
    width: size(3);
    align-items: center;
    justify-content: center;
  }

  /**
  * Radio field item inner circle error
  */
  .cre8-c-select-tile--error & {
    background: var(--cre8-color-bg-error-strong);
  }

  /**
  * Radio field item inner circle disabled
  */
  .cre8-c-select-tile--disabled & {
    background: var(--cre8-color-content-disabled);
  }

  /**
 * Radio field item inner circle will display if the input is checked
 */
  input:checked ~ * .cre8-c-select-tile__custom-radio & {
    display: flex;
  }
}


// These styles are for the checkbox version

/**
 * Checkbox field item custom checkbox container
 */
 .cre8-c-select-tile__custom-checkbox {
  display: flex;
  flex: none;
  height: size(3);
  width: size(3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: var(--cre8-border-radius-small);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  background-color: var(--cre8-color-bg-default);
  border-color: var(--cre8-color-border-strong);

  /**
  * Checkbox field item custom checkbox focus visible  custom outline
  */
  .cre8-c-select-tile__input:focus-visible + & {
    @include focus;

    .cre8-c-select-tile--error & {
      @include focusError;
    }
  }

  /**
  * Checkbox field item custom checkbox within checkbox field with error
  */
  .cre8-c-select-tile--error & {
    background-color: var(--cre8-color-bg-default);
    border-color: var(--cre8-color-border-error);
  }

  /**
  * Checkbox field item custom checkbox within checkbox field with disabled
  */
  .cre8-c-select-tile--disabled & {
    cursor: not-allowed;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
  }
}

/**
  * Checkbox field item custom checkbox when item is checked
  */
input:checked ~ * .cre8-c-select-tile__custom-checkbox {
  background-color: var(--cre8-color-bg-brand-strong);

  /**
  * Checkbox field item custom checkbox when item is checked with error
  */
  .cre8-c-select-tile--error & {
    background-color: var(--cre8-color-bg-default);
  }

  /**
  * Checkbox field item custom checkbox when item is checked with disabled
  */
  .cre8-c-select-tile--disabled & {
    background-color: var(--cre8-color-bg-disabled);
  }
}

/**
 * Checkbox field item checkmark icon
 */
.cre8-c-select-tile__icon {
  display: none;
  color: var(--cre8-color-content-knockout);

  /**
  * Checkbox field item icon within checkbox field with error
  */
  .cre8-c-select-tile--error & {
    color: var(--cre8-color-content-error);
  }

  /**
  * Checkbox field item icon within checkbox field disabled
  */
  .cre8-c-select-tile--disabled & {
    color: var(--cre8-color-content-disabled);
  }

  /**
  * Checkbox field item icon will display in the box if the input is checked
  */
  input:checked ~ * .cre8-c-select-tile__custom-checkbox & {
    display: flex;
  }
}
`;
export default styles;
