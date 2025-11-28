<script setup lang="ts">
const { color } = defineProps<{
  color: string
}>()

const dataTextDark = computed(() => getContrastColor(color, 'true', 'false'))
</script>

<template>
  <span
    :data-text-dark
    class="
      inline-flex rounded-full bg-(--bg-color) px-2 py-1 text-xs font-medium
      data-[text-dark=false]:text-white
      data-[text-dark=true]:text-neutral-900
    "
    :style="{
      '--bg-color': color,
    }"
  >
    {{ color }}
  </span>
</template>
