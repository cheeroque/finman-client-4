export const useBalanceQuery = () => useQuery<number>({
  key: ['balance'],

  query: () => useRequestFetch()('/api/transactions/total'),

  placeholderData: (previousData) => previousData,
})
