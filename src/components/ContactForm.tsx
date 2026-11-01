import { useState } from 'react'
import type { FormEvent } from 'react'
import { CONTACT_ENDPOINT } from '../data/site'
import { EMAIL_RE, useFormSubmit } from '../hooks/useFormSubmit'
import './Forms.css'

export function ContactForm() {
  const { status, message, submit } = useFormSubmit(CONTACT_ENDPOINT)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('_gotcha')) return

    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const body = String(data.get('message') || '').trim()

    if (!name) return setError('Please tell us your name.')
    if (!EMAIL_RE.test(email)) return setError('Please enter a valid email address.')
    if (body.length < 10) return setError('Please write a little more so we can help.')
    setError('')

    await submit({ name, email, message: body, _subject: `JR. contact: ${name}` })
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <span className="form-done__icon" aria-hidden="true">✓</span>
        <h3>Message sent.</h3>
        <p>Thanks for getting in touch. We will reply by email.</p>
      </div>
    )
  }

  const shownError = error || (status === 'error' ? message : '')

  return (
    <form className="form" onSubmit={onSubmit} onInput={() => { if (error) setError("") }} noValidate>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="field">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" name="name" type="text" autoComplete="name" placeholder="Your name" />
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" rows={5} placeholder="How can we help?" />
      </div>

      <button className="btn btn-primary btn-block" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      <p className="form__error" role="alert">{shownError}</p>
    </form>
  )
}
