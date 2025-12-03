import type { MonthTotal } from '~~/shared/types/month'

export default defineEventHandler(async () => {
  const apiFetch = useApiFetch()

  const total = await apiFetch<MonthTotal>('/transactions/current-month')

  return Object.values(total)[0] ?? {
    expenses: 0,
    incomes: 0,
  }
})
