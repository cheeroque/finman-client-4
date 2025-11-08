import type { Category } from '~~/shared/types/category'

export const useCategoriesQuery = () => useQuery<Category[]>({
  key: ['categories'],

  query: () => useRequestFetch()('/api/categories'),

  placeholderData: (previousData) => previousData,
})
