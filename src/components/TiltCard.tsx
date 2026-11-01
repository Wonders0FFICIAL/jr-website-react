import { useRef } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import './TiltCard.css'

type Props = Omit<LinkProps, 'children'> & {
  children: ReactNode
  /** Maximum tilt in degrees. */
  max?: number
  accent?: string
}

/** A link card that leans toward the pointer in 3D. Does nothing on touch. */
export function TiltCard({ children, max = 7, accent, className = '', style, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`)
    el.style.setProperty('--rx', `${(0.5 - py) * 2 * max}deg`)
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }

  const merged = { ...style, '--accent': accent } as CSSProperties

  return (
    <Link
      {...rest}
      ref={ref}
      className={`tilt ${className}`.trim()}
      style={merged}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <span className="tilt__glare" aria-hidden="true" />
      {children}
    </Link>
  )
}
