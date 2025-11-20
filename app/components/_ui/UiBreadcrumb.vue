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
      flex list-none flex-wrap items-baseline gap-1 text-sm
      text-(--c-text-muted)
    "
  >
    <li
      v-for="(item, index) in items"
      :key="`item-${index}`"
      class="flex items-baseline gap-1"
    >
      <component
        :is="item.active ? 'span' : NuxtLink"
        :to="item.to"
        :class="item.active
          ? 'text-(--c-primary)'
          : 'hover:text-(--c-primary) hover:underline'
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
