<script setup lang="ts">
import type { Snapshot } from '~~/shared/types/snapshot'

const { snapshots } = defineProps<{
  loading?: boolean
  snapshots?: Snapshot[]
}>()

const { $ts } = useI18n()

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
    accessorKey: 'balance',
    header: $ts('columns.balance'),
    meta: {
      class: {
        th: 'text-end',
        td: 'self-end row-span-2 text-end whitespace-nowrap max-2xl:pl-2',
      },
    },
  },
  {
    accessorKey: 'note',
    header: $ts('columns.note'),
  },
])
</script>

<template>
  <UiTable
    :columns
    :data="snapshots"
    :loading
    td-class="max-2xl:p-0"
    thead-class="max-2xl:hidden"
    tr-class="
      grid-cols-[auto_min-content]
      max-2xl:grid max-2xl:p-3 max-2xl:even:bg-neutral-50
      dark:max-2xl:even:bg-neutral-900
    "
  >
    <template #cell(created_at)="{ item }">
      <TableCellDatetime :datetime="item.created_at" />
    </template>

    <template #cell(balance)="{ item }">
      <TableCellSum
        class="text-xl leading-6"
        :sum="item.balance"
      />
    </template>
  </UiTable>
</template>
