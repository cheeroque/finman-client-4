import type { Transaction } from '~~/shared/types/transaction'

export default defineEventHandler(() => {
  const apiFetch = useApiFetch()

  return apiFetch<Omit<Transaction, 'category'>>('/transactions/first')
})
