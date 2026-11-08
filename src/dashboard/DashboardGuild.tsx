import { Link, useParams } from 'react-router-dom'
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
  return <>{children(guild.data, h)}</>
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

export function DashboardGuild() {
  usePageMeta('/nook/dashboard')
  return (
    <GuildGate>
      {(data) => {
        const l = data.leveling
        return (
          <div className="container dz-main">
            <GuildHeader data={data} />
            <ul className="dz-modules">
              <li className="dz-module tone-pink">
                <div className="dz-module__top">
                  <Tile name="star" tone="pink" size={46} />
                  <span className={`dz-badge ${l.enabled ? 'is-on' : ''}`}>{l.enabled ? 'On' : 'Off'}</span>
                </div>
                <h2>Leveling</h2>
                <p>XP, ranks, leaderboards and role rewards.</p>
                <dl className="dz-stats">
                  <div><dt>XP per message</dt><dd>{l.xpMin}–{l.xpMax}</dd></div>
                  <div><dt>Role rewards</dt><dd>{l.rewards.length}</dd></div>
                  <div><dt>Ranked members</dt><dd>{fmt(data.ranked)}</dd></div>
                </dl>
                <Link className="btn btn-primary btn-sm dz-btn-ico" to={`/nook/dashboard/${data.guild.id}/leveling`}>Open leveling<Ico name="arrowRight" size={16} /></Link>
              </li>
              {([['Welcome & auto-role', 'door', 'cyan', 'Greet new members and give them roles.'], ['Logging', 'clock', 'amber', 'See joins, edits and deletes in one place.'], ['Auto-moderation', 'shield', 'green', 'Filter spam, links and bad words.']] as [string, IconName, Tone, string][]).map(([m, ic, tn, d]) => (
                <li key={m} className={`dz-module is-soon tone-${tn}`}>
                  <div className="dz-module__top"><Tile name={ic} tone={tn} size={46} /><span className="dz-badge"><Ico name="lock" size={12} /> Soon</span></div>
                  <h2>{m}</h2>
                  <p>{d}</p>
                </li>
              ))}
            </ul>
            <p className="dz-muted dz-foot">Moderation, tickets, role panels and the media library are still managed with Nook’s commands in Discord.</p>
          </div>
        )
      }}
    </GuildGate>
  )
}
