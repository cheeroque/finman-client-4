<script setup lang="ts">
import { NuxtLink } from '#components'
import type { NuxtLinkProps } from '#app'

const { to } = defineProps<Pick<NuxtLinkProps, 'activeClass' | 'exactActiveClass' | 'to'>>()

const isNuxtLink = computed(() => !!to)
</script>

<template>
  <component
    :is="isNuxtLink ? NuxtLink : 'button'"
    :active-class
    :exact-active-class
    :to
    class="cursor-pointer"
  >
    <slot />
  </component>
</template>
