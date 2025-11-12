<script setup lang="ts">
import type { Category } from '~~/shared/types/category'

const { slug, subtotal, subtotalMax } = defineProps<Pick<
  Partial<Category>,
  | 'color'
  | 'name'
  | 'slug'
> & {
  subtotal: number
  subtotalMax: number
}>()

const { $localePath } = useI18n()
const { formatNumber } = useLocaleFormatter()

const categoryLink = computed(() => $localePath(`/categories/${slug}`))
const displaySubtotal = computed(() => formatNumber(subtotal))

const width = computed(() => subtotalMax ? (subtotal * 100) / subtotalMax : 100)
</script>

<template>
  <NuxtLink
    :to="categoryLink"
    class="flex flex-col gap-2 text-sm"
  >
    <div class="flex gap-2">
      <span class="text-muted">
        {{ name }}
      </span>

      <span class="font-medium">
        {{ displaySubtotal }}
      </span>
    </div>

    <span
      class="min-w-1.5 h-1.5 rounded-full"
      :style="{
        backgroundColor: color,
        width: `${width}%`,
      }"
    />
  </NuxtLink>
</template>
