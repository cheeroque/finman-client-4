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

const detailColumns = computed(() => [
  {
    accessorKey: 'created_at',
    meta: {
      class: {
        td: 'w-[30%]',
      },
    },
  },
  {
    accessorKey: 'sum',
    meta: {
      class: {
        td: 'w-[20%]',
      },
    },
  },
  {
    accessorKey: 'note',
    meta: {
      class: {
        td: 'w-[50%]',
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
      <UTable
        :columns="detailColumns"
        :data="row.original.transactions"
        :ui="{
          base: 'table-fixed bg-gray-50',
          thead: 'hidden',
        }"
      >
        <template #created_at-cell="{ row: detailRow }">
          {{ formatDate(detailRow.original.created_at) }}
        </template>

        <template #sum-cell="{ row: detailRow }">
          {{ formatNumber(detailRow.original.sum) }}
        </template>
      </UTable>
    </template>
  </UTable>
</template>
