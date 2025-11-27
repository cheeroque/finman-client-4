import type { TransactionBase } from '~~/shared/types/transaction'

export function useTransactionUpsert() {
  const { asyncDataKey } = useTransactionsParams()

  return useDefineMutation<Partial<TransactionBase>>(
    (body) => {
      const url = body.id ? `/api/transactions/${body.id}` : '/api/transactions'
      const method = body.id ? 'PUT' : 'POST'

      return $fetch(url, {
        body,
        method,
      })
    },

    [
      asyncDataKey.value,
      'balance',
      'current-month-total',
      'transactions-month-current',
    ]
  )
}
