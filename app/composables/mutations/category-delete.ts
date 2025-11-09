export const useCategoryDelete = defineMutation(() => {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (id: number) => $fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    }),

    onSettled: () => {
      queryCache.invalidateQueries({ key: ['categories'] })
    },
  })
})
