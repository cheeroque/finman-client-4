<script setup lang="ts">
import { LazyCategoryDialog } from '#components'
import { useCategoriesQuery } from '~/composables/queries/categories'

definePageMeta({
  layout: false,
})

const { state } = useCategoriesQuery()

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
        v-for="category in state.data"
        :key="category.id"
        :category
        @click-edit="openCategoryModal({ category })"
      />
    </main>
  </NuxtLayout>
</template>
