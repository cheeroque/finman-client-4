import type { MonthTransactionsData } from '~~/shared/types/month'

export function useMonthTransactions() {
  const { asyncDataKey, period } = useMonthTransactionsParams()

  return useAsyncData<MonthTransactionsData>(
    asyncDataKey,

    (_, { signal }) => useRequestFetch()(`/api/months/${period.value}`, {
      signal,
    })
  )
}
