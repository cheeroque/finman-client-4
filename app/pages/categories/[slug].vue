<script setup lang="ts">
import type { CategoryWithTransactions } from '~~/shared/types/category'

const PER_PAGE = 18

const route = useRoute()

const page = useRouteQuery('page', '1', {
  mode: 'push',
  transform: Number,
})

const { state } = useQuery<CategoryWithTransactions>({
  key: () => [
    'category',
    route.params.slug as string,
    page.value,
  ],

  query: () => useRequestFetch()(`/api/categories/${route.params.slug}`, {
    query: {
      page: page.value,
      perPage: PER_PAGE,
    },
  }),

  placeholderData: (previousData) => previousData,
})
</script>

<template>
  <UMain as="main">
    <UContainer class="py-5">
      <UCard>
        <template #header>
          {{ state.data?.category.name }}
        </template>

        <CategoryTransactionsTable :data="state.data?.data" />

        <template #footer>
          <SharedPagination
            :items-per-page="PER_PAGE"
            :total="state.data?.total"
          />
        </template>
      </UCard>
    </UContainer>
  </UMain>
</template>
