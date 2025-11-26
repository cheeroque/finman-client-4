import type { ViewMode } from '~~/shared/types'

export function useTransactionsQueryParams() {
  const filter = useRouteQuery<string | undefined>('filter', undefined, {
    mode: 'push',
  })

  const page = useRouteQuery('page', '1', {
    mode: 'push',
    transform: Number,
  })

  const view = useRouteQuery<ViewMode | undefined>('view', undefined, {
    mode: 'push',
    transform: (value) => value && ['expense', 'income'].includes(value) ? value : undefined,
  })

  const marked = useRouteQuery('marked', 'false', {
    mode: 'push',
    transform: (value: string) => String(value) === 'true',
  })

  return {
    filter,
    marked,
    page,
    view,
  }
}
