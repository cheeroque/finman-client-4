export interface LayoutNavItem {
  icon: string
  iconActive?: string
  isActive?: boolean
  label: string
  labelSecondary?: string
  to?: string
  onClick?: () => void
}
