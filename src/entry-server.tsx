import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export { SEO, NOT_FOUND, SITE_URL, fullTitle } from './seo'

/** Renders one route to an HTML string. Used only by scripts/prerender.mjs at build time. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
