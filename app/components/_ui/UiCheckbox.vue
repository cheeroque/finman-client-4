<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import type { AcceptableValue } from 'reka-ui'

const { id } = defineProps<{
  disabled?: boolean
  id?: string
  required?: boolean
  value?: AcceptableValue
}>()

const modelValue = defineModel<boolean | 'indeterminate'>()

const inputId = computed(() => id ?? useId())
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
        rounded border border-neutral-200 bg-white transition-colors
        outline-none
        group-hover/label:border-primary-300
        data-[state=checked]:border-primary-600
        data-[state=checked]:bg-primary-600
        data-[state=indeterminate]:border-primary-600
        data-[state=indeterminate]:bg-primary-600
        dark:border-neutral-800 dark:bg-black
        dark:group-hover/label:border-primary-900
        dark:data-[state=checked]:border-primary-500
        dark:data-[state=checked]:bg-primary-500
        dark:data-[state=indeterminate]:border-primary-500
        dark:data-[state=indeterminate]:bg-primary-500
      "
    >
      <CheckboxIndicator
        class="flex h-full w-full items-center justify-center"
      >
        <Icon
          name="mingcute:check-fill"
          class="
            text-xs text-white
            dark:text-neutral-900
          "
        />
      </CheckboxIndicator>
    </CheckboxRoot>

    <slot />
  </label>
</template>
