export interface PaginatedResponse<T = unknown> {
  current_page: number
  data: T[]
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface PaginationParams<T = unknown> {
  page?: number
  perPage?: number
  order?: 'ASC' | 'DESC'
  orderBy?: T extends object ? keyof T : T
}
