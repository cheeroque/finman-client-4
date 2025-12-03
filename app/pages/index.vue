<script setup lang="ts">
definePageMeta({
  layout: false,
})

const { data, status } = await useTransactions()
const loading = useAsyncDataLoading(status)

const { page } = useTransactionsParams()

const paginationVisible = computed(() => Number(data.value?.total) > Number(data.value?.per_page))
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

    <main class="flex flex-col gap-8">
      <div
        class="
          flex gap-6
          max-2xl:flex-wrap
          max-lg:hidden
        "
      >
        <TransactionFilterText
          icon="mynaui:search"
          class="max-2xl:basis-full"
        />

        <TransactionFilterView class="w-50" />

        <TransactionFilterMarked />
      </div>

      <TransactionTable
        :loading
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
