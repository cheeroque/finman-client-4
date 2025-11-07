import type { TransactionBase } from '~~/shared/types/transaction'

export interface Category {
  id: number
  name: string
  slug: string
  is_income: boolean
  color?: string
  created_at: string
  updated_at: string
}

export interface CategoryWithTransactions {
  category: Category
  data: {
    [period: string]: Array<TransactionBase & {
      period: string
    }>
  }
  total: number
}
