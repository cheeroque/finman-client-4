<script setup lang="ts">
/* For some stupid reason Reka-UI locks body (or closest fixed position parent)
 * with `overflow: hidden; pointer-events: none;` when opening Select
 * or DropdownMenu without an option to disable this behavior.
 * This completely breaks Select/DropdownMenu inside UiDialog, so we force
 * `pointer-events-auto!` for DialogContent on line 63
 * See: https://github.com/unovue/reka-ui/issues/1670 */
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

const DIALOG_Z_INDEX_BASE = 110

const {
  depth = 0,
} = defineProps<{
  bodyClass?: ClassNameValue
  contentClass?: ClassNameValue
  depth?: number
  title?: string
}>()

const modelValue = defineModel<boolean>()

const zIndex = computed(() => DIALOG_Z_INDEX_BASE + depth)
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
          class="
            fixed inset-0 z-(--z-index-overlay) bg-black/75 transition-opacity
          "
          :style="{
            '--z-index-overlay': zIndex,
          }"
          @click="close()"
        />
      </Transition>

      <Transition
        enter-from-class="-translate-y-[40%] opacity-0"
        leave-to-class="-translate-y-[40%] opacity-0"
      >
        <DialogContent
          :class="twMerge(
            `
              pointer-events-auto! fixed top-1/2 left-1/2 z-(--z-index-content)
              max-w-[calc(100%-1.5rem)] -translate-1/2 transition-all
            `,
            contentClass,
          )"
          :style="{
            '--z-index-content': zIndex + 1,
          }"
        >
          <div
            :class="twMerge(
              `
                relative flex min-h-0 w-140 max-w-full flex-col gap-4
                overflow-y-auto rounded-xl bg-white p-5
                lg:gap-6 lg:p-8
                dark:border dark:border-neutral-800 dark:bg-neutral-950
              `,
              bodyClass,
            )"
          >
            <DialogTitle
              v-if="title"
              class="
                text-lg font-medium text-neutral-500
                dark:text-neutral-400
              "
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
              <UiButtonBase
                class="
                  text-neutral-300
                  hover:text-neutral-500
                  dark:text-neutral-700 dark:hover:text-neutral-400
                "
              >
                <Icon
                  name="mynaui:x-circle-solid"
                  class="text-2xl"
                />
              </UiButtonBase>
            </DialogClose>
          </div>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>
