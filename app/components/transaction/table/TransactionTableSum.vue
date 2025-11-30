<script setup lang="ts">
import type { TransactionBase } from '~~/shared/types/transaction'

const { transaction } = defineProps<{
  transaction: TransactionBase
}>()

const { formatNumber } = useLocaleFormatter()

const formattedSum = computed(() => formatNumber(transaction.sum))
</script>

<template>
  <TransactionDialogTrigger
    :transaction
    :class="[
      'font-medium',
      'group-[.row-marked]/row:text-amber-600',
      'dark:group-[.row-marked]/row:text-amber-500',
      'dark:max-2xl:text-primary-500',
    ]"
  >
    {{ formattedSum }}
  </TransactionDialogTrigger>
</template>
