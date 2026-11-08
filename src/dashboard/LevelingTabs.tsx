import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Ico } from './Icons'
import type { Tone } from './Icons'
import { ApiError, api } from './api'
import { duration, fmt, formula, totalXpForLevel, xpToNext } from './levelMath'
import { MultiPicker, NumberField, Notice, Panel, Segmented, Spinner, Toggle } from './ui'
import type { GuildSnapshot, Leaderboard, LevelingConfig, MemberInfo, Period, Progression } from './types'

const titleFor = (lvl: number, titles?: string[]) => (lvl <= 0 ? 'Newcomer' : (titles ?? [])[Math.min(lvl, (titles ?? []).length) - 1] ?? 'Newcomer')

type DraftProps = { data: GuildSnapshot; draft: LevelingConfig; set: (patch: Partial<LevelingConfig>) => void }

/* =========================== General =========================== */
function Curve({ p }: { p: Progression }) {
  const levels = 50
  const pts = useMemo(() => Array.from({ length: levels + 1 }, (_, l) => totalXpForLevel(l, p)), [p])
  const top = Math.max(...pts, 1)
  const W = 560, H = 150, pad = 8
  const path = pts.map((v, i) => `${i ? 'L' : 'M'}${(pad + (i / levels) * (W - pad * 2)).toFixed(1)},${(H - pad - (v / top) * (H - pad * 2)).toFixed(1)}`).join(' ')
  return (
    <figure className="dz-curve">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Total XP needed for levels 0 to ${levels}, reaching ${fmt(top)} XP`}>
        <path d={`${path} L${W - pad},${H - pad} L${pad},${H - pad} Z`} className="dz-curve__fill" />
        <path d={path} className="dz-curve__line" />
      </svg>
      <figcaption>Total XP to reach each level, 0 to {levels} (level {levels} = {fmt(top)} XP)</figcaption>
    </figure>
  )
}

export function GeneralTab({ data, draft, set }: DraftProps) {
  const L = data.limits
  const p = draft.progression
  const avg = (draft.xpMin + draft.xpMax) / 2 || 1
  const perMsgCooldown = Math.max(draft.cooldownSec, 0)
  const activePreset = data.presets.find((x) => x.a === p.a && x.b === p.b && x.c === p.c)?.id ?? 'custom'
  const rows = [1, 5, 10, 20, 30, 50].map((lvl) => {
    const need = xpToNext(lvl - 1, p)
    const msgs = Math.ceil(need / avg)
    return { lvl, total: totalXpForLevel(lvl, p), need, msgs, time: msgs * perMsgCooldown }
  })
  const setP = (key: keyof Progression, v: number) => set({ progression: { ...p, [key]: v } })
  return (
    <>
      <Panel>
        <Toggle checked={draft.enabled} onChange={(enabled) => set({ enabled })} label="Leveling enabled" hint="When off, members earn no XP and the leveling commands are paused. Progress is kept." />
      </Panel>

      <Panel title="XP per message" icon="sparkles" tone="amber">
        <div className="dz-grid3">
          <NumberField label="Minimum" value={draft.xpMin} onChange={(xpMin) => set({ xpMin })} min={0} max={L.MAX_XP_PER_MESSAGE} invalid={draft.xpMin > draft.xpMax} />
          <NumberField label="Maximum" value={draft.xpMax} onChange={(xpMax) => set({ xpMax })} min={1} max={L.MAX_XP_PER_MESSAGE} invalid={draft.xpMax < 1 || draft.xpMin > draft.xpMax} />
          <NumberField label="Cooldown" suffix="seconds" value={draft.cooldownSec} onChange={(cooldownSec) => set({ cooldownSec })} min={0} max={L.MAX_COOLDOWN_SEC} hint="Per member. Messages inside the cooldown earn nothing." />
        </div>
        {draft.xpMin > draft.xpMax && <Notice kind="err">The minimum can’t be higher than the maximum.</Notice>}
      </Panel>

      <Panel title="Level progression" icon="bars" tone="cyan">
        <p className="dz-hint">XP needed to go from level <em>n</em> to <em>n</em>+1 is <code>{formula(p)}</code>.</p>
        <div className="dz-presets" role="radiogroup" aria-label="Progression preset">
          {data.presets.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={activePreset === x.id} className={activePreset === x.id ? 'is-on' : ''} onClick={() => set({ progression: { a: x.a, b: x.b, c: x.c } })}>
              <strong>{x.label.replace(/ \(.*\)/, '')}</strong>
              <span>{x.label.match(/\((.*)\)/)?.[1]}</span>
              <code>{formula(x)}</code>
            </button>
          ))}
          <button type="button" role="radio" aria-checked={activePreset === 'custom'} className={activePreset === 'custom' ? 'is-on' : ''} onClick={() => undefined} tabIndex={-1}>
            <strong>Custom</strong><span>Edit the numbers below</span><code>{formula(p)}</code>
          </button>
        </div>
        <div className="dz-grid3">
          <NumberField label="a (n² part)" value={p.a} onChange={(v) => setP('a', v)} min={0} max={L.MAX_COEFFICIENT} step={0.5} invalid={p.a < 0} />
          <NumberField label="b (n part)" value={p.b} onChange={(v) => setP('b', v)} min={0} max={L.MAX_COEFFICIENT} step={1} invalid={p.b < 0} />
          <NumberField label="c (base XP)" value={p.c} onChange={(v) => setP('c', v)} min={1} max={L.MAX_COEFFICIENT} step={1} invalid={p.c < 1} hint="At least 1." />
        </div>
        <Curve p={p} />
        <div className="dz-tablewrap">
          <table className="dz-table">
            <thead><tr><th>Level</th><th>XP for this level</th><th>Total XP</th><th>≈ Messages</th><th>≈ Fastest time</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.lvl}><td>{r.lvl}</td><td>{fmt(r.need)}</td><td>{fmt(r.total)}</td><td>{fmt(r.msgs)}</td><td>{duration(r.time)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="dz-hint">Estimates use the average of your XP range, at one counted message per cooldown. Changing the formula recalculates everyone’s level; it never changes their XP.</p>
      </Panel>
    </>
  )
}

/* =========================== Announcements =========================== */
const TOKENS = ['{user}', '{username}', '{level}', '{title}', '{xp}', '{server}']

export function AnnounceTab({ data, draft, set }: DraftProps) {
  const a = draft.announce
  const text = data.channels.filter((c) => c.kind === 'text')
  const chosen = text.find((c) => c.id === a.channelId)
  const setA = (patch: Partial<LevelingConfig['announce']>) => set({ announce: { ...a, ...patch } })
  const preview = a.message
    .replace(/\{user\}/gi, '\u0000u')
    .replace(/\{username\}/gi, 'Wonders')
    .replace(/\{level\}/gi, '7')
    .replace(/\{title\}/gi, titleFor(7, data.ladder?.titles))
    .replace(/\{xp\}/gi, fmt(totalXpForLevel(7, draft.progression)))
    .replace(/\{server\}/gi, data.guild.name)
  const parts = preview.split('\u0000u')
  return (
    <>
      <Panel>
        <Toggle checked={a.enabled} onChange={(enabled) => setA({ enabled })} label="Level-up announcements" hint="Off means no level-up or reward messages at all. Roles are still given." />
      </Panel>
      <Panel title="Where to announce" icon="hash" tone="pink">
        <div className="dz-field">
          <label htmlFor="dz-ann-ch">Channel</label>
          <select id="dz-ann-ch" className="dz-select" value={a.channelId ?? ''} onChange={(e) => setA({ channelId: e.target.value || null })}>
            <option value="">Same channel as the member’s message</option>
            {text.map((c) => <option key={c.id} value={c.id}>#{c.name}{c.canSend ? '' : '  (Nook can’t send here)'}</option>)}
          </select>
        </div>
        {chosen && !chosen.canSend && <Notice kind="warn">Nook can’t send messages in #{chosen.name}. Give it <strong>View Channel</strong> and <strong>Send Messages</strong> there, otherwise it falls back to the channel the member was chatting in.</Notice>}
        {a.channelId && !chosen && <Notice kind="warn">The saved channel no longer exists. Pick another one.</Notice>}
      </Panel>
      <Panel title="Message" icon="megaphone" tone="violet">
        <div className="dz-field">
          <label htmlFor="dz-ann-msg">Text</label>
          <textarea id="dz-ann-msg" className="dz-textarea" rows={3} maxLength={data.limits.MAX_MESSAGE_LENGTH} value={a.message} onChange={(e) => setA({ message: e.target.value })} aria-invalid={!a.message.trim() || undefined} />
          <div className="dz-between">
            <div className="dz-tokens" aria-label="Insert placeholder">
              {TOKENS.map((t) => <button key={t} type="button" onClick={() => setA({ message: (a.message + (a.message.endsWith(' ') || !a.message ? '' : ' ') + t).slice(0, data.limits.MAX_MESSAGE_LENGTH) })}>{t}</button>)}
            </div>
            <span className="dz-count">{a.message.length}/{data.limits.MAX_MESSAGE_LENGTH}</span>
          </div>
        </div>
        <div className="dz-preview" aria-label="Preview">
          <span className="dz-preview__avatar" aria-hidden="true" />
          <div>
            <strong>Nook <em>BOT</em></strong>
            <p>{parts.map((s, i) => <span key={i}>{s}{i < parts.length - 1 && <mark>@Wonders</mark>}</span>)}</p>
          </div>
        </div>
        <p className="dz-hint">Only the member is ever pinged. @everyone and role mentions in your text are shown as plain text.</p>
      </Panel>
    </>
  )
}

/* =========================== Ignored =========================== */
export function IgnoredTab({ data, draft, set }: DraftProps) {
  const channels = data.channels.map((c) => ({ id: c.id, label: `${c.kind === 'text' ? '# ' : ''}${c.name}`, sub: c.kind === 'voice' ? 'voice' : c.kind === 'forum' ? 'forum' : undefined }))
  const roles = data.roles.map((r) => ({ id: r.id, label: r.name, color: r.color }))
  return (
    <>
      <Notice>Messages in ignored channels (and threads inside them), or from members with an ignored role, earn no XP.</Notice>
      <div className="dz-grid2">
        <MultiPicker title="Ignored channels" items={channels} value={draft.ignoredChannels} onChange={(ignoredChannels) => set({ ignoredChannels })} max={data.limits.MAX_IGNORED} empty="No channels." />
        <MultiPicker title="Ignored roles" items={roles} value={draft.ignoredRoles} onChange={(ignoredRoles) => set({ ignoredRoles })} max={data.limits.MAX_IGNORED} empty="No roles." />
      </div>
    </>
  )
}

/* =========================== Rewards =========================== */
export function LadderPanel({ data, dirty, onApplied, toast }: { data: GuildSnapshot; dirty: boolean; onApplied: (s: GuildSnapshot) => void; toast: { ok: (t: string) => void; err: (t: string) => void } }) {
  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const L = data.ladder
  if (!L?.tiers?.length) return null
  const have = new Set(data.roles.map((r) => r.name.toLowerCase()))
  const room = data.limits.MAX_REWARDS - data.leveling.rewards.length
  const apply = async () => {
    setBusy(true); setDone(null)
    try {
      const r = await api.applyLadder(data.guild.id)
      const fresh = await api.guild(data.guild.id)
      onApplied(fresh)
      const msg = `Added ${r.added} reward${r.added === 1 ? '' : 's'}: ${r.created.length} new role${r.created.length === 1 ? '' : 's'} created, ${r.matched.length} existing matched${r.skipped.length ? `, ${r.skipped.length} skipped (${r.skipped.map((x) => `${x.name}: ${x.reason}`).join('; ')})` : ''}.`
      setDone(msg); toast.ok(`Rank ladder applied (${r.added} rewards).`)
    } catch (e) {
      toast.err(e instanceof ApiError ? e.message : 'Could not apply the ladder.')
    } finally { setBusy(false) }
  }
  return (
    <Panel title="Rank ladder" icon="gift" tone="amber" aside={<button type="button" className="btn btn-primary btn-sm dz-btn-ico" onClick={apply} disabled={busy || dirty || room < 1}><Ico name="wand" size={16} />{busy ? 'Applying…' : 'Apply ladder'}</button>}>
      <p className="dz-hint dz-hint--top">One click sets up {L.tiers.length} milestone roles (New Leaf, Tea Sipper, Night Owl and more). Nook creates any role that doesn’t exist yet, or reuses one with the same name, then adds a reward at each level. Your existing rewards stay. Nook needs <strong>Manage Roles</strong>.</p>
      {dirty && <Notice kind="warn">Save or discard your pending changes first, then apply the ladder.</Notice>}
      {done && <Notice>{done}</Notice>}
      <ul className="dz-ladder">
        {L.tiers.map((t) => (
          <li key={t.level} style={{ ['--tc' as string]: t.color }}>
            <span className="dz-ladder__lvl">Lv {t.level}</span>
            <span className="dz-ladder__role"><i className="dz-dot" />{t.role}</span>
            <span className="dz-ladder__perk">{t.perk}</span>
            {have.has(t.role.toLowerCase()) && <span className="dz-chip">role exists</span>}
          </li>
        ))}
      </ul>
      <button type="button" className="dz-linkbtn" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Hide' : 'Show'} all {L.titles.length} level titles</button>
      {open && (
        <ol className="dz-titles">
          {L.titles.map((t, i) => <li key={t}><b>{i + 1}</b>{t}</li>)}
        </ol>
      )}
      <p className="dz-hint">These titles also work in announcements: write <code>{'{title}'}</code> and it becomes the member’s title for their new level.</p>
    </Panel>
  )
}

export function RewardsTab({ data, draft, set, savedRoleIds, dirty, onApplied, toast }: DraftProps & { savedRoleIds: Set<string>; dirty: boolean; onApplied: (s: GuildSnapshot) => void; toast: { ok: (t: string) => void; err: (t: string) => void } }) {
  const L = data.limits
  const rewards = draft.rewards
  const used = new Set(rewards.map((r) => r.roleId))
  const roleById = new Map(data.roles.map((r) => [r.id, r]))
  const free = data.roles.find((r) => !r.problem && !used.has(r.id))
  const update = (i: number, patch: Partial<{ level: number; roleId: string }>) => set({ rewards: rewards.map((r, k) => (k === i ? { ...r, ...patch } : r)) })
  const add = () => {
    if (!free) return
    const next = Math.min(L.MAX_LEVEL, (rewards.reduce((m, r) => Math.max(m, r.level), 0) || 0) + 5)
    set({ rewards: [...rewards, { level: next, roleId: free.id }] })
  }
  return (
    <>
      <LadderPanel data={data} dirty={dirty} onApplied={onApplied} toast={toast} />
      <Panel title="When a member unlocks a new reward" icon="layers" tone="green">
        <Segmented<'stack' | 'replace'> label="Reward mode" value={draft.rewardMode} onChange={(rewardMode) => set({ rewardMode })} options={[{ value: 'stack', label: 'Stack: keep every role' }, { value: 'replace', label: 'Replace: keep only the newest' }]} />
        <p className="dz-hint">{draft.rewardMode === 'stack' ? 'Members keep all the reward roles they have unlocked.' : 'Each new milestone role replaces the previous reward role.'}</p>
      </Panel>
      <Panel icon="award" tone="pink" title={`Role rewards (${rewards.length}/${L.MAX_REWARDS})`} aside={<button type="button" className="btn btn-primary btn-sm dz-btn-ico" onClick={add} disabled={!free || rewards.length >= L.MAX_REWARDS}><Ico name="plus" size={16} />Add reward</button>}>
        {!free && rewards.length < L.MAX_REWARDS && <Notice kind="warn">No roles are available. Nook can only hand out roles that sit <strong>below its own highest role</strong> and aren’t managed by an integration. Move Nook’s role up in Server Settings → Roles.</Notice>}
        {!rewards.length ? <p className="dz-empty-big">No rewards yet. Add one to give a role at a level.</p> : (
          <ul className="dz-rewards">
            {rewards.map((r, i) => {
              const role = roleById.get(r.roleId)
              const dupe = rewards.findIndex((x) => x.roleId === r.roleId) !== i
              const stale = !role
              const problem = role?.problem
              return (
                <li key={`${i}-${r.roleId}`} className={dupe || stale ? 'is-bad' : ''}>
                  <NumberField label="At level" value={r.level} onChange={(level) => update(i, { level })} min={1} max={L.MAX_LEVEL} invalid={r.level < 1 || r.level > L.MAX_LEVEL || !Number.isInteger(r.level)} />
                  <div className="dz-field">
                    <label htmlFor={`rw-${i}`}>Give role</label>
                    <select id={`rw-${i}`} className="dz-select" value={r.roleId} onChange={(e) => update(i, { roleId: e.target.value })}>
                      {stale && <option value={r.roleId}>(deleted role)</option>}
                      {data.roles.map((x) => {
                        const blocked = !!x.problem && !savedRoleIds.has(x.id) && x.id !== r.roleId
                        return <option key={x.id} value={x.id} disabled={blocked || (used.has(x.id) && x.id !== r.roleId)}>{x.name}{x.problem ? ` (${x.problem})` : ''}</option>
                      })}
                    </select>
                    {dupe && <p className="dz-err">This role is already used by another reward.</p>}
                    {problem && <p className="dz-warn"><Ico name="alert" size={15} /> Nook can’t give this role right now: {problem}.</p>}
                  </div>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => set({ rewards: rewards.filter((_, k) => k !== i) })} aria-label={`Remove reward for level ${r.level}`}><Ico name="trash" size={15} />Remove</button>
                </li>
              )
            })}
          </ul>
        )}
        <p className="dz-hint">Existing members who already qualify get a new reward the next time they level up or rejoin. To give it now, use <strong>Members</strong> and set their XP again.</p>
      </Panel>
    </>
  )
}

/* =========================== Leaderboard =========================== */
export function LeaderboardTab({ guildId, onAdjust }: { guildId: string; onAdjust: (userId: string) => void }) {
  const [period, setPeriod] = useState<Period>('alltime')
  const [page, setPage] = useState(0)
  const [lb, setLb] = useState<Leaderboard | null>(null)
  const [err, setErr] = useState<string | null>(null)
  useEffect(() => {
    let live = true
    setErr(null)
    api.leaderboard(guildId, period, page).then((d) => live && setLb(d)).catch((e) => live && setErr(e instanceof ApiError ? e.message : 'Could not load the leaderboard.'))
    return () => { live = false }
  }, [guildId, period, page])
  const pages = lb ? Math.max(1, Math.ceil(lb.total / lb.pageSize)) : 1
  return (
    <Panel title="Leaderboard" icon="trophy" tone="amber" aside={<Segmented<Period> label="Period" value={period} onChange={(p) => { setPeriod(p); setPage(0); setLb(null) }} options={[{ value: 'alltime', label: 'All-time' }, { value: 'weekly', label: 'Weekly' }, { value: 'monthly', label: 'Monthly' }]} />}>
      {err && <Notice kind="err">{err}</Notice>}
      {!lb && !err && <Spinner />}
      {lb && (
        <>
          <div className="dz-tablewrap">
            <table className="dz-table dz-table--lb">
              <thead><tr><th>#</th><th>Member</th><th>Level</th><th>XP</th><th><span className="sr-only">Actions</span></th></tr></thead>
              <tbody>
                {lb.rows.map((r) => (
                  <tr key={r.userId}>
                    <td>{r.rank}</td>
                    <td>{r.username ?? <span className="dz-muted">{r.userId}</span>}</td>
                    <td>{r.level}</td>
                    <td>{fmt(r.xp)}</td>
                    <td><button type="button" className="dz-linkbtn" onClick={() => onAdjust(r.userId)}>Adjust</button></td>
                  </tr>
                ))}
                {!lb.rows.length && <tr><td colSpan={5} className="dz-empty-big">Nobody has earned XP {period === 'alltime' ? 'here' : `this ${period === 'weekly' ? 'week' : 'month'}`} yet.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="dz-pager">
            <button type="button" className="btn btn-ghost btn-sm" disabled={page <= 0} onClick={() => setPage(page - 1)}><Ico name="arrowLeft" size={15} /> Previous</button>
            <span>Page {page + 1} of {pages} · {fmt(lb.total)} members</span>
            <button type="button" className="btn btn-ghost btn-sm" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>Next <Ico name="arrowRight" size={15} /></button>
          </div>
        </>
      )}
    </Panel>
  )
}

/* =========================== Members (manual XP) =========================== */
type Mode = 'add' | 'remove' | 'set' | 'reset'
export function MembersTab({ guildId, limits, initialId, toast }: { guildId: string; limits: GuildSnapshot['limits']; initialId: string; toast: { ok: (t: string) => void; err: (t: string) => void } }) {
  const [id, setId] = useState(initialId)
  const [member, setMember] = useState<MemberInfo | null>(null)
  const [busy, setBusy] = useState(false)
  const [mode, setMode] = useState<Mode>('add')
  const [amount, setAmount] = useState(100)
  const [confirm, setConfirm] = useState(false)

  const lookup = async (target = id) => {
    const clean = (target.match(/\d{15,25}/) ?? [''])[0]
    if (!clean) { toast.err('Paste a Discord user ID or @mention.'); return }
    setBusy(true); setConfirm(false)
    try { setMember(await api.member(guildId, clean)); setId(clean) } catch (e) { setMember(null); toast.err(e instanceof ApiError ? e.message : 'Lookup failed.') } finally { setBusy(false) }
  }
  useEffect(() => { if (initialId) void lookup(initialId) }, [initialId]) // eslint-disable-line react-hooks/exhaustive-deps

  const apply = async () => {
    if (!member) return
    if (mode === 'reset' && !confirm) { setConfirm(true); return }
    setBusy(true)
    try {
      const r = await api.adjustXp(guildId, { userId: member.userId, mode, amount: mode === 'reset' ? undefined : amount })
      const extra = [r.grantedRoles?.length ? `gave ${r.grantedRoles.join(', ')}` : '', r.removedRoles?.length ? `removed ${r.removedRoles.join(', ')}` : ''].filter(Boolean).join('; ')
      toast.ok(mode === 'reset' ? `Reset ${member.username ?? 'member'}${extra ? ` (${extra})` : ''}.` : `${fmt(r.oldXp ?? 0)} → ${fmt(r.newXp ?? 0)} XP (level ${r.oldLevel} → ${r.newLevel})${extra ? `; ${extra}` : ''}`)
      if (r.problems?.length) toast.err(`Roles: ${r.problems.join('; ').replace(/<@&(\d+)>/g, 'role $1')}`)
      setConfirm(false)
      await lookup(member.userId)
    } catch (e) { toast.err(e instanceof ApiError ? e.message : 'Could not change XP.') } finally { setBusy(false) }
  }

  return (
    <Panel title="Adjust a member’s XP" icon="wand" tone="rose">
      <form className="dz-lookup" onSubmit={(e) => { e.preventDefault(); void lookup() }}>
        <div className="dz-field">
          <label htmlFor="dz-uid">Member ID or @mention</label>
          <input id="dz-uid" className="dz-text" inputMode="numeric" placeholder="123456789012345678" value={id} onChange={(e) => setId(e.target.value)} />
          <p className="dz-hint">In Discord: Settings → Advanced → Developer Mode, then right-click a member → Copy User ID. Or use <strong>Adjust</strong> on the leaderboard.</p>
        </div>
        <button type="submit" className="btn btn-ghost" disabled={busy || !id.trim()}>Look up</button>
      </form>
      {member && (
        <div className="dz-member">
          <div className="dz-member__head">
            <h3>{member.username ?? member.userId}</h3>
            {!member.inServer && <span className="dz-badge">Not in server</span>}
          </div>
          <dl className="dz-stats">
            <div><dt>Level</dt><dd>{member.level}</dd></div>
            <div><dt>Total XP</dt><dd>{fmt(member.xp)}</dd></div>
            <div><dt>Rank</dt><dd>{member.rank ? `#${fmt(member.rank)}` : '—'}</dd></div>
            <div><dt>Messages counted</dt><dd>{fmt(member.messages)}</dd></div>
          </dl>
          {member.isBot ? <Notice kind="warn">Bots don’t earn XP.</Notice> : (
            <div className="dz-adjust">
              <Segmented<Mode> label="Action" value={mode} onChange={(m) => { setMode(m); setConfirm(false) }} options={[{ value: 'add', label: 'Add' }, { value: 'remove', label: 'Remove' }, { value: 'set', label: 'Set to' }, { value: 'reset', label: 'Reset' }]} />
              {mode !== 'reset' && <NumberField label={mode === 'set' ? 'New total XP' : 'XP amount'} value={amount} onChange={setAmount} min={0} max={limits.MAX_MANUAL_XP} invalid={!Number.isInteger(amount) || amount < 0} />}
              {mode === 'reset' && <Notice kind="warn">Reset deletes this member’s XP, level and weekly/monthly progress, and removes their reward roles.</Notice>}
              <button type="button" className={`btn ${mode === 'reset' ? 'dz-danger' : 'btn-primary'}`} disabled={busy || !member.inServer && mode !== 'reset' || (mode !== 'reset' && (!Number.isInteger(amount) || amount < 0))} onClick={apply}>
                {mode === 'reset' ? (confirm ? 'Click again to confirm reset' : 'Reset member') : 'Apply'}
              </button>
              <p className="dz-hint">Their level and reward roles are updated to match. No announcement is posted. Adding XP also counts toward weekly and monthly boards.</p>
            </div>
          )}
        </div>
      )}
    </Panel>
  )
}

export function TabBar<T extends string>({ tabs, value, onChange }: { tabs: { id: T; label: string; icon: ReactNode; tone: Tone; dirty?: boolean }[]; value: T; onChange: (t: T) => void }) {
  return (
    <div className="dz-tabs" role="tablist" aria-label="Leveling sections">
      {tabs.map((t) => (
        <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-selected={value === t.id} aria-controls={`panel-${t.id}`} className={`tone-${t.tone} ${value === t.id ? 'is-on' : ''}`} onClick={() => onChange(t.id)}>
          <span className="dz-tabs__ico" aria-hidden="true">{t.icon}</span>{t.label}{t.dirty && <i className="dz-dirty" title="Unsaved changes" />}
        </button>
      ))}
    </div>
  )
}
