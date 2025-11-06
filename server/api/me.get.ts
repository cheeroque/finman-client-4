import type { UserDto } from '~~/shared/types/user'

export default defineEventHandler(() => {
  const apiFetch = useApiFetch()

  return apiFetch<UserDto>('/me')
})
