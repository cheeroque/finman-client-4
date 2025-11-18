<script setup lang="ts">
import type { Snapshot } from '~~/shared/types/snapshot'

const { snapshots } = defineProps<{
  loading?: boolean
  snapshots?: Snapshot[]
}>()

const { $ts } = useI18n()

const { formatDate, formatNumber } = useLocaleFormatter()

const data = computed(() => snapshots?.map((snapshot) => ({
  ...snapshot,
  created_at: formatDate(snapshot.created_at, {
    dateStyle: 'short',
    timeStyle: 'short',
  }),
  balance: formatNumber(snapshot.balance),
})))

const columns = computed(() => [
  {
    accessorKey: 'created_at',
    header: $ts('columns.date'),
  },
  {
    accessorKey: 'balance',
    header: $ts('columns.balance'),
    meta: {
      class: {
        th: 'text-end',
        td: 'text-end',
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
    :data
    :loading
  />
</template>
