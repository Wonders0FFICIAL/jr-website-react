import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Delay in ms, handy for staggering siblings. */
  delay?: number
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-visible' : ''} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  )
}
