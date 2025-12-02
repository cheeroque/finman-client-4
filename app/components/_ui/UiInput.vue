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
      flex rounded-lg bg-white px-1.5 outline outline-neutral-200
      transition-colors
      focus-within:outline-primary-400
      not-data-disabled:hover:outline-primary-300
      data-disabled:bg-neutral-100
      data-invalid:text-rose-600 data-invalid:outline-rose-600
      dark:bg-black dark:outline-neutral-800
      dark:focus-within:outline-primary-800
      dark:not-data-disabled:hover:outline-primary-900
      dark:data-disabled:bg-neutral-900 dark:data-invalid:text-rose-500
      dark:data-invalid:outline-rose-500
    "
  >
    <slot name="icon">
      <span
        v-if="icon"
        class="
          flex items-center pl-2.5 text-2xl text-neutral-300
          dark:text-neutral-700
        "
      >
        <Icon :name="icon" />
      </span>
    </slot>

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
        min-w-0 flex-auto px-2.5 py-3 text-base outline-0
        placeholder:opacity-50
      "
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    >

    <UiButtonBase
      v-if="modelValue"
      class="
        flex cursor-pointer items-center pr-2.5 text-neutral-300
        hover:text-primary-500
        focus:text-primary-600 focus:outline-0
        dark:text-neutral-700 dark:hover:text-primary-400
        dark:focus:text-primary-500
      "
      type="button"
      @click="modelValue = undefined"
    >
      <Icon
        name="mynaui:x-octagon-solid"
        class="text-lg"
      />
    </UiButtonBase>

    <slot name="trailing-icon" />
  </div>
</template>
