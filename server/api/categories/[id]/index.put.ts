import type { Category } from '~~/shared/types/category'

export default defineEventHandler(async (event) => {
  const apiFetch = useApiFetch()
  const body = await readBody<Partial<Category>>(event)
  const { id } = getRouterParams(event)

  return apiFetch<Category>(`/categories/${id}`, {
    method: 'PUT',
    body,
  })
})
