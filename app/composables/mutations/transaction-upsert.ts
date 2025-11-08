import type { TransactionBase } from '~~/shared/types/transaction'

export const useTransactionUpsert = defineMutation(() => {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: Partial<TransactionBase>) => {
      if (body.id) {
        return $fetch(`/api/transactions/${body.id}`, {
          method: 'PUT',
          body,
        })
      }

      return $fetch('/api/transactions', {
        method: 'POST',
        body,
      })
    },

    onSettled: () => {
      queryCache.invalidateQueries({ key: ['transactions'] })
    },
  })
})
