import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ProductWindow } from '../components/ProductWindow'
import { Reveal } from '../components/Reveal'
import { PRODUCTS } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import './Products.css'

export function Products() {
  usePageMeta('/products')

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Products</p>
          <h1>Five products, one idea.</h1>
          <p className="lead">
            A programming language, an AI assistant, a code editor, cloud servers and a private browser.
            Everything here is in development, so details may change before launch.
          </p>
          <nav className="jump" aria-label="Jump to a product">
            {PRODUCTS.map((p) => (
              <a key={p.id} href={`#${p.id}`} style={{ '--accent': p.accent } as CSSProperties}>
                <i aria-hidden="true" />
                {p.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="container showcase">
        {PRODUCTS.map((p, i) => (
          <Reveal as="article" key={p.id} className={`showcase__row ${i % 2 ? 'is-flipped' : ''}`}>
            <div id={p.id} className="showcase__anchor" />
            <div className="showcase__stage">
              <ProductWindow product={p} />
            </div>
            <div className="showcase__body">
              <p className="eyebrow" style={{ color: p.accent }}>{p.category}</p>
              <h2>{p.name}</h2>
              <p className="showcase__tag">{p.tagline}</p>
              <p>{p.description}</p>
              <ul className="checklist">
                {p.points.map((pt) => (
                  <li key={pt}>
                    <i style={{ background: p.accent }} aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="showcase__meta">
                <span className="status">{p.status}</span>
                {p.audiences.map((a) => (
                  <span key={a} className="chip">For {a.toLowerCase()}</span>
                ))}
              </div>
              <Link className="btn btn-ghost" to={`/waitlist?interest=${p.id}`}>
                Notify me about {p.name}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  )
}
