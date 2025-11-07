import type { TransactionDto } from '~~/shared/types/transaction'

export default defineEventHandler(() => {
  const apiFetch = useApiFetch()

  return apiFetch<Omit<TransactionDto, 'category'>>('/transactions/first')
})
