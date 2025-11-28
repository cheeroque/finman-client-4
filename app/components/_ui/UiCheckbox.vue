<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import type { AcceptableValue } from 'reka-ui'

const {
  iconChecked = 'mynaui:check-square-solid',
  iconIndeterminate = 'mynaui:minus-square-solid',
  iconUnchecked = 'mynaui:square',
  id,
} = defineProps<{
  disabled?: boolean
  iconChecked?: string
  iconIndeterminate?: string
  iconUnchecked?: string
  id?: string
  required?: boolean
  value?: AcceptableValue
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
      class="
        flex size-5 flex-none appearance-none items-center justify-center
        text-neutral-200 transition-colors outline-none
        group-hover/label:text-primary-300
        data-[state=checked]:text-primary-600
        data-[state=indeterminate]:text-primary-600
        dark:text-neutral-800 dark:group-hover/label:text-primary-900
        dark:data-[state=checked]:text-primary-500
        dark:data-[state=indeterminate]:text-primary-500
      "
    >
      <CheckboxIndicator
        class="flex size-full items-center justify-center"
        force-mount
      >
        <Icon
          :name="iconName"
          class="text-xl"
        />
      </CheckboxIndicator>
    </CheckboxRoot>

    <slot />
  </label>
</template>
