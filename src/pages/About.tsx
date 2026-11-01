import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { ProductMark } from '../components/ProductMark'
import { Reveal } from '../components/Reveal'
import { AUDIENCES, PRINCIPLES, PRODUCTS, PRODUCT_BY_ID } from '../data/products'
import { SOCIALS } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './Content.css'

export function About() {
  usePageMeta('About', 'JR. is a software company that builds its own tools to make life better for developers, businesses and everyday people.')

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>We make software that makes life better.</h1>
          <p className="lead">
            JR. is a software company. We design and build our own tools for developers, businesses and
            everyday people, and we care about getting the details right.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container narrow prose">
          <h2>What we are doing</h2>
          <p>
            We are building the layers people actually depend on: {PRODUCTS.map((p) => p.category.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' and $1')}.
            Each one is made in-house, from the ground up.
          </p>
          <p>
            None of our products has launched yet. This site is where we will share progress, and where you
            can join the waitlist to hear about launches first-hand.
          </p>
          <ul className="about-products">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <ProductMark product={p} size={40} />
                <span>
                  <strong>{p.name}</strong> {p.tagline}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Who we build for</p>
            <h2>Developers, businesses and everyone else.</h2>
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

      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">How we think</p>
            <h2>Three things we hold on to.</h2>
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

      <section className="section section--tight">
        <div className="container narrow">
          <Reveal className="note note--stack">
            <h2>Follow along</h2>
            <p>We share progress in the open. Come say hello.</p>
            <ul className="social-links">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <a className="btn btn-ghost" href={s.href} target="_blank" rel="noopener noreferrer">
                    <Icon name={s.id} size={18} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <Link className="btn btn-primary" to="/waitlist">
              Join the waitlist
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
