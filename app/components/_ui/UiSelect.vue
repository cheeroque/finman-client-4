<script setup lang="ts" generic="T extends AcceptableValue">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectViewport,
} from 'reka-ui'
import type { AcceptableValue } from 'reka-ui'

import type { SelectOption } from '~/components/_ui'

defineOptions({
  inheritAttrs: false,
})

const {
  options = [],
  placeholder = '\xA0',
} = defineProps<{
  disabled?: boolean
  hasError?: boolean
  options?: SelectOption[]
  placeholder?: string
  required?: boolean
}>()

const modelValue = defineModel<T>()

// Reka-UI `SelectValue` component seems to have a bug,
// where it resets displayed value when toggled open/closed,
// so we use custom implementation instead
const selectedOption = computed(() => options.find(({ value }) => value === modelValue.value))
</script>

<template>
  <SelectRoot
    v-model="modelValue"
    :disabled
    :required
  >
    <SelectTrigger
      :data-invalid="hasError || undefined"
      :disabled
      class="
        group/trigger flex cursor-pointer gap-4 rounded-lg bg-white px-4 py-3
        text-base outline outline-neutral-200 transition-colors
        not-data-disabled:hover:outline-primary-300
        focus:outline-primary-400
        data-disabled:bg-neutral-100
        data-invalid:text-rose-600 data-invalid:outline-rose-600
        data-[state=open]:outline-primary-400
        dark:bg-black dark:outline-neutral-800
        dark:not-data-disabled:hover:outline-primary-900
        dark:focus:outline-primary-800 dark:data-disabled:bg-neutral-900
        dark:data-invalid:text-rose-500 dark:data-invalid:outline-rose-500
        dark:data-[state=open]:outline-primary-800
      "
      v-bind="$attrs"
    >
      <span
        class="
          min-w-0 flex-auto truncate text-start
          group-data-placeholder/trigger:opacity-50
        "
      >
        {{ selectedOption?.label ?? selectedOption?.value ?? placeholder }}
      </span>

      <Icon
        name="mynaui:chevron-down-solid"
        class="
          flex-none self-center text-lg text-neutral-300 transition-transform
          group-data-[state=open]/trigger:-rotate-180
          dark:text-neutral-700
        "
      />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        position="popper"
        :side-offset="4"
        class="
          z-500 max-h-(--reka-select-content-available-height)
          w-(--reka-select-trigger-width) min-w-40 overflow-hidden rounded-xl
          border border-neutral-200 bg-white py-1
          will-change-[opacity,transform]
          dark:border-neutral-800 dark:bg-black
        "
      >
        <SelectViewport>
          <SelectGroup>
            <SelectItem
              v-for="(option, index) in options"
              :key="`option-${index}`"
              :value="option.value"
              class="
                cursor-pointer truncate px-4 py-2
                data-highlighted:bg-primary-100 data-highlighted:outline-0
                data-[state=checked]:bg-primary-600
                data-[state=checked]:text-white
                dark:data-highlighted:bg-primary-950
                dark:data-[state=checked]:bg-primary-500
                dark:data-[state=checked]:text-neutral-900
              "
            >
              <SelectItemText>
                {{ option.label ?? option.value }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
