interface Period {
  month: number
  year: number
}

interface TransactionDates {
  end: Period
  start: Period
}

interface TransactionState {
  currentMonth: MonthTransactionsData | null
  currentMonthTotal: MonthTotalPeriod | null
  dates: TransactionDates | null
  loading: boolean
  transactions: PaginatedResponse<Transaction> | null
}

export const useTransactionStore = defineStore('TransactionStore', () => {
  const fetchInstance = useRequestFetch()

  const state = reactive<TransactionState>({
    currentMonth: null,
    currentMonthTotal: null,
    dates: null,
    loading: false,
    transactions: null,
  })

  const { formatPeriod } = useLocaleFormatter()

  async function fetchCurrentMonth(forceRefresh = false) {
    if (state.currentMonth && !forceRefresh) {
      return state.currentMonth
    }

    const now = new Date()

    const currentPeriod = formatPeriod({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    })

    state.currentMonth = await fetchInstance<MonthTransactionsData>(
      `/api/months/${currentPeriod}`
    )

    return state.currentMonth
  }

  async function fetchCurrentMonthTotal() {
    state.currentMonthTotal = await fetchInstance<MonthTotalPeriod>(
      '/api/transactions/current-month'
    )

    return state.currentMonthTotal
  }

  async function fetchDates(forceRefresh = false) {
    if (state.dates && !forceRefresh) {
      return state.dates
    }

    state.dates = await fetchInstance<TransactionDates>(
      '/api/transactions/dates'
    )

    return state.dates
  }

  const { currentPage, currentView, filter, showMarked } = useQueryParams()

  async function fetchTransactions() {
    state.loading = true

    state.transactions = await fetchInstance<PaginatedResponse<Transaction>>(
      '/api/transactions', {
        query: {
          filter: filter.value || undefined,
          marked: showMarked.value || undefined,
          page: currentPage.value,
          view: currentView.value,
        },
      }
    )

    state.loading = false

    return state.transactions
  }

  async function deleteTransaction(id: Transaction['id']) {
    await $fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    })

    return handleTransactionsUpdate()
  }

  async function upsertTransaction(body: Partial<TransactionBase>) {
    const url = body.id ? `/api/transactions/${body.id}` : '/api/transactions'
    const method = body.id ? 'PUT' : 'POST'

    await $fetch(url, {
      body,
      method,
    })

    return handleTransactionsUpdate()
  }

  const balanceStore = useBalanceStore()

  function handleTransactionsUpdate() {
    return Promise.all([
      balanceStore.fetchBalance(true),
      fetchCurrentMonth(true),
      fetchCurrentMonthTotal(),
      fetchTransactions(),
    ])
  }

  return {
    ...toRefs(state),
    deleteTransaction,
    fetchCurrentMonth,
    fetchCurrentMonthTotal,
    fetchDates,
    fetchTransactions,
    upsertTransaction,
  }
})
