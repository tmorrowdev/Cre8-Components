import { css } from "lit";
import type { CSSResultGroup } from "lit";    

const styles = css`
@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}
:host([fullWidth]) {
  display: flex;

}
/**
 * 1) Button or link that has functionality to it
 */

/**
 * Primary button
 */
.cre8-c-button {
  @include cre8-typography-label-default();
  width: var(--cre8-button-width, auto);
  height: var(--cre8-button-height, auto);
  min-width: var(--cre8-button-min-width, auto);
  min-height: var(--cre8-button-min-height, auto);
  justify-content: center;
  text-align: center;
  margin-top: var( --cre8-button-margin-top, 0);
  margin-bottom: var( --cre8-button-margin-bottom, 0);
  margin-left: var( --cre8-button-margin-left, 0);
  margin-right: var( --cre8-button-margin-right, 0);
  display: inline-flex;
  align-items: center;
  border-width: var(--cre8-border-width-button-default);
  box-shadow: var(--cre8-shadow-button);
  padding-top: var(--cre8-button-padding-vertical-medium);
  padding-right: var(--cre8-button-padding-horizontal-medium);
  padding-bottom: var(--cre8-button-padding-vertical-medium);
  padding-left: var(--cre8-button-padding-horizontal-medium);
  margin: 0;
  cursor: pointer;
  border-style: var(--cre8-border-style-default);
  transition: revert;
  transform: revert;
  white-space: nowrap;
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    border-style: var(--cre8-border-style-default);
    box-shadow: none;
    transform: revert;
    transition: revert;
  }
  &.cre8-c-button--primary {
    background: var(--cre8-color-button-primary-bg);
    border-width: var(--cre8-border-width-button-default);
    border-color: var(--cre8-color-button-primary-border);
    border-radius: var(--cre8-border-radius-button);
    box-shadow: var(--cre8-shadow-button);
    color: var(--cre8-color-button-primary-content);
    --cre8-icon-fill: var(--cre8-color-button-primary-content);
    &:hover,
    &:focus {
      box-shadow: none;
      --cre8-icon-fill: var(--cre8-color-button-primary-content-hover);
      color: var(--cre8-color-button-primary-content-hover);
      border-color: var(--cre8-color-button-primary-border-hover);
      background: var(--cre8-color-button-primary-bg-hover);
      text-decoration: none;
      &:focus {
        @includefocus();
      }
    }
    &:focus-visible,
    &:active,
    &.cre8-c-button--loading {
      box-shadow: none;
      color: var(--cre8-color-button-primary-content-active);
      --cre8-icon-fill: var(--cre8-color-button-primary-content-active);
      border-color: var(--cre8-color-button-primary-border-active);
      background-color: var(--cre8-color-button-primary-bg-active);
    }
    &:focus-visible{
      @includefocus();
    }
    &.cre8-c-button--loading{
      cursor: not-allowed;
    }
    /**
 * Disabled primary and secondary button
 */
  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-primary-bg-disabled);
    border-color: var(--cre8-color-button-primary-border-disabled);
    color: var(--cre8-color-button-primary-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-primary-content-disabled);
    cursor: not-allowed;
    outline: none;
    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-button-primary-bg-disabled);
      border-color: var(--cre8-color-button-primary-border-disabled);
      color: var(--cre8-color-button-primary-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-primary-content-disabled);
    }
  }
}

/**
* Primary button inverse
*/
&.cre8-c-button--primary.cre8-c-button--inverse {
background: var(--cre8-color-button-primary-inverse-bg);
border-width: var(--cre8-border-width-button-default);
border-color: var(--cre8-color-button-primary-inverse-border);
border-radius: var(--cre8-border-radius-button);
box-shadow: var(--cre8-shadow-button);
color: var(--cre8-color-button-primary-inverse-content);
--cre8-icon-fill: var(--cre8-color-button-primary-inverse-content);
&:hover,
&:focus {
  box-shadow: none;
  --cre8-icon-fill: var(--cre8-color-button-primary-inverse-content-hover);
  color: var(--cre8-color-button-primary-inverse-content-hover);
  border-color: var(--cre8-color-button-primary-inverse-border-hover);
  background: var(--cre8-color-button-primary-inverse-bg-hover);
  text-decoration: none;
  &:focus {
    @includefocus();
  }
}
&:focus-visible,
&:active,
&.cre8-c-button--loading {
  box-shadow: none;
  color: var(--cre8-color-button-primary-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-primary-inverse-content-active);
  border-color: var(--cre8-color-button-primary-inverse-border-active);
  background-color: var(--cre8-color-button-primary-inverse-bg-active);
}
&:focus-visible{
  @includefocus();
}
&.cre8-c-button--loading{
  cursor: not-allowed;
}

&:disabled {
  box-shadow: none;
  background-color: var(--cre8-color-button-primary-inverse-bg-disabled);
  border-color: var(--cre8-color-button-primary-inverse-border-disabled);
  color: var(--cre8-color-button-primary-inverse-content-disabled);
  --cre8-icon-fill: var(--cre8-color-button-primary-inverse-content-disabled);
  cursor: not-allowed;
  outline: none;
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    outline: none;
    background-color: var(--cre8-color-button-primary-inverse-bg-disabled);
    border-color: var(--cre8-color-button-primary-inverse-border-disabled);
    color: var(--cre8-color-button-primary-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-primary-inverse-content-disabled);
  }
}
}

/**
 * Secondary button
 * The icon button shares the styles of the standard secondary button
 */
  &.cre8-c-button--secondary {
    background-color: var(--cre8-color-button-secondary-bg);
    border-color: var(--cre8-color-button-secondary-border);
    color: var(--cre8-color-button-secondary-content);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content);
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-button-secondary-bg-hover);
    border-color: var(--cre8-color-button-secondary-border-hover);
    color: var(--cre8-color-button-secondary-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content-hover);
    &:focus {
      @includefocus();
    }
  }
  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    transition: none;
    transform: none;
    background-color: var(--cre8-color-button-secondary-bg-active);
    border-color: var(--cre8-color-button-secondary-border-active);
    color: var(--cre8-color-button-secondary-content-active);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content-active);
  }
  &:focus-visible {
    @includefocus();
  }
  &.cre8-c-button--loading {
    cursor: not-allowed;
  }

  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-secondary-bg-disabled);
    border-color: var(--cre8-color-button-secondary-border-disabled);
    color: var(--cre8-color-button-secondary-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content-disabled);
    outline: none;
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);
    cursor: not-allowed;
    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-button-secondary-bg-disabled);
      border-color: var(--cre8-color-button-secondary-border-disabled);
      color: var(--cre8-color-button-secondary-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-secondary-content-disabled);
    }
  }
}

 /**
 * Secondary button neutral
 */
 &.cre8-c-button--secondary.cre8-c-button--neutral {
    background-color: var(--cre8-color-button-secondary-neutral-bg);
    border-color: var(--cre8-color-button-secondary-neutral-border);
    color: var(--cre8-color-button-secondary-neutral-content);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content);
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-button-secondary-neutral-bg-hover);
    border-color: var(--cre8-color-button-secondary-neutral-border-hover);
    color: var(--cre8-color-button-secondary-neutral-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content-hover);
    &:focus {
      @includefocus();
    }
  }
  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    transition: none;
    transform: none;
    background-color: var(--cre8-color-button-secondary-neutral-bg-active);
    border-color: var(--cre8-color-button-secondary-neutral-border-active);
    color: var(--cre8-color-button-secondary-neutral-content-active);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content-active);
  }
  &:focus-visible {
    @includefocus();
  }

  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-secondary-neutral-bg-disabled);
    border-color: var(--cre8-color-button-secondary-neutral-border-disabled);
    color: var(--cre8-color-button-secondary-neutral-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content-disabled);
    outline: none;
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);
    cursor: not-allowed;
    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-button-secondary-neutral-bg-disabled);
      border-color: var(--cre8-color-button-secondary-neutral-border-disabled);
      color: var(--cre8-color-button-secondary-neutral-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content-disabled);
    }
  }
 }

/**
 * Secondary button inverse
 */
 &.cre8-c-button--secondary.cre8-c-button--inverse {
  background-color: var(--cre8-color-button-secondary-inverse-bg);
  border-color: var(--cre8-color-button-secondary-inverse-border);
  color: var(--cre8-color-button-secondary-inverse-content);
  --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content);
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);

&:hover,
&:focus {
  background-color: var(--cre8-color-button-secondary-inverse-bg-hover);
  border-color: var(--cre8-color-button-secondary-inverse-border-hover);
  color: var(--cre8-color-button-secondary-inverse-content-hover);
  --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content-hover);
  &:focus {
    @includefocus();
  }
}
&:focus-visible,
&:active,
&.cre8-c-button--loading {
  transition: none;
  transform: none;
  background-color: var(--cre8-color-button-secondary-inverse-bg-active);
  border-color: var(--cre8-color-button-secondary-inverse-border-active);
  color: var(--cre8-color-button-secondary-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content-active);
}
&:focus-visible {
  @includefocus();
}

&:disabled {
  box-shadow: none;
  background-color: var(--cre8-color-button-secondary-inverse-bg-disabled);
  border-color: var(--cre8-color-button-secondary-inverse-border-disabled);
  color: var(--cre8-color-button-secondary-inverse-content-disabled);
  --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content-disabled);
  outline: none;
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);
  cursor: not-allowed;
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    outline: none;
    background-color: var(--cre8-color-button-secondary-inverse-bg-disabled);
    border-color: var(--cre8-color-button-secondary-inverse-border-disabled);
    color: var(--cre8-color-button-secondary-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content-disabled);
  }
}
}

  /**
 * Secondary button neutral inverse
 */
 &.cre8-c-button--secondary.cre8-c-button--neutral.cre8-c-button--inverse {
  background-color: var(--cre8-color-button-secondary-neutral-inverse-bg);
  border-color: var(--cre8-color-button-secondary-neutral-inverse-border);
  color: var(--cre8-color-button-secondary-neutral-inverse-content);
  --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content);
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);

&:hover,
&:focus {
  @includefocus();
  background-color: var(--cre8-color-button-secondary-neutral-bg-active);
  border-color: var(--cre8-color-button-secondary-neutral-inverse-border-active);
  outline-color: var(--cre8-color-button-secondary-neutral-inverse-outline);
  color: var(--cre8-color-button-secondary-neutral-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content-active);
}

&:focus-visible,
&:active,
&.cre8-c-button--loading {
  transition: none;
  transform: none;
  background-color: var(--cre8-color-button-secondary-neutral-inverse-bg-active);
  border-color: var(--cre8-color-button-secondary-neutral-inverse-border-active);
  color: var(--cre8-color-button-secondary-neutral-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content-active);
}
&:focus-visible {
  @includefocus();
}

&:disabled {
  box-shadow: none;
  background-color: var(--cre8-color-button-secondary-neutral-inverse-bg-disabled);
  border-color: var(--cre8-color-button-secondary-neutral-inverse-border-disabled);
  color: var(--cre8-color-button-secondary-neutral-inverse-content-disabled);
  --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content-disabled);
  outline: none;
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);
  cursor: not-allowed;
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    outline: none;
    background-color: var(--cre8-color-button-secondary-neutral-inverse-bg-disabled);
    border-color: var(--cre8-color-button-secondary-neutral-inverse-border-disabled);
    color: var(--cre8-color-button-secondary-neutral-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content-disabled);
  }
}
}

  /**
 * Tertiary button
 */
  &.cre8-c-button--tertiary {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-bg);
    border-width: var(--cre8-border-width-button-default);
    border-color: var(--cre8-color-button-tertiary-border);
    color: var(--cre8-color-button-tertiary-content);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-content);
    box-shadow: none;
    &:hover,
    &:focus {
      border-radius: var(--cre8-border-radius-button);
      background-color: var(--cre8-color-button-tertiary-bg-hover);
      border-width: var(--cre8-border-width-button-default, --cre8-border-width-none);
      border-color: var(--cre8-color-button-tertiary-border-hover);
      color: var(--cre8-color-button-tertiary-content-hover);
      --cre8-icon-fill: var(--cre8-color-button-tertiary-content-hover);
      &:focus {
        @includefocusTertiary();
      }
    }

  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-bg-active);
    border-color: var(--cre8-color-button-tertiary-border-active);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-tertiary-content-active);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-content-active);
  }
  &:focus-visible {
    @includefocusTertiary();
  }
  &.cre8-c-button--loading {
    cursor: not-allowed;
  }
  &:disabled {
    background-color: var(--cre8-color-button-tertiary-bg-disabled);
    border-color: transparent;
    color: var(--cre8-color-button-tertiary-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-content-disabled);
    outline: none;
    box-shadow: none;
    cursor: not-allowed;

    &:hover,
    &:focus {
      outline: none;
      box-shadow: none;
      background-color: var(--cre8-color-button-tertiary-bg-disabled);
      color: var(--cre8-color-button-tertiary-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-tertiary-content-disabled);
    }
    &:active,
    &:focus-visible {
      outline: none;
      box-shadow: none;
      background-color: var(--cre8-color-button-tertiary-bg-disabled);
      color: var(--cre8-color-button-tertiary-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-tertiary-content-disabled);
    }
  }
}

 /**
 * Tertiary button neutral
 */
 &.cre8-c-button--tertiary.cre8-c-button--neutral {
  background-color: var(--cre8-color-button-tertiary-neutral-bg);
  border-color: var(--cre8-color-button-tertiary-border);
  color: var(--cre8-color-button-tertiary-neutral-content);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-content);
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-button-tertiary-neutral-bg-hover);
    border-color: var(--cre8-color-button-tertiary-neutral-border-hover);
    color: var(--cre8-color-button-tertiary-neutral-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-content-hover);
    outline-color: var(--cre8-color-button-tertiary-neutral-outline);
  }

  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    transition: none;
    transform: none;
    background-color: var(--cre8-color-button-tertiary-neutral-bg-active);
    border-color: var(--cre8-color-button-tertiary-neutral-border-active);
    color: var(--cre8-color-button-tertiary-neutral-content-active);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-content-active);
  }

  &:focus-visible {
    @includefocus();
  }

  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-tertiary-neutral-bg-disabled);
    border-color: var(--cre8-color-button-tertiary-neutral-border-disabled);
    color: var(--cre8-color-button-tertiary-neutral-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-content-disabled);
    outline: none;
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);

    cursor: not-allowed;
  }
 }

/**
 * Tertiary button inverse
 */
 &.cre8-c-button--tertiary.cre8-c-button--inverse {
  border-radius: var(--cre8-border-radius-button);
  background-color: var(--cre8-color-button-tertiary-inverse-bg);
  border-width: var(--cre8-border-width-button-default);
  border-color: var(--cre8-color-button-tertiary-inverse-border);
  color: var(--cre8-color-button-tertiary-inverse-content);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content);
  box-shadow: none;

  &:hover,
  &:focus {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-inverse-bg-hover);
    border-width: var(--cre8-border-width-button-default, --cre8-border-width-none);
    border-color: var(--cre8-color-button-tertiary-inverse-border-hover);
    color: var(--cre8-color-button-tertiary-inverse-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-hover);
    outline-color: var(--cre8-color-button-tertiary-inverse-outline);
  }

&:focus-visible,
&:active,
&.cre8-c-button--loading {
  border-radius: var(--cre8-border-radius-button);
  background-color: var(--cre8-color-button-tertiary-inverse-bg-active);
  border-color: var(--cre8-color-button-tertiary-inverse-border-active);
  border-width: var(--cre8-border-width-button-default);
  color: var(--cre8-color-button-tertiary-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-active);
  outline-color: var(--cre8-color-button-tertiary-inverse-outline);
}

&.cre8-c-button--loading {
  cursor: not-allowed;
}
&:disabled {
  background-color: var(--cre8-color-button-tertiary-inverse-bg-disabled);
  border-color: transparent;
  color: var(--cre8-color-button-tertiary-inverse-content-disabled);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-disabled);
  outline: none;
  box-shadow: none;
  cursor: not-allowed;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: none;
    background-color: var(--cre8-color-button-tertiary-inverse-bg-disabled);
    color: var(--cre8-color-button-tertiary-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-disabled);
  }
  &:active,
  &:focus-visible {
    outline: none;
    box-shadow: none;
    background-color: var(--cre8-color-button-tertiary-inverse-bg-disabled);
    color: var(--cre8-color-button-tertiary-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-disabled);
  }
}
}

 /**
 * Tertiary Neutral button inverse
 */
 &.cre8-c-button--tertiary.cre8-c-button--neutral.cre8-c-button--inverse {
  border-radius: var(--cre8-border-radius-button);
  background-color: var(--cre8-color-button-tertiary-neutral-inverse-bg);
  border-width: var(--cre8-border-width-button-default);
  color: var(--cre8-color-button-tertiary-neutral-inverse-content);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-inverse-content);
  box-shadow: none;

  &:hover,
  &:focus {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-neutral-inverse-bg-hover);
    border-width: var(--cre8-border-width-button-default, --cre8-border-width-none);
    border-color: var(--cre8-color-button-tertiary-neutral-inverse-border-hover);
    color: var(--cre8-color-button-tertiary-neutral-inverse-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-inverse-content-hover);
    outline-color: var(--cre8-color-button-tertiary-neutral-inverse-outline);
  }

  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-neutral-inverse-bg-active);
    border-color: var(--cre8-color-button-tertiary-neutral-inverse-border-active);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-tertiary-neutral-inverse-content-active);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-inverse-content-active);
    outline-color: var(--cre8-color-button-tertiary-neutral-inverse-outline);
  }

  &.cre8-c-button--loading {
    cursor: not-allowed;
  }

  &:disabled {
    background-color: var(--cre8-color-button-tertiary-neutral-inverse-bg-disabled);
    border-color: transparent;
    color: var(--cre8-color-button-tertiary-neutral-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-inverse-content-disabled);
    outline: none;
    box-shadow: none;
    cursor: not-allowed;
  }
 }

  &.cre8-c-button.cre8-c-button--secondary.cre8-c-button--split-button-text {
    border-radius: var(--cre8-border-radius-button) var(--cre8-border-radius-none) var(--cre8-border-radius-none) var(--cre8-border-radius-button);
    border-color: var(--cre8-color-button-secondary-border);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-secondary-content);
    &:active,
    &:focus-visible {
      outline: none;
    }
    &.cre8-c-button--lg {
      padding: var(--cre8-button-padding-vertical-large) var(--cre8-button-padding-horizontal-large);
    }
    &.cre8-c-button--sm {
      padding: var(--cre8-button-padding-vertical-small) var(--cre8-button-padding-horizontal-small);
    }
  }

  &.cre8-c-button.cre8-c-button--icon-only.cre8-c-button--split-button-caret {
    padding: var(--cre8-button-padding-vertical-medium);
    border-radius: var(--cre8-border-radius-none) var(--cre8-border-radius-button) var(--cre8-border-radius-button) var(--cre8-border-radius-none);
    height: 100%;
    border-left: none !important ;
    border-collapse: collapse;
    background: var(--cre8-color-button-secondary-bg);
    border-color: var(--cre8-color-button-secondary-border);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-secondary-content);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content);

    &:hover,
    &:focus {
      background: var(--cre8-color-button-secondary-bg-hover);
      border-color: var(--cre8-color-button-secondary-border-hover);
      --cre8-icon-fill: var(--cre8-color-button-secondary-content-hover);
      outline: none;
      border-left: none;
      border-collapse: collapse;
    }
    &:active,
    &:focus-visible {
      background: var(--cre8-color-button-secondary-bg-active);
      border-color: var(--cre8-color-button-secondary-border-active);
      --cre8-icon-fill: var(--cre8-color-button-secondary-content-active);
      outline: none;
      border-left: none;
      border-collapse: collapse;
    }
  }
}

.cre8-c-button--lg {
  padding: var(--cre8-button-padding-vertical-large);
}
.cre8-c-button--sm {
  padding: var(--cre8-button-padding-vertical-small);
}

.cre8-c-button--icon-only {
  padding: var(--cre8-button-padding-vertical-small);
  color: var(--cre8-icon-fill, currentColor);
}

/**
 * Full-width button
 */
.cre8-c-button--full-width {
  width: 100%;
  display: flex;
}

/**
 * Small button
 */
.cre8-c-button--sm {
  @include cre8-typography-label-small();
  padding-top: var(--cre8-button-padding-vertical-small);
  padding-right: var(--cre8-button-padding-horizontal-small);
  padding-bottom: var(--cre8-button-padding-vertical-small);
  padding-left: var(--cre8-button-padding-horizontal-small);
}

/**
 * Small button sized for icon only
 */
 .cre8-c-button--sm.cre8-c-button--icon-only {
  @include cre8-typography-label-small();
  padding-top: var(--cre8-button-padding-vertical-small-icon-only);
  padding-right: var(--cre8-button-padding-horizontal-small-icon-only);
  padding-bottom: var(--cre8-button-padding-vertical-small-icon-only);
  padding-left: var(--cre8-button-padding-horizontal-small-icon-only);
}

/**
 * Large button
 */
.cre8-c-button--lg {
  @include cre8-typography-label-large();
  padding-top: var(--cre8-button-padding-vertical-large);
  padding-right: var(--cre8-button-padding-horizontal-large);
  padding-bottom: var(--cre8-button-padding-vertical-large);
  padding-left: var(--cre8-button-padding-horizontal-large);
}

/**
 * Large button sized for icon only
 */
 .cre8-c-button--lg.cre8-c-button--icon-only {
  @include cre8-typography-label-large();
  padding-top: var(--cre8-button-padding-vertical-large-icon-only);
  padding-right: var(--cre8-button-padding-horizontal-large-icon-only);
  padding-bottom: var(--cre8-button-padding-vertical-large-icon-only);
  padding-left: var(--cre8-button-padding-horizontal-large-icon-only);
}

/**
  * Icon within small button
  */
.cre8-c-button--sm cre8-icon-legacy {
  --cre8-icon-height: var(--cre8-icon-size-small);
  --cre8-icon-width: var(--cre8-icon-size-small);
}

.cre8-c-button--sm cre8-icon {
  svg {
    height: size(1.75);
    width: size(1.75);
  }
}

/**
  * Icon within large button
  */
.cre8-c-button--lg cre8-icon-legacy {
  --cre8-icon-height: var(--cre8-icon-size-large);
  --cre8-icon-width: var(--cre8-icon-size-large);
}

.cre8-c-button--lg cre8-icon {
  svg {
    height: size(2.25);
    width: size(2.25);
  }
}

::slotted(*) {
  margin-right: 0;
}
/**
 * Button icon directly before button text
 */

cre8-icon-legacy + .cre8-c-button__text:not(.cre8-u-is-vishidden) {
  margin-left: size(1);
}

cre8-icon + .cre8-c-button__text:not(.cre8-u-is-vishidden) {
  margin-left: size(1);
}

/**
   * Button icon directly after button text
   */
.cre8-c-button__text:not(.cre8-u-is-vishidden) + cre8-icon-legacy {
  margin-left: size(1);
}

.cre8-c-button__text:not(.cre8-u-is-vishidden) + cre8-icon {
  margin-left: size(1);
}
/**
   * Button icon only
   */
.cre8-c-button:has(.cre8-c-button__text.cre8-u-is-vishidden) + cre8-icon-legacy {
  border-radius: var(--cre8-border-radius-button);
}

.cre8-c-button:has(.cre8-c-button__text.cre8-u-is-vishidden) + cre8-icon {
  border-radius: var(--cre8-border-radius-button);
}

.cre8-c-button__text.cre8-u-is-vishidden + cre8-icon-legacy {
  margin-left: 0px;
  margin-right: 0px;
}

.cre8-c-button__text.cre8-u-is-vishidden + cre8-icon {
  margin-left: 0px;
  margin-right: 0px;
}

.cre8-c-button__text.cre8-u-is-vishidden {
  @include visuallyHidden();
}

.cre8-c-button--primary.cre8-c-button--loading {
  --cre8-icon-fill: var(--cre8-color-content-knockout);
}
.cre8-c-button--secondary.cre8-c-button--loading,
.cre8-c-button--tertiary.cre8-c-button--loading {
  --cre8-icon-fill: var(--cre8-color-button-secondary-content-active);
}

/**
 * Aria live span
 */
.cre8-u-is-vishidden {
  --cre8-icon-height: 0px;
  --cre8-icon-width: 0px;
  max-width: fit-content;
  min-width: 0px;
  width: auto;
  height: auto;
  max-height: fit-content;
  min-width: 0px;

  @include visuallyHidden();
}

cre8-icon-legacy.cre8-u-is-vishidden {
  @include visuallyHidden();
}

span.cre8-c-button__icon {
  margin-left: size(1);
  max-width: fit-content;
  min-width: 0px;
  width: auto;
  height: auto;
  max-height: fit-content;
  min-width: 0px;
}

cre8-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: size(2);
    width: size(2);
  }
}
`;
export default styles;