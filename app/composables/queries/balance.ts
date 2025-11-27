export function useBalance() {
  return useAsyncData<number>(
    'balance',

    (_, { signal }) => useRequestFetch()('/api/transactions/total', {
      signal,
    })
  )
}
