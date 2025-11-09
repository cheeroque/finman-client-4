<script setup lang="ts">
import { useBalanceQuery } from '~/composables/queries/balance'

const { state } = useBalanceQuery()

const { formatNumber } = useLocaleFormatter()

const title = computed(() => formatNumber(state.value.data ?? 0))
</script>

<template>
  <UHeader :title>
    <template #right>
      <slot />
    </template>
  </UHeader>
</template>
