import type { ViewMode } from '~~/shared/types'

export function downloadFileByUrl(url: string) {
  const link = document.createElement('a')

  link.href = url
  link.download = 'true'

  document.body.appendChild(link)
  link.click()

  link.remove()
}

export function getViewRoute(view: ViewMode) {
  return {
    name: 'index',
    query: { view },
  }
}
