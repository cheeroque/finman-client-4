export function useTransactionsParams() {
  const filter = useRouteQuery<string | undefined>('filter', undefined, {
    mode: 'push',
  })

  const marked = useRouteQuery('marked', 'false', {
    mode: 'push',
    transform: (value: string) => String(value) === 'true',
  })

  const page = useRouteQuery('page', '1', {
    mode: 'push',
    transform: Number,
  })

  const view = useRouteQuery<ViewMode | undefined>('view', undefined, {
    mode: 'push',
    transform: (value) => value && ['expense', 'income'].includes(value) ? value : undefined,
  })

  const asyncDataKey = computed(() => [
    'transactions',
    filter.value ?? '',
    page.value,
    view.value ?? 'all',
    marked.value,
  ].join('::'))

  return {
    asyncDataKey,
    filter,
    marked,
    page,
    view,
  }
}
