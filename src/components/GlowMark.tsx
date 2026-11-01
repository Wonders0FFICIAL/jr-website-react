import type { CSSProperties } from 'react'
import './GlowMark.css'

/** The JR. logo on a softly glowing disc. Decorative. */
export function GlowMark({ size = 150 }: { size?: number }) {
  return (
    <div className="gmark" style={{ '--s': `${size}px` } as CSSProperties} aria-hidden="true">
      <span className="gmark__halo" />
      <span className="gmark__pulse" />
      <span className="gmark__disc">
        <img src="/brand/jr-logo.png" alt="" width="90" height="90" />
      </span>
    </div>
  )
}
