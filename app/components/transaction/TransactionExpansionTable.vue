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
  <UiTable
    :columns
    :data="transactions"
    table-class="table-fixed rounded-lg bg-gray-50"
    thead-class="hidden"
  >
    <template #cell(created_at)="{ item }">
      {{ formatDate(item.created_at) }}
    </template>

    <template #cell(sum)="{ item }">
      {{ formatNumber(item.sum) }}
    </template>
  </UiTable>
</template>
