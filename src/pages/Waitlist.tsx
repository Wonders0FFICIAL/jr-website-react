import { useSearchParams } from 'react-router-dom'
import { GlowMark } from '../components/GlowMark'
import { WaitlistForm } from '../components/WaitlistForm'
import { PRODUCTS } from '../data/products'
import type { Product } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import './Content.css'

export function Waitlist() {
  usePageMeta('Join the waitlist', 'Join the JR. waitlist and we will email you when our first products are ready.')
  const [params] = useSearchParams()
  const pre = params.get('interest')
  const initial = PRODUCTS.filter((p) => p.id === pre).map((p) => p.id) as Product['id'][]

  return (
    <section className="page-head page-head--split">
      <div className="container split">
        <div>
          <p className="eyebrow">Waitlist</p>
          <h1>Be first in line.</h1>
          <p className="lead">
            Tell us where to reach you and what you care about. We will email you when something is ready.
            There is no account to create.
          </p>
          <div className="card">
            <WaitlistForm initialInterests={initial} key={pre ?? 'none'} />
          </div>
        </div>

        <aside className="split__aside" aria-label="What to expect">
          <GlowMark size={170} />
          <ul className="expect">
            <li>
              <strong>Only real news.</strong> We will only write when there is something to share.
            </li>
            <li>
              <strong>Just your email.</strong> Everything else on the form is optional.
            </li>
            <li>
              <strong>Easy to leave.</strong> Ask us on the contact page and we will remove you.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
