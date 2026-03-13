interface MonthState {
  loading: boolean
  monthTransactions: MonthTransactionsData | null
}

export const useMonthStore = defineStore('MonthStore', () => {
  const fetchInstance = useRequestFetch()

  const state = reactive<MonthState>({
    loading: false,
    monthTransactions: null,
  })

  async function fetchMonthTransactions(period: string) {
    state.loading = true

    state.monthTransactions = await fetchInstance<MonthTransactionsData>(
      `/api/months/${period}`
    )

    state.loading = false

    return state.monthTransactions
  }

  return {
    ...toRefs(state),
    fetchMonthTransactions,
  }
})
