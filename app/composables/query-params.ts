export function useQueryParams() {
  const currentPage = useRouteQuery<string | undefined, number>('page', '1', {
    mode: 'push',
    transform: {
      get: (value) => Number(value) || 1,
      set: (value) => String(value),
    },
  })

  const currentView = useRouteQuery<ViewMode | undefined>('view', undefined, {
    mode: 'push',
    transform: (value) => value && ['expense', 'income'].includes(value)
      ? value
      : undefined,
  })

  const filter = useRouteQuery<string | undefined>('filter', undefined, {
    mode: 'push',
  })

  const showMarked = useRouteQuery<'true' | 'false', boolean>('marked', 'false', {
    mode: 'push',
    transform: {
      get: (value) => value === 'true',
      set: (value) => value ? 'true' : 'false',
    },
  })

  return {
    currentPage,
    currentView,
    filter,
    showMarked,
  }
}
