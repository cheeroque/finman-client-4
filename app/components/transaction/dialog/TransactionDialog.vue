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
const isLoading = ref(false)

async function handleSubmitForm(data: Partial<TransactionBase>) {
  isLoading.value = true

  await transactionStore.upsertTransaction({
    ...data,
    id: transaction?.id,
    user_id: authStore.user?.id,
  })

  isLoading.value = false

  emit('close')
}

async function deleteTransaction() {
  if (!transaction?.id) {
    return
  }

  isLoading.value = true

  await transactionStore.deleteTransaction(transaction.id)

  isLoading.value = false

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
