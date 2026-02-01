import { createContext } from '@lit/context';

/**
 * Extended ElementInternals interface with form lifecycle callbacks
 */
export interface Cre8ElementInternals extends ElementInternals {
    formResetCallback?: () => void;
    ariaRole?: string;
}

/**
 * Context for sharing form element internals with descendant components.
 * This allows nested components to access the parent form element's
 * ElementInternals for form participation, validation, and ARIA.
 */
export const formInternalsContext = createContext<Cre8ElementInternals | null>(
    Symbol('cre8-form-internals')
);

/**
 * Context for sharing form element state with descendants
 */
export interface FormElementState {
    value: string;
    disabled: boolean;
    required: boolean;
    isError: boolean;
    isSuccess: boolean;
    name?: string;
}

export const formStateContext = createContext<FormElementState>(
    Symbol('cre8-form-state')
);
