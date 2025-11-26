import { defineColadaLoader } from 'unplugin-vue-router/data-loaders/pinia-colada'

import type { Category } from '~~/shared/types/category'

export const useCategories = defineColadaLoader<Category[]>({
  async query(_to, { signal }) {
    return useRequestFetch()('/api/categories', {
      signal,
    })
  },

  key: ['categories'],

  placeholderData: (previousData) => previousData,
})
