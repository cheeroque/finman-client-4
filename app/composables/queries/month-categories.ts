import type { MonthTransactionsData } from '~~/shared/types/month'

export const useMonthCategoriesQuery = (period?: MaybeRef<string>) => {
  const route = useRoute()

  const queryPeriod = toValue(period) ?? route.params.period as string

  return useQuery<MonthTransactionsData>({
    key: ['transactions', 'month', queryPeriod],

    query: () => useRequestFetch()(`/api/months/${queryPeriod}`),

    placeholderData: (previousData) => previousData,
  })
}
