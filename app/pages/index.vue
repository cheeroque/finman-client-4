<script setup lang="ts">
import { useTransactionsQuery } from '~/composables/queries/transactions'

definePageMeta({
  layout: false,
})

const { page, state, isLoading } = useTransactionsQuery()

const { open: openTransactionModal } = useTransactionModal()

const paginationVisible = computed(() => Number(state.value.data?.total) > Number(state.value.data?.per_page))
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <UiButton
        variant="primary-light"
        @click="openTransactionModal()"
      >
        {{ $ts('createTransaction') }}
      </UiButton>
    </template>

    <main>
      <div class="flex flex-col gap-8">
        <div
          class="
            flex gap-6
            max-2xl:flex-wrap
            max-lg:hidden
          "
        >
          <TransactionFilterText
            icon="mingcute:search-line"
            class="max-2xl:basis-full"
          />

          <TransactionFilterView class="w-50" />

          <TransactionFilterMarked />
        </div>

        <TransactionTable
          :loading="isLoading"
          :transactions="state.data?.data"
        />

        <UiPagination
          v-if="paginationVisible"
          v-model="page"
          :items-per-page="state.data?.per_page"
          :total="state.data?.total"
        />
      </div>
    </main>
  </NuxtLayout>
</template>
