<script setup lang="ts">
import type { Category } from '~~/shared/types/category'

const { link, slug, subtotal, subtotalMax } = defineProps<Pick<
  Partial<Category>,
  | 'color'
  | 'name'
  | 'slug'
> & {
  link?: string
  subtotal: number
  subtotalMax: number
}>()

const { $localePath } = useI18n()
const { formatNumber } = useLocaleFormatter()

const categoryLink = computed(() => {
  if (link) {
    return $localePath(link)
  }

  return $localePath(`/categories/${slug}`)
})

const displaySubtotal = computed(() => formatNumber(subtotal))

const width = computed(() => subtotalMax ? (subtotal * 100) / subtotalMax : 100)
</script>

<template>
  <NuxtLink
    :to="categoryLink"
    class="flex flex-col gap-1 text-sm"
    :style="{
      '--bar-color': color,
      '--bar-width': `${width}%`,
    }"
  >
    <div class="flex gap-2">
      <span class="text-(--c-text-muted)">
        {{ name }}
      </span>

      <span class="font-semibold">
        {{ displaySubtotal }}
      </span>
    </div>

    <span
      class="h-2.5 w-(--bar-width) min-w-1.5 rounded-full bg-(--bar-color)"
    />
  </NuxtLink>
</template>
