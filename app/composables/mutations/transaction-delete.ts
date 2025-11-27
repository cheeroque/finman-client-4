export function useTransactionDelete() {
  const { asyncDataKey } = useTransactionsParams()

  return useDefineMutation<number>(
    (id) => $fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    }),

    [
      asyncDataKey.value,
      'balance',
      'transactions-month-current',
      'current-month-total',
      'transactions-month-current',
    ]
  )
}
