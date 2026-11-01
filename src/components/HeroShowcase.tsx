import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { ProductWindow } from './ProductWindow'
import './HeroShowcase.css'

/** Hero: a concept window that cycles through the five products. */
export function HeroShowcase({ onProductChange }: { onProductChange?: (accent: string) => void }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const product = PRODUCTS[index]

  useEffect(() => {
    onProductChange?.(product.accent)
  }, [product.accent, onProductChange])

  useEffect(() => {
    if (reduced || paused) return
    const t = window.setInterval(() => setIndex((i) => (i + 1) % PRODUCTS.length), 5200)
    return () => window.clearInterval(t)
  }, [reduced, paused])

  return (
    <div
      className="hshow"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ProductWindow product={product} label={false} />

      <div className="hshow__tabs" role="tablist" aria-label="Products">
        {PRODUCTS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`hshow__tab${i === index ? ' is-active' : ''}`}
            style={{ '--accent': p.accent } as React.CSSProperties}
            onClick={() => setIndex(i)}
          >
            <i aria-hidden="true" />
            {p.name}
          </button>
        ))}
      </div>

      <p className="hshow__caption" aria-live="polite">
        <strong>{product.name}</strong> <span>{product.tagline}</span>{' '}
        <Link to={{ pathname: '/products', hash: `#${product.id}` }} className="hshow__more">
          Learn more →
        </Link>
      </p>
    </div>
  )
}
