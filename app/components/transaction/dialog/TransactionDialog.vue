<script setup lang="ts">
const { transaction } = defineProps<{
  transaction?: TransactionBase
}>()

const emit = defineEmits<{
  close: []
}>()

const formId = useId()
const { $ts } = useI18n()

const isEdit = computed(() => !!transaction)
const title = computed(() => $ts(`transactionDialog.${isEdit.value ? 'edit' : 'create'}.title`))

const authStore = useAuthStore()
const transactionStore = useTransactionStore()

const { show: showToast } = useToast()

const isLoading = ref(false)

async function handleSubmitForm(data: Partial<TransactionBase>) {
  isLoading.value = true

  const mode = transaction?.id ? 'update' : 'create'

  try {
    await transactionStore.upsertTransaction({
      ...data,
      id: transaction?.id,
      user_id: authStore.user?.id,
    })

    const description = $ts(`transactionDialog.successToast.${mode}`, {
      transaction: data.note ?? '',
    })

    showToast({
      description,
      variant: 'success',
    })

    emit('close')
  } catch (error) {
    const description = getErrorMessage(error, $ts('error.unknown'))
    const title = $ts(`transactionDialog.errorToast.${mode}`)

    showToast({
      description,
      title,
      variant: 'danger',
    })
  } finally {
    isLoading.value = false
  }
}

async function deleteTransaction() {
  if (!transaction?.id) {
    return
  }

  isLoading.value = true

  try {
    await transactionStore.deleteTransaction(transaction.id)

    const description = $ts('transactionDialog.successToast.delete', {
      transaction: transaction.note,
    })

    showToast({
      description,
      variant: 'warning',
    })

    emit('close')
  } catch (error) {
    const description = getErrorMessage(error, $ts('error.unknown'))
    const title = $ts('transactionDialog.errorToast.delete')

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
      <TransactionForm
        :id="formId"
        :loading="isLoading"
        :transaction
        @submit="handleSubmitForm"
      />

      <TransactionDialogFooter
        :disabled="isLoading"
        :form-id
        :is-edit
        @click-delete="deleteTransaction()"
      />
    </div>
  </UiDialog>
</template>
