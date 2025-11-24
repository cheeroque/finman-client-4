<script setup lang="ts">
import { useTransactionDelete } from '~/composables/mutations/transaction-delete'
import { useTransactionUpsert } from '~/composables/mutations/transaction-upsert'
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
const title = computed(() => $ts(`transactionModal.${isEdit.value ? 'edit' : 'create'}.title`))

const authStore = useAuthStore()
const { mutateAsync: mutateAsyncUpsert, isLoading } = useTransactionUpsert()

async function handleSubmitForm(data: Partial<TransactionBase>) {
  await mutateAsyncUpsert({
    ...data,
    id: transaction?.id,
    user_id: authStore.user?.id,
  })

  emit('close')
}

const { mutateAsync: mutateAsyncDelete, isLoading: isDeleting } = useTransactionDelete()

async function deleteTransaction() {
  if (!transaction?.id) {
    return
  }

  await mutateAsyncDelete(transaction.id)

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
        :loading="isLoading || isDeleting"
        :transaction
        @submit="handleSubmitForm"
      />

      <TransactionDialogFooter
        :disabled="isLoading || isDeleting"
        :form-id
        :is-edit
        @click-delete="deleteTransaction()"
      />
    </div>
  </UiDialog>
</template>
