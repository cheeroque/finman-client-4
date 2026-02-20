<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

import type { LayoutNavItem } from '~/components/layout/types'

const {
  disabled,
  icon,
  iconClass,
  label,
  labelSecondary,
  to,
} = defineProps<LayoutNavItem>()
</script>

<template>
  <UiButtonBase
    :disabled
    :to
    class="
      flex w-full gap-2 rounded-xl p-4 text-start text-neutral-900
      hover:bg-primary-300/50 hover:text-primary-800
      data-exact-active:bg-primary-300 data-exact-active:text-primary-900
      data-exact-active:hover:bg-primary-400/60
      dark:text-white/60
      dark:hover:bg-primary-900/50 dark:hover:text-primary-300
      dark:data-exact-active:bg-primary-900 dark:data-exact-active:text-white
      dark:data-exact-active:hover:bg-primary-800
    "
  >
    <span class="flex size-6">
      <Icon
        :name="icon"
        :class="twMerge(
          'text-2xl opacity-80',
          iconClass,
        )"
      />
    </span>

    <span class="flex-auto">
      {{ label }}

      <span
        v-if="labelSecondary"
        class="text-sm opacity-50"
      >
        ({{ labelSecondary }})
      </span>
    </span>
  </UiButtonBase>
</template>
