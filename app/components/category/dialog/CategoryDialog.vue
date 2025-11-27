<script setup lang="ts">
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

const { execute: executeUpsert, loading: isUpserting } = useCategoryUpsert()

async function handleSubmitForm(data: Partial<Category>) {
  await executeUpsert({
    ...data,
    id: category?.id,
  })

  emit('close')
}

const { execute: executeDelete, loading: isDeleting } = useCategoryDelete()

// TODO add confirmation dialog
async function deleteCategory() {
  if (!category?.id) {
    return
  }

  await executeDelete(category.id)

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
        :loading="isUpserting || isDeleting"
        @submit="handleSubmitForm"
      />

      <CategoryDialogFooter
        :disabled="isUpserting || isDeleting"
        :form-id
        :is-edit
        @click-delete="deleteCategory()"
      />
    </div>
  </UiDialog>
</template>
