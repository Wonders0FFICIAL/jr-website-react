export const SITE_URL = 'https://jrofficial.org'
export const SITE_TAGLINE = 'Software that makes life better'

export type SeoEntry = { title: string | null; description: string }

/** One place for every page's title and description. Used by pages and by the prerender step. */
export const SEO = {
  '/': {
    title: null,
    description:
      'JR. is a software company building tools for developers, businesses and everyday people. Join the waitlist.',
  },
  '/products': {
    title: 'Products',
    description:
      'Juno, Avery, Forge, Lapis and Moka: the five products JR. is building for developers, businesses and everyday people.',
  },
  '/pricing': {
    title: 'Pricing',
    description: 'Nothing from JR. is for sale yet. Pricing for each product will be published here at launch.',
  },
  '/waitlist': {
    title: 'Join the waitlist',
    description: 'Join the JR. waitlist and we will email you when our first products are ready.',
  },
  '/about': {
    title: 'About',
    description:
      'JR. is a software company that builds its own tools to make life better for developers, businesses and everyday people.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Get in touch with JR. by message, or find us on Discord, GitHub, X, YouTube, Instagram and Reddit.',
  },
  '/privacy': {
    title: 'Privacy policy',
    description: 'What personal information JR. collects through this website, why, and the choices you have.',
  },
  '/terms': {
    title: 'Terms of use',
    description: 'The terms for using the JR. website and joining the waitlist.',
  },
  '/nook/privacy': {
    title: 'Nook privacy policy',
    description: 'What the Nook Discord bot by JR. handles, why, and the control you have over it.',
  },
  '/nook/terms': {
    title: 'Nook terms of service',
    description: 'The rules for using the Nook Discord bot by JR.',
  },
  '/nook/dashboard': {
    title: 'Nook dashboard',
    description: 'Log in with Discord to configure Nook leveling, announcements and role rewards for your server.',
  },
} satisfies Record<string, SeoEntry>

export type SeoPath = keyof typeof SEO

export const NOT_FOUND: SeoEntry = { title: 'Page not found', description: 'This page does not exist.' }

export function fullTitle(title: string | null): string {
  return title ? `${title} | JR.` : `JR. | ${SITE_TAGLINE}`
}
