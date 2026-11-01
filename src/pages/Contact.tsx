import { ContactForm } from '../components/ContactForm'
import { Icon } from '../components/Icon'
import { DONATE, SOCIALS } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './Content.css'

export function Contact() {
  usePageMeta('Contact', 'Get in touch with JR. by message, or find us on Discord, GitHub, X and YouTube.')

  return (
    <section className="page-head page-head--split">
      <div className="container split">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Say hello.</h1>
          <p className="lead">
            Questions, feedback, partnerships or press. Send a message and we will reply by email.
          </p>
          <div className="card">
            <ContactForm />
          </div>
        </div>

        <aside className="split__aside split__aside--list" aria-label="Other ways to reach us">
          <h2 className="aside-title">Find us elsewhere</h2>
          <ul className="channels">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="channel">
                  <span className="channel__icon"><Icon name={s.id} size={20} /></span>
                  <span className="channel__text">
                    <strong>{s.label}</strong>
                    <span>{s.blurb}</span>
                  </span>
                  <span aria-hidden="true" className="channel__arrow">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="channel channel--support" href={DONATE.href} target="_blank" rel="noopener noreferrer">
            <span className="channel__icon"><Icon name="kofi" size={20} /></span>
            <span className="channel__text">
              <strong>{DONATE.label}</strong>
              <span>Help keep the work going on Ko-fi</span>
            </span>
            <span aria-hidden="true" className="channel__arrow">↗</span>
          </a>
        </aside>
      </div>
    </section>
  )
}
