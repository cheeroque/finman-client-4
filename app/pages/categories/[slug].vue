<script setup lang="ts">
import type { BreadcrumbItem } from '~/components/_ui/types'

const { categoryTransactionsPerPage } = useAppConfig()
const route = useRoute()

const categoryStore = useCategoryStore()
const { categoryTransactions, loading } = storeToRefs(categoryStore)

const slug = computed(() => String(route.params.slug))

await useAsyncData(
  `category-${slug.value}`,
  () => categoryStore.fetchCategoryTransactions(slug.value),
  { watch: [() => route.query] }
)

const { currentPage } = useQueryParams()

const paginationVisible = computed(
  () => Number(categoryTransactions.value?.total) > categoryTransactionsPerPage
)

const { $localePath, $ts } = useI18n()

const breadcrumbs = computed(() => {
  const items: BreadcrumbItem[] = [
    {
      text: $ts('mainMenu.home'),
      to: $localePath('/'),
    },
    {
      text: $ts('mainMenu.categories'),
      to: $localePath('/categories'),
    },
  ]

  if (categoryTransactions.value?.category) {
    items.push({
      active: true,
      text: categoryTransactions.value.category.name,
    })
  }

  return items
})

useHead({
  titleTemplate: usePageTitle(
    'category.title',
    categoryTransactions.value?.category.name
  ),
})
</script>

<template>
  <main class="flex flex-col gap-8">
    <div>
      <div
        class="
          border-primary-100
          max-lg:border-b max-lg:p-3
          lg:mb-8
          dark:border-primary-990
        "
      >
        <UiBreadcrumb :items="breadcrumbs" />
      </div>

      <CategoryTransactionsTable
        :data="categoryTransactions?.data"
        :loading
      />
    </div>

    <UiPagination
      v-if="paginationVisible"
      v-model="currentPage"
      :items-per-page="categoryTransactionsPerPage"
      :total="categoryTransactions?.total"
      class="max-lg:mx-auto"
    />
  </main>
</template>
