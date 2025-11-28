<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import type { AcceptableValue } from 'reka-ui'
import { twMerge, type ClassNameValue } from 'tailwind-merge'

const {
  iconChecked = 'mynaui:check-square-solid',
  iconIndeterminate = 'mynaui:minus-square-solid',
  iconUnchecked = 'mynaui:square',
  id,
  variant = 'primary',
} = defineProps<{
  checkedColor?: string
  disabled?: boolean
  iconChecked?: string
  iconClass?: ClassNameValue
  iconIndeterminate?: string
  iconUnchecked?: string
  id?: string
  required?: boolean
  value?: AcceptableValue
  variant?: 'amber' | 'primary'
}>()

const modelValue = defineModel<boolean | 'indeterminate'>()

const inputId = computed(() => id ?? useId())

const iconName = computed(() => {
  if (modelValue.value === 'indeterminate') {
    return iconIndeterminate
  }

  if (modelValue.value) {
    return iconChecked
  }

  return iconUnchecked
})

const VARIANT_CLASSES = {
  amber: `group-hover/label:text-amber-200
    data-[state=checked]:text-amber-300
    data-[state=indeterminate]:text-amber-300
    dark:group-hover/label:text-amber-900
    dark:data-[state=checked]:text-amber-800
    dark:data-[state=indeterminate]:text-amber-800`,
  primary: `group-hover/label:text-primary-300
    data-[state=checked]:text-primary-600
    data-[state=indeterminate]:text-primary-600
    dark:group-hover/label:text-primary-900
    dark:data-[state=checked]:text-primary-500
    dark:data-[state=indeterminate]:text-primary-500`,
} as const
</script>

<template>
  <label
    :data-disabled="disabled || undefined"
    :for="inputId"
    class="
      group/label flex cursor-pointer items-center gap-2
      data-disabled:opacity-50
    "
  >
    <CheckboxRoot
      :id="inputId"
      v-model="modelValue"
      :disabled
      :required
      :value
      :class="twMerge(
        `
          flex aspect-square flex-none appearance-none items-center
          justify-center text-neutral-200 transition-colors outline-none
          dark:text-neutral-800
        `,
        VARIANT_CLASSES[variant],
      )"
    >
      <CheckboxIndicator
        class="flex size-full items-center justify-center"
        force-mount
      >
        <Icon
          :name="iconName"
          :class="twMerge(
            'text-xl',
            iconClass,
          )"
        />
      </CheckboxIndicator>
    </CheckboxRoot>

    <slot />
  </label>
</template>
