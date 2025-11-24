<script setup lang="ts">
import { LazyTransactionDialog } from '#components'
import type { TransactionBase } from '~~/shared/types/transaction'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  transaction?: TransactionBase
}>()

const { register } = useDialog()
const { open } = register(LazyTransactionDialog)
</script>

<template>
  <slot
    name="wrapper"
    :open="() => open({ transaction })"
  >
    <UiButtonBase
      v-bind="$attrs"
      @click="open({ transaction })"
    >
      <slot />
    </UiButtonBase>
  </slot>
</template>
