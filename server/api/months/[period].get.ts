import type { MonthCategories } from '~~/shared/types/month'

export default defineEventHandler((event) => {
  const apiFetch = useApiFetch()
  const { period } = getRouterParams(event)

  return apiFetch<MonthCategories>(`/transactions/month/${period}`)
})
