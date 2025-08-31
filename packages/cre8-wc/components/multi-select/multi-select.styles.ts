import { css } from 'lit';
const styles = css`@import "../../design-tokens/core/scss/theming/component";

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
  @include label-styles;
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
  @include input-styles;
  padding: var(--cre8-spacing-8);
  padding-inline-end: size(5.5);
  min-width: 240px;
  cursor: pointer;
  min-height: size(6);
  height: fit-content;

  .cre8-is-disabled & {
    box-shadow: none;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
    cursor: not-allowed;
    outline: none;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-bg-disabled);
      border-color: var(--cre8-color-border-disabled);
      color: var(--cre8-color-content-disabled);
    }

    .cre8-c-multi-select__content {
      border-color: var(--cre8-color-border-disabled);
    }
  }
}

.cre8-c-multi-select__content {
  display: flex;
  min-height: 30px;
  width: 100%;
  border-right: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  padding-right: size(5.5);
}

.cre8-c-multi-select__tag-wrapper {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  gap: size(0.5);
}

.cre8-c-multi-select__icons-wrapper {
  display: flex;
  justify-content: end;
  margin-right: -36px;
  margin-left: -48px;
  gap: size(3);
  min-width: 96px;

  button {
    background-color: inherit;
    border: none;
    padding: none;

    .cre8-is-disabled & {
      cursor: not-allowed;
    }
  }
}

.cre8-c-multi-select__clear_icon {
  .cre8-c-multi-select--no-clear-icon & {
    display: none;
  }
}

/**
 * Select Icon
 * 1) The icons within the body container positioned absolutely over the input
 */
cre8-icon {
  display: flex;
  pointer-events: none;
  color: var(--cre8-color-button-tertiary-content);

  .cre8-is-disabled & {
    color: var(--cre8-color-border-disabled);
  }
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

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    @include cre8-typography-body-default;
    background-color: var(--cre8-color-bg-default);
    border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--cre8-color-border-transparent);
    border-radius: var(--cre8-border-radius-default);
    color: var(--cre8-color-content-default);
    width: 100%;
    cursor: pointer;
    margin: var(--cre8-spacing-0);
    padding: var(--cre8-spacing-8) var(--cre8-spacing-8);
    text-align: left;

    &:active,
    &:hover,
    &:focus {
      background-color: var(--cre8-color-bg-brand-hover);
      color: var(--cre8-color-content-default);
      outline: var(--cre8-border-width-none);
      border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--cre8-color-border-active-outline);
    }
  }
}

/**
 * Select field notes
 */
.cre8-c-multi-select__field-note,
.cre8-c-multi-select__field-note-success,
.cre8-c-multi-select__field-note-error {
  flex-basis: 100%;
}`;
export default styles;
