<script setup lang="ts">
import { useBalanceQuery } from '~/composables/queries/balance'

const { state } = useBalanceQuery()

const { formatNumber } = useLocaleFormatter()

const title = computed(() => formatNumber(state.value.data ?? 0))
</script>

<template>
  <header
    class="
      flex flex-col items-center border-b border-(--c-outline-light) px-8 pt-2
      pb-4
      lg:flex-row lg:pt-0 lg:pb-8
    "
  >
    <div class="flex-auto">
      <h1
        class="
          text-3xl font-medium
          max-lg:text-center
          lg:text-5xl
        "
      >
        {{ title }}
      </h1>
    </div>

    <div
      class="
        flex-none
        max-lg:hidden
      "
    >
      <slot />
    </div>
  </header>
</template>
