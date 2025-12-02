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
    header: $ts('columns.date'),
    meta: {
      class: {
        td: 'max-2xl:text-sm max-2xl:font-semibold',
      },
    },
  },
  {
    accessorKey: 'sum',
    header: $ts('columns.sum'),
    meta: {
      class: {
        th: 'text-end',
        td: 'self-end row-span-2 text-end whitespace-nowrap max-2xl:pl-2',
      },
    },
  },
  {
    accessorKey: 'category_id',
    header: $ts('columns.category'),
    meta: {
      class: {
        td: 'max-2xl:text-sm max-2xl:opacity-50',
      },
    },
  },
  {
    accessorKey: 'note',
    header: $ts('columns.note'),
    meta: {
      class: {
        td: 'max-2xl:col-start-1 max-2xl:col-span-full max-2xl:row-start-1 max-2xl:mb-1',
      },
    },
  },
])

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
  }

  return classlist
}

const CELL_INTERACTIVE_CLASS = `hover:text-primary-600
  group-[.row-marked]/row:hover:text-amber-600
  dark:hover:text-primary-500
  dark:group-[.row-marked]/row:hover:text-amber-500`
</script>

<template>
  <UiTable
    :columns
    :data="transactions"
    :loading
    td-class="
      group-[.row-marked]/row:bg-amber-50
      max-2xl:p-0
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
          'max-2xl:text-2xl max-2xl:text-primary-600',
        ]"
      />
    </template>

    <template #cell(category_id)="{ item }">
      <UiButtonBase
        :to="$localePath(`/categories/${item.category.slug}`)"
        :class="[
          CELL_INTERACTIVE_CLASS,
          'text-neutral-500',
          'hover:underline',
          'dark:text-neutral-400',
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
