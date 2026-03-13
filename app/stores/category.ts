interface CategoryState {
  categories: Category[]
  categoryTransactions: CategoryWithTransactions | null
  loading: boolean
}

export const useCategoryStore = defineStore('CategoryStore', () => {
  const fetchInstance = useRequestFetch()

  const state = reactive<CategoryState>({
    categories: [],
    categoryTransactions: null,
    loading: false,
  })

  async function fetchCategories(forceRefresh = false) {
    if (state.categories.length && !forceRefresh) {
      return state.categories
    }

    state.loading = true

    state.categories = await fetchInstance<Category[]>('/api/categories')

    state.loading = false

    return state.categories
  }

  const { categoryTransactionsPerPage } = useAppConfig()
  const { currentPage } = useQueryParams()

  async function fetchCategoryTransactions(slug: string) {
    state.loading = true

    state.categoryTransactions = await fetchInstance<CategoryWithTransactions>(
      `/api/categories/${slug}`, {
        query: {
          page: currentPage.value,
          perPage: categoryTransactionsPerPage,
        },
      }
    )

    state.loading = false

    return state.categoryTransactions
  }

  async function deleteCategory(id: Category['id']) {
    await $fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    })

    return handleCategoriesUpdate()
  }

  async function upsertCategory(body: Partial<Category>) {
    const url = body.id ? `/api/categories/${body.id}` : '/api/categories'
    const method = body.id ? 'PUT' : 'POST'

    await $fetch(url, {
      body,
      method,
    })

    return handleCategoriesUpdate()
  }

  function handleCategoriesUpdate() {
    return fetchCategories(true)
  }

  return {
    ...toRefs(state),
    deleteCategory,
    fetchCategories,
    fetchCategoryTransactions,
    upsertCategory,
  }
})
