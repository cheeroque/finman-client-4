<script setup lang="ts">
import type { BreadcrumbItem } from '~/components/_ui'
import { useCategoryTransactionsQuery } from '~/composables/queries/category-transactions'

const { perPage, state, isLoading } = useCategoryTransactionsQuery()

const paginationVisible = computed(() => Number(state.value.data?.total) > perPage.value)

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

  if (state.value.data?.category) {
    items.push({
      active: true,
      text: state.value.data.category.name,
      to: $localePath(`/categories/${state.value.data.category.slug}`),
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
        :data="state.data?.data"
        :loading="isLoading"
      />
    </div>

    <UiPagination
      v-if="paginationVisible"
      :items-per-page="perPage"
      :total="state.data?.total"
      class="max-lg:mx-auto"
    />
  </main>
</template>
