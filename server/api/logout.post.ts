import { serialize } from 'cookie-es'

export default defineEventHandler(async (event) => {
  const { tokenCookieName } = useAppConfig()

  const apiFetch = useApiFetch()

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
