<script setup lang="ts">
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

const { open: openTransactionModal } = useTransactionModal()
</script>

<template>
  <UiTable
    :columns
    :data
    :loading
    td-class="max-2xl:p-0"
    thead-class="max-2xl:hidden"
    tr-class="grid-cols-[auto_min-content] even:bg-(--c-table-alternate-bg) max-2xl:grid max-2xl:p-3"
  >
    <template #cell(created_at)="{ item }">
      <NuxtLink
        :to="$localePath(`/months/${item.period}`)"
        class="
          transition-colors
          hover:text-(--c-primary) hover:underline
        "
      >
        {{ item.created_at_formatted }}
      </NuxtLink>
    </template>

    <template #cell(sum)="{ item }">
      <UiButtonLink
        class="
          text-xl leading-6 font-medium transition-colors
          hover:text-(--c-primary)
          max-2xl:text-2xl max-2xl:text-(--c-primary)
        "
        @click="openTransactionModal({ transaction: item })"
      >
        {{ item.sum_formatted }}
      </UiButtonLink>
    </template>

    <template #cell(category_id)="{ item }">
      <NuxtLink
        :to="$localePath(`/categories/${item.category.slug}`)"
        class="
          transition-colors
          hover:text-(--c-primary) hover:underline
        "
      >
        {{ item.category.name }}
      </NuxtLink>
    </template>

    <template #cell(note)="{ item }">
      <UiButtonLink
        class="
          group/button flex w-full items-center gap-4 text-start
          transition-colors
          hover:text-(--c-primary)
        "
        @click="openTransactionModal({ transaction: item })"
      >
        <span class="flex-auto">
          {{ item.note }}
        </span>

        <Icon
          name="mingcute:edit-2-line"
          class="
            text-2xl opacity-0 transition-opacity
            group-hover/button:opacity-50
          "
        />
      </UiButtonLink>
    </template>
  </UiTable>
</template>
