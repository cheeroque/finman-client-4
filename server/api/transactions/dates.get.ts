import type { Transaction } from '~~/shared/types/transaction'

export default defineEventHandler(async () => {
  const apiFetch = useApiFetch()

  const firstTransaction = await apiFetch<Omit<Transaction, 'category'>>('/transactions/first')

  const now = new Date()

  const end = transformDate(now)

  const start = firstTransaction?.created_at
    ? transformDate(new Date(Date.parse(firstTransaction?.created_at)))
    : end

  return {
    start,
    end,
  }
})

function transformDate(date: Date) {
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
}
