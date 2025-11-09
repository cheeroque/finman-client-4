<script setup lang="ts">
import { useCategoriesQuery } from '~/composables/queries/categories'

definePageMeta({
  layout: false,
})

const { state } = useCategoriesQuery()

const { open: openCategoryModal } = useCategoryModal()
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <UButton
        color="secondary"
        variant="soft"
        @click="openCategoryModal()"
      >
        {{ $ts('createCategory') }}
      </UButton>
    </template>

    <UMain as="main">
      <UContainer class="grid grid-cols-3 gap-5 py-5">
        <CategoryCard
          v-for="category in state.data"
          :key="category.id"
          :category
          @click-edit="openCategoryModal({ category })"
        />
      </UContainer>
    </UMain>
  </NuxtLayout>
</template>
