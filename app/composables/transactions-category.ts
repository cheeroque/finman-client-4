import type { CategoryWithTransactions } from '~~/shared/types/category'

export function useCategoryTransactions() {
  const { categoryTransactionsPerPage } = useAppConfig()
  const { asyncDataKey, page, slug } = useCategoryTransactionsParams()

  return useAsyncData<CategoryWithTransactions>(
    asyncDataKey,

    (_, { signal }) => useRequestFetch()(`/api/categories/${slug.value}`, {
      query: {
        page: page.value,
        perPage: categoryTransactionsPerPage,
      },
      signal,
    })
  )
}
