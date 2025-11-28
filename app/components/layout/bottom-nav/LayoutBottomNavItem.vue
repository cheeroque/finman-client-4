<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

const { to } = defineProps<{
  active?: boolean
  icon: string
  to?: NuxtLinkProps['to']
}>()
</script>

<template>
  <UiButtonBase
    :data-active="active || undefined"
    :to
    class="
      group/nav-item flex w-15 cursor-pointer flex-col items-center gap-0.5
      text-center text-xs
    "
  >
    <span
      class="
        flex w-14 rounded-full py-0.5 transition-colors
        group-data-active/nav-item:bg-primary-300
        dark:group-data-active/nav-item:bg-primary-800
      "
    >
      <Icon
        :name="icon"
        class="m-auto text-2xl"
      />
    </span>

    <slot />
  </UiButtonBase>
</template>
