<script setup lang="ts">
import type { TransactionBase } from '~~/shared/types/transaction'

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
const { execute: executeUpsert, loading: isUpserting } = useTransactionUpsert()

async function handleSubmitForm(data: Partial<TransactionBase>) {
  await executeUpsert({
    ...data,
    id: transaction?.id,
    user_id: authStore.user?.id,
  })

  emit('close')
}

const { execute: executeDelete, loading: isDeleting } = useTransactionDelete()

async function deleteTransaction() {
  if (!transaction?.id) {
    return
  }

  await executeDelete(transaction.id)

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
        :loading="isUpserting || isDeleting"
        :transaction
        @submit="handleSubmitForm"
      />

      <TransactionDialogFooter
        :disabled="isUpserting || isDeleting"
        :form-id
        :is-edit
        @click-delete="deleteTransaction()"
      />
    </div>
  </UiDialog>
</template>
