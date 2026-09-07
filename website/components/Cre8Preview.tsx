'use client'

import dynamic from 'next/dynamic'

// `ssr: false` is required, not a preference — see Cre8PreviewInner. It is also
// only permitted inside a Client Component, which is why this wrapper exists.
const Inner = dynamic(() => import('./Cre8PreviewInner'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: 220,
        display: 'grid',
        placeItems: 'center',
        color: 'var(--cre8-color-content-subtle)',
        fontSize: '.9rem',
      }}
    >
      Loading live components…
    </div>
  ),
})

export default function Cre8Preview() {
  return <Inner />
}
