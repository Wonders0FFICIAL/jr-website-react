import { Link, NavLink, useParams } from 'react-router-dom'
import { api, guildIcon } from './api'
import { useGuild } from './useGuild'
import { Notice, Spinner } from './ui'
import { fmt } from './levelMath'
import { Ico, Tile } from './Icons'
import type { IconName, Tone } from './Icons'
import { usePageMeta } from '../hooks/usePageMeta'

export function GuildGate({ children }: { children: (data: import('./types').GuildSnapshot, h: ReturnType<typeof useGuild>) => React.ReactNode }) {
  const { guildId } = useParams()
  const h = useGuild(guildId)
  const { session, guild } = h

  if (session.status === 'loading') return <div className="container dz-main"><Spinner /></div>
  if (session.status === 'out') {
    return (
      <div className="container dz-main">
        <section className="dz-hero">
          <h1>Log in to continue</h1>
          {session.error && <Notice kind="err">{session.error}</Notice>}
          <a className="btn btn-primary btn-lg" href={api.loginUrl()}>Log in with Discord</a>
        </section>
      </div>
    )
  }
  if (guild.status === 'loading') return <div className="container dz-main"><Spinner /></div>
  if (guild.status === 'error') {
    return (
      <div className="container dz-main">
        <Notice kind="err">
          {guild.code === 'bot_not_in_guild' ? 'Nook isn’t in that server yet. Add it from the server list first.'
            : guild.httpStatus === 403 ? 'You need the Manage Server permission in that server.'
            : guild.message}
        </Notice>
        <p className="dz-back"><Link to="/nook/dashboard" className="text-link"><Ico name="arrowLeft" size={15} /> All servers</Link>{guild.httpStatus !== 403 && guild.code !== 'bot_not_in_guild' && <> · <button type="button" className="dz-linkbtn" onClick={h.reload}>Try again</button></>}</p>
      </div>
    )
  }
  return (
    <div className="container dz-main dz-shell">
      <GuildNav data={guild.data} />
      <div className="dz-page">{children(guild.data, h)}</div>
    </div>
  )
}

const SOON: [string, IconName][] = [['Welcome & roles', 'door'], ['Logging', 'clock'], ['Auto-moderation', 'shield']]

function GuildNav({ data }: { data: import('./types').GuildSnapshot }) {
  const base = `/nook/dashboard/${data.guild.id}`
  const cls = ({ isActive }: { isActive: boolean }) => `dz-nav__link ${isActive ? 'is-on' : ''}`
  return (
    <nav className="dz-nav" aria-label="Server sections">
      <p className="dz-nav__label">Manage</p>
      <NavLink end to={base} className={cls}><Ico name="layers" size={18} />Overview</NavLink>
      <NavLink to={`${base}/leveling`} className={cls}><Ico name="star" size={18} />Leveling</NavLink>
      <p className="dz-nav__label">Coming soon</p>
      {SOON.map(([n, ic]) => <span key={n} className="dz-nav__link is-soon" aria-disabled="true"><Ico name={ic} size={18} />{n}</span>)}
      <Link to="/nook/dashboard" className="dz-nav__link dz-nav__switch"><Ico name="refresh" size={18} />Switch server</Link>
    </nav>
  )
}

export function GuildHeader({ data, current, tone = 'violet' }: { data: import('./types').GuildSnapshot; current?: string; tone?: Tone }) {
  const icon = guildIcon(data.guild.id, data.guild.icon)
  return (
    <header className={`dz-ghead tone-${tone}`}>
      <p className="dz-back"><Link to="/nook/dashboard" className="text-link"><Ico name="arrowLeft" size={15} /> All servers</Link></p>
      <div className="dz-ghead__row">
        {icon ? <img src={icon} alt="" width="64" height="64" /> : <span className="dz-guild__ph dz-guild__ph--lg" aria-hidden="true">{data.guild.name.slice(0, 1).toUpperCase()}</span>}
        <div>
          <h1>{data.guild.name}{current && <small><Ico name="arrowRight" size={16} />{current}</small>}</h1>
          <p className="dz-muted"><Ico name="users" size={15} /> {fmt(data.guild.memberCount)} members</p>
        </div>
      </div>
    </header>
  )
}

function Setup({ data }: { data: import('./types').GuildSnapshot }) {
  const l = data.leveling
  const items: [boolean, string, string][] = [
    [l.enabled, 'Leveling is turned on', 'General'],
    [l.announce.enabled && !!l.announce.channelId, 'Level-up announcements have their own channel', 'Announcements'],
    [l.rewards.length > 0, 'At least one role reward is set', 'Rewards'],
    [l.ignoredChannels.length > 0, 'Spam channels are ignored', 'Ignored'],
  ]
  const done = items.filter((i) => i[0]).length
  return (
    <section className="dz-setup" aria-label="Setup checklist">
      <header><h2>Setup checklist</h2><span className="dz-chip">{done}/{items.length}</span></header>
      <div className="dz-bar-track" aria-hidden="true"><i style={{ width: `${(done / items.length) * 100}%` }} /></div>
      <ul>
        {items.map(([ok, text, where]) => (
          <li key={text} className={ok ? 'is-done' : ''}>
            <Ico name={ok ? 'check' : 'plus'} size={16} />
            <span>{text}</span>
            {!ok && <Link className="text-link" to={`/nook/dashboard/${data.guild.id}/leveling`}>{where}</Link>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function DashboardGuild() {
  usePageMeta('/nook/dashboard')
  return (
    <GuildGate>
      {(data) => {
        const l = data.leveling
        return (
          <div>
            <GuildHeader data={data} />
            <div className="dz-overview"><ul className="dz-modules">
              <li className="dz-module tone-pink">
                <div className="dz-module__top">
                  <Tile name="star" tone="pink" size={46} />
                  <span className={`dz-badge ${l.enabled ? 'is-on' : ''}`}>{l.enabled ? 'On' : 'Off'}</span>
                </div>
                <h2>Leveling</h2>
                <p>XP, ranks, leaderboards and role rewards.</p>
                <dl className="dz-stats">
                  <div><dt>XP / msg</dt><dd>{l.xpMin}–{l.xpMax}</dd></div>
                  <div><dt>Rewards</dt><dd>{l.rewards.length}</dd></div>
                  <div><dt>Ranked</dt><dd>{fmt(data.ranked)}</dd></div>
                </dl>
                <Link className="btn btn-primary btn-sm dz-btn-ico" to={`/nook/dashboard/${data.guild.id}/leveling`}>Open leveling<Ico name="arrowRight" size={16} /></Link>
              </li>
                          </ul>
            <Setup data={data} /></div>
            <p className="dz-muted dz-foot">Moderation, tickets, role panels and the media library are still managed with Nook’s commands in Discord.</p>
          </div>
        )
      }}
    </GuildGate>
  )
}
