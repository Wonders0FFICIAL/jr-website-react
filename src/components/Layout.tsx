import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/** Scrolls to the #hash target if there is one, otherwise back to the top. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export function Layout() {
  const { pathname } = useLocation()
  // The Nook dashboard is an app of its own: no marketing header or footer.
  if (pathname.startsWith('/nook/dashboard') || pathname.startsWith('/nook/leaderboard')) {
    return (
      <>
        <ScrollManager />
        <main id="main"><Outlet /></main>
      </>
    )
  }
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <div className="page" key={pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
