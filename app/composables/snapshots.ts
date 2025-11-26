import type { PaginatedResponse } from '~~/shared/types/util'
import type { Snapshot } from '~~/shared/types/snapshot'

export function useSnapshots() {
  const { asyncDataKey, page } = useSnapshotsParams()

  return useAsyncData<PaginatedResponse<Snapshot>>(
    asyncDataKey,

    (_nuxtApp, { signal }) => useRequestFetch()('/api/snapshots', {
      query: {
        page: page.value,
      },
      signal,
    })
  )
}
