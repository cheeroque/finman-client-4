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
  <UCard :ui="{ body: 'flex gap-4 p-0 sm:p-0' }">
    <NuxtLink
      :to="$localePath(`/categories/${category.slug}`)"
      class="flex flex-auto flex-col gap-4 p-4 sm:p-6 hover:text-primary"
    >
      <span
        :style="{ backgroundColor: category.color }"
        class="w-1/3 h-2 rounded-full"
      />

      <div class="flex flex-col flex-auto gap-2">
        <span class="text-lg font-semibold transition-colors">
          {{ category.name }}
        </span>

        <span class="text-sm text-gray-500">
          {{ category.slug }}
        </span>

        <span
          v-if="category.is_income"
          class="text-sm text-green-700"
        >
          {{ $ts('incomes') }}
        </span>

        <span
          v-else
          class="text-sm text-red-700"
        >
          {{ $ts('expenses') }}
        </span>
      </div>
    </NuxtLink>

    <button
      class="
        flex flex-none self-end p-4 text-gray-300 transition-colors cursor-pointer
        sm:p-6 hover:text-primary-300
      "
      @click="$emit('clickEdit')"
    >
      <UIcon
        name="solar:pen-outline"
        class=" size-5"
      />
    </button>
  </UCard>
</template>
