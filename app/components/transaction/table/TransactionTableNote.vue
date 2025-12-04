<script setup lang="ts">
import type { TransactionBase } from '~~/shared/types/transaction'

const { transaction } = defineProps<{
  transaction: TransactionBase
}>()
</script>

<template>
  <TransactionDialogTrigger
    :transaction
    class="group/button flex w-full items-start gap-2 text-start"
  >
    <Icon
      v-if="transaction.is_marked"
      name="mynaui:star-solid"
      class="
        my-0.75 flex-none text-lg text-amber-300
        max-2xl:order-99
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
        2xl:group-hover/button:opacity-50
      "
    />
  </TransactionDialogTrigger>
</template>
