import type { CSSProperties } from 'react'
import type { Product } from '../data/products'

/** A product's logo on a small dark tile, like an app icon. Decorative. */
export function ProductMark({ product, size = 48 }: { product: Product; size?: number }) {
  const style = { width: size, height: size, borderRadius: size * 0.26 } as CSSProperties
  return (
    <span className="mark" style={style} aria-hidden="true">
      <img src={product.logo} alt="" width={size} height={size} loading="lazy" />
    </span>
  )
}
