import { getCookie } from 'h3'
import type { FetchOptions } from 'ofetch'

export function useApiFetch() {
  const { tokenCookieName } = useAppConfig()
  const { apiBase } = useRuntimeConfig()

  const event = useEvent()

  const token = getCookie(event, tokenCookieName)
  const headers: FetchOptions['headers'] = {}

  if (token) {
    headers.authorization = `Bearer ${token}`
  }

  return $fetch.create({
    baseURL: apiBase,
    headers,
  })
}
