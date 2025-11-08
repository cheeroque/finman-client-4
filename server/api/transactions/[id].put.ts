import type { Transaction, TransactionBase } from '~~/shared/types/transaction'

export default defineEventHandler(async (event) => {
  const apiFetch = useApiFetch()
  const body = await readBody<Partial<TransactionBase>>(event)
  const { id } = getRouterParams(event)

  return apiFetch<Transaction>(`/transactions/${id}`, {
    method: 'PUT',
    body,
  })
})
