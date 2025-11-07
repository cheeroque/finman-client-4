<script setup lang="ts">
import type { CategoryWithTransactions } from '~~/shared/types/category'
import type { Entries } from '~~/shared/types/util'

const { data } = defineProps<{
  data?: CategoryWithTransactions['data']
}>()

const { $ts } = useI18n()

const { formatDate, formatNumber, parsePeriod } = useLocaleFormatter()

const tableData = computed(() => {
  if (!data) {
    return
  }

  const entries = Object.entries(data) as Entries<CategoryWithTransactions['data']>

  return entries.map(([period, transactions]) => ({
    period: formatDate(parsePeriod(period).toISOString(), {
      month: 'long',
      year: 'numeric',
    }),
    subtotal: transactions.reduce((sum, transaction) => sum + transaction.sum, 0),
    transactions,
  }))
})

const columns = computed(() => [
  {
    accessorKey: 'period',
    header: $ts('columns.period'),
    meta: {
      class: {
        th: 'w-[30%]',
      },
    },
  },
  {
    accessorKey: 'subtotal',
    header: $ts('columns.sum'),
    meta: {
      class: {
        th: 'w-[70%]',
      },
    },
  },
])
</script>

<template>
  <UTable
    :data="tableData"
    :columns
    :ui="{
      base: 'table-fixed',
      tbody: '[&>tr[data-expanded=true]+tr>td]:p-0',
    }"
  >
    <template #subtotal-cell="{ row }">
      <UButton
        variant="soft"
        @click="row.toggleExpanded()"
      >
        {{ formatNumber(row.original.subtotal) }}
      </UButton>
    </template>

    <template #expanded="{ row }">
      <TransactionExpansionTable :transactions="row.original.transactions" />
    </template>
  </UTable>
</template>
