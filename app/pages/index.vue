<script lang="ts">
import { useTransactions } from '~/composables/loaders/transactions'

export { useTransactions }
</script>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const { data, isLoading } = useTransactions()
const { page } = useTransactionsQueryParams()

const paginationVisible = computed(() => Number(data.value?.total) > Number(data.value?.per_page))
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <TransactionDialogTrigger>
        <template #wrapper="{ open }">
          <LayoutCreateButton
            :caption="$ts('createTransaction')"
            @click="open()"
          />
        </template>
      </TransactionDialogTrigger>
    </template>

    <main class="flex flex-col gap-8">
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
        :transactions="data?.data"
      />

      <UiPagination
        v-if="paginationVisible"
        v-model="page"
        :items-per-page="data?.per_page"
        :total="data?.total"
        class="max-lg:mx-auto"
      />
    </main>
  </NuxtLayout>
</template>
