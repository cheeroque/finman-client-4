<script setup lang="ts">
import type { LayoutNavItem } from '~/components/layout'

const { icon, onClick } = defineProps<LayoutNavItem>()

function handleClick() {
  if (typeof onClick === 'function') {
    onClick()
  }
}
</script>

<template>
  <UiButtonBase
    :to
    class="
      flex w-full gap-2 rounded-xl p-4 text-start text-neutral-900
      transition-colors
      hover:bg-primary-300/50 hover:text-primary-800
      data-exact-active:bg-primary-300 data-exact-active:text-primary-900
      data-exact-active:hover:bg-primary-400/60
      dark:text-white/60 dark:hover:bg-primary-900/50
      dark:hover:text-primary-300 dark:data-exact-active:bg-primary-900
      dark:data-exact-active:text-white
      dark:data-exact-active:hover:bg-primary-800
    "
    @click="handleClick()"
  >
    <span class="flex size-6">
      <Icon
        :name="icon"
        class="text-2xl opacity-80"
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
