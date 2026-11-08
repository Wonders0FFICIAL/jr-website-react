import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/* ---------- Toggle ---------- */
export function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  const id = useId()
  return (
    <div className="dz-toggle">
      <div>
        <label htmlFor={id} className="dz-toggle__label">{label}</label>
        {hint && <p className="dz-hint">{hint}</p>}
      </div>
      <button id={id} type="button" role="switch" aria-checked={checked} className={`dz-switch ${checked ? 'is-on' : ''}`} onClick={() => onChange(!checked)}>
        <span />
      </button>
    </div>
  )
}

/* ---------- Number input (keeps free typing, reports numbers) ---------- */
export function NumberField({
  label, value, onChange, min, max, step = 1, suffix, hint, invalid,
}: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; suffix?: string; hint?: string; invalid?: boolean }) {
  const id = useId()
  const [text, setText] = useState(String(value))
  useEffect(() => { if (Number(text) !== value) setText(String(value)) }, [value]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="dz-field">
      <label htmlFor={id}>{label}</label>
      <div className={`dz-input ${invalid ? 'is-invalid' : ''}`}>
        <input
          id={id} type="number" inputMode="decimal" min={min} max={max} step={step} value={text}
          onChange={(e) => { setText(e.target.value); const n = Number(e.target.value); if (e.target.value !== '' && Number.isFinite(n)) onChange(n) }}
          onBlur={() => setText(String(value))}
          aria-invalid={invalid || undefined}
        />
        {suffix && <span className="dz-input__suffix">{suffix}</span>}
      </div>
      {hint && <p className="dz-hint">{hint}</p>}
    </div>
  )
}

/* ---------- Segmented control ---------- */
export function Segmented<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; label: string }) {
  return (
    <div className="dz-seg" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value} className={value === o.value ? 'is-on' : ''} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

/* ---------- Searchable multi picker (channels / roles) ---------- */
export type PickItem = { id: string; label: string; sub?: string; color?: string | null }
export function MultiPicker({ title, items, value, onChange, max, empty }: { title: string; items: PickItem[]; value: string[]; onChange: (v: string[]) => void; max: number; empty: string }) {
  const [q, setQ] = useState('')
  const shown = useMemo(() => items.filter((i) => i.label.toLowerCase().includes(q.trim().toLowerCase())), [items, q])
  const selected = new Set(value)
  const toggle = (id: string) => {
    if (selected.has(id)) onChange(value.filter((v) => v !== id))
    else if (value.length < max) onChange([...value, id])
  }
  return (
    <div className="dz-picker">
      <div className="dz-picker__head">
        <h3>{title}</h3>
        <span className="dz-count">{value.length}/{max}</span>
      </div>
      <input className="dz-search" type="search" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} aria-label={`Search ${title.toLowerCase()}`} />
      <ul className="dz-picker__list">
        {shown.map((i) => (
          <li key={i.id}>
            <label className={selected.has(i.id) ? 'is-on' : ''}>
              <input type="checkbox" checked={selected.has(i.id)} onChange={() => toggle(i.id)} disabled={!selected.has(i.id) && value.length >= max} />
              {i.color && <i className="dz-dot" style={{ background: i.color }} />}
              <span>{i.label}</span>
              {i.sub && <small>{i.sub}</small>}
            </label>
          </li>
        ))}
        {!shown.length && <li className="dz-empty">{items.length ? 'No matches.' : empty}</li>}
      </ul>
    </div>
  )
}

/* ---------- Toasts ---------- */
export type Toast = { id: number; kind: 'ok' | 'err'; text: string }
export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const n = useRef(0)
  const push = (kind: Toast['kind'], text: string) => {
    const id = ++n.current
    setToasts((t) => [...t, { id, kind, text }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), kind === 'err' ? 7000 : 3500)
  }
  return { toasts, ok: (t: string) => push('ok', t), err: (t: string) => push('err', t) }
}
export function Toasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="dz-toasts" role="status" aria-live="polite">
      {toasts.map((t) => <div key={t.id} className={`dz-toast is-${t.kind}`}>{t.text}</div>)}
    </div>
  )
}

/* ---------- Misc ---------- */
export const Spinner = ({ label = 'Loading' }: { label?: string }) => (
  <div className="dz-center" role="status"><span className="dz-spinner" aria-hidden="true" /><span className="sr-only">{label}</span></div>
)

export function Panel({ title, children, aside }: { title?: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="dz-panel">
      {(title || aside) && <header className="dz-panel__head">{title && <h2>{title}</h2>}{aside}</header>}
      {children}
    </section>
  )
}

export function Notice({ kind = 'info', children }: { kind?: 'info' | 'warn' | 'err'; children: ReactNode }) {
  return <div className={`dz-notice is-${kind}`} role={kind === 'err' ? 'alert' : undefined}>{children}</div>
}
