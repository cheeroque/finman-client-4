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
        td: 'w-[30%] row-span-2',
      },
    },
  },
  {
    accessorKey: 'sum',
    meta: {
      class: {
        td: 'w-[20%] font-semibold',
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
    td-class="max-2xl:w-full max-2xl:p-0"
    table-class="
      table-fixed rounded-lg
      max-2xl:text-sm
    "
    thead-class="hidden"
    tr-class="
      grid-cols-[10rem_1fr]
      max-2xl:grid max-2xl:p-3 max-2xl:even:bg-neutral-50
      dark:max-2xl:even:bg-neutral-900
    "
  >
    <template #cell(created_at)="{ item }">
      {{ formatDate(item.created_at) }}
    </template>

    <template #cell(sum)="{ item }">
      <TransactionDialogTrigger :transaction="item">
        {{ formatNumber(item.sum) }}
      </TransactionDialogTrigger>
    </template>

    <template #cell(note)="{ item }">
      <TransactionDialogTrigger :transaction="item">
        {{ item.note }}
      </TransactionDialogTrigger>
    </template>
  </UiTable>
</template>
