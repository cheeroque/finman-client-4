<script setup lang="ts">
import type { TransactionBase } from '~~/shared/types/transaction'

defineProps<{
  transactions?: TransactionBase[]
}>()

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

const CELL_INTERACTIVE_CLASS = `hover:text-primary-600 dark:hover:text-primary-500`
</script>

<template>
  <div
    class="
      border border-violet-100
      lg:rounded-b-lg
      dark:border-violet-950
    "
  >
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
        <TransactionTableDatetime
          :datetime="item.created_at"
          :class="CELL_INTERACTIVE_CLASS"
        />
      </template>

      <template #cell(sum)="{ item }">
        <TransactionTableSum
          :transaction="item"
          :class="CELL_INTERACTIVE_CLASS"
        />
      </template>

      <template #cell(note)="{ item }">
        <TransactionTableNote
          :transaction="item"
          :class="CELL_INTERACTIVE_CLASS"
        />
      </template>
    </UiTable>
  </div>
</template>
