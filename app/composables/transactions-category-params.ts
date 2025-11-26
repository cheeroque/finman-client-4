export function useCategoryTransactionsParams() {
  const route = useRoute()

  const slug = computed(() => route.params.slug)

  const page = useRouteQuery('page', '1', {
    mode: 'push',
    transform: Number,
  })

  const asyncDataKey = computed(() => [
    'transactions-category',
    slug.value,
    page.value,
  ].join('::'))

  return {
    asyncDataKey,
    page,
    slug,
  }
}
