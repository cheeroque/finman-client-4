import type { AcceptableValue } from 'reka-ui'
import type { Cell, Header, RowData } from '@tanstack/vue-table'

import type { NuxtLinkProps } from '#app'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    class?: {
      th?: string | ((cell: Header<TData, TValue>) => string)
      td?: string | ((cell: Cell<TData, TValue>) => string)
    }
  }
}

export interface BreadcrumbItem {
  active?: boolean
  icon?: string
  text?: string
  to?: NuxtLinkProps['to']
}

export interface SelectOption {
  disabled?: boolean
  label?: string
  value: AcceptableValue
}
