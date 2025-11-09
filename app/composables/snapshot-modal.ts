import { LazySnapshotModal } from '#components'

export function useSnapshotModal() {
  const overlay = useOverlay()

  const snapshotModal = overlay.create(LazySnapshotModal)

  return snapshotModal
}
