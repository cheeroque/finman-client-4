<script setup lang="ts">
import { NuxtLink } from '#components'
import type { NuxtLinkProps } from '#app'

const { to } = defineProps<{
  active?: boolean
  to?: NuxtLinkProps['to']
  disabled?: boolean
}>()

const isNuxtLink = computed(() => !!to)
</script>

<template>
  <NuxtLink
    v-if="isNuxtLink"
    v-slot="{ href, isActive, isExactActive, navigate }"
    custom
    :to
  >
    <a
      v-bind="$attrs"
      :data-active="active || isActive || undefined"
      :data-disabled="disabled || undefined"
      :data-exact-active="isExactActive || undefined"
      :href
      class="
        transition-(--transition-button)
        data-disabled:pointer-events-none data-disabled:cursor-default
        data-disabled:opacity-50
      "
      @click="navigate"
    >
      <slot />
    </a>
  </NuxtLink>

  <button
    v-else
    :active
    :data-active="active || undefined"
    :data-disabled="disabled || undefined"
    :disabled
    class="
      cursor-pointer transition-(--transition-button)
      data-disabled:cursor-default data-disabled:opacity-50
    "
  >
    <slot />
  </button>
</template>
