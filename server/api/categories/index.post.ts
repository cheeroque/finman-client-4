import type { Category } from '~~/shared/types/category'

export default defineEventHandler(async (event) => {
  const apiFetch = useApiFetch()
  const body = await readBody<Partial<Category>>(event)

  return apiFetch<Category>('/categories', {
    method: 'POST',
    body,
  })
})
