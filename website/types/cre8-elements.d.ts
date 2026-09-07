import type React from 'react'

/**
 * JSX typings for the cre8 custom elements used on this site.
 *
 * The library's own React wrappers can't be bundled here (see
 * components/Cre8PreviewInner.tsx), so the elements are written directly and
 * typed by hand. Only the props this site actually sets are declared — extend
 * as needed rather than widening to `any`.
 */

type Cre8Element<P = object> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & P

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'cre8-card': Cre8Element
        'cre8-badge': Cre8Element<{ text?: string; variant?: 'success' | 'info' | 'warning' | 'error' }>
        'cre8-button': Cre8Element<{
          text?: string
          variant?: 'primary' | 'secondary' | 'tertiary'
          size?: 'sm' | 'md' | 'lg'
          href?: string
          inverse?: boolean
        }>
      }
    }
  }
}

export {}
