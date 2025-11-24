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
    :to
    class="
      flex w-15 cursor-pointer flex-col items-center gap-0.5 text-center text-xs
    "
  >
    <span
      :class="[
        'flex w-14 rounded-full py-0.5 transition-colors',
        active && 'bg-(--c-app-active-bg)',
      ]"
    >
      <Icon
        :name="icon"
        class="m-auto text-2xl"
      />
    </span>

    <slot />
  </UiButtonBase>
</template>
