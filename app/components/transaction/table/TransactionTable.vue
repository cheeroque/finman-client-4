<script setup lang="ts">
import type { TransactionDto } from '~~/shared/types/transaction'

const { transactions = [] } = defineProps<{
  loading?: boolean
  transactions?: TransactionDto[]
}>()

const { $ts } = useI18n()

const { formatDate, formatNumber } = useLocaleFormatter()

const data = computed(() => transactions?.map(transaction => ({
  ...transaction,
  created_at: formatDate(transaction.created_at, {
    dateStyle: 'short',
    timeStyle: 'short',
  }),
  sum: formatNumber(transaction.sum),
})))

const columns = computed(() => [
  {
    accessorKey: 'created_at',
    header: $ts('columns.date'),
  },
  {
    accessorKey: 'sum',
    header: $ts('columns.sum'),
    meta: {
      class: {
        th: 'text-end',
        td: 'text-end',
      },
    },
  },
  {
    accessorKey: 'category_id',
    header: $ts('columns.category'),
  },
  {
    accessorKey: 'note',
    header: $ts('columns.note'),
  },
])
</script>

<template>
  <UTable
    :columns
    :data
    :loading
  >
    <template #category_id-cell="{ row }">
      {{ row.original.category.name }}
    </template>
  </UTable>
</template>
