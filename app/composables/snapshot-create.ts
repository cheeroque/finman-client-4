import type { Snapshot } from '~~/shared/types/snapshot'

export function useSnapshotCreate() {
  const { asyncDataKey } = useSnapshotsParams()

  return useDefineMutation<Partial<Snapshot>>(
    (body) => $fetch('/api/snapshots', {
      method: 'POST',
      body,
    }),

    [
      asyncDataKey.value,
      'snapshots-latest',
    ]
  )
}
