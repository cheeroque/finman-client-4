export const useTransactionDelete = defineMutation(() => {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (id: number) => $fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    }),

    onSettled: () => {
      queryCache.invalidateQueries({ key: ['transactions'] })
      queryCache.invalidateQueries({ key: ['balance'] })
    },
  })
})
