import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Legal.css'

export type LegalSection = { id: string; title: string; content: ReactNode }

type Props = {
  title: string
  lead: string
  updated: string
  readMinutes: number
  summary: { heading: string; points: string[] }
  sections: LegalSection[]
  other: { to: string; label: string; blurb: string }
}

const pad = (n: number) => String(n + 1).padStart(2, '0')

export function LegalPage({ title, lead, updated, readMinutes, summary, sections, other }: Props) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.3
      let current = sections[0]?.id ?? ''
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections])

  const toc = (
    <ol>
      {sections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''} aria-current={active === s.id ? 'true' : undefined}>
            <span>{pad(i)}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <>
      <section className="legal-head">
        <div className="container">
          <p className="eyebrow">Legal</p>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          <div className="legal-meta">
            <span className="chip">Updated {updated}</span>
            <span className="chip">{readMinutes} min read</span>
          </div>
        </div>
      </section>

      <div className="container legal">
        <aside className="legal__side" aria-label="On this page">
          <p className="legal__side-title">On this page</p>
          <nav>{toc}</nav>
        </aside>

        <article className="legal__main">
          <details className="legal__jump">
            <summary>On this page</summary>
            <nav>{toc}</nav>
          </details>

          <div className="legal__summary" role="note">
            <h2>{summary.heading}</h2>
            <ul>
              {summary.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal__section">
              <h2>
                <span className="legal__num">{pad(i)}</span>
                {s.title}
                <a className="legal__anchor" href={`#${s.id}`} aria-label={`Link to ${s.title}`}>#</a>
              </h2>
              {s.content}
            </section>
          ))}

          <div className="legal__end">
            <div>
              <h2>Still have a question?</h2>
              <p>Send us a message and we will get back to you.</p>
              <Link className="btn btn-primary" to="/contact">Contact us</Link>
            </div>
            <Link className="legal__other" to={other.to}>
              <small>Also read</small>
              <strong>{other.label}</strong>
              <span>{other.blurb}</span>
              <i aria-hidden="true">→</i>
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}