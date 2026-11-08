import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DASHBOARD_CONFIGURED, api, guildIcon } from './api'
import { useSession } from './session'
import { Notice, Spinner } from './ui'
import { usePageMeta } from '../hooks/usePageMeta'

export function DashboardHome() {
  usePageMeta('/nook/dashboard')
  const { state, reload } = useSession()
  const [invite, setInvite] = useState<string | null>(null)

  useEffect(() => {
    if (state.status !== 'in') return
    api.config().then((c) => setInvite(c.inviteUrl)).catch(() => setInvite(null))
  }, [state.status])

  if (!DASHBOARD_CONFIGURED) {
    return (
      <div className="container dz-main">
        <Notice kind="warn">The dashboard isn’t connected to the bot yet. Set <code>VITE_NOOK_API_URL</code> on the website and redeploy.</Notice>
      </div>
    )
  }
  if (state.status === 'loading') return <div className="container dz-main"><Spinner /></div>

  if (state.status === 'out') {
    return (
      <div className="container dz-main">
        <section className="dz-hero">
          <p className="eyebrow">Nook dashboard</p>
          <h1>Set up Nook from your browser.</h1>
          <p className="lead">Log in with Discord to change leveling, announcements, role rewards and more for any server you manage. No commands needed.</p>
          {state.error && <Notice kind="err">{state.error}</Notice>}
          <a className="btn btn-primary btn-lg" href={api.loginUrl()}>Log in with Discord</a>
          <ul className="dz-points">
            <li>We only read your name and the list of servers you’re in. Your Discord login token is thrown away straight after.</li>
            <li>You can only change servers where you have the <strong>Manage Server</strong> permission.</li>
            <li>See the <Link to="/nook/privacy" className="text-link">Nook privacy policy</Link>.</li>
          </ul>
        </section>
      </div>
    )
  }

  const guilds = [...state.me.guilds].sort((a, b) => Number(b.botIn) - Number(a.botIn) || a.name.localeCompare(b.name))
  return (
    <div className="container dz-main">
      <header className="dz-head">
        <div>
          <h1>Choose a server</h1>
          <p className="lead">Servers where you can manage Nook. Missing one? You need <strong>Manage Server</strong> there.</p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => reload()}>Refresh</button>
      </header>
      {!guilds.length && <Notice>No servers found. You need the Manage Server permission in a server to configure Nook there. If you just got it, <a className="text-link" href={api.loginUrl()}>log in again</a> to refresh your list.</Notice>}
      <ul className="dz-guilds">
        {guilds.map((g) => {
          const icon = guildIcon(g.id, g.icon)
          return (
            <li key={g.id} className="dz-guild">
              {icon ? <img src={icon} alt="" width="56" height="56" /> : <span className="dz-guild__ph" aria-hidden="true">{g.name.slice(0, 1).toUpperCase()}</span>}
              <div className="dz-guild__body">
                <h2>{g.name}</h2>
                <p>{g.owner ? 'Owner' : 'Manager'}</p>
              </div>
              {g.botIn ? (
                <Link className="btn btn-primary btn-sm" to={`/nook/dashboard/${g.id}`}>Configure</Link>
              ) : (
                <a className={`btn btn-ghost btn-sm ${invite ? '' : 'is-disabled'}`} href={invite ? `${invite}&guild_id=${g.id}&disable_guild_select=true` : undefined} aria-disabled={!invite} target="_blank" rel="noopener noreferrer">
                  Add Nook
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
