<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()

const { currentPage } = useQueryParams()
const transactionStore = useTransactionStore()
const { loading, transactions } = storeToRefs(transactionStore)

await useAsyncData(
  () => transactionStore.fetchTransactions(),
  { watch: [() => route.query] }
)

const paginationVisible = computed(
  () => Number(transactions.value?.total) > Number(transactions.value?.per_page)
)

useHead({
  titleTemplate: usePageTitle('transactions.title'),
})
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <TransactionDialogTrigger>
        <template #wrapper="{ open }">
          <LayoutCreateButton
            :caption="$ts('transactions.create')"
            @click="open()"
          />
        </template>
      </TransactionDialogTrigger>
    </template>

    <main
      class="
        flex flex-col gap-8
        max-lg:pb-16
      "
    >
      <div
        class="
          flex gap-6
          max-2xl:flex-wrap
          max-lg:hidden
        "
      >
        <TransactionFilterText class="max-2xl:basis-full" />

        <TransactionFilterView class="w-50" />

        <TransactionFilterMarked />
      </div>

      <TransactionTable
        :loading
        :transactions="transactions?.data"
      />

      <UiPagination
        v-if="paginationVisible"
        v-model="currentPage"
        :items-per-page="transactions?.per_page"
        :total="transactions?.total"
        class="max-lg:mx-auto"
      />
    </main>
  </NuxtLayout>
</template>
