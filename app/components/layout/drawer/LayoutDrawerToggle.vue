<script setup lang="ts">
const { active } = defineProps<{
  active?: boolean
}>()

const icon = computed(() => active ? 'mynaui:x' : 'mynaui:menu')
</script>

<template>
  <UiButtonBase
    :active
    class="
      flex size-7 rounded-full p-0.5 text-2xl
      data-active:bg-primary-300
      dark:data-active:bg-primary-800
    "
  >
    <Icon :name="icon" />
  </UiButtonBase>
</template>
