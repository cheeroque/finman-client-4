interface BalanceState {
  balance: number | null
  loading: boolean
}

export const useBalanceStore = defineStore('BalanceStore', () => {
  const fetchInstance = useRequestFetch()

  const state = reactive<BalanceState>({
    balance: null,
    loading: false,
  })

  async function fetchBalance(forceRefresh = false) {
    if (state.balance && !forceRefresh) {
      return state.balance
    }

    state.loading = true

    state.balance = await fetchInstance<number>('/api/transactions/total')

    state.loading = false

    return state.balance
  }

  return {
    ...toRefs(state),
    fetchBalance,
  }
})
