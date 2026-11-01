import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { HeroShowcase } from '../components/HeroShowcase'
import { ProductMark } from '../components/ProductMark'
import { TiltCard } from '../components/TiltCard'
import { Reveal } from '../components/Reveal'
import { GlowMark } from '../components/GlowMark'
import { WaitlistForm } from '../components/WaitlistForm'
import { AUDIENCES, PRINCIPLES, PRODUCTS, PRODUCT_BY_ID } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import './Home.css'

export function Home() {
  const [accent, setAccent] = useState('#8b3dff')
  usePageMeta(
    null,
    'JR. is a software company building tools for developers, businesses and everyday people. Join the waitlist.',
  )

  return (
    <>
      <section className="hero" style={{ '--hero-accent': accent } as CSSProperties}>
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="pill">
              <span className="pill__dot" aria-hidden="true" />
              Five products in development
            </p>
            <h1>
              Software that makes <span className="hero__accent">life better.</span>
            </h1>
            <p className="lead">
              JR. is a software company. We build our own tools for developers, businesses and everyday
              people, and we are working on the first five right now.
            </p>
            <div className="hero__actions">
              <Link className="btn btn-primary btn-lg" to="/waitlist">
                Join the waitlist
              </Link>
              <Link className="btn btn-ghost btn-lg" to="/products">
                See what we are building
              </Link>
            </div>
          </div>
          <HeroShowcase onProductChange={setAccent} />
        </div>
      </section>

      <section className="section" aria-labelledby="audience-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Who it is for</p>
            <h2 id="audience-title">Made for how you work and live.</h2>
          </Reveal>
          <div className="audience-grid">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.id} delay={i * 80} className="audience-card">
                <h3>{a.title}</h3>
                <p>{a.blurb}</p>
                <ul className="audience-card__products" aria-label={`Products for ${a.title.toLowerCase()}`}>
                  {a.products.map((id) => (
                    <li key={id}>
                      <ProductMark product={PRODUCT_BY_ID[id]} size={34} />
                      <span>{PRODUCT_BY_ID[id].name}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="products-title">
        <div className="container">
          <Reveal className="section__head section__head--row">
            <div>
              <p className="eyebrow">Products</p>
              <h2 id="products-title">What we are building.</h2>
            </div>
            <Link className="text-link" to="/products">
              All products <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="product-grid">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 70} className="product-grid__cell">
                <TiltCard
                  to={{ pathname: '/products', hash: `#${p.id}` }}
                  accent={p.accent}
                  className="product-card"
                >
                  <div className="product-card__top">
                    <ProductMark product={p} size={56} />
                    <span className="status">{p.status}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p className="product-card__cat">{p.category}</p>
                  <p className="product-card__tag">{p.tagline}</p>
                  <span className="product-card__more">
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">How we build</p>
            <h2 id="principles-title">Powerful should never mean complicated.</h2>
          </Reveal>
          <ol className="principles">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="principle">
                <span className="principle__num" aria-hidden="true">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="cta">
            <div className="cta__copy">
              <h2 id="cta-title">Be first to try what we build.</h2>
              <p>Join the waitlist and we will email you when there is something to share. No account needed.</p>
              <WaitlistForm variant="inline" />
            </div>
            <div className="cta__cube">
              <GlowMark size={150} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
