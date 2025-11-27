import type { Category } from '~~/shared/types/category'

export function useCategories() {
  return useAsyncData<Category[]>(
    'categories',

    (_, { signal }) => useRequestFetch()('/api/categories', {
      signal,
    })
  )
}
