<script setup lang="ts">
import { LazyConfirmationDialog } from '#components'
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
const title = computed(() => $ts(`categoryDialog.${isEdit.value ? 'edit' : 'create'}.title`))

const { execute: executeUpsert, loading: isUpserting } = useCategoryUpsert()

async function handleSubmitForm(data: Partial<Category>) {
  await executeUpsert({
    ...data,
    id: category?.id,
  })

  emit('close')
}

const { register } = useDialog()
const { open: getConfirmation } = register(LazyConfirmationDialog)

const { execute: executeDelete, loading: isDeleting } = useCategoryDelete()

async function deleteCategory() {
  if (!category?.id) {
    return
  }

  const confirmation = await getConfirmation({
    title: $ts('categoryDialog.deleteConfirmation.title'),
    message: $ts('categoryDialog.deleteConfirmation.message'),
    captionConfirm: $ts('categoryDialog.deleteConfirmation.confirm'),
  })

  if (!confirmation) {
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
