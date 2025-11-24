<script setup lang="ts">
import { useCategoryDelete } from '~/composables/mutations/category-delete'
import { useCategoryUpsert } from '~/composables/mutations/category-upsert'
import type { Category } from '~~/shared/types/category'

const { category } = defineProps<{
  category?: Category
}>()

const emit = defineEmits<{
  close: []
}>()

const formId = useId()
const { $ts } = useI18n()

const isEdit = computed(() => !!category)
const title = computed(() => $ts(`categoryModal.${isEdit.value ? 'edit' : 'create'}.title`))

const { mutateAsync: mutateAsyncUpsert, isLoading } = useCategoryUpsert()

async function handleSubmitForm(data: Partial<Category>) {
  await mutateAsyncUpsert({
    ...data,
    id: category?.id,
  })

  emit('close')
}

const { mutateAsync: mutateAsyncDelete, isLoading: isDeleting } = useCategoryDelete()

// TODO add confirmation dialog
async function deleteCategory() {
  if (!category?.id) {
    return
  }

  await mutateAsyncDelete(category.id)

  emit('close')
}
</script>

<template>
  <UiDialog :title>
    <div
      class="
        flex flex-col gap-4
        lg:gap-6
      "
    >
      <CategoryForm
        :id="formId"
        :category
        :loading="isLoading || isDeleting"
        @submit="handleSubmitForm"
      />

      <CategoryDialogFooter
        :disabled="isLoading || isDeleting"
        :form-id
        :is-edit
        @click-delete="deleteCategory()"
      />
    </div>
  </UiDialog>
</template>
