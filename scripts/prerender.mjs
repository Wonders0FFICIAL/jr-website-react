// Renders every route to static HTML after `vite build`, so crawlers and link previews
// see real content and per-page meta tags. Output goes into dist/.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const server = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const { render, SEO, NOT_FOUND, SITE_URL, fullTitle } = server
const template = await readFile(join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function setTag(html, pattern, tag) {
  if (!pattern.test(html)) throw new Error(`Template is missing ${pattern}`)
  return html.replace(pattern, tag)
}

function page(path, entry, { noindex = false } = {}) {
  const title = esc(fullTitle(entry.title))
  const description = esc(entry.description)
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  let html = template
  html = setTag(html, /<title>.*?<\/title>/s, `<title>${title}</title>`)
  html = setTag(html, /<meta\s+name="description"[^>]*?\/>/s, `<meta name="description" content="${description}" />`)
  html = setTag(html, /<link rel="canonical"[^>]*?\/>/s, `<link rel="canonical" href="${url}" />`)
  html = setTag(html, /<meta property="og:url"[^>]*?\/>/s, `<meta property="og:url" content="${url}" />`)
  html = setTag(html, /<meta property="og:title"[^>]*?\/>/s, `<meta property="og:title" content="${title}" />`)
  html = setTag(html, /<meta\s+property="og:description"[^>]*?\/>/s, `<meta property="og:description" content="${description}" />`)
  html = setTag(html, /<meta name="twitter:title"[^>]*?\/>/s, `<meta name="twitter:title" content="${title}" />`)
  html = setTag(html, /<meta\s+name="twitter:description"[^>]*?\/>/s, `<meta name="twitter:description" content="${description}" />`)
  if (noindex) {
    html = html.replace(/<link rel="canonical"[^>]*?\/>\s*/s, '').replace(/<meta property="og:url"[^>]*?\/>\s*/s, '')
    html = html.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>')
  }
  const body = render(path === '/__404' ? '/__404' : path)
  return setTag(html, /<div id="root"><\/div>/, `<div id="root" data-path="${path}">${body}</div>`)
}

const routes = Object.keys(SEO)
for (const path of routes) {
  const html = page(path, SEO[path])
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

// Unknown URLs get this page with a real 404 status from the host.
await writeFile(join(dist, '404.html'), page('/__404', NOT_FOUND, { noindex: true }))

const today = new Date().toISOString().slice(0, 10)
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n') +
  `\n</urlset>\n`
await writeFile(join(dist, 'sitemap.xml'), sitemap)

await rm(ssrDir, { recursive: true, force: true })
console.log(`Prerendered ${routes.length} routes + 404 + sitemap.xml`)
