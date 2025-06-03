import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

dialog {
  border: none;
  width: 100%;
}

.cre8-c-alert {
  padding: var(--cre8-spacing-16);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  border-radius: var(--cre8-border-radius-default);

  .cre8-c-alert__container {
    display: flex;
    gap: var(--cre8-spacing-8);
    position: relative;

    .cre8-c-alert__message-container {
      color: var(--cre8-color-content-knockout);
      display: flex;
      flex-direction: column;

      .cre8-c-alert__heading-container {
        @include cre8-typography-title-small;
      }

      .cre8-c-alert__body-container {
        @include cre8-typography-body-small;
        padding-bottom: var(--cre8-spacing-8);
      }

      .cre8-c-alert__footer-container {
        padding: 0;
      }
    }
  }

  .cre8-c-alert__close-btn {
    position: absolute;
    top: -10px;
    right: 0px;
  }

  &.cre8-c-alert--emphasis-subtle {
    .cre8-c-alert__message-container {
      color: var(--cre8-color-content-default);
    }
  }

  &.cre8-c-alert--banner {
    border-radius: 0;
    border: none;
  }

  &.cre8-c-alert--warning {
    .cre8-c-alert__message-container {
      color: var(--cre8-color-content-default);
    }
  }
}

.cre8-c-alert--standalone {
  border-radius: var(--cre8-border-radius-default);
  width: size(45);

  .cre8-c-alert__container {
    display: flex;
    gap: var(--cre8-spacing-8);
    position: relative;
  }
}

.cre8-c-alert__icon {
  height: var(--cre8-spacing-16);
  min-height: var(--cre8-spacing-16);
  width: var(--cre8-spacing-16);
  min-width: var(--cre8-spacing-16);
}

.cre8-c-alert--info,
.cre8-c-alert--success,
.cre8-c-alert--error,
.cre8-c-alert--neutral,
.cre8-c-alert--notification {
  color: var(--cre8-color-content-knockout);
}

/**
 * Alert info
 */
.cre8-c-alert--info {
  background: var(--cre8-color-bg-info-strong);
  border-color: var(--cre8-color-border-info);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-info);
    color: var(--cre8-color-content-info-icon);
  }
}

/**
 * Alert warning
 */
.cre8-c-alert--warning {
  background: var(--cre8-color-bg-warning-strong);
  border-color: var(--cre8-color-border-warning);
  color: var(--cre8-color-content-default);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-warning);
  }
}

/**
 * Alert success
 */
.cre8-c-alert--success {
  background: var(--cre8-color-bg-success-strong);
  border-color: var(--cre8-color-border-success);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-success);
    color: var(--cre8-color-content-success-icon);
  }
}

/**
 * Alert error
 */
.cre8-c-alert--error {
  background: var(--cre8-color-bg-error-strong);
  border-color: var(--cre8-color-border-error);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-error);
    color: var(--cre8-color-content-error-icon);
  }
}

/**
 * Alert neutral
 */
.cre8-c-alert--neutral {
  background: var(--cre8-color-bg-strong);
  border-color: var(--cre8-color-border-neutral);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-subtle);
    color: var(--cre8-color-content-default);
  }
}

/**
 * Alert notification
 */
.cre8-c-alert--notification {
  background: var(--cre8-color-bg-attention-strong);
  border-color: var(--cre8-color-border-attention);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-subtle);
    color: var(--cre8-color-content-attention-icon);
  }
}
`;
export default styles;
