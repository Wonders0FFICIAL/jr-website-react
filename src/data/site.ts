import type { IconName } from '../components/Icon'

export const SITE_NAME = 'JR.'

export const NAV_LINKS = [
  { to: '/products', label: 'Products' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export type Social = {
  id: IconName
  label: string
  href: string
  blurb: string
}

export const SOCIALS: Social[] = [
  { id: 'discord', label: 'Discord', href: 'https://discord.gg/d4kfXDrcG8', blurb: 'Chat with the community' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/jr-official', blurb: 'See what we are building' },
  { id: 'x', label: 'X', href: 'https://x.com/jr_suite', blurb: 'News and updates' },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@junior.software', blurb: 'Watch our videos' },
]

export const DONATE = { label: 'Support JR.', href: 'https://ko-fi.com/jr_official' }

// Form endpoints (see .env.example). Both are optional at build time.
export const WAITLIST_ENDPOINT = (import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined) || ''
export const CONTACT_ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || ''
