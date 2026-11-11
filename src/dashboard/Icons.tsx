import type { ReactNode } from 'react'

/** Small stroke icon set (24×24, drawn for this dashboard). Replaces emoji everywhere. */
const PATHS = {
  sliders: <><path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0" /><circle cx="15" cy="6" r="2.4" /><circle cx="9" cy="12" r="2.4" /><circle cx="17" cy="18" r="2.4" /></>,
  megaphone: <><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" /><path d="M15 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" /></>,
  ban: <><circle cx="12" cy="12" r="9" /><path d="M5.7 5.7l12.6 12.6" /></>,
  award: <><circle cx="12" cy="9" r="5.5" /><path d="M8.7 13.8L7 21l5-3 5 3-1.7-7.2" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6M10 17h4" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 19c0-3.2 2.7-5 6-5s6 1.8 6 5" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.5 0 4 1.4 4 4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.8 3.6-6 8-6s8 2.2 8 6" /></>,
  star: <path d="M12 3l2.7 5.9 6.3.7-4.7 4.3 1.3 6.3L12 17l-5.6 3.2 1.3-6.3L3 9.6l6.3-.7z" />,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
  search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.2-4.2" /></>,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  alert: <><path d="M12 3.5l9.5 16.5h-19z" /><path d="M12 10v4.5M12 17.5h.01" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8h.01" /></>,
  logout: <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H9" />,
  refresh: <path d="M20 11a8 8 0 1 0-2.4 5.7M20 5v6h-6" />,
  hash: <path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16" />,
  volume: <path d="M4 10v4h4l5 4V6l-5 4zM16.5 9a4 4 0 0 1 0 6" />,
  forum: <path d="M4 5h16v11H10l-4 4v-4H4z" />,
  sparkles: <path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />,
  shield: <path d="M12 3l8 3v6c0 4.4-3.2 7.8-8 9-4.8-1.2-8-4.6-8-9V6z" />,
  layers: <path d="M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5" />,
  door: <><path d="M6 21V10a6 6 0 0 1 12 0v11" /><path d="M3 21h18M12 14v2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  bars: <path d="M5 20V11M12 20V4M19 20v-6" />,
  wand: <path d="M5 19L16 8M14 6l2-2 4 4-2 2zM6 4v3M4.5 5.5h3M19 15v3M17.5 16.5h3" />,
  copy: <><rect x="9" y="9" width="11" height="11" rx="2.5" /><path d="M5 15V6.5A1.5 1.5 0 0 1 6.5 5H15" /></>,
  gift: <><rect x="4" y="9" width="16" height="11" rx="2" /><path d="M3 9h18v3H3zM12 9v11M12 9c-3.5 0-4.5-5 0-5 2 0 3 2 0 5zM12 9c3.5 0 4.5-5 0-5-2 0-3 2 0 5z" /></>,
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof PATHS

export function Ico({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {PATHS[name]}
    </svg>
  )
}

export type Tone = 'violet' | 'pink' | 'rose' | 'amber' | 'cyan' | 'green'

/** Gradient rounded square holding an icon. Colour comes from the tone-* class. */
export function Tile({ name, tone, size = 40 }: { name: IconName; tone: Tone; size?: number }) {
  return (
    <span className={`dz-tile tone-${tone}`} style={{ width: size, height: size }} aria-hidden="true">
      <Ico name={name} size={Math.round(size * 0.52)} />
    </span>
  )
}
