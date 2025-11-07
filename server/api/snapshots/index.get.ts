import type { SnapshotDto } from '~~/shared/types/snapshot'
import type { PaginatedResponse, PaginationParams } from '~~/shared/types/util'

export default defineEventHandler((event) => {
  const apiFetch = useApiFetch()
  const query = getQuery<PaginationParams<SnapshotDto>>(event)

  return apiFetch<PaginatedResponse<SnapshotDto>>('/snapshots', { query })
})
