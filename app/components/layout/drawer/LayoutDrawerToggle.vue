<script setup lang="ts">
const { active } = defineProps<{
  active?: boolean
}>()

const icon = computed(() => active ? 'mingcute:close-line' : 'mingcute:menu-line')
</script>

<template>
  <button
    :class="[
      'flex size-7 cursor-pointer rounded-full p-0.5 text-2xl transition-colors',
      active && 'bg-(--c-bg-app-active)',
    ]"
  >
    <Icon :name="icon" />
  </button>
</template>
