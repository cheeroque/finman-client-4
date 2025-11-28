<script setup lang="ts">
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from 'reka-ui'

const modelValue = defineModel<boolean>()
</script>

<template>
  <DialogRoot v-model:open="modelValue">
    <DialogPortal>
      <Transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 z-30 bg-black/75 transition-opacity" />
      </Transition>

      <Transition
        enter-from-class="translate-y-full"
        leave-to-class="translate-y-full"
      >
        <DialogContent
          class="fixed inset-x-0 bottom-18 z-40 transition-transform"
        >
          <slot />
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>
