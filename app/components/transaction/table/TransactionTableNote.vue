<script setup lang="ts">
import type { TransactionBase } from '~~/shared/types/transaction'

const { transaction } = defineProps<{
  transaction: TransactionBase
}>()
</script>

<template>
  <TransactionDialogTrigger
    :transaction
    class="group/button flex w-full items-center gap-2 text-start"
  >
    <Icon
      v-if="transaction.is_marked"
      name="mynaui:star-solid"
      class="
        text-lg text-amber-300
        dark:text-amber-800
      "
    />

    <span class="flex-auto">
      {{ transaction.note }}
    </span>

    <Icon
      name="mynaui:edit"
      class="
        text-2xl opacity-0 transition-opacity
        group-hover/button:opacity-50
      "
    />
  </TransactionDialogTrigger>
</template>
