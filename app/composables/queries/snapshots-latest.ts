import type { Snapshot } from '~~/shared/types/snapshot'

export const useSnapshotsLatestQuery = () => useQuery<Snapshot>({
  key: ['snapshots', 'latest'],

  query: () => useRequestFetch()('/api/snapshots/latest'),

  placeholderData: (previousData) => previousData,
})
