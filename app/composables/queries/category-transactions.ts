import type { CategoryWithTransactions } from '~~/shared/types/category'

const PER_PAGE = 18

export function useCategoryTransactionsQuery() {
  const route = useRoute()

  const page = useRouteQuery('page', '1', {
    mode: 'push',
    transform: Number,
  })

  const perPage = ref(PER_PAGE)

  const query = useQuery<CategoryWithTransactions>({
    key: () => [
      'categories',
      route.params.slug as string,
      page.value,
    ],

    query: () => useRequestFetch()(`/api/categories/${route.params.slug}`, {
      query: {
        page: page.value,
        perPage: perPage.value,
      },
    }),

    placeholderData: (previousData) => previousData,
  })

  return {
    ...query,
    page,
    perPage,
  }
}
