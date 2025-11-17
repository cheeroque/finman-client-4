<script setup lang="ts" generic="T extends string | number | null">
import type { InputHTMLAttributes } from 'vue'

const { type = 'text' } = defineProps<{
  autocomplete?: InputHTMLAttributes['autocomplete']
  disabled?: boolean
  icon?: string
  placeholder?: string
  required?: boolean
  type?: InputHTMLAttributes['type']
}>()

const emit = defineEmits<{
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const modelValue = defineModel<T>()

const inputRef = useTemplateRef('inputRef')

defineExpose({ inputRef })
</script>

<template>
  <div
    class="
      flex rounded-lg bg-(--c-bg-content) px-1.5 outline
      outline-(--c-outline-light) transition-colors
      focus-within:outline-(--c-outline-primary)
    "
  >
    <span
      v-if="icon"
      class="flex items-center pl-2.5 text-2xl text-(--c-text-dimmed)"
    >
      <Icon :name="icon" />
    </span>

    <input
      ref="inputRef"
      v-model="modelValue"
      :autocomplete
      :disabled
      :placeholder
      :required
      :type
      class="
        flex-auto px-2.5 py-3 text-base text-(--c-text) outline-0
        placeholder:opacity-50
      "
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    >

    <button
      v-if="modelValue"
      class="flex cursor-pointer items-center pr-2.5 text-(--c-text-dimmed)"
      @click="modelValue = undefined"
    >
      <Icon name="mingcute:close-circle-fill" />
    </button>
  </div>
</template>
