import type { Category } from '~~/shared/types/category'

export function useCategoryUpsert() {
  return useDefineMutation<Partial<Category>>(
    (body) => {
      const url = body.id ? `/api/categories/${body.id}` : '/api/categories'
      const method = body.id ? 'PUT' : 'POST'

      return $fetch(url, {
        body,
        method,
      })
    },

    ['categories']
  )
}
