<script setup lang="ts">
import { useTransactionsQuery } from '~/composables/queries/transactions'

definePageMeta({
  layout: false,
})

const { state, isLoading } = useTransactionsQuery()

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
            <div class="flex items-center gap-5 py-1">
              <TransactionFilterText icon="mingcute:search-line" />

              <TransactionFilterView class="w-50" />

              <TransactionFilterMarked />
            </div>
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
