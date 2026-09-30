import { useEffect } from 'react'

const setDescription = (description: string) => {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'description'
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', description)
}

/** Sets the document title (and optional meta description) for each page. */
export function usePage(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (description) setDescription(description)
    const og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    og?.setAttribute('content', title)
  }, [title, description])
}
