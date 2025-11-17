import type { ViewMode } from '~~/shared/types'
import type { Transaction } from '~~/shared/types/transaction'
import type { PaginatedResponse } from '~~/shared/types/util'

export function useTransactionsQuery() {
  const filter = useRouteQuery<string | undefined>('filter', undefined, {
    mode: 'push',
  })

  const page = useRouteQuery('page', '1', {
    mode: 'push',
    transform: Number,
  })

  const view = useRouteQuery<ViewMode | undefined>('view', undefined, {
    mode: 'push',
    transform: (value) => value && ['expense', 'income'].includes(value) ? value : undefined,
  })

  const marked = useRouteQuery('marked', 'false', {
    mode: 'push',
    transform: (value: string) => String(value) === 'true',
  })

  const query = useQuery<PaginatedResponse<Transaction>>({
    key: () => [
      'transactions',
      filter.value ?? '',
      page.value,
      view.value ?? 'all',
      marked.value,
    ],

    query: () => useRequestFetch()('/api/transactions', {
      query: {
        filter: filter.value || undefined,
        marked: marked.value || undefined,
        page: page.value,
        show: view.value,
      },
    }),

    placeholderData: (previousData) => previousData,
  })

  return {
    ...query,
    filter,
    marked,
    page,
    view,
  }
}
