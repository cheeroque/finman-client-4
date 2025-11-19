import type { MonthCategoriesResponse, MonthCategoryWithTransactions } from '~~/shared/types/month'

export default defineEventHandler(async (event) => {
  const apiFetch = useApiFetch()
  const { period } = getRouterParams(event)

  const response = await apiFetch<MonthCategoriesResponse>(`/transactions/month/${period}`)

  let expensesTotal = 0
  let incomesTotal = 0

  const expenseCategories: MonthCategoryWithTransactions[] = []
  const incomeCategories: MonthCategoryWithTransactions[] = []

  for (const key in response) {
    if (!response[key]?.[0]) {
      return
    }

    const { category } = response[key][0]

    const subtotal = response[key].reduce((sum, transaction) => sum + transaction.sum, 0)

    const row = {
      ...category,
      subtotal,
      transactions: response[key],
    }

    if (!category.is_income) {
      expenseCategories.push(row)
      expensesTotal += subtotal
    } else {
      incomeCategories.push(row)
      incomesTotal += subtotal
    }

    expenseCategories.sort((a, b) => b.subtotal - a.subtotal)
    incomeCategories.sort((a, b) => b.subtotal - a.subtotal)
  }

  return {
    expenseCategories,
    expensesTotal,
    incomeCategories,
    incomesTotal,
  }
})
