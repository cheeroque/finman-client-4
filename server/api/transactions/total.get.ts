export default defineEventHandler(() => {
  const apiFetch = useApiFetch()

  return apiFetch<number>('/transactions/total')
})
