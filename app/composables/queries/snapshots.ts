import type { PaginatedResponse } from '~~/shared/types/util'
import type { Snapshot } from '~~/shared/types/snapshot'

export function useSnapshotsQuery() {
  const page = useRouteQuery('page', '1', {
    mode: 'push',
    transform: Number,
  })

  const query = useQuery<PaginatedResponse<Snapshot>>({
    key: () => ['snapshots', page.value],

    query: () => useRequestFetch()('/api/snapshots', {
      query: {
        page: page.value,
      },
    }),

    placeholderData: (previousData) => previousData,
  })

  return {
    ...query,
    page,
  }
}
