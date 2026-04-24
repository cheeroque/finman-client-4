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
const { show: showToast } = useToast()

const isLoading = ref(false)

async function handleSubmitForm(data: Partial<Category>) {
  isLoading.value = true

  const mode = category?.id ? 'update' : 'create'

  try {
    await categoryStore.upsertCategory({
      ...data,
      id: category?.id,
    })

    const description = $ts(`categoryDialog.successToast.${mode}`, {
      category: category?.name ?? '',
    })

    showToast({
      description,
      variant: 'success',
    })

    emit('close')
  } catch (error) {
    const description = getErrorMessage(error, $ts('error.unknown'))
    const title = $ts(`categoryDialog.errorToast.${mode}`)

    showToast({
      description,
      title,
      variant: 'danger',
    })
  } finally {
    isLoading.value = false
  }
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

  isLoading.value = true

  try {
    await categoryStore.deleteCategory(category.id)

    const description = $ts('categoryDialog.successToast.delete', {
      category: category.name,
    })

    showToast({
      description,
      variant: 'warning',
    })

    emit('close')
  } catch (error) {
    const description = getErrorMessage(error, $ts('error.unknown'))
    const title = $ts('categoryDialog.errorToast.delete')

    showToast({
      description,
      title,
      variant: 'danger',
    })
  } finally {
    isLoading.value = false
  }
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
        :loading="isLoading"
        @submit="handleSubmitForm"
      />

      <CategoryDialogFooter
        :disabled="isLoading"
        :form-id
        :is-edit
        @click-delete="deleteCategory()"
      />
    </div>
  </UiDialog>
</template>
