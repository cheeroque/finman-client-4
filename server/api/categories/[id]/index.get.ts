import type { CategoryWithTransactions } from '~~/shared/types/category'
import type { PaginationParams } from '~~/shared/types/util'

export default defineEventHandler((event) => {
  const apiFetch = useApiFetch()
  const { id } = getRouterParams(event)
  const query = getQuery<PaginationParams>(event)

  return apiFetch<CategoryWithTransactions>(`/transactions/category/${id}`, { query })
})
