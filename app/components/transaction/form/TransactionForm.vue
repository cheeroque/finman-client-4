<script setup lang="ts">
import * as z from 'zod'

import type { Transaction, TransactionBase } from '~~/shared/types/transaction'

const { transaction } = defineProps<{
  loading?: boolean
  transaction?: Transaction
}>()

defineEmits<{
  submit: [Partial<TransactionBase>]
}>()

const { $ts } = useI18n()

const schema = z.object({
  sum: z.number($ts('transactionModal.form.sum.error.invalid')).min(0, $ts('transactionModal.form.sum.error.min')),
  note: z.string($ts('transactionModal.form.note.error.invalid')).min(1, $ts('transactionModal.form.note.error.invalid')),
  category_id: z.number($ts('transactionModal.form.category.error.invalid')),
  created_at: z.iso.datetime($ts('transactionModal.form.created_at.error.invalid')),
  is_marked: z.boolean(),
})

type Schema = z.output<typeof schema>

const state = ref<Partial<Schema>>(initForm())

whenever(() => transaction, () => {
  state.value = initForm()
})

function initForm() {
  const emptyForm: Partial<Schema> = {
    sum: undefined,
    note: undefined,
    category_id: undefined,
    created_at: new Date().toISOString(),
    is_marked: false,
  }

  if (!transaction) {
    return emptyForm
  }

  const { id, sum, note, category_id, created_at, is_marked } = transaction

  return Object.assign(emptyForm, { id, sum, note, category_id, created_at, is_marked })
}
</script>

<template>
  <UForm
    v-bind="{ schema, state }"
    :disabled="loading"
    class="flex flex-col gap-4"
    @submit="$emit('submit', $event.data)"
  >
    <UFormField
      :label="$ts('transactionModal.form.category.label')"
      name="category"
    >
      <TransactionFormCategorySelect
        v-model="state.category_id"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$ts('transactionModal.form.sum.label')"
      name="sum"
    >
      <TransactionFormSumInput
        v-model="state.sum"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$ts('transactionModal.form.note.label')"
      name="note"
    >
      <UInput
        v-model="state.note"
        :placeholder="$ts('transactionModal.form.note.placeholder')"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$ts('transactionModal.form.created_at.label')"
      name="created_at"
    >
      <SharedDateTimePicker
        v-model="state.created_at"
        :disabled="loading"
        :placeholder="$ts('transactionModal.form.created_at.placeholder')"
        class="w-full"
      />
    </UFormField>

    <UCheckbox
      v-model="state.is_marked"
      :label="$ts('transactionModal.form.marked.label')"
    />
  </UForm>
</template>
