export default defineEventHandler(async (event) => {
  const apiFetch = useApiFetch()
  const { id } = getRouterParams(event)

  return apiFetch<PaginatedResponse<Transaction>>(`/transactions/${id}`, {
    method: 'DELETE',
  })
})
