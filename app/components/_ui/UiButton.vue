<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

const {
  type = 'button',
  variant = 'primary',
} = defineProps<Pick<
  NuxtLinkProps,
  | 'activeClass'
  | 'exactActiveClass'
  | 'to'
> & {
  disabled?: boolean
  icon?: string
  variant?: 'danger' | 'danger-light' | 'primary' | 'primary-light' | 'success' | 'success-light'
  type?: string
}>()

const VARIANT_CLASSES = {
  danger: 'bg-(--c-error) text-(--c-on-error) not-disabled:hover:bg-(--c-error-hover)',
  'danger-light': 'bg-(--c-error-light) text-(--c-on-error-light) not-disabled:hover:bg-(--c-error-light-hover)',
  primary: 'bg-(--c-primary) text-(--c-on-primary) not-disabled:hover:bg-(--c-primary-hover)',
  'primary-light': 'bg-(--c-primary-light) text-(--c-on-primary-light) not-disabled:hover:bg-(--c-primary-light-hover)',
  success: 'bg-(--c-success) text-(--c-on-success) not-disabled:hover:bg-(--c-success-hover)',
  'success-light': 'bg-(--c-success-light) text-(--c-on-success-light) not-disabled:hover:bg-(--c-success-light-hover)',
} as const
</script>

<template>
  <UiButtonLink
    :active-class
    :disabled
    :exact-active-class
    :to
    :type
    :class="[
      'flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium',
      'transition-colors',
      'disabled:cursor-default',
      VARIANT_CLASSES[variant],
    ]"
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
  </UiButtonLink>
</template>
