import type { MonthTotalPeriod } from '~~/shared/types/month'

export function useCurrentMonthTotal() {
  return useAsyncData<MonthTotalPeriod>(
    'current-month-total',

    (_, { signal }) => useRequestFetch()('/api/transactions/current-month', {
      signal,
    })
  )
}
