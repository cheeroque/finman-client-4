<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

const {
  disabled,
  loading,
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
  loading?: boolean
  trailingIcon?: string
  type?: string
  variant?: 'danger' | 'danger-light' | 'primary' | 'primary-light' | 'success' | 'success-light'
}>()

const VARIANT_CLASSES = {
  danger: 'bg-(--c-error) text-(--c-on-error) not-data-disabled:hover:bg-(--c-error-hover)',
  'danger-light': 'bg-(--c-error-light) text-(--c-on-error-light) not-data-disabled:hover:bg-(--c-error-light-hover)',
  primary: 'bg-(--c-primary) text-(--c-on-primary) not-data-disabled:hover:bg-(--c-primary-hover)',
  'primary-light': 'bg-(--c-primary-light) text-(--c-on-primary-light) not-data-disabled:hover:bg-(--c-primary-light-hover)',
  success: 'bg-(--c-success) text-(--c-on-success) not-data-disabled:hover:bg-(--c-success-hover)',
  'success-light': 'bg-(--c-success-light) text-(--c-on-success-light) not-data-disabled:hover:bg-(--c-success-light-hover)',
} as const
</script>

<template>
  <UiButtonLink
    :active-class
    :data-loading="loading || undefined"
    :disabled="disabled || loading"
    :exact-active-class
    :to
    :type
    :class="[
      'group/button relative rounded-lg px-4 py-3 font-medium',
      VARIANT_CLASSES[variant],
    ]"
  >
    <span
      class="
        flex items-center justify-center gap-2
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
  </UiButtonLink>
</template>
