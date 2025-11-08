<script setup lang="ts">
import type { Transaction } from '~~/shared/types/transaction'

const { transactions = [] } = defineProps<{
  loading?: boolean
  transactions?: Transaction[]
}>()

const { $localePath, $ts } = useI18n()

const { formatDate, formatPeriod, formatNumber, parseDate } = useLocaleFormatter()

const data = computed(() => transactions?.map((transaction) => ({
  ...transaction,
  created_at: formatDate(transaction.created_at, {
    dateStyle: 'short',
    timeStyle: 'short',
  }),
  period: formatPeriod(parseDate(transaction.created_at)),
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
    <template #created_at-cell="{ row }">
      <NuxtLink
        :to="$localePath(`/months/${row.original.period}`)"
        class="hover:underline"
      >
        {{ row.original.created_at }}
      </NuxtLink>
    </template>

    <template #category_id-cell="{ row }">
      <NuxtLink
        :to="$localePath(`/categories/${row.original.category.slug}`)"
        class="hover:underline"
      >
        {{ row.original.category.name }}
      </NuxtLink>
    </template>
  </UTable>
</template>
