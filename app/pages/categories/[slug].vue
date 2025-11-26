<script lang="ts">
import type { BreadcrumbItem } from '~/components/_ui'
import { useCategoryTransactions } from '~/composables/loaders/transactions-category'

export { useCategoryTransactions }
</script>

<script setup lang="ts">
const { categoryTransactionsPerPage } = useAppConfig()

const { data, isLoading } = useCategoryTransactions()
const { page } = useCategoryTransactionsQueryParams()

const paginationVisible = computed(() => Number(data.value?.total) > categoryTransactionsPerPage)

const { $localePath, $ts } = useI18n()

const breadcrumbs = computed(() => {
  const items: BreadcrumbItem[] = [
    {
      icon: 'mingcute:home-7-line',
      to: $localePath('/'),
    },
    {
      text: $ts('mainMenu.categories'),
      to: $localePath('/categories'),
    },
  ]

  if (data.value?.category) {
    items.push({
      active: true,
      text: data.value.category.name,
    })
  }

  return items
})
</script>

<template>
  <main class="flex flex-col gap-8">
    <div>
      <div
        class="
          border-(--c-outline-light)
          max-lg:border-b max-lg:p-3
          lg:mb-8
        "
      >
        <UiBreadcrumb :items="breadcrumbs" />
      </div>

      <CategoryTransactionsTable
        :data="data?.data"
        :loading="isLoading"
      />
    </div>

    <UiPagination
      v-if="paginationVisible"
      v-model="page"
      :items-per-page="categoryTransactionsPerPage"
      :total="data?.total"
      class="max-lg:mx-auto"
    />
  </main>
</template>
