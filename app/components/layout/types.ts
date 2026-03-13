import type { ClassValue } from 'vue'

export interface LayoutNavItem {
  disabled?: boolean
  icon: string
  iconClass?: ClassValue
  label: string
  labelSecondary?: string
  to?: string
}
