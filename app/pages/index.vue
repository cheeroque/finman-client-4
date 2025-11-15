<script setup lang="ts">
import type { Transaction } from '~~/shared/types/transaction'
import type { PaginatedResponse } from '~~/shared/types/util'

definePageMeta({
  layout: false,
})

const filter = useRouteQuery<string | undefined>('filter', undefined, {
  mode: 'push',
})

const page = useRouteQuery('page', '1', {
  mode: 'push',
  transform: Number,
})

const view = useRouteQuery<'expense' | 'income' | undefined>('view', undefined, {
  mode: 'push',
  transform: (value) => value && ['expense', 'income'].includes(value) ? value : undefined,
})

const marked = useRouteQuery('marked', 'false', {
  mode: 'push',
  transform: (value: string) => String(value) === 'true',
})

const { state, isLoading } = useQuery<PaginatedResponse<Transaction>>({
  key: () => [
    'transactions',
    filter.value ?? '',
    page.value,
    view.value ?? 'all',
    marked.value,
  ],

  query: () => useRequestFetch()('/api/transactions', {
    query: {
      filter: filter.value || undefined,
      marked: marked.value || undefined,
      page: page.value,
      show: view.value,
    },
  }),

  placeholderData: (previousData) => previousData,
})

const { open: openTransactionModal } = useTransactionModal()
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <UButton
        color="secondary"
        variant="soft"
        @click="openTransactionModal()"
      >
        {{ $ts('createTransaction') }}
      </UButton>
    </template>

    <main>
      <div class="py-5">
        <UCard>
          <template #header>
            <TransactionTableFilter
              v-model:filter="filter"
              v-model:marked="marked"
              v-model:view="view"
            />
          </template>

          <TransactionTable
            :loading="isLoading"
            :transactions="state.data?.data"
          />

          <template #footer>
            <SharedPagination
              :items-per-page="state.data?.per_page"
              :total="state.data?.total"
            />
          </template>
        </UCard>
      </div>
    </main>
  </NuxtLayout>
</template>
