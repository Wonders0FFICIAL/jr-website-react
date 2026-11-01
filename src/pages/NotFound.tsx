import { Link } from 'react-router-dom'
import { GlowMark } from '../components/GlowMark'
import { usePageMeta } from '../hooks/usePageMeta'
import './Content.css'

export function NotFound() {
  usePageMeta('not-found')

  return (
    <section className="notfound">
      <div className="container">
        <GlowMark size={130} />
        <p className="eyebrow">Error 404</p>
        <h1>This page does not exist.</h1>
        <p className="lead">It may have moved, or the link might be wrong.</p>
        <Link className="btn btn-primary btn-lg" to="/">
          Back to home
        </Link>
      </div>
    </section>
  )
}
