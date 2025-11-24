<script setup lang="ts">
import { NuxtLink } from '#components'
import type { NuxtLinkProps } from '#app'

const { to } = defineProps<Pick<
  NuxtLinkProps,
  | 'activeClass'
  | 'exactActiveClass'
  | 'to'
> & {
  disabled?: boolean
}>()

const isNuxtLink = computed(() => !!to)
</script>

<template>
  <component
    :is="isNuxtLink ? NuxtLink : 'button'"
    :active-class
    :data-disabled="disabled || undefined"
    :disabled
    :exact-active-class
    :to
    class="
      cursor-pointer transition-(--transition-button)
      data-disabled:cursor-default data-disabled:opacity-50
    "
  >
    <slot />
  </component>
</template>
