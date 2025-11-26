// TODO Colada Data Loaders are currently broken: https://github.com/posva/unplugin-vue-router/issues/649
import { defineColadaLoader } from 'unplugin-vue-router/data-loaders/pinia-colada'

import type { MonthTransactionsData } from '~~/shared/types/month'

export const useCurrentMonthTransactions = defineColadaLoader<MonthTransactionsData>({
  async query(_to, { signal }) {
    const { formatPeriod } = useLocaleFormatter()

    const now = new Date()

    const currentPeriod = formatPeriod({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    })

    return useRequestFetch()(`/api/months/${currentPeriod}`, {
      signal,
    })
  },

  key: [
    'transactions',
    'month',
    'current',
  ],
})
