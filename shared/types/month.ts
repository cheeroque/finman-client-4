import type { Category } from '~~/shared/types/category'
import type { Transaction } from '~~/shared/types/transaction'

export interface MonthCategoriesResponse {
  [categoryId: string]: Transaction[]
}

export interface MonthCategoryWithTransactions extends Partial<Category> {
  is_month_total?: boolean
  is_total?: boolean
  subtotal: number
  transactions: Transaction[]
}

export interface MonthTransactionsData {
  expenseCategories: MonthCategoryWithTransactions[]
  expensesTotal: number
  incomeCategories: MonthCategoryWithTransactions[]
  incomesTotal: number
}
