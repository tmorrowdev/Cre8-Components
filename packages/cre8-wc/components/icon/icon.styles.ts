import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';


/**
 * 1) Graphic used to supplement text or represent functionality
 */

:host{
  display: flex;
  --cre8-u-icon-display: block;
};

.cre8-c-icon-wrapper {
  align-items: var(--cre8-u-icon-align-items);
  justify-content: var(--cre8-u-icon-justify-content);
  animation: var(--cre8-loading-animation, --cre8-icon-animation, none);
  margin: var(--cre8-icon-margin, 0);
}

.cre8-c-icon {
  height: var(--cre8-icon-height, size(2));
  width: var(--cre8-icon-width, size(2));
  fill: var(--cre8-icon-fill, currentColor);
}  
// stylelint-disable selector-no-qualifying-type, max-nesting-depth
cre8-icon {
    display: inline-flex;
    vertical-align: middle;

    &[spin] {
        @media (prefers-reduced-motion) {
            &:not([spin='false']) {
                // stylelint-disable-next-line declaration-no-important
                animation-duration: 6400ms !important;
            }
        }
        
        &:not([spin='false']) {
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            animation-name: spin;
            animation-timing-function: linear;
        }
    }

    &[pulse] {
        @media (prefers-reduced-motion) {
            &:not([pulse='false']) {
                svg {
                    * {
                        // stylelint-disable-next-line declaration-no-important
                        animation-duration: 3s !important;
                        animation-timing-function: linear;
                    }
                }
            }
        }

        &:not([pulse='false']) {
            svg {
                * {
                    animation: pulse 1.5s ease-in-out infinite;
                }
            }
        }
    }

    &[flip='vertical'] {
        transform: scaleY(-1);
    }
    
    &[flip='horizontal'] {
        transform: scaleX(-1);
    }
    
    &[flip='both'] {
        transform: scaleX(-1) scaleY(-1);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
  
    100% {
        opacity: 1;
    }
}
`;
export default styles;
