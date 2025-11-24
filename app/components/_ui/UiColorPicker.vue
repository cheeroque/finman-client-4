<script setup lang="ts">
const modelValue = defineModel<string>()

const dataTextDark = computed(() => modelValue.value
  ? getContrastColor(modelValue.value, 'true', 'false')
  : undefined
)
</script>

<template>
  <label
    :data-empty="!modelValue || undefined"
    :data-text-dark
    class="
      mr-0.5 flex cursor-pointer self-center rounded-full bg-(--bg-color) p-1.5
      outline-(--c-outline-light)
      data-empty:outline
      data-[text-dark=false]:text-(--color-white)
      data-[text-dark=true]:text-(--color-black)
    "
    :style="{
      '--bg-color': modelValue,
    }"
  >
    <Icon
      name="mingcute:paint-brush-line"
      class="text-xl"
    />

    <input
      v-model="modelValue"
      type="color"
      class="invisible absolute size-0"
    >

  </label>
</template>
