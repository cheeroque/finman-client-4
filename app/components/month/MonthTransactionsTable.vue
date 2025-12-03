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
    name: $ts('month.total.expenses'),
    subtotal: expensesTotal,
    transactions: [],
  }).concat({
    is_income: false,
    is_month_total: true,
    name: $ts('month.total.month'),
    subtotal: total,
    transactions: [],
  })

  return rows
})

const columns = computed(() => [
  {
    accessorKey: 'category',
    header: $ts('month.columns.category'),
    meta: {
      class: {
        td: 'max-2xl:w-40',
        th: 'w-[30%]',
      },
    },
  },
  {
    accessorKey: 'subtotal',
    header: $ts('month.columns.sum'),
    meta: {
      class: {
        th: 'w-[70%]',
      },
    },
  },
])

function getRowClass(row: Row<MonthCategoryWithTransactions>) {
  const classlist = []

  if (row.original.is_income) {
    classlist.push('row-income max-2xl:bg-lime-100 dark:max-2xl:bg-lime-800')
  }

  if (row.original.is_total) {
    classlist.push('row-total-expense max-2xl:bg-rose-100 dark:max-2xl:bg-rose-800')
  }

  if (row.original.is_month_total) {
    classlist.push('row-total-month font-semibold max-2xl:bg-sky-100 dark:max-2xl:bg-sky-800')
  }

  return classlist
}
</script>

<template>
  <UiTable
    :columns
    :data="tableData"
    table-class="table-fixed"
    td-class="
      group-data-expanded/row:text-primary-600
      group-[.row-income]/row:bg-lime-100
      group-[.row-income]/row:text-lime-800
      group-[.row-income[data-expanded]]/row:text-lime-600
      group-[.row-total-expense]/row:bg-rose-100
      group-[.row-total-expense]/row:text-rose-800
      group-[.row-total-month]/row:bg-sky-100
      group-[.row-total-month]/row:text-sky-800
      max-2xl:p-3
      dark:group-data-expanded/row:text-primary-500
      dark:group-[.row-income]/row:bg-lime-800
      dark:group-[.row-income]/row:text-lime-200
      dark:group-[.row-income[data-expanded]]/row:text-lime-500
      dark:group-[.row-total-expense]/row:bg-rose-800
      dark:group-[.row-total-expense]/row:text-rose-200
      dark:group-[.row-total-month]/row:bg-sky-800
      dark:group-[.row-total-month]/row:text-sky-200
    "
    thead-class="max-2xl:hidden"
    :tr-class="getRowClass"
  >
    <template #cell(category)="{ item }">
      {{ item.name }}
    </template>

    <template #cell(subtotal)="{ item, toggleRowExpanded }">
      <UiButtonBase
        v-if="item.transactions.length"
        class="
          font-semibold
          hover:underline
        "
        @click="toggleRowExpanded()"
      >
        {{ formatNumber(item.subtotal) }}
      </UiButtonBase>

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
