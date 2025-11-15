import type { ViewMode } from '~~/shared/types'
import type { Transaction } from '~~/shared/types/transaction'
import type { PaginatedResponse, PaginationParams } from '~~/shared/types/util'

interface TransactionsQuery extends PaginationParams<Transaction> {
  filter?: string
  marked?: boolean
  show?: ViewMode
}

export default defineEventHandler((event) => {
  const apiFetch = useApiFetch()
  const query = getQuery<TransactionsQuery>(event)

  return apiFetch<PaginatedResponse<Transaction>>('/transactions', { query })
})
