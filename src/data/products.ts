export type Audience = 'Developers' | 'Businesses' | 'Everyone'

export type Product = {
  id: 'juno' | 'avery' | 'lapis' | 'forge' | 'moka'
  name: string
  category: string
  tagline: string
  description: string
  points: string[]
  audiences: Audience[]
  /** Accent colour used for glows, dots and highlights. */
  accent: string
  logo: string
  /** Edit this when a product's stage changes, e.g. 'Beta' or 'Available now'. */
  status: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'juno',
    name: 'Juno',
    category: 'Programming language',
    tagline: 'Compiled. Fast. Expressive.',
    description:
      'A modern compiled language built for performance and clarity: strong static types, native concurrency and a clean, readable syntax.',
    points: [
      'Compiles to native code with no runtime overhead',
      'Static types with strong inference',
      'Memory-safe by design, with built-in concurrency',
    ],
    audiences: ['Developers'],
    accent: '#19D47B',
    logo: '/products/juno.png',
    status: 'In development',
  },
  {
    id: 'avery',
    name: 'Avery',
    category: 'AI assistant',
    tagline: 'Intelligence that works with you.',
    description:
      'An AI assistant for research, writing, code and data analysis, with memory that learns how you like to work.',
    points: [
      'Deep research with sources',
      'Code generation and data analysis',
      'Remembers your preferences over time',
    ],
    audiences: ['Everyone', 'Businesses'],
    accent: '#F472B6',
    logo: '/products/avery.png',
    status: 'In development',
  },
  {
    id: 'forge',
    name: 'Forge',
    category: 'Code editor',
    tagline: 'The IDE that ships with you.',
    description:
      'An AI-native code editor for the web, with project-wide context for autocomplete, refactoring and debugging.',
    points: [
      'Autocomplete that understands your whole project',
      'Inline refactoring and clean-up',
      'Debugging with plain-English explanations',
    ],
    audiences: ['Developers'],
    accent: '#FF7A1A',
    logo: '/products/forge.png',
    status: 'In development',
  },
  {
    id: 'lapis',
    name: 'Lapis',
    category: 'Cloud servers',
    tagline: 'Your server. Your rules.',
    description:
      'Raw, dedicated compute in seconds: full root-access virtual servers with private networking, snapshots and live monitoring.',
    points: [
      'Root-access servers, any stack',
      'Private networking and firewall controls',
      'Snapshots, backups and resource monitoring',
    ],
    audiences: ['Developers', 'Businesses'],
    accent: '#4A9BFF',
    logo: '/products/lapis.png',
    status: 'In development',
  },
  {
    id: 'moka',
    name: 'Moka',
    category: 'Private browser',
    tagline: 'Browse freely. Track nothing.',
    description:
      'A fast, privacy-first browser with ad and tracker blocking built in, and no telemetry.',
    points: [
      'Built-in ad and tracker blocking',
      'Fingerprint protection',
      'Optional built-in VPN',
    ],
    audiences: ['Everyone'],
    accent: '#C8A27A',
    logo: '/products/moka.png',
    status: 'In development',
  },
]

export const PRODUCT_BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p])) as Record<
  Product['id'],
  Product
>

export const AUDIENCES: { id: Audience; title: string; blurb: string; products: Product['id'][] }[] = [
  {
    id: 'Developers',
    title: 'Developers',
    blurb: 'Languages, editors and servers that stay out of your way.',
    products: ['juno', 'forge', 'lapis'],
  },
  {
    id: 'Businesses',
    title: 'Businesses',
    blurb: 'Infrastructure and intelligence you can build on.',
    products: ['lapis', 'avery'],
  },
  {
    id: 'Everyone',
    title: 'Everyone',
    blurb: 'Everyday tools that are simple, private and fast.',
    products: ['moka', 'avery'],
  },
]

export const PRINCIPLES = [
  {
    title: 'Clear by design',
    body: 'Software should stay understandable as it grows more powerful. We favour good primitives and honest interfaces over layers of hidden complexity.',
  },
  {
    title: 'Powerful, not complicated',
    body: 'Capable tools should not need a manual to get started. We build for people first and the technology second.',
  },
  {
    title: 'Made to last',
    body: 'We care about software that is still useful years after the novelty wears off.',
  },
] as const
