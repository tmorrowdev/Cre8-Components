import { css } from 'lit';

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    position: relative;
    width: 100%;
  }

  :host([loading]) .cre8-c-chart__container {
    opacity: 0.5;
    pointer-events: none;
  }

  .cre8-c-chart {
    position: relative;
    width: 100%;
  }

  .cre8-c-chart__container {
    position: relative;
    width: 100%;
    transition: opacity 0.2s ease;
  }

  .cre8-c-chart__canvas-wrapper {
    position: relative;
    width: 100%;
  }

  canvas {
    display: flex;
    justify-content: center;
    max-height: 100%;
    max-width: 100%;
    width: auto !important;
  }

  .cre8-c-chart__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .cre8-c-chart__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--cre8-color-border-default, #e5e7eb);
    border-top-color: var(--cre8-color-bg-brand, #0066B3);
    border-radius: 50%;
    animation: cre8-chart-spin 0.8s linear infinite;
  }

  .cre8-c-chart__loading-text {
    margin-top: var(--cre8-spacing-2, 8px);
    font-size: var(--cre8-font-size-sm, 14px);
    color: var(--cre8-color-content-subtle, #6b7280);
  }

  @keyframes cre8-chart-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Tooltip customization */
  .cre8-c-chart__tooltip {
    background-color: var(--cre8-color-bg-default, #ffffff);
    border: 1px solid var(--cre8-color-border-default, #e5e7eb);
    border-radius: var(--cre8-border-radius-default, 4px);
    box-shadow: var(--cre8-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
    padding: var(--cre8-spacing-2, 8px) var(--cre8-spacing-3, 12px);
    font-family: var(--cre8-font-family-default, inherit);
    font-size: var(--cre8-font-size-sm, 14px);
    color: var(--cre8-color-content-default, #1f2937);
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .cre8-c-chart__spinner {
      width: 32px;
      height: 32px;
    }
  }
`;

export default styles;
