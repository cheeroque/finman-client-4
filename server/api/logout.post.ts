import { serialize } from 'cookie-es'

import { createApiFetch } from '~~/server/utils/fetch'

export default defineEventHandler(async (event) => {
  const { tokenCookieName } = useAppConfig()

  const apiFetch = createApiFetch(event)

  await apiFetch('/logout', {
    method: 'POST',
  })

  const emptyTokenCookie = serialize(tokenCookieName, '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
    secure: true,
  })

  setResponseHeader(event, 'set-cookie', emptyTokenCookie)
})
