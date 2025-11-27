import type { MonthTransactionsData } from '~~/shared/types/month'

export function useCurrentMonthTransactions() {
  const { formatPeriod } = useLocaleFormatter()

  const now = new Date()

  const currentPeriod = computed(() => formatPeriod({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  }))

  return useAsyncData<MonthTransactionsData>(
    'transactions-month-current',

    (_, { signal }) => useRequestFetch()(`/api/months/${currentPeriod.value}`, {
      signal,
    })
  )
}
