<script setup lang="ts">
import type { TransactionBase } from '~~/shared/types/transaction'

defineProps<{
  transactions?: TransactionBase[]
}>()

const { formatDate, formatNumber } = useLocaleFormatter()

const columns = computed(() => [
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
    :columns
    :data="transactions"
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
