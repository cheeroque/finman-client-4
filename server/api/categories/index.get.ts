import type { CategoryDto } from '~~/shared/types/category'

export default defineEventHandler(() => {
  const apiFetch = useApiFetch()

  return apiFetch<CategoryDto[]>('/categories')
})
