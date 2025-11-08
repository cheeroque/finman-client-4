<script setup lang="ts">
import { useCategoriesQuery } from '~/composables/queries/categories'

const { state } = useCategoriesQuery()
</script>

<template>
  <UMain as="main">
    <UContainer class="grid grid-cols-3 gap-5 py-5">
      <CategoryCard
        v-for="category in state.data"
        :key="category.id"
        :category
      />

      <div class="col-span-full">
        <UButton size="xl">
          {{ $ts('addCategory') }}
        </UButton>
      </div>
    </UContainer>
  </UMain>
</template>
