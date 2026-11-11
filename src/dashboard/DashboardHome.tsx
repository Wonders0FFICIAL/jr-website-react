import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DASHBOARD_CONFIGURED, api, guildIcon } from './api'
import { Ico } from './Icons'
import { useSession } from './session'
import { Notice, Spinner } from './ui'
import { PageHead } from './DashboardGuild'
import { usePageMeta } from '../hooks/usePageMeta'

export function DashboardHome() {
  usePageMeta('/nook/dashboard')
  const { state, reload } = useSession()
  const [invite, setInvite] = useState<string | null>(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    if (state.status !== 'in') return
    api.config().then((c) => setInvite(c.inviteUrl)).catch(() => setInvite(null))
  }, [state.status])

  if (!DASHBOARD_CONFIGURED) {
    return (
      <div className="dz-page dz-page--narrow">
        <Notice kind="warn">The dashboard isn’t connected to the bot yet. Set <code>VITE_NOOK_API_URL</code> on the website and redeploy.</Notice>
      </div>
    )
  }
  if (state.status === 'loading') return <div className="dz-page dz-page--narrow"><Spinner /></div>

  if (state.status === 'out') {
    return (
      <div className="dz-welcome">
        <div className="dz-welcome__copy">
          <h1>Run Nook from your browser.</h1>
          <p>Log in with Discord to change leveling, announcements and role rewards for any server you manage. No commands needed.</p>
          {state.error && <Notice kind="err">{state.error}</Notice>}
          <a className="btn btn-primary btn-lg dz-btn-ico" href={api.loginUrl()}>Log in with Discord</a>
          <ul className="dz-facts">
            <li><Ico name="lock" size={18} /><span>Nook reads your name and server list, then discards your Discord login token.</span></li>
            <li><Ico name="shield" size={18} /><span>You can only change servers where you have <strong>Manage Server</strong>.</span></li>
            <li><Ico name="info" size={18} /><span>Read the <Link to="/nook/privacy" className="text-link">Nook privacy policy</Link>.</span></li>
          </ul>
        </div>
        <div className="dz-doorway" aria-hidden="true"><span /></div>
      </div>
    )
  }

  const all = state.me.guilds
  const guilds = [...all].filter((g) => g.name.toLowerCase().includes(q.trim().toLowerCase())).sort((a, b) => Number(b.botIn) - Number(a.botIn) || a.name.localeCompare(b.name))
  return (
    <div className="dz-page dz-page--narrow">
      <PageHead title="Choose a server" sub="Servers where you have Manage Server." action={<button type="button" className="btn btn-ghost btn-sm dz-btn-ico" onClick={() => reload()}><Ico name="refresh" size={15} />Refresh</button>} />
      {all.length > 5 && (
        <div className="dz-searchbox dz-serversearch"><Ico name="search" size={16} /><input className="dz-search" type="search" placeholder="Search your servers" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search servers" /></div>
      )}
      {!all.length && <Notice>No servers found. You need Manage Server in a server to set up Nook there. If you just got it, <a className="text-link" href={api.loginUrl()}>log in again</a> to refresh the list.</Notice>}
      {!!all.length && !guilds.length && <Notice>No servers match “{q}”.</Notice>}
      <ul className="dz-serverlist">
        {guilds.map((g) => {
          const icon = guildIcon(g.id, g.icon)
          return (
            <li key={g.id}>
              {icon ? <img className="dz-arch dz-arch--img" src={icon} alt="" width="44" height="44" /> : <span className="dz-arch" aria-hidden="true">{g.name.slice(0, 1).toUpperCase()}</span>}
              <div className="dz-serverlist__body">
                <h2>{g.name}</h2>
                <p>{g.owner ? 'Owner' : 'Manager'}{g.botIn ? '' : ' · Nook not added'}</p>
              </div>
              {g.botIn ? (
                <Link className="btn btn-primary btn-sm" to={`/nook/dashboard/${g.id}`}>Open</Link>
              ) : (
                <a className={`btn btn-ghost btn-sm dz-btn-ico ${invite ? '' : 'is-disabled'}`} href={invite ? `${invite}&guild_id=${g.id}&disable_guild_select=true` : undefined} aria-disabled={!invite} target="_blank" rel="noopener noreferrer">
                  <Ico name="plus" size={15} />Add Nook
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
