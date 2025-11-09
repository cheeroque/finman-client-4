import type { Snapshot } from '~~/shared/types/snapshot'

export const useSnapshotCreate = defineMutation(() => {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: Partial<Snapshot>) => $fetch('/api/snapshots', {
      method: 'POST',
      body,
    }),

    onSettled: () => {
      queryCache.invalidateQueries({ key: ['snapshots'] })
    },
  })
})
