import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import type { Product } from '../data/products'
import { WAITLIST_ENDPOINT } from '../data/site'
import { EMAIL_RE, useFormSubmit } from '../hooks/useFormSubmit'
import './Forms.css'

const ROLES = ['Developer', 'Business owner', 'Everyday user'] as const

type Props = {
  /** "inline" is just email + button (for the home page banner). */
  variant?: 'full' | 'inline'
  initialInterests?: Product['id'][]
}

export function WaitlistForm({ variant = 'full', initialInterests = [] }: Props) {
  const { pathname } = useLocation()
  const { status, message, submit } = useFormSubmit(WAITLIST_ENDPOINT)
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<Product['id'][]>(initialInterests)
  const [role, setRole] = useState<string>('')
  const [error, setError] = useState('')

  const toggle = (id: Product['id']) =>
    setInterests((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    // Honeypot: real visitors never see or fill this field.
    if (form.get('_gotcha')) return

    const value = email.trim()
    if (!value) return setError('Please enter your email address.')
    if (!EMAIL_RE.test(value)) return setError('That email address does not look right.')
    setError('')

    await submit({
      email: value,
      interests: interests.join(', '),
      role,
      source: pathname,
      _subject: 'New JR. waitlist signup',
    })
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <span className="form-done__icon" aria-hidden="true">✓</span>
        <h3>You are on the list.</h3>
        <p>Thanks for joining. We will email you when there is something to share.</p>
      </div>
    )
  }

  const shownError = error || (status === 'error' ? message : '')

  return (
    <form className={`form form--${variant}`} onSubmit={onSubmit} noValidate>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="form__row">
        <div className="field">
          <label htmlFor={`wl-email-${variant}`} className={variant === 'inline' ? 'sr-only' : ''}>
            Email address
          </label>
          <input
            id={`wl-email-${variant}`}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (error) setError("") }}
            aria-invalid={shownError ? true : undefined}
            aria-describedby={shownError ? `wl-error-${variant}` : undefined}
          />
        </div>
        {variant === 'inline' && (
          <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Joining…' : 'Join the waitlist'}
          </button>
        )}
      </div>

      {variant === 'full' && (
        <>
          <fieldset className="form__group">
            <legend>I am interested in <span className="optional">(optional)</span></legend>
            <div className="chips">
              {PRODUCTS.map((p) => (
                <label key={p.id} className="choice">
                  <input
                    type="checkbox"
                    checked={interests.includes(p.id)}
                    onChange={() => toggle(p.id)}
                  />
                  <span>
                    <i style={{ background: p.accent }} aria-hidden="true" />
                    {p.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="form__group">
            <legend>Which describes you? <span className="optional">(optional)</span></legend>
            <div className="chips">
              {ROLES.map((r) => (
                <label key={r} className="choice">
                  <input type="radio" name="role" checked={role === r} onChange={() => setRole(r)} />
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button className="btn btn-primary btn-block" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Joining…' : 'Join the waitlist'}
          </button>
        </>
      )}

      <p className="form__error" id={`wl-error-${variant}`} role="alert">
        {shownError}
      </p>
    </form>
  )
}
