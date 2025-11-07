export type Entries<T> = {
  [K in keyof T]-?: [K, T[K]]
}[keyof T][]

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
