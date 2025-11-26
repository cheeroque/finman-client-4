<script lang="ts">
import { LazyCategoryDialog } from '#components'
import { useCategories } from '~/composables/loaders/categories'

export { useCategories }
</script>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const { data } = useCategories()

const { register } = useDialog()
const { open: openCategoryModal } = register(LazyCategoryDialog)
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <LayoutCreateButton
        :caption="$ts('createCategory')"
        @click="openCategoryModal()"
      />
    </template>

    <main
      class="
        grid gap-3
        max-lg:px-3 max-lg:pt-3
        sm:grid-cols-2
        lg:gap-8
        2xl:grid-cols-3
      "
    >
      <CategoryCard
        v-for="category in data"
        :key="category.id"
        :category
        @click-edit="openCategoryModal({ category })"
      />
    </main>
  </NuxtLayout>
</template>
