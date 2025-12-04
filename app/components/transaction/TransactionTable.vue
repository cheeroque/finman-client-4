<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'

import type { Transaction } from '~~/shared/types/transaction'

defineProps<{
  loading?: boolean
  transactions?: Transaction[]
}>()

const { $localePath, $ts } = useI18n()

const columns = computed(() => [
  {
    accessorKey: 'created_at',
    header: $ts('transactions.columns.date'),
    meta: {
      class: {
        th: '2xl:w-50',
        td: 'max-2xl:text-sm max-2xl:font-semibold',
      },
    },
  },
  {
    accessorKey: 'sum',
    header: $ts('transactions.columns.sum'),
    meta: {
      class: {
        th: 'text-end 2xl:w-45',
        td: 'self-end row-span-2 text-end whitespace-nowrap max-2xl:pl-2',
      },
    },
  },
  {
    accessorKey: 'category_id',
    header: $ts('transactions.columns.category'),
    meta: {
      class: {
        th: '2xl:w-55',
        td: 'max-2xl:text-sm max-2xl:opacity-50',
      },
    },
  },
  {
    accessorKey: 'note',
    header: $ts('transactions.columns.note'),
    meta: {
      class: {
        td: 'max-2xl:col-start-1 max-2xl:col-span-full max-2xl:row-start-1 max-2xl:mb-1',
      },
    },
  },
])

const { view } = useTransactionsParams()

function getTrClass(row: Row<Transaction>) {
  const classlist = [
    'grid-cols-[auto_min-content]',
    'max-2xl:grid max-2xl:p-3 max-2xl:even:bg-neutral-50',
    'dark:max-2xl:even:bg-neutral-900',
  ]

  if (row.original.is_marked) {
    classlist.push(
      'row-marked',
      'max-2xl:bg-amber-50 max-2xl:even:bg-amber-50',
      'dark:max-2xl:bg-amber-950 dark:max-2xl:even:bg-amber-950'
    )
  } else if (row.original.category.is_income && !view.value) {
    classlist.push(
      'row-income',
      'max-2xl:bg-lime-100 max-2xl:even:bg-lime-100',
      'dark:max-2xl:bg-lime-800 dark:max-2xl:even:bg-lime-800'
    )
  }

  return classlist
}

const CELL_INTERACTIVE_CLASS = `hover:text-primary-600
  group-[.row-income]/row:hover:text-lime-600
  group-[.row-marked]/row:hover:text-amber-600
  dark:hover:text-primary-500
  dark:group-[.row-income]/row:hover:text-lime-500
  dark:group-[.row-marked]/row:hover:text-amber-500`
</script>

<template>
  <UiTable
    :columns
    :data="transactions"
    :loading
    td-class="
      group-[.row-income]/row:bg-lime-100
      group-[.row-income]/row:text-lime-800
      group-[.row-marked]/row:bg-amber-50
      max-2xl:p-0
      dark:group-[.row-income]/row:bg-lime-800
      dark:group-[.row-income]/row:text-lime-200
      dark:group-[.row-marked]/row:bg-amber-950
    "
    thead-class="max-2xl:hidden"
    :tr-class="getTrClass"
  >
    <template #cell(created_at)="{ item }">
      <TransactionTableDatetime
        :datetime="item.created_at"
        :class="CELL_INTERACTIVE_CLASS"
      />
    </template>

    <template #cell(sum)="{ item }">
      <TransactionTableSum
        :transaction="item"
        :class="[
          CELL_INTERACTIVE_CLASS,
          'text-xl leading-6',
          'max-2xl:text-2xl',
        ]"
      />
    </template>

    <template #cell(category_id)="{ item }">
      <UiButtonBase
        :to="$localePath(`/categories/${item.category.slug}`)"
        :class="[
          CELL_INTERACTIVE_CLASS,
          'opacity-65',
          'hover:underline',
        ]"
      >
        {{ item.category.name }}
      </UiButtonBase>
    </template>

    <template #cell(note)="{ item }">
      <TransactionTableNote
        :transaction="item"
        :class="CELL_INTERACTIVE_CLASS"
      />
    </template>
  </UiTable>
</template>
