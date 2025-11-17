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
      flex cursor-pointer items-center gap-2
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
        rounded-sm border border-(--c-outline-light) bg-(--c-bg-content)
        outline-none
        data-[state=checked]:border-(--c-primary)
        data-[state=checked]:bg-(--c-primary)
        data-[state=indeterminate]:border-(--c-primary)
        data-[state=indeterminate]:bg-(--c-primary)
      "
    >
      <CheckboxIndicator
        class="flex h-full w-full items-center justify-center"
      >
        <Icon
          name="mingcute:check-fill"
          class="text-xs text-(--c-bg-content)"
        />
      </CheckboxIndicator>
    </CheckboxRoot>

    <slot />
  </label>
</template>
