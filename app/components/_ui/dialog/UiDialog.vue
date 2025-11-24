<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { twMerge, type ClassNameValue } from 'tailwind-merge'

defineProps<{
  bodyClass?: ClassNameValue
  contentClass?: ClassNameValue
  title?: string
}>()

const modelValue = defineModel<boolean>()
</script>

<template>
  <DialogRoot
    v-slot="{ close }"
    v-model:open="modelValue"
  >
    <DialogPortal>
      <Transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <DialogOverlay
          class="fixed inset-0 z-110 bg-black/75 transition-opacity"
          @click="close()"
        />
      </Transition>

      <Transition
        enter-from-class="-translate-y-[40%] opacity-0"
        leave-to-class="-translate-y-[40%] opacity-0"
      >
        <DialogContent
          :class="twMerge(
            'fixed top-1/2 left-1/2 z-120 max-w-[calc(100%-1.5rem)]',
            '-translate-1/2 transition-all',
            contentClass,
          )"
        >
          <div
            :class="twMerge(
              'relative flex min-h-0 w-140 max-w-full flex-col gap-4',
              'overflow-y-auto rounded-2xl bg-(--c-content-bg) p-5',
              'lg:gap-6 lg:p-8',
              bodyClass,
            )"
          >
            <DialogTitle
              v-if="title"
              class="text-lg font-medium text-(--c-text-muted)"
            >
              {{ title }}
            </DialogTitle>

            <DialogDescription class="invisible absolute top-0 left-0 size-0">
              {{ title }}
            </DialogDescription>

            <slot :close />

            <DialogClose
              as-child
              class="
                absolute top-5 right-5
                lg:top-8 lg:right-8
              "
            >
              <UiButtonLink
                class="
                  text-(--c-text-dimmed)
                  hover:text-(--c-text-muted)
                "
              >
                <Icon
                  name="mingcute:close-circle-fill"
                  class="text-2xl"
                />
              </UiButtonLink>
            </DialogClose>
          </div>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>
