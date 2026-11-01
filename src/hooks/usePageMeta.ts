import { useEffect } from 'react'

const BASE = 'JR.'

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title: string | null, description: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} | Software that makes life better`

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description
  }, [title, description])
}
