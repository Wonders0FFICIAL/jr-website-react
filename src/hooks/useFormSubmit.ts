import { useState } from 'react'

export type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Posts JSON to a Formspree-style endpoint.
 * Reports a clear error instead of faking success when no endpoint is configured.
 */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [message, setMessage] = useState('')

  async function submit(payload: Record<string, unknown>) {
    if (!endpoint) {
      console.warn('[JR.] No form endpoint configured. See .env.example.')
      setStatus('error')
      setMessage('This form is not connected yet. Please try again soon.')
      return false
    }
    setStatus('sending')
    setMessage('')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      return true
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please check your connection and try again.')
      return false
    }
  }

  return { status, message, submit, reset: () => setStatus('idle') }
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
