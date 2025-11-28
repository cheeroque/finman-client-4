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
      flex gap-4 rounded-2xl border border-neutral-200 transition-colors
      hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600
      dark:border-neutral-800 dark:hover:border-primary-900
      dark:hover:bg-primary-990 dark:hover:text-primary-500
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

        <span
          class="
            text-sm text-neutral-500
            dark:text-neutral-400
          "
        >
          {{ category.slug }}
        </span>

        <span
          v-if="category.is_income"
          class="
            text-sm text-lime-600
            dark:text-lime-500
          "
        >
          {{ $ts('incomes') }}
        </span>

        <span
          v-else
          class="
            text-sm text-rose-600
            dark:text-rose-500
          "
        >
          {{ $ts('expenses') }}
        </span>
      </div>
    </NuxtLink>

    <button
      class="
        flex flex-none cursor-pointer self-end p-5 text-neutral-300
        transition-colors
        hover:text-primary-600
        sm:p-6
        dark:text-neutral-700 dark:hover:text-primary-500
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
