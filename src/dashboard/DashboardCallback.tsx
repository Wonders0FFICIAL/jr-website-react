import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from './api'
import { setToken } from './session'
import { Notice, Spinner } from './ui'
import { usePageMeta } from '../hooks/usePageMeta'

const MESSAGES: Record<string, string> = {
  denied: 'You cancelled the Discord login.',
  bad_state: 'That login link expired or was already used. Please try again.',
  login_failed: 'Discord login failed. Please try again.',
  rate_limited: 'Too many attempts. Wait a minute and try again.',
}

/** Discord → bot → here. The bot puts the session token in the URL fragment (#token=…). */
export function DashboardCallback() {
  usePageMeta('/nook/dashboard')
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''))
    const token = params.get('token')
    const err = params.get('error')
    // Remove the token from the address bar and history straight away.
    window.history.replaceState(null, '', window.location.pathname)
    if (token) {
      setToken(token)
      navigate('/nook/dashboard', { replace: true })
    } else {
      setError(MESSAGES[err ?? ''] ?? 'Something went wrong while logging in.')
    }
  }, [navigate])

  return (
    <div className="container dz-main">
      {error ? (
        <section className="dz-hero">
          <h1>Login didn’t work</h1>
          <Notice kind="err">{error}</Notice>
          <a className="btn btn-primary btn-lg" href={api.loginUrl()}>Try again</a>
          <p><Link to="/nook/dashboard" className="text-link">Back to the dashboard</Link></p>
        </section>
      ) : <Spinner label="Logging you in" />}
    </div>
  )
}
