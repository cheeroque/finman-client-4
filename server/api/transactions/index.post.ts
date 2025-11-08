import type { Transaction, TransactionBase } from '~~/shared/types/transaction'

export default defineEventHandler(async (event) => {
  const apiFetch = useApiFetch()
  const body = await readBody<Partial<TransactionBase>>(event)

  return apiFetch<Transaction>('/transactions', {
    method: 'POST',
    body,
  })
})
