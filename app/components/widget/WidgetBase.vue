<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex flex-col gap-5">
    <p class="text-lg font-medium">
      {{ title }}
    </p>

    <slot />
  </div>
</template>
