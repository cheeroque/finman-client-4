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
  <UiTable
    :columns
    :data="tableData"
    table-class="table-fixed"
  >
    <template #cell(subtotal)="{ item, toggleRowExpanded }">
      <UiButtonLink
        class="
          font-semibold
          hover:underline
        "
        @click="toggleRowExpanded()"
      >
        {{ formatNumber(item.subtotal) }}
      </UiButtonLink>
    </template>

    <template #row-expanded="{ row }">
      <TransactionExpansionTable :transactions="row.original.transactions" />
    </template>
  </UiTable>
</template>
