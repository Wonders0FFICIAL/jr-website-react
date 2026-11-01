import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/site'
import './Navbar.css'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="JR. home">
          <img src="/brand/jr-logo.png" alt="JR." width="44" height="44" />
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} id="site-nav" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/waitlist" className="btn btn-primary nav__cta-mobile">
            Join the waitlist
          </Link>
        </nav>

        <div className="nav__right">
          <Link to="/waitlist" className="btn btn-primary btn-sm nav__cta">
            Join the waitlist
          </Link>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
