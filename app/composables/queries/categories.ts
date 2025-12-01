import type { Category } from '~~/shared/types/category'

export function useCategories() {
  return useAsyncData<Category[]>(
    'categories',

    (_, { signal }) => useRequestFetch()('/api/categories', {
      signal,
    }),

    {
      getCachedData: (key, nuxtApp, ctx) => {
        if (['refresh:hook', 'refresh:manual'].includes(ctx.cause)) {
          return
        }

        return nuxtApp.payload.data[key]
      },
    }
  )
}
