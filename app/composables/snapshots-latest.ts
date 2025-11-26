import type { Snapshot } from '~~/shared/types/snapshot'

export function useLatestSnapshot() {
  return useAsyncData<Snapshot>(
    'snapshots-latest',

    (_nuxtApp, { signal }) => useRequestFetch()('/api/snapshots/latest', {
      signal,
    })
  )
}
