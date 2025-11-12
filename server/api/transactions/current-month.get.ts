import type { Transaction } from '~~/shared/types/transaction'

export default defineEventHandler(() => {
  const apiFetch = useApiFetch()

  return apiFetch<Transaction>('/transactions/current-month')
})
