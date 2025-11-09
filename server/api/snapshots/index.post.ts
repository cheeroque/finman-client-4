import type { Snapshot } from '~~/shared/types/snapshot'

export default defineEventHandler(async (event) => {
  const apiFetch = useApiFetch()
  const body = await readBody<Partial<Snapshot>>(event)

  return apiFetch<Snapshot>('/snapshots', {
    method: 'POST',
    body,
  })
})
