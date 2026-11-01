import { Link } from 'react-router-dom'
import { ProductMark } from '../components/ProductMark'
import { PRODUCTS } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import './Content.css'

export function Pricing() {
  usePageMeta('Pricing', 'Nothing from JR. is for sale yet. Pricing for each product will be published here at launch.')

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Pricing</p>
          <h1>No prices yet, and that is on purpose.</h1>
          <p className="lead">
            Nothing from JR. is for sale yet, so we would rather not guess. When a product launches, its
            pricing will be published here.
          </p>
        </div>
      </section>

      <section className="container narrow">
        <ul className="price-list">
          {PRODUCTS.map((p) => (
            <li key={p.id} className="price-row">
              <ProductMark product={p} size={48} />
              <div className="price-row__name">
                <strong>{p.name}</strong>
                <span>{p.category}</span>
              </div>
              <span className="chip">Pricing announced at launch</span>
            </li>
          ))}
        </ul>

        <div className="note">
          <p>Want to hear when pricing is announced?</p>
          <Link className="btn btn-primary" to="/waitlist">
            Join the waitlist
          </Link>
        </div>
      </section>
    </>
  )
}
