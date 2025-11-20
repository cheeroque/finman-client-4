import type { AcceptableValue } from 'reka-ui'
import type { NuxtLinkProps } from '#app'

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
