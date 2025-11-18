<script setup lang="ts" generic="T extends string | number | null">
import type { InputHTMLAttributes } from 'vue'

const {
  id,
  type = 'text',
} = defineProps<{
  autocomplete?: InputHTMLAttributes['autocomplete']
  disabled?: boolean
  icon?: string
  id?: string
  hasError?: boolean
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
    :data-disabled="disabled || undefined"
    :data-invalid="hasError || undefined"
    class="
      flex rounded-lg bg-(--c-bg-input) px-1.5 outline
      outline-(--c-outline-light) transition-colors
      focus-within:outline-(--c-outline-primary)
      data-disabled:bg-(--c-bg-input-disabled)
      data-invalid:text-(--c-error) data-invalid:outline-(--c-error)
    "
  >
    <span
      v-if="icon"
      class="flex items-center pl-2.5 text-2xl text-(--c-text-dimmed)"
    >
      <Icon :name="icon" />
    </span>

    <input
      :id
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
      class="
        flex cursor-pointer items-center pr-2.5 text-(--c-text-dimmed)
        focus:text-(--c-primary) focus:outline-0
      "
      type="button"
      @click="modelValue = undefined"
    >
      <Icon name="mingcute:close-circle-fill" />
    </button>
  </div>
</template>
