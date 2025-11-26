// TODO Colada Data Loaders are currently broken: https://github.com/posva/unplugin-vue-router/issues/649
import { defineColadaLoader } from 'unplugin-vue-router/data-loaders/pinia-colada'

export const useCategoryTransactions = defineColadaLoader({
  async query(to, { signal }) {
    const { categoryTransactionsPerPage } = useAppConfig()
    const { query, params } = to

    return useRequestFetch()(`/api/categories/${params.slug}`, {
      query: {
        page: query.page,
        perPage: categoryTransactionsPerPage,
      },
      signal,
    })
  },

  key: (to) => [
    'transactions',
    'category',
    to.params.slug ?? '',
    to.query.page ?? 1,
  ],

  placeholderData: (previousData) => previousData,
})
