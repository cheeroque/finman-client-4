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

const categoryStore = useCategoryStore()
const loading = ref(false)

async function handleSubmitForm(data: Partial<Category>) {
  loading.value = true

  await categoryStore.upsertCategory({
    ...data,
    id: category?.id,
  })

  loading.value = false

  emit('close')
}

const { register } = useDialog()
const { open: getConfirmation } = register(LazyConfirmationDialog)

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

  loading.value = true

  await categoryStore.deleteCategory(category.id)

  loading.value = false

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
        :loading
        @submit="handleSubmitForm"
      />

      <CategoryDialogFooter
        :disabled="loading"
        :form-id
        :is-edit
        @click-delete="deleteCategory()"
      />
    </div>
  </UiDialog>
</template>
