<script setup lang="ts">
const modelValue = defineModel<string>()

const popoverOpen = ref(false)

function handleClickPicker(event: MouseEvent) {
  if (event.target instanceof HTMLElement && event.target.closest('.color-picker-selector')) {
    popoverOpen.value = false
  }
}
</script>

<template>
  <UPopover v-model:open="popoverOpen">
    <UButton
      color="neutral"
      icon="solar:paint-roller-bold"
      size="xs"
      class="rounded-full"
      :style="{ backgroundColor: modelValue }"
    />

    <template #content>
      <UColorPicker
        v-model="modelValue"
        :ui="{ selector: 'color-picker-selector' }"
        @click="handleClickPicker"
      />
    </template>
  </UPopover>
</template>
