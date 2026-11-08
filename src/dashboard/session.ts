// Tiny shared store so the logged-in user survives route changes without refetching.
import { useCallback, useEffect, useSyncExternalStore } from 'react'
import { ApiError, DASHBOARD_CONFIGURED, api, tokenStore } from './api'
import type { Me } from './types'

export type SessionState =
  | { status: 'loading' }
  | { status: 'out'; error?: string }
  | { status: 'in'; me: Me }

const LOADING: SessionState = { status: 'loading' }
let state: SessionState = LOADING
let inflight: Promise<void> | null = null
let loadedAt = 0
const listeners = new Set<() => void>()
const set = (s: SessionState) => { state = s; listeners.forEach((l) => l()) }

async function load(force = false) {
  if (!DASHBOARD_CONFIGURED) return set({ status: 'out' })
  if (!tokenStore.get() && !force) return set({ status: 'out' })
  if (state.status === 'in' && !force && Date.now() - loadedAt < 60_000) return
  if (inflight) return inflight
  inflight = (async () => {
    try {
      const me = await api.me()
      loadedAt = Date.now()
      set({ status: 'in', me })
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        tokenStore.clear()
        set({ status: 'out', error: 'Your session has expired. Please log in again.' })
      } else {
        set({ status: 'out', error: e instanceof Error ? e.message : 'Could not load your account.' })
      }
    } finally {
      inflight = null
    }
  })()
  return inflight
}

export function useSession() {
  const s = useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l) },
    () => state,
    () => LOADING,
  )
  useEffect(() => { void load() }, [])

  const logout = useCallback(async () => {
    try { await api.logout() } catch { /* token may already be invalid */ }
    tokenStore.clear()
    loadedAt = 0
    set({ status: 'out' })
  }, [])
  return { state: s, logout, reload: () => load(true) }
}

export const setToken = (t: string) => { tokenStore.set(t); loadedAt = 0; set({ status: 'loading' }) }
