import type { Snapshot } from '~~/shared/types/snapshot'

export default defineEventHandler(() => {
  const apiFetch = useApiFetch()

  return apiFetch<Snapshot>('/snapshots/latest')
})
