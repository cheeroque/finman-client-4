import type { Snapshot } from '~~/shared/types/snapshot'
import type { PaginatedResponse, PaginationParams } from '~~/shared/types/util'

export default defineEventHandler((event) => {
  const apiFetch = useApiFetch()
  const query = getQuery<PaginationParams<Snapshot>>(event)

  return apiFetch<PaginatedResponse<Snapshot>>('/snapshots', { query })
})
