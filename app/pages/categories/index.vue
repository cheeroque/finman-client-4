<script setup lang="ts">
import { LazyCategoryDialog } from '#components'

definePageMeta({
  layout: false,
})

const { data: categories, status } = await useCategories()
const loading = useAsyncDataLoading(status)

const { register } = useDialog()
const { open: openCategoryModal } = register(LazyCategoryDialog)

useHead({
  titleTemplate: usePageTitle('categories.title'),
})
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <LayoutCreateButton
        :caption="$ts('categories.create')"
        @click="openCategoryModal()"
      />
    </template>

    <main class="flex flex-col gap-8">
      <CategoryTable
        :categories
        :loading
        @click-edit="openCategoryModal({ category: $event })"
      />
    </main>
  </NuxtLayout>
</template>
