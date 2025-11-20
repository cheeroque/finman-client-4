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
        td: 'max-2xl:w-40',
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
  if (row.getIsExpanded()) {
    return 'text-(--c-primary)'
  }

  if (row.original.is_income) {
    return 'row-income max-2xl:bg-(--c-success-light)'
  }

  if (row.original.is_total) {
    return 'row-total-expense max-2xl:bg-(--c-error-light)'
  }

  if (row.original.is_month_total) {
    return 'row-total-month font-semibold max-2xl:bg-(--c-info-light)'
  }

  return ''
}
</script>

<template>
  <UiTable
    :columns
    :data="tableData"
    table-class="table-fixed"
    td-class="
      group-[.row-income]/row:text-(--c-on-success-light) group-[.row-income]/row:bg-(--c-success-light)
      group-[.row-total-expense]/row:text-(--c-on-error-light) group-[.row-total-expense]/row:bg-(--c-error-light)
      group-[.row-total-month]/row:text-(--c-on-info-light) group-[.row-total-month]/row:bg-(--c-info-light)
      max-2xl:p-3
    "
    thead-class="max-2xl:hidden"
    :tr-class="getRowClass"
  >
    <template #cell(category)="{ item }">
      {{ item.name }}
    </template>

    <template #cell(subtotal)="{ item, toggleRowExpanded }">
      <UiButtonLink
        v-if="item.transactions.length"
        class="
          font-semibold
          hover:underline
        "
        @click="toggleRowExpanded()"
      >
        {{ formatNumber(item.subtotal) }}
      </UiButtonLink>

      <span
        v-else
        class="font-semibold"
      >
        {{ formatNumber(item.subtotal) }}
      </span>
    </template>

    <template #row-expanded="{ row }">
      <TransactionExpansionTable :transactions="row.original.transactions" />
    </template>
  </UiTable>
</template>
