<script setup lang="ts">
import { useTransactionDelete } from '~/composables/mutations/transaction-delete'
import { useTransactionUpsert } from '~/composables/mutations/transaction-upsert'
import type { Transaction, TransactionBase } from '~~/shared/types/transaction'

const { transaction } = defineProps<{
  transaction?: Transaction
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
  <UModal :title>
    <template #body>
      <TransactionForm
        :id="formId"
        :loading="isLoading || isDeleting"
        :transaction
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
