import type { AcceptableValue } from 'reka-ui'

export interface SelectOption {
  disabled?: boolean
  label?: string
  value: AcceptableValue
}
