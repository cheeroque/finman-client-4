import type { Category } from '~~/shared/types/category'

export interface TransactionBase {
  id: number
  sum: number
  note: string
  category_id: number
  user_id: number
  created_at: string
  updated_at: string
}

export interface Transaction extends TransactionBase {
  category: Category
}
