import type { GuildSnapshot, Leaderboard, LadderResult, LevelingConfig, MemberInfo, Me, Period, XpResult } from './types'

/** Public URL of the bot's dashboard API (set VITE_NOOK_API_URL in Vercel). No trailing slash. */
export const API_URL: string = ((import.meta.env.VITE_NOOK_API_URL as string | undefined) ?? '').replace(/\/+$/, '')
export const DASHBOARD_CONFIGURED = API_URL.length > 0

const TOKEN_KEY = 'nook.dashboard.token'

export const tokenStore = {
  get(): string | null {
    try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
  },
  set(t: string) {
    try { localStorage.setItem(TOKEN_KEY, t) } catch { /* private mode: session lasts until reload */ memoryToken = t }
  },
  clear() {
    memoryToken = null
    try { localStorage.removeItem(TOKEN_KEY) } catch { /* ignore */ }
  },
}
let memoryToken: string | null = null
const currentToken = () => tokenStore.get() ?? memoryToken

export class ApiError extends Error {
  status: number
  code: string
  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const token = currentToken()
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, 'network', 'Could not reach the Nook server. Check your connection and try again.')
  }
  let data: unknown = null
  try { data = await res.json() } catch { /* empty body */ }
  if (!res.ok) {
    const d = (data ?? {}) as { error?: string; message?: string }
    throw new ApiError(res.status, d.error ?? 'error', d.message ?? 'Something went wrong.')
  }
  return data as T
}

const g = (id: string) => `/api/guilds/${encodeURIComponent(id)}`

export const api = {
  loginUrl: () => `${API_URL}/auth/login`,
  config: () => request<{ clientId: string; inviteUrl: string }>('GET', '/api/config'),
  me: () => request<Me>('GET', '/api/me'),
  logout: () => request<{ ok: true }>('POST', '/auth/logout', {}),
  guild: (id: string) => request<GuildSnapshot>('GET', g(id)),
  saveLeveling: (id: string, changes: Partial<LevelingConfig>) =>
    request<{ leveling: LevelingConfig }>('PUT', `${g(id)}/leveling`, changes),
  leaderboard: (id: string, period: Period, page: number) =>
    request<Leaderboard>('GET', `${g(id)}/leveling/leaderboard?period=${period}&page=${page}`),
  member: (id: string, userId: string) => request<MemberInfo>('GET', `${g(id)}/leveling/members/${encodeURIComponent(userId)}`),
  applyLadder: (id: string) => request<LadderResult>('POST', `${g(id)}/leveling/ladder`, {}),
  adjustXp: (id: string, body: { userId: string; mode: 'add' | 'remove' | 'set' | 'reset'; amount?: number }) =>
    request<XpResult>('POST', `${g(id)}/leveling/xp`, body),
}

export const guildIcon = (id: string, icon: string | null, size = 96) =>
  icon ? `https://cdn.discordapp.com/icons/${id}/${icon}.${icon.startsWith('a_') ? 'gif' : 'png'}?size=${size}` : null

export const userAvatar = (id: string, avatar: string | null, size = 64) =>
  avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=${size}` : null
