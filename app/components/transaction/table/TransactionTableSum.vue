<script setup lang="ts">
import type { TransactionBase } from '~~/shared/types/transaction'

const { transaction } = defineProps<{
  transaction: TransactionBase
}>()
</script>

<template>
  <TransactionDialogTrigger
    :transaction
    :class="[
      'max-2xl:text-primary-600',
      'group-[.row-income]/row:text-lime-600',
      'group-[.row-marked]/row:text-amber-600',
      'dark:group-[.row-income]/row:text-lime-500',
      'dark:group-[.row-marked]/row:text-amber-500',
      'dark:max-2xl:text-primary-500',
    ]"
  >
    <TableCellSum :sum="transaction.sum" />
  </TransactionDialogTrigger>
</template>
