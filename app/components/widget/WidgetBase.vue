<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <UCard>
    <template #header>
      <p class="font-medium">
        {{ title }}
      </p>
    </template>

    <slot />
  </UCard>
</template>
