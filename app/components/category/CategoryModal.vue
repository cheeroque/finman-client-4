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

async function deleteTransaction() {
  if (!category?.id) {
    return
  }

  await mutateAsyncDelete(category.id)

  emit('close')
}
</script>

<template>
  <UModal :title>
    <template #body>
      <CategoryForm
        :id="formId"
        :category
        :loading="isLoading || isDeleting"
        @submit="handleSubmitForm"
      />
    </template>

    <template #footer>
      <div class="flex w-full gap-4">
        <template v-if="isEdit">
          <UButton
            :disabled="isLoading || isDeleting"
            color="error"
            variant="soft"
            class="mr-auto"
            @click="deleteTransaction"
          >
            {{ $ts('transactionModal.edit.delete') }}
          </UButton>

          <UButton
            :disabled="isLoading || isDeleting"
            :form="formId"
            type="submit"
          >
            {{ $ts('transactionModal.edit.submit') }}
          </UButton>
        </template>

        <UButton
          v-else
          :disabled="isLoading || isDeleting"
          :form="formId"
          type="submit"
        >
          {{ $ts('transactionModal.create.submit') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
