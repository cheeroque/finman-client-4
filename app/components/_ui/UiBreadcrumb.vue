<script setup lang="ts">
import { NuxtLink } from '#components'
import type { BreadcrumbItem } from '~/components/_ui'

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <ul
    class="
      flex list-none flex-wrap items-baseline gap-1 text-sm text-neutral-500
      dark:text-neutral-400
    "
  >
    <li
      v-for="(item, index) in items"
      :key="`item-${index}`"
      class="flex items-baseline gap-1"
    >
      <component
        :is="item.active ? 'span' : NuxtLink"
        :data-active="item.active || undefined"
        :to="item.to"
        class="
          not-data-active:hover:text-primary-600 not-data-active:hover:underline
          data-active:text-primary-600
          dark:not-data-active:hover:text-primary-500
          dark:data-active:text-primary-500
        "
      >
        <Icon
          v-if="item.icon"
          :name="item.icon"
          class="translate-y-px"
        />

        {{ item.text }}
      </component>

      <Icon
        v-if="index < items.length - 1"
        name="mingcute:right-line"
        class="translate-y-px text-xs"
      />
    </li>
  </ul>
</template>
