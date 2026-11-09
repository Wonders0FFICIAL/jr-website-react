import { useMemo, useState } from 'react'
import { ApiError, api } from './api'
import { GuildGate, GuildHeader } from './DashboardGuild'
import { AnnounceTab, GeneralTab, IgnoredTab, LeaderboardTab, MembersTab, RewardsTab, TabBar } from './LevelingTabs'
import { Ico } from './Icons'
import { Notice, Toasts, useToasts } from './ui'
import { usePageMeta } from '../hooks/usePageMeta'
import type { GuildSnapshot, LevelingConfig } from './types'

type Tab = 'general' | 'announce' | 'ignored' | 'rewards' | 'leaderboard' | 'members'

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

function problems(d: LevelingConfig, data: GuildSnapshot): string[] {
  const out: string[] = []
  const L = data.limits
  const int = Number.isInteger
  if (![d.xpMin, d.xpMax].every((v) => int(v) && v >= 0 && v <= L.MAX_XP_PER_MESSAGE)) out.push(`XP values must be whole numbers from 0 to ${L.MAX_XP_PER_MESSAGE}.`)
  else if (d.xpMax < 1) out.push('The maximum XP must be at least 1.')
  else if (d.xpMin > d.xpMax) out.push('The minimum XP can’t be higher than the maximum.')
  if (!int(d.cooldownSec) || d.cooldownSec < 0 || d.cooldownSec > L.MAX_COOLDOWN_SEC) out.push(`Cooldown must be 0–${L.MAX_COOLDOWN_SEC} whole seconds.`)
  const { a, b, c } = d.progression
  if (![a, b].every((v) => v >= 0 && v <= L.MAX_COEFFICIENT) || c < 1 || c > L.MAX_COEFFICIENT) out.push(`Progression: a and b must be 0–${L.MAX_COEFFICIENT} and c at least 1.`)
  if (!d.announce.message.trim()) out.push('The announcement message can’t be empty.')
  const ids = new Set<string>()
  for (const r of d.rewards) {
    if (!int(r.level) || r.level < 1 || r.level > L.MAX_LEVEL) { out.push(`Reward levels must be whole numbers from 1 to ${L.MAX_LEVEL}.`); break }
  }
  for (const r of d.rewards) { if (ids.has(r.roleId)) { out.push('Each reward needs a different role.'); break } ids.add(r.roleId) }
  if (d.rewards.some((r) => !data.roles.some((x) => x.id === r.roleId))) out.push('A reward uses a role that no longer exists.')
  return out
}

function Editor({ data, setSnapshot }: { data: GuildSnapshot; setSnapshot: (d: GuildSnapshot) => void }) {
  const saved = data.leveling
  const [draft, setDraft] = useState<LevelingConfig>(saved)
  const [tab, setTab] = useState<Tab>('general')
  const [saving, setSaving] = useState(false)
  const [adjustId, setAdjustId] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const toast = useToasts()

  const keys = (Object.keys(draft) as (keyof LevelingConfig)[]).filter((k) => !same(draft[k], saved[k]))
  const dirty = keys.length > 0
  const errs = useMemo(() => problems(draft, data), [draft, data])
  const savedRoleIds = useMemo(() => new Set(saved.rewards.map((r) => r.roleId)), [saved.rewards])
  const set = (patch: Partial<LevelingConfig>) => setDraft((d) => ({ ...d, ...patch }))

  const dirtyIn = (ks: (keyof LevelingConfig)[]) => ks.some((k) => keys.includes(k))
  const tabs = [
    { id: 'general' as const, label: 'General', tone: 'violet' as const, icon: <Ico name="sliders" size={18} />, dirty: dirtyIn(['enabled', 'xpMin', 'xpMax', 'cooldownSec', 'progression']) },
    { id: 'announce' as const, label: 'Announcements', tone: 'pink' as const, icon: <Ico name="megaphone" size={18} />, dirty: dirtyIn(['announce']) },
    { id: 'ignored' as const, label: 'Ignored', tone: 'rose' as const, icon: <Ico name="ban" size={18} />, dirty: dirtyIn(['ignoredChannels', 'ignoredRoles']) },
    { id: 'rewards' as const, label: 'Rewards', tone: 'amber' as const, icon: <Ico name="award" size={18} />, dirty: dirtyIn(['rewards', 'rewardMode']) },
    { id: 'leaderboard' as const, label: 'Leaderboard', tone: 'cyan' as const, icon: <Ico name="trophy" size={18} /> },
    { id: 'members' as const, label: 'Members', tone: 'green' as const, icon: <Ico name="users" size={18} /> },
  ]

  const save = async () => {
    setSaving(true); setFormError(null)
    try {
      const changes: Partial<LevelingConfig> = {}
      for (const k of keys) (changes as Record<string, unknown>)[k] = draft[k]
      const res = await api.saveLeveling(data.guild.id, changes)
      setSnapshot({ ...data, leveling: res.leveling })
      setDraft(res.leveling)
      toast.ok('Saved. Changes are live.')
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Could not save.'
      setFormError(msg); toast.err(msg)
    } finally { setSaving(false) }
  }

  const editable = tab === 'general' || tab === 'announce' || tab === 'ignored' || tab === 'rewards'
  const shared = { data, draft, set }

  return (
    <div>
      <GuildHeader data={data} current="Leveling" tone="pink" />
      <TabBar tabs={tabs} value={tab} onChange={setTab} />
      <div className="dz-content" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'general' && <GeneralTab {...shared} />}
        {tab === 'announce' && <AnnounceTab {...shared} />}
        {tab === 'ignored' && <IgnoredTab {...shared} />}
        {tab === 'rewards' && <RewardsTab {...shared} savedRoleIds={savedRoleIds} dirty={dirty} toast={toast} onApplied={(s) => { setSnapshot(s); setDraft(s.leveling) }} />}
        {tab === 'leaderboard' && <LeaderboardTab guildId={data.guild.id} onAdjust={(id) => { setAdjustId(id); setTab('members') }} />}
        {tab === 'members' && <MembersTab guildId={data.guild.id} limits={data.limits} initialId={adjustId} toast={toast} />}
      </div>

      {editable && dirty && (
        <div className="dz-savebar" role="region" aria-label="Unsaved changes">
          <div className="container dz-savebar__in">
            <span>{errs.length ? <Notice kind="err">{errs[0]}</Notice> : formError ? <Notice kind="err">{formError}</Notice> : 'You have unsaved changes.'}</span>
            <div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setDraft(saved); setFormError(null) }} disabled={saving}>Discard</button>
              <button type="button" className="btn btn-primary btn-sm dz-btn-ico" onClick={save} disabled={saving || errs.length > 0}><Ico name="check" size={16} />{saving ? 'Saving…' : 'Save changes'}</button>
            </div>
          </div>
        </div>
      )}
      <Toasts toasts={toast.toasts} />
    </div>
  )
}

export function DashboardLeveling() {
  usePageMeta('/nook/dashboard')
  return <GuildGate>{(data, h) => <Editor key={data.guild.id} data={data} setSnapshot={h.setSnapshot} />}</GuildGate>
}
