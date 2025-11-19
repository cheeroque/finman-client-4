<script setup lang="ts">
import type { Category } from '~~/shared/types/category'

defineProps<{
  category: Category
}>()

defineEmits<{
  clickEdit: []
}>()

const { $localePath, $ts } = useI18n()
</script>

<template>
  <div
    class="
      flex gap-4 rounded-2xl border border-(--c-outline-light) transition-colors
      hover:border-(--c-outline-primary-light) hover:bg-(--c-surface-bg)
      hover:text-(--c-primary)
    "
  >
    <NuxtLink
      :to="$localePath(`/categories/${category.slug}`)"
      class="
        flex flex-auto flex-col gap-5 p-5
        lg:p-6
      "
    >
      <span
        :style="{ backgroundColor: category.color }"
        class="h-2.5 w-2/3 rounded-full"
      />

      <div class="flex flex-auto flex-col gap-1">
        <span class="text-lg font-semibold">
          {{ category.name }}
        </span>

        <span class="text-sm text-(--c-text-muted)">
          {{ category.slug }}
        </span>

        <span
          v-if="category.is_income"
          class="text-sm text-(--c-success)"
        >
          {{ $ts('incomes') }}
        </span>

        <span
          v-else
          class="text-sm text-(--c-error)"
        >
          {{ $ts('expenses') }}
        </span>
      </div>
    </NuxtLink>

    <button
      class="
        flex flex-none cursor-pointer self-end p-5 text-gray-300
        transition-colors
        hover:text-(--c-primary)
        sm:p-6
      "
      @click="$emit('clickEdit')"
    >
      <Icon
        name="mingcute:edit-2-line"
        class="text-2xl"
      />
    </button>
  </div>
</template>
