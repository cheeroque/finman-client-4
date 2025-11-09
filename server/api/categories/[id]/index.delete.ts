export default defineEventHandler(async (event) => {
  const apiFetch = useApiFetch()
  const { id } = getRouterParams(event)

  return apiFetch(`/categories/${id}`, {
    method: 'DELETE',
  })
})
