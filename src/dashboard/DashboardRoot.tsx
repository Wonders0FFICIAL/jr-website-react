import { Link, NavLink, Outlet, useMatch } from 'react-router-dom'
import { guildIcon, userAvatar } from './api'
import { Ico } from './Icons'
import { tintFor } from './tones'
import type { IconName } from './Icons'
import { useSession } from './session'
import '@fontsource-variable/fraunces'
import './dashboard.css'

const SOON: [string, IconName][] = [['Welcome and roles', 'door'], ['Logging', 'clock'], ['Auto-moderation', 'shield']]

function Brand() {
  return (
    <Link to="/nook/dashboard" className="dz-brand">
      <span className="dz-brand__mark" aria-hidden="true" />
      <span>Nook</span>
    </Link>
  )
}

/** Wraps every /nook/dashboard page. Server pages get a side rail; the rest get a slim top bar. */
export function DashboardRoot() {
  const { state, logout } = useSession()
  const m = useMatch('/nook/dashboard/:guildId/*')
  const gid = m?.params.guildId && m.params.guildId !== 'callback' ? m.params.guildId : null
  const me = state.status === 'in' ? state.me : null
  const guild = gid && me ? me.guilds.find((g) => g.id === gid) ?? null : null
  const avatar = me ? userAvatar(me.user.id, me.user.avatar) : null
  const gIcon = guild ? guildIcon(guild.id, guild.icon, 64) : null

  const user = me && (
    <div className="dz-user">
      {avatar ? <img src={avatar} alt="" width="28" height="28" /> : <span className="dz-user__ph" aria-hidden="true">{me.user.username.slice(0, 1).toUpperCase()}</span>}
      <span className="dz-user__name">{me.user.globalName || me.user.username}</span>
      <button type="button" className="dz-iconbtn" onClick={logout} aria-label="Log out" title="Log out"><Ico name="logout" size={18} /></button>
    </div>
  )

  if (guild) {
    const base = `/nook/dashboard/${guild.id}`
    const cls = ({ isActive }: { isActive: boolean }) => `dz-nav__link ${isActive ? 'is-on' : ''}`
    return (
      <div className="dz dz--rail">
        <aside className="dz-rail">
          <Brand />
          <Link to="/nook/dashboard" className="dz-switch-server" title="Switch server">
            {gIcon ? <img src={gIcon} alt="" width="36" height="36" /> : <span className={`dz-arch ${tintFor(guild.id)}`} aria-hidden="true">{guild.name.slice(0, 1).toUpperCase()}</span>}
            <span className="dz-switch-server__name">{guild.name}</span>
            <Ico name="refresh" size={16} />
          </Link>
          <nav className="dz-nav" aria-label="Server sections">
            <NavLink end to={base} className={(a) => `${cls(a)} tone-violet`}><Ico name="layers" size={18} />Overview</NavLink>
            <NavLink to={`${base}/leveling`} className={(a) => `${cls(a)} tone-pink`}><Ico name="star" size={18} />Leveling</NavLink>
            <p className="dz-nav__label">Coming soon</p>
            {SOON.map(([n, ic]) => <span key={n} className="dz-nav__link is-soon" aria-disabled="true"><Ico name={ic} size={18} />{n}</span>)}
          </nav>
          {user}
        </aside>
        <div className="dz-body"><Outlet /></div>
      </div>
    )
  }

  return (
    <div className="dz dz--top">
      <header className="dz-top"><Brand />{user}</header>
      <div className="dz-body"><Outlet /></div>
    </div>
  )
}
