import { defineColadaLoader } from 'unplugin-vue-router/data-loaders/pinia-colada'

export const useTransactions = defineColadaLoader<PaginatedResponse<Transaction>>({
  async query(to, { signal }) {
    const { query } = to

    return useRequestFetch()('/api/transactions', {
      query,
      signal,
    })
  },

  key: (to) => [
    'transactions',
    to.query.filter ?? '',
    to.query.page ?? 1,
    to.query.view ?? 'all',
    to.query.marked ?? false,
  ],

  placeholderData: (previousData) => previousData,
})
