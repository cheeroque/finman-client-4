export function usePageTitle(keypath: string, itemTitle?: string) {
  const { $ts } = useI18n()

  const parts = []

  if (itemTitle) {
    parts.push(itemTitle)
  }

  parts.push($ts(keypath), '%s')

  return parts.join(' — ')
}
