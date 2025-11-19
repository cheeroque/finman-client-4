<script setup lang="ts">
import type { LayoutNavItem } from '~/components/layout'

const {
  icon,
  iconActive,
  isActive,
  onClick,
} = defineProps<LayoutNavItem>()

const iconName = computed(() => (isActive ? iconActive : icon) ?? icon)

function handleClick() {
  if (typeof onClick === 'function') {
    onClick()
  }
}
</script>

<template>
  <UiButtonLink
    exact-active-class="bg-(--c-app-active-bg) text-(--c-text-highlight)"
    :to
    class="
      flex w-full gap-2 rounded-xl p-4 text-start transition-colors
      hover:bg-(--c-app-hover-bg)
    "
    @click="handleClick()"
  >
    <span class="flex size-6">
      <Icon
        :name="iconName"
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
  </UiButtonLink>
</template>
