export const TONES = ['tone-violet', 'tone-pink', 'tone-amber', 'tone-cyan', 'tone-green', 'tone-rose'] as const

/** A stable accent colour for a server, from its id, so letter badges aren't all grey. */
export function tintFor(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return TONES[h % TONES.length]
}
