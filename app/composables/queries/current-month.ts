export const useCurrentMonthQuery = () => useQuery<number>({
  key: ['transactions', 'month', 'current'],

  query: () => useRequestFetch()('/api/transactions/current-month'),

  placeholderData: (previousData) => previousData,
})
