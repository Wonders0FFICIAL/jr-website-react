// Mirrors the bot's progression maths (features/leveling/utils/levelMath.js) for live previews.
import type { Progression } from './types'

export const xpToNext = (level: number, p: Progression) => Math.floor(p.a * level * level + p.b * level + p.c)

export function totalXpForLevel(level: number, p: Progression) {
  if (level <= 0) return 0
  const L = level
  return Math.floor(p.a * ((L - 1) * L * (2 * L - 1)) / 6 + p.b * ((L - 1) * L) / 2 + p.c * L)
}

export const formula = (p: Progression) => `${p.a}·n² + ${p.b}·n + ${p.c}`
export const nf = new Intl.NumberFormat('en-US')
export const fmt = (n: number) => nf.format(Math.round(n))

export function duration(seconds: number) {
  if (seconds < 90) return `${Math.max(1, Math.round(seconds))} s`
  const m = seconds / 60
  if (m < 90) return `${Math.round(m)} min`
  const h = m / 60
  if (h < 48) return `${h < 10 ? h.toFixed(1).replace(/\.0$/, '') : Math.round(h)} h`
  return `${Math.round(h / 24)} days`
}
