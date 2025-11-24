<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  type PopoverContentProps,
} from 'reka-ui'

defineProps<Pick<
  PopoverContentProps,
  | 'align'
  | 'alignOffset'
  | 'side'
  | 'sideOffset'
>>()

const modelValue = defineModel<boolean>()

const ACTIVE_CLASS = 'transition-opacity [&>*]:transition-all'
const TRANSITION_CLASS = `opacity-0
  [&>[data-side=top]]:translate-y-5
  [&>[data-side=right]]:-translate-x-5
  [&>[data-side=bottom]]:-translate-y-5
  [&>[data-side=left]]:translate-x-5`
</script>

<template>
  <PopoverRoot
    v-slot="{ close }"
    v-model:open="modelValue"
  >
    <PopoverTrigger
      as-child
      class="text-start"
    >
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverPortal>
      <Transition
        :enter-active-class="ACTIVE_CLASS"
        :enter-from-class="TRANSITION_CLASS"
        :leave-active-class="ACTIVE_CLASS"
        :leave-to-class="TRANSITION_CLASS"
      >
        <PopoverContent
          :align
          :align-offset
          :side
          :side-offset
          class="z-500"
        >
          <slot :close />
        </PopoverContent>
      </Transition>
    </PopoverPortal>
  </PopoverRoot>
</template>
