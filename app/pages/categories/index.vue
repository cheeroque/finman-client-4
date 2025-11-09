<script setup lang="ts">
import { useCategoriesQuery } from '~/composables/queries/categories'

const { state } = useCategoriesQuery()

const { open: openCategoryModal } = useCategoryModal()
</script>

<template>
  <UMain as="main">
    <UContainer class="grid grid-cols-3 gap-5 py-5">
      <CategoryCard
        v-for="category in state.data"
        :key="category.id"
        :category
        @click-edit="openCategoryModal({ category })"
      />

      <div class="col-span-full">
        <UButton
          size="xl"
          @click="openCategoryModal()"
        >
          {{ $ts('addCategory') }}
        </UButton>
      </div>
    </UContainer>
  </UMain>
</template>
