interface Period {
  month: number
  year: number
}

export function useTransactionDates() {
  return useAsyncData<{ end: Period, start: Period }>(
    'transaction-dates',

    (_, { signal }) => useRequestFetch()('/api/transactions/dates', {
      signal,
    })
  )
}
