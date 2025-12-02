<script setup lang="ts">
const { sum } = defineProps<{
  sum: number
}>()

const { formatNumber } = useLocaleFormatter()

const formattedSum = computed(() => formatNumber(sum))
</script>

<template>
  <span class="font-medium">
    {{ formattedSum }}
  </span>
</template>
