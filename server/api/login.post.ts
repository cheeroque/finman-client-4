import { serialize } from 'cookie-es'

import type { LoginCredentials, LoginResponse } from '~~/shared/types/auth'

export default defineEventHandler(async (event) => {
  const { tokenCookieName } = useAppConfig()
  const { apiBase } = useRuntimeConfig()

  const body = await readBody<LoginCredentials>(event)

  const { access_token } = await $fetch<LoginResponse>('/login', {
    baseURL: apiBase,
    method: 'POST',
    body,
  })

  const tokenCookie = serialize(tokenCookieName, access_token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    secure: true,
  })

  setResponseHeader(event, 'set-cookie', tokenCookie)
})
