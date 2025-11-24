<script setup lang="ts">
import { LazyTransactionDialog } from '#components'
import type { Transaction } from '~~/shared/types/transaction'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  transaction?: Transaction
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
