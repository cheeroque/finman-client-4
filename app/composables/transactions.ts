import type { Transaction } from '~~/shared/types/transaction'
import type { PaginatedResponse } from '~~/shared/types/util'

export function useTransactions() {
  const { asyncDataKey, filter, marked, page, view } = useTransactionsParams()

  return useAsyncData<PaginatedResponse<Transaction>>(
    asyncDataKey,

    (_, { signal }) => useRequestFetch()('/api/transactions', {
      query: {
        filter: filter.value || undefined,
        marked: marked.value || undefined,
        page: page.value,
        view: view.value,
      },
      signal,
    })
  )
}
