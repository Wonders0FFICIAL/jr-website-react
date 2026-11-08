import { useCallback, useEffect, useState } from 'react'
import { ApiError, api } from './api'
import { useSession } from './session'
import type { GuildSnapshot } from './types'

export type GuildState =
  | { status: 'loading' }
  | { status: 'ready'; data: GuildSnapshot }
  | { status: 'error'; code: string; httpStatus: number; message: string }

/** Loads one server's snapshot and handles the "not logged in / no access" cases. */
export function useGuild(guildId: string | undefined) {
  const { state: session } = useSession()
  const [guild, setGuild] = useState<GuildState>({ status: 'loading' })

  const load = useCallback(async () => {
    if (!guildId) return
    setGuild({ status: 'loading' })
    try {
      setGuild({ status: 'ready', data: await api.guild(guildId) })
    } catch (e) {
      const err = e instanceof ApiError ? e : new ApiError(0, 'error', 'Something went wrong.')
      setGuild({ status: 'error', code: err.code, httpStatus: err.status, message: err.message })
    }
  }, [guildId])

  useEffect(() => {
    if (session.status === 'in') void load()
  }, [session.status, load])

  return { session, guild, reload: load, setSnapshot: (data: GuildSnapshot) => setGuild({ status: 'ready', data }) }
}
