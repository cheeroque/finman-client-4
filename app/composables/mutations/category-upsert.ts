import type { Category } from '~~/shared/types/category'

export const useCategoryUpsert = defineMutation(() => {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: Partial<Category>) => {
      if (body.id) {
        return $fetch(`/api/categories/${body.id}`, {
          method: 'PUT',
          body,
        })
      }

      return $fetch('/api/categories', {
        method: 'POST',
        body,
      })
    },

    onSettled: () => {
      queryCache.invalidateQueries({ key: ['categories'] })
    },
  })
})
