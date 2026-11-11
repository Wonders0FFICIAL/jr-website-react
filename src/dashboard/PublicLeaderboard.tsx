import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApiError, DASHBOARD_CONFIGURED, api } from './api'
import { Ico } from './Icons'
import { fmt } from './levelMath'
import { Notice, Segmented, Spinner } from './ui'
import { usePageMeta } from '../hooks/usePageMeta'
import type { Period, PublicLeaderboardData, PublicRow } from './types'
import '@fontsource-variable/fraunces'
import './dashboard.css'
import './leaderboard.css'

const PERIODS: { value: Period; label: string }[] = [
  { value: 'alltime', label: 'All-time' },
  { value: 'weekly', label: 'This week' },
  { value: 'monthly', label: 'This month' },
]

function Avatar({ row, size = 40 }: { row: PublicRow; size?: number }) {
  return row.avatar
    ? <img className="lb-avatar" src={row.avatar} alt="" width={size} height={size} loading="lazy" />
    : <span className="lb-avatar lb-avatar--ph" style={{ width: size, height: size }} aria-hidden="true">{row.name.slice(0, 1).toUpperCase()}</span>
}

function Podium({ rows }: { rows: PublicRow[] }) {
  // Visual order: 2nd, 1st, 3rd.
  const order = [rows[1], rows[0], rows[2]].filter(Boolean)
  return (
    <ol className="lb-podium" aria-label="Top three">
      {order.map((r) => (
        <li key={r.rank} className={`lb-pod lb-pod--${r.rank}`}>
          <span className="lb-pod__rank">{r.rank}</span>
          <Avatar row={r} size={r.rank === 1 ? 72 : 56} />
          <strong className="lb-pod__name">{r.name}</strong>
          <span className="lb-pod__title">{r.title}</span>
          <span className="lb-pod__xp"><b>Level {r.level}</b> · {fmt(r.xp)} XP</span>
        </li>
      ))}
    </ol>
  )
}

export function PublicLeaderboard() {
  usePageMeta('/nook/leaderboard')
  const { slug = '' } = useParams()
  const [period, setPeriod] = useState<Period>('alltime')
  const [page, setPage] = useState(0)
  const [data, setData] = useState<PublicLeaderboardData | null>(null)
  const [err, setErr] = useState<ApiError | null>(null)
  const [loading, setLoading] = useState(true)
  const [invite, setInvite] = useState<string | null>(null)

  useEffect(() => { api.config().then((c) => setInvite(c.inviteUrl)).catch(() => setInvite(null)) }, [])
  useEffect(() => {
    if (!DASHBOARD_CONFIGURED) return
    let live = true
    setLoading(true)
    api.publicLeaderboard(slug, period, page)
      .then((d) => { if (!live) return; setData(d); setErr(null); document.title = `${d.guild.name} leaderboard | Nook` })
      .catch((e) => { if (live) setErr(e instanceof ApiError ? e : new ApiError(0, 'error', 'Something went wrong.')) })
      .finally(() => { if (live) setLoading(false) })
    return () => { live = false }
  }, [slug, period, page])

  const top = data && page === 0 ? data.rows.slice(0, 3) : []
  const rest = data ? (page === 0 ? data.rows.slice(3) : data.rows) : []

  return (
    <div className="dz lb">
      <header className="dz-top">
        <Link to="/nook/dashboard" className="dz-brand"><span className="dz-brand__mark" aria-hidden="true" /><span>Nook</span></Link>
        {invite && <a className="btn btn-ghost btn-sm dz-btn-ico" href={invite} target="_blank" rel="noopener noreferrer"><Ico name="plus" size={15} />Add Nook</a>}
      </header>

      <div className="lb-wrap">
        {!DASHBOARD_CONFIGURED && <Notice kind="warn">This site isn’t connected to the Nook bot yet.</Notice>}
        {err && !data && (
          <div className="lb-missing">
            <h1>{err.status === 404 ? 'No public leaderboard here' : 'Couldn’t load the leaderboard'}</h1>
            <p>{err.status === 404 ? 'This link doesn’t exist, or the server hasn’t made its leaderboard public.' : err.message}</p>
            <Link to="/nook/dashboard" className="text-link">Go to the Nook dashboard</Link>
          </div>
        )}
        {!data && !err && DASHBOARD_CONFIGURED && <Spinner />}
        {data && (
          <>
            <section className="lb-head">
              {data.guild.icon ? <img className="lb-guild" src={data.guild.icon} alt="" width="72" height="72" /> : <span className="lb-guild lb-guild--ph" aria-hidden="true">{data.guild.name.slice(0, 1).toUpperCase()}</span>}
              <div>
                <h1>{data.guild.name}</h1>
                <p>Leaderboard · {fmt(data.total)} ranked {data.total === 1 ? 'member' : 'members'}</p>
              </div>
              <Segmented<Period> label="Time range" value={period} onChange={(p) => { setPeriod(p); setPage(0) }} options={PERIODS} />
            </section>

            {err && <Notice kind="err">{err.message}</Notice>}
            <div className={loading ? 'lb-body is-loading' : 'lb-body'} aria-busy={loading}>
              {!data.rows.length && <p className="lb-empty">Nobody has earned XP {period === 'alltime' ? 'here' : period === 'weekly' ? 'this week' : 'this month'} yet.</p>}
              {top.length > 0 && <Podium rows={top} />}
              {rest.length > 0 && (
                <ol className="lb-list" start={rest[0].rank}>
                  {rest.map((r) => (
                    <li key={r.rank}>
                      <span className="lb-list__rank">{r.rank}</span>
                      <Avatar row={r} />
                      <span className="lb-list__who"><strong>{r.name}</strong><small>{r.title}</small></span>
                      <span className="lb-list__lvl">Level {r.level}</span>
                      <span className="lb-list__xp">{fmt(r.xp)} XP</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
            {data.pages > 1 && (
              <nav className="dz-pager lb-pager" aria-label="Pages">
                <button type="button" className="btn btn-ghost btn-sm dz-btn-ico" disabled={page <= 0} onClick={() => setPage(page - 1)}><Ico name="arrowLeft" size={15} />Previous</button>
                <span>Page {page + 1} of {data.pages}</span>
                <button type="button" className="btn btn-ghost btn-sm dz-btn-ico" disabled={page >= data.pages - 1} onClick={() => setPage(page + 1)}>Next<Ico name="arrowRight" size={15} /></button>
              </nav>
            )}
            <p className="lb-foot">Ranks update every few minutes. Run by the server’s admins with Nook, a Discord bot by JR. <Link to="/nook/privacy" className="text-link">Privacy</Link></p>
          </>
        )}
      </div>
    </div>
  )
}
