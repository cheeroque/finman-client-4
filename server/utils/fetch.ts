import { getCookie, type H3Event } from 'h3'
import type { FetchOptions } from 'ofetch'

export function createApiFetch(event: H3Event) {
  const { tokenCookieName } = useAppConfig()
  const { apiBase } = useRuntimeConfig()

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
