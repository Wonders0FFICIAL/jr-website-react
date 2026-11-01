import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NOT_FOUND, SEO, SITE_URL, fullTitle } from '../seo'
import type { SeoEntry, SeoPath } from '../seo'

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const meta = (key: 'name' | 'property', name: string) => () => {
  const m = document.createElement('meta')
  m.setAttribute(key, name)
  return m
}

/** Keeps the title, description, canonical URL and social tags in step with the current page. */
export function usePageMeta(page: SeoPath | 'not-found') {
  const { pathname } = useLocation()

  useEffect(() => {
    const entry: SeoEntry = page === 'not-found' ? NOT_FOUND : SEO[page]
    const title = fullTitle(entry.title)
    const url = `${SITE_URL}${page === 'not-found' ? pathname : page === '/' ? '/' : page}`

    document.title = title
    setMeta('meta[name="description"]', meta('name', 'description'), 'content', entry.description)
    setMeta('meta[property="og:title"]', meta('property', 'og:title'), 'content', title)
    setMeta('meta[property="og:description"]', meta('property', 'og:description'), 'content', entry.description)
    setMeta('meta[property="og:url"]', meta('property', 'og:url'), 'content', url)
    setMeta('meta[name="twitter:title"]', meta('name', 'twitter:title'), 'content', title)
    setMeta('meta[name="twitter:description"]', meta('name', 'twitter:description'), 'content', entry.description)
    setMeta(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link')
        l.rel = 'canonical'
        return l
      },
      'href',
      url,
    )
  }, [page, pathname])
}
