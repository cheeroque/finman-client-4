<script setup lang="ts">
import type { Row } from '@tanstack/table-core'

import type { MonthCategoryWithTransactions, MonthTransactionsData } from '~~/shared/types/month'

const { data } = defineProps<{
  data?: MonthTransactionsData
}>()

const { $ts } = useI18n()

const { formatNumber } = useLocaleFormatter()

const tableData = computed(() => {
  if (!data) {
    return
  }

  const { expenseCategories, expensesTotal, incomeCategories, incomesTotal } = data

  if (!expenseCategories.length && !incomeCategories.length) {
    return []
  }

  const total = incomesTotal - expensesTotal

  const rows = expenseCategories.concat(incomeCategories).concat({
    is_income: false,
    is_total: true,
    name: $ts('total.expenses'),
    subtotal: expensesTotal,
    transactions: [],
  }).concat({
    is_income: false,
    is_month_total: true,
    name: $ts('total.month'),
    subtotal: total,
    transactions: [],
  })

  return rows
})

const columns = computed(() => [
  {
    accessorKey: 'category',
    header: $ts('columns.category'),
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

function getRowClass(row: Row<MonthCategoryWithTransactions>) {
  if (row.original.is_income) {
    return 'text-green-700 bg-green-50'
  }

  if (row.original.is_total) {
    return 'text-red-700 bg-red-50'
  }

  if (row.original.is_month_total) {
    return 'font-semibold text-blue-700 bg-blue-50'
  }

  return ''
}
</script>

<template>
  <UTable
    :data="tableData"
    :columns
    :meta="{
      class: {
        tr: getRowClass,
      },
    }"
    :ui="{
      base: 'table-fixed',
      tbody: '[&>tr[data-expanded=true]+tr>td]:p-0',
    }"
  >
    <template #category-cell="{ row }">
      {{ row.original.name }}
    </template>

    <template #subtotal-cell="{ row }">
      <UButton
        v-if="row.original.transactions.length"
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
