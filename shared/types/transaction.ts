import type { CategoryDto } from '~~/shared/types/category'

export interface TransactionDto {
  id: number
  sum: number
  note: string
  category_id: number
  category: CategoryDto
  user_id: number
  created_at: string
  updated_at: string
}
