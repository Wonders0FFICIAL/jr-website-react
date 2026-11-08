export type Progression = { a: number; b: number; c: number }
export type Reward = { level: number; roleId: string }
export type Announce = { enabled: boolean; channelId: string | null; message: string }

export type LevelingConfig = {
  enabled: boolean
  xpMin: number
  xpMax: number
  cooldownSec: number
  progression: Progression
  announce: Announce
  rewardMode: 'stack' | 'replace'
  rewards: Reward[]
  ignoredChannels: string[]
  ignoredRoles: string[]
}

export type ChannelInfo = { id: string; name: string; kind: 'text' | 'voice' | 'forum'; canSend: boolean }
export type RoleInfo = { id: string; name: string; color: string | null; problem: string | null }
export type Preset = { id: string; label: string; a: number; b: number; c: number }
export type Limits = {
  MAX_LEVEL: number
  MAX_XP_PER_MESSAGE: number
  MAX_COOLDOWN_SEC: number
  MAX_REWARDS: number
  MAX_IGNORED: number
  MAX_MESSAGE_LENGTH: number
  MAX_COEFFICIENT: number
  MAX_MANUAL_XP: number
}

export type GuildSnapshot = {
  guild: { id: string; name: string; icon: string | null; memberCount: number }
  channels: ChannelInfo[]
  roles: RoleInfo[]
  leveling: LevelingConfig
  limits: Limits
  presets: Preset[]
  ranked: number
}

export type Me = {
  user: { id: string; username: string; globalName: string | null; avatar: string | null }
  guilds: { id: string; name: string; icon: string | null; owner: boolean; botIn: boolean }[]
  expiresAt: string
}

export type LeaderboardRow = { rank: number; userId: string; username: string | null; xp: number; level: number }
export type Leaderboard = { period: Period; page: number; pageSize: number; total: number; rows: LeaderboardRow[] }
export type Period = 'alltime' | 'weekly' | 'monthly'

export type MemberInfo = {
  userId: string
  inServer: boolean
  isBot: boolean
  username: string | null
  xp: number
  level: number
  messages: number
  rank: number | null
  nextLevelAt: number | null
}

export type XpResult = {
  mode: 'add' | 'remove' | 'set' | 'reset'
  oldXp?: number
  newXp?: number
  oldLevel?: number
  newLevel?: number
  changed?: boolean
  grantedRoles?: string[]
  removedRoles?: string[]
  problems?: string[]
}
