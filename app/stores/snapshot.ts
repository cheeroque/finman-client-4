interface SnapshotState {
  latest: Snapshot | null
  loading: boolean
  snapshots: PaginatedResponse<Snapshot> | null
}

export const useSnapshotStore = defineStore('SnapshotStore', () => {
  const fetchInstance = useRequestFetch()

  const state = reactive<SnapshotState>({
    latest: null,
    loading: false,
    snapshots: null,
  })

  async function fetchLatest(forceRefresh = false) {
    if (state.latest && !forceRefresh) {
      return state.latest
    }

    state.latest = await fetchInstance<Snapshot>('/api/snapshots/latest')

    return state.latest
  }

  const { currentPage } = useQueryParams()

  async function fetchSnapshots() {
    state.loading = true

    state.snapshots = await fetchInstance<PaginatedResponse<Snapshot>>(
      '/api/snapshots', {
        query: {
          page: currentPage.value,
        },
      }
    )

    state.loading = false

    return state.snapshots
  }

  async function createSnapshot(body: Partial<Snapshot>) {
    await $fetch('/api/snapshots', {
      method: 'POST',
      body,
    })

    return Promise.all([
      fetchLatest(),
      fetchSnapshots(),
    ])
  }

  return {
    ...toRefs(state),
    createSnapshot,
    fetchLatest,
    fetchSnapshots,
  }
})
