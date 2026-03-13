<script setup lang="ts">
import type { ClassValue } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { class: className } = defineProps<{
  class?: ClassValue
  loading?: boolean
}>()
</script>

<template>
  <span
    v-if="loading"
    :class="mergeClasses(
      'inline-block animate-pulse rounded-lg bg-current/10',
      className,
    )"
  />

  <slot v-else />
</template>
