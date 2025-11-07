import type { User } from '~~/shared/types/user'

export default defineEventHandler(() => {
  const apiFetch = useApiFetch()

  return apiFetch<User>('/me')
})
