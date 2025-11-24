<script setup lang="ts" generic="T extends AcceptableValue">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
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
        group/trigger flex cursor-pointer gap-4 rounded-lg bg-(--c-content-bg)
        px-4 py-3 text-base outline outline-(--c-outline-light)
        transition-colors
        focus:outline-(--c-outline-primary)
        data-disabled:bg-(--c-input-disabled-bg)
        data-invalid:text-(--c-error) data-invalid:outline-(--c-error)
      "
      v-bind="$attrs"
    >
      <SelectValue
        :placeholder
        class="
          min-w-0 flex-auto truncate text-start
          group-data-placeholder/trigger:opacity-50
        "
      />

      <Icon
        name="mingcute:down-line"
        class="size-3 self-center"
      />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        position="popper"
        :side-offset="4"
        class="
          z-500 max-h-(--reka-select-content-available-height)
          w-(--reka-select-trigger-width) min-w-40 overflow-hidden rounded-xl
          border border-(--c-outline-light) bg-(--c-content-bg) py-1
          will-change-[opacity,transform]
        "
      >
        <SelectViewport>
          <SelectGroup>
            <SelectItem
              v-for="(option, index) in options"
              :key="`option-${index}`"
              :value="option.value"
              class="
                cursor-pointer truncate px-4 py-2 text-(--c-text)
                data-highlighted:bg-(--c-app-hover-bg)
                data-highlighted:outline-0
                data-[state=checked]:bg-(--c-primary)
                data-[state=checked]:text-(--c-on-primary)
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
