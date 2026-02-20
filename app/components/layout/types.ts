import type { ClassNameValue } from 'tailwind-merge'

export interface LayoutNavItem {
  disabled?: boolean
  icon: string
  iconClass?: ClassNameValue
  label: string
  labelSecondary?: string
  to?: string
}
