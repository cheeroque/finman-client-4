import type { TransactionDto } from '~~/shared/types/transaction'
import type { PaginatedResponse, PaginationParams } from '~~/shared/types/util'

interface TransactionsQuery extends PaginationParams<TransactionDto> {
  filter?: string
  marked?: boolean
  show?: 'expense' | 'income'
}

export default defineEventHandler((event) => {
  const apiFetch = useApiFetch()
  const query = getQuery<TransactionsQuery>(event)

  return apiFetch<PaginatedResponse<TransactionDto>>('/transactions', { query })
})
