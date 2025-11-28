<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'

import type { Transaction } from '~~/shared/types/transaction'

const { transactions = [] } = defineProps<{
  loading?: boolean
  transactions?: Transaction[]
}>()

const { $localePath, $ts } = useI18n()

const { formatDate, formatPeriod, formatNumber, parseDateTime } = useLocaleFormatter()

const data = computed(() => transactions?.map((transaction) => ({
  ...transaction,
  created_at_formatted: formatDate(transaction.created_at, {
    dateStyle: 'short',
    timeStyle: 'short',
  }),
  period: formatPeriod(parseDateTime(transaction.created_at)),
  sum_formatted: formatNumber(transaction.sum),
})))

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
    :data
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
      <UiButtonBase
        :to="$localePath(`/months/${item.period}`)"
        :class="[
          CELL_INTERACTIVE_CLASS,
          'hover:underline',
        ]"
      >
        {{ item.created_at_formatted }}
      </UiButtonBase>
    </template>

    <template #cell(sum)="{ item }">
      <TransactionDialogTrigger
        :transaction="item"
        :class="[
          CELL_INTERACTIVE_CLASS,
          'text-xl leading-6 font-medium',
          'max-2xl:text-2xl max-2xl:text-primary-600',
          'group-[.row-marked]/row:text-amber-600',
          'dark:group-[.row-marked]/row:text-amber-500',
          'dark:max-2xl:text-primary-500',
        ]"
      >
        {{ item.sum_formatted }}
      </TransactionDialogTrigger>
    </template>

    <template #cell(category_id)="{ item }">
      <UiButtonBase
        :to="$localePath(`/categories/${item.category.slug}`)"
        :class="[
          CELL_INTERACTIVE_CLASS,
          'text-neutral-500',
          'hover:underline',
        ]"
      >
        {{ item.category.name }}
      </UiButtonBase>
    </template>

    <template #cell(note)="{ item }">
      <TransactionDialogTrigger
        :transaction="item"
        :class="[
          CELL_INTERACTIVE_CLASS,
          'group/button flex w-full items-center gap-2 text-start',
        ]"
      >
        <Icon
          v-if="item.is_marked"
          name="mynaui:star-solid"
          class="
            text-lg text-amber-300
            dark:text-amber-800
          "
        />

        <span class="flex-auto">
          {{ item.note }}
        </span>

        <Icon
          name="mynaui:edit"
          class="
            text-2xl opacity-0 transition-opacity
            group-hover/button:opacity-50
          "
        />
      </TransactionDialogTrigger>
    </template>
  </UiTable>
</template>
