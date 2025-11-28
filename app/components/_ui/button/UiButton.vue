<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

const {
  disabled,
  loading,
  type = 'button',
  variant = 'primary',
} = defineProps<{
  disabled?: boolean
  icon?: string
  loading?: boolean
  to?: NuxtLinkProps['to']
  trailingIcon?: string
  type?: string
  variant?: 'content' | 'danger' | 'danger-light' | 'primary' | 'primary-light' | 'success' | 'success-light'
}>()

const VARIANT_CLASSES = {
  content: `bg-white text-neutral-900 outline outline-neutral-200
    not-data-disabled:hover:outline-primary-300
    dark:bg-black dark:text-white dark:outline-neutral-800
    dark:not-data-disabled:hover:outline-primary-900`,
  danger: `bg-rose-600 text-white
    not-data-disabled:hover:bg-rose-700
    dark:bg-rose-500 dark:text-neutral-900
    dark:not-data-disabled:hover:bg-rose-400`,
  'danger-light': `bg-rose-100 text-rose-800
    not-data-disabled:hover:bg-rose-200
    dark:bg-rose-800 dark:text-rose-200
    dark:not-data-disabled:hover:bg-rose-700`,
  primary: `bg-primary-600 text-white
    not-data-disabled:hover:bg-primary-700
    dark:bg-primary-500 dark:text-neutral-900
    dark:not-data-disabled:hover:bg-primary-400`,
  'primary-light': `bg-primary-100 text-primary-800
    not-data-disabled:hover:bg-primary-200
    dark:bg-primary-800 dark:text-primary-200
    dark:not-data-disabled:hover:bg-primary-700`,
  success: `bg-lime-600 text-white
    not-data-disabled:hover:bg-lime-700
    dark:bg-lime-500 dark:text-neutral-900
    dark:not-data-disabled:hover:bg-lime-400`,
  'success-light': `bg-lime-100 text-lime-800
    not-data-disabled:hover:bg-lime-200
    dark:bg-lime-800 dark:text-lime-200
    dark:not-data-disabled:hover:bg-lime-700`,
} as const
</script>

<template>
  <UiButtonBase
    :data-loading="loading || undefined"
    :disabled="disabled || loading"
    :to
    :type
    :class="[
      'group/button relative rounded-lg px-4 py-3 font-medium',
      VARIANT_CLASSES[variant],
    ]"
  >
    <span
      class="
        flex flex-auto items-center justify-center gap-2
        group-data-loading/button:opacity-0
      "
    >
      <span
        v-if="icon"
        class="size-6 flex-none"
      >
        <Icon
          :name="icon"
          class="text-2xl"
        />
      </span>

      <slot />

      <span
        v-if="trailingIcon"
        class="size-6 flex-none"
      >
        <Icon
          :name="trailingIcon"
          class="text-2xl"
        />
      </span>
    </span>

    <span
      class="
        absolute top-1/2 left-1/2 flex size-6 -translate-1/2 animate-spin
        opacity-0
        group-data-loading/button:opacity-100
      "
    >
      <Icon
        name="mingcute:loading-3-fill"
        class="text-2xl"
      />
    </span>
  </UiButtonBase>
</template>
