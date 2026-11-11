import { Link, useParams } from 'react-router-dom'
import { api } from './api'
import { useGuild } from './useGuild'
import { Ico } from './Icons'
import type { IconName, Tone } from './Icons'
import { Notice, Spinner } from './ui'
import { fmt } from './levelMath'
import { usePageMeta } from '../hooks/usePageMeta'
import type { GuildSnapshot } from './types'

export function GuildGate({ children }: { children: (data: GuildSnapshot, h: ReturnType<typeof useGuild>) => React.ReactNode }) {
  const { guildId } = useParams()
  const h = useGuild(guildId)
  const { session, guild } = h

  if (session.status === 'loading') return <div className="dz-page"><Spinner /></div>
  if (session.status === 'out') {
    return (
      <div className="dz-page">
        <PageHead title="Log in to continue" sub="Your session ended or you haven’t logged in yet." />
        {session.error && <Notice kind="err">{session.error}</Notice>}
        <a className="btn btn-primary dz-btn-ico" href={api.loginUrl()}>Log in with Discord</a>
      </div>
    )
  }
  if (guild.status === 'loading') return <div className="dz-page"><Spinner /></div>
  if (guild.status === 'error') {
    return (
      <div className="dz-page">
        <Notice kind="err">
          {guild.code === 'bot_not_in_guild' ? 'Nook isn’t in that server yet. Add it from the server list first.'
            : guild.httpStatus === 403 ? 'You need the Manage Server permission in that server.'
            : guild.message}
        </Notice>
        <p className="dz-back"><Link to="/nook/dashboard" className="text-link"><Ico name="arrowLeft" size={15} /> All servers</Link>{guild.httpStatus !== 403 && guild.code !== 'bot_not_in_guild' && <> <button type="button" className="dz-linkbtn" onClick={h.reload}>Try again</button></>}</p>
      </div>
    )
  }
  return <div className="dz-page">{children(guild.data, h)}</div>
}

export function PageHead({ title, sub, action, icon, tone = 'violet' }: { title: string; sub?: string; action?: React.ReactNode; icon?: IconName; tone?: Tone }) {
  return (
    <header className="dz-pagehead">
      {icon && <span className={`dz-headtile tone-${tone}`} aria-hidden="true"><Ico name={icon} size={24} /></span>}
      <div className="dz-pagehead__text">
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {action}
    </header>
  )
}

export function GuildHeader({ data, current }: { data: GuildSnapshot; current: string }) {
  const sub = current === 'Leveling' ? `XP, ranks and role rewards in ${data.guild.name}.` : `${data.guild.name} · ${fmt(data.guild.memberCount)} members`
  return <PageHead title={current} sub={sub} icon={current === 'Leveling' ? 'star' : 'layers'} tone={current === 'Leveling' ? 'pink' : 'violet'} />
}

function Setup({ data }: { data: GuildSnapshot }) {
  const l = data.leveling
  const items: [boolean, string, string][] = [
    [l.enabled, 'Turn leveling on', 'General'],
    [l.announce.enabled && !!l.announce.channelId, 'Choose a channel for level-up messages', 'Announcements'],
    [l.rewards.length > 0, 'Add a role reward', 'Rewards'],
    [l.ignoredChannels.length > 0, 'Ignore spam channels', 'Ignored'],
  ]
  const done = items.filter((i) => i[0]).length
  return (
    <section className="dz-section" aria-label="Setup checklist">
      <div className="dz-section__head"><h2>Setup</h2><span className="dz-count">{done} of {items.length} done</span></div>
      <ul className="dz-checks">
        {items.map(([ok, text, where]) => (
          <li key={text} className={ok ? 'is-done' : ''}>
            <span className="dz-check" aria-hidden="true">{ok && <Ico name="check" size={14} />}</span>
            <span>{text}</span>
            {!ok && <Link className="dz-rowlink" to={`/nook/dashboard/${data.guild.id}/leveling`}>{where}</Link>}
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
          <>
            <GuildHeader data={data} current="Overview" />
            <dl className="dz-figures">
              <div className="tone-amber"><dt>XP per message</dt><dd>{l.xpMin}–{l.xpMax}</dd></div>
              <div className="tone-pink"><dt>Role rewards</dt><dd>{l.rewards.length}</dd></div>
              <div className="tone-cyan"><dt>Ranked members</dt><dd>{fmt(data.ranked)}</dd></div>
            </dl>
            <section className="dz-section">
              <div className="dz-section__head"><h2>Modules</h2></div>
              <ul className="dz-modrows">
                <li>
                  <span className="dz-arch tone-pink" aria-hidden="true"><Ico name="star" size={20} /></span>
                  <div><h3>Leveling</h3><p>XP, ranks, leaderboards and role rewards.</p></div>
                  <span className={`dz-badge ${l.enabled ? 'is-on' : ''}`}>{l.enabled ? 'On' : 'Off'}</span>
                  <Link className="btn btn-primary btn-sm dz-btn-ico" to={`/nook/dashboard/${data.guild.id}/leveling`}>Open<Ico name="arrowRight" size={16} /></Link>
                </li>
                {([['Welcome and roles', 'door', 'Greet new members and give them roles.'], ['Logging', 'clock', 'See joins, edits and deletes in one place.'], ['Auto-moderation', 'shield', 'Filter spam, links and bad words.']] as const).map(([n, ic, d]) => (
                  <li key={n} className="is-soon">
                    <span className="dz-arch dz-arch--dim" aria-hidden="true"><Ico name={ic} size={20} /></span>
                    <div><h3>{n}</h3><p>{d}</p></div>
                    <span className="dz-badge">Soon</span>
                  </li>
                ))}
              </ul>
            </section>
            <Setup data={data} />
            <p className="dz-muted dz-foot">Moderation, tickets, role panels and the media library are still managed with Nook’s commands in Discord.</p>
          </>
        )
      }}
    </GuildGate>
  )
}
