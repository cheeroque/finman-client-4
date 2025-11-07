<script setup lang="ts">
import type { CategoryDto } from '~~/shared/types/category'

defineProps<{
  category: CategoryDto
}>()

const { $localePath, $ts } = useI18n()
</script>

<template>
  <NuxtLink :to="$localePath(`/categories/${category.slug}`)">
    <UCard class="group/card">
      <div class="flex flex-col gap-4">
        <span
          :style="{ backgroundColor: category.color }"
          class="w-1/3 h-2 rounded-full"
        />

        <div class="flex gap-4">
          <div class="flex flex-col flex-auto gap-2">
            <span class="text-lg font-semibold transition-colors group-hover/card:text-primary">
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

          <div class="flex flex-none self-end text-gray-300 transition-colors group-hover/card:text-primary-300">
            <UIcon
              name="solar:pen-outline"
              class=" size-5"
            />
          </div>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>
