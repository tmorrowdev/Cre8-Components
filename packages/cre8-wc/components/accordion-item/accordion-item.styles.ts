import { css, CSSResult } from 'lit';
const styles = css`@use '../../design-tokens/core/scss/theming/component';

/**
* Accordion Item panel button
* 1) Icon rotating on open was causing scrollbar to continuously appear/disappear
*    during the animation, overflow-x: hidden; prevents this from happening
*/

:host {
  display: block;
  ::slotted(*) {
    text-align: left;
    width: 100%;
  }
}

.cre8-c-accordion-item {
  border-bottom: var(--cre8-accordion-item-border-bottom);
  border-radius: var(--cre8-border-radius-none);
  --cre8-u-icon-display: flex;
  --cre8-u-icon-align-items: center;
  --cre8-u-icon-justify-content: center;
  padding: calc(8px * 3) calc(8px * 1);
}
.cre8-c-accordion-item--small cre8-heading button {
  @include cre8-typography-title-default();
}
.cre8-c-accordion-item--large cre8-heading button {
  @include cre8-typography-title-large();
}
.cre8-c-accordion-item__body {
  margin-right: calc(8px * 0);
  margin-left: calc(8px * 0);
  padding: calc(8px * 0);
  overflow: hidden;
  visibility: hidden;
  transition: height var(--cre8-anim-fade-quick) var(--cre8-anim-ease), visibility var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  .cre8-c-accordion-item.cre8-is-active & {
    visibility: visible;
  }
}

.cre8-c-accordion-item__body-inner {
  display: flex;
  @include cre8-typography-body-default();
  padding: calc(8px * 1) calc(8px * 6) calc(8px * 0) calc(8px * 1);
}

cre8-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(8px * 3);
  min-height: calc(8px * 3);
  min-width: calc(8px * 3);
  transition: transform var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  width: calc(8px * 3);

  .cre8-c-accordion-item.cre8-is-active & {
    transform: rotate(180deg);
  }
}

.cre8-c-accordion-item__icon {
  align-items: center;
  background: var(--cre8-color-bg-brand-strong);
  border-radius: var(--cre8-border-radius-round);
  color: var(--cre8-color-content-knockout);
  display: flex;
  height: calc(8px * 4);
  justify-content: center;
  margin-left: calc(8px * 1);
  margin-right: calc(8px * 0.25);
  min-height: calc(8px * 4);
  min-width: calc(8px * 4);
  width: calc(8px * 4);

  .cre8-c-accordion-item.cre8-is-active & {
    background: var(--cre8-color-button-secondary-bg);
    border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-button-secondary-border);
    color: var(--cre8-color-button-secondary-content);

    &:hover {
      border-color: var(--cre8-color-button-secondary-border-hover);
      background-color: var(--cre8-color-button-secondary-bg-hover);
      color: var(--cre8-color-button-secondary-content-hover);
    }

    &:focus {
      border-radius: var(--cre8-border-radius-default);
      box-shadow: calc(8px * 0) calc(8px * 0) calc(8px * 0) calc(8px * 0.25) var(--cre8-color-border-active-outline);
      outline: none;

      .cre8-c-accordion-item__icon {
        border-color: var(--cre8-color-button-secondary-border-active);
        color: var(--cre8-color-button-secondary-content-active);
        background-color: var(--cre8-color-button-secondary-bg-active);
      }
      .cre8-c-accordion-item__tertiary-icon {
        border-color: var(--cre8-color-border-transparent);
        color: var(--cre8-color-button-tertiary-content-active);
        background-color: var(--cre8-color-bg-transparent);
      }
    }
  }
}

.cre8-c-accordion-item__button {
  color: var(--cre8-color-content-default);
  display: block;
  appearance: none;
  background-color: var(--cre8-color-bg-transparent);
  border: var(--cre8-border-width-none);
  cursor: pointer;
  padding: calc(8px * 0.5) calc(8px * 1);
  overflow-x: hidden;
  transition: color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  width: 100%;

  &.cre8-brand-color {
    color: var(--cre8-color-content-brand-strong);
  }

  &.cre8-u-justify-content-start {
    justify-content: flex-start;
    .cre8-c-accordion-item__icon-before {
      margin-left: calc(8px * 0);
    }
  }

  &:hover {
    .cre8-c-accordion-item__icon {
      border-color: var(--cre8-color-button-primary-border-hover);
      background-color: var(--cre8-color-button-primary-bg-hover);
      color: var(--cre8-color-button-primary-content-hover);
      .cre8-c-accordion-item.cre8-is-active & {
        border-color: var(--cre8-color-button-secondary-border-hover);
        background-color: var(--cre8-color-button-secondary-bg-hover);
        color: var(--cre8-color-button-secondary-content-hover);
      }
    }
    .cre8-c-accordion-item__tertiary-icon {
      border-color: var(--cre8-color-border-transparent);
      color: var(--cre8-color-button-tertiary-content-hover);
      background-color: var(--cre8-color-bg-transparent);
    }
  }

  &:focus {
    border-radius: var(--cre8-border-radius-default);
    box-shadow: calc(8px * 0) calc(8px * 0) calc(8px * 0) calc(8px * 0.25) var(--cre8-color-border-active-outline);
    outline: none;

    .cre8-c-accordion-item__icon {
      border-color: var(--cre8-color-button-primary-border-active);
      color: var(--cre8-color-button-primary-content-active);
      background-color: var(--cre8-color-button-primary-bg-active);
    }
    .cre8-c-accordion-item__tertiary-icon {
      border-color: var(--cre8-color-border-transparent);
      color: var(--cre8-color-button-tertiary-content-active);
      background-color: var(--cre8-color-bg-transparent);
    }
  }
}
.cre8-c-accordion-item--icon-before {
  .cre8-c-accordion-item__body {
    margin-left: calc(8px * 5);
  }
}

.cre8-c-accordion-item__icon-before {
  margin-right: calc(8px * 1.5);

  h4[slot='header'] {
    display: block;
    pointer-events: none;
  }
}

.cre8-c-accordion-item__button slot {
  display: contents;
  text-align: initial;
}
.cre8-c-accordion-item--icon-before-heading-text{
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-width: 100%
}
.cre8-c-accordion-item--icon-after-heading-text{
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 100%
}
`;
export default styles;
