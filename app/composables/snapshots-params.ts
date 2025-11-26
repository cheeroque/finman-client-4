export function useSnapshotsParams() {
  const page = useRouteQuery('page', '1', {
    mode: 'push',
    transform: Number,
  })

  const asyncDataKey = computed(() => [
    'snapshots',
    page.value,
  ].join('::'))

  return {
    asyncDataKey,
    page,
  }
}
