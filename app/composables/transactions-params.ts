export function useTransactionsParams() {
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

  const route = useRoute()
  const router = useRouter()

  const marked = computed({
    get: () => route.query.marked === 'true',
    set: (value) => {
      const query = { ...route.query }

      if (value) {
        router.push({
          ...route,
          query: {
            ...query,
            marked: 'true',
          },
        })
      } else {
        delete query.marked

        router.push({
          ...route,
          query,
        })
      }
    },
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
