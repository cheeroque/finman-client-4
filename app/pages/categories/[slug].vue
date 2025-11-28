<script setup lang="ts">
import type { BreadcrumbItem } from '~/components/_ui'

const { categoryTransactionsPerPage } = useAppConfig()

const { data, status } = await useCategoryTransactions()
const loading = useAsyncDataLoading(status)

const paginationVisible = computed(() => Number(data.value?.total) > categoryTransactionsPerPage)

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
          border-primary-100
          max-lg:border-b max-lg:p-3
          lg:mb-8
          dark:border-primary-990
        "
      >
        <UiBreadcrumb :items="breadcrumbs" />
      </div>

      <CategoryTransactionsTable
        :data="data?.data"
        :loading
      />
    </div>

    <UiPagination
      v-if="paginationVisible"
      :items-per-page="categoryTransactionsPerPage"
      :total="data?.total"
      class="max-lg:mx-auto"
    />
  </main>
</template>
