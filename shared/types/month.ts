import type { Transaction } from '~~/shared/types/transaction'

export interface MonthCategories {
  [categoryId: string]: Transaction[]
}
