import type { Category } from '~~/shared/types/category'

export default defineEventHandler(() => {
  const apiFetch = useApiFetch()

  return apiFetch<Category[]>('/categories')
})
