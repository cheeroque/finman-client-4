<script setup lang="ts">
import { minValue, required } from '@regle/rules'

import { useCategories } from '~/composables/loaders/categories'
import type { TransactionBase } from '~~/shared/types/transaction'

const { transaction } = defineProps<{
  loading?: boolean
  transaction?: TransactionBase
}>()

const emit = defineEmits<{
  submit: [Partial<TransactionBase>]
}>()

const { $ts } = useI18n()

const { data: categories, isLoading: categoriesLoading } = useCategories()

const categoryOptions = computed(() => categories.value?.map(({ id, name }) => ({
  label: name,
  value: id,
})))

const form = ref(initForm())

whenever(() => transaction, () => {
  form.value = initForm()
})

whenever(categoryOptions, ([first]) => {
  form.value.category_id ??= first?.value
})

const { r$ } = useRegle(form, {
  sum: {
    required,
    minValue: minValue(0),
  },
  note: {
    required,
  },
  category_id: {
    required,
  },
  created_at: {
    required,
  },
})

function initForm() {
  const emptyForm = {
    sum: 0,
    note: undefined,
    category_id: categoryOptions.value?.[0]?.value,
    created_at: new Date().toISOString(),
    is_marked: false,
  }

  if (!transaction) {
    return emptyForm
  }

  const { id, sum, note, category_id, created_at, is_marked } = transaction

  return Object.assign(emptyForm, { id, sum, note, category_id, created_at, is_marked })
}

async function handleSubmit() {
  const { data, valid } = await r$.$validate()

  if (!valid) {
    return
  }

  emit('submit', data)
}
</script>

<template>
  <form
    :disabled="loading"
    class="
      flex flex-col gap-4
      lg:gap-6
    "
    @submit.prevent="handleSubmit()"
  >
    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.category_id"
      :label="$ts('transactionModal.form.category.label')"
    >
      <UiSelect
        :id="controlId"
        v-model="form.category_id"
        :disabled="loading || categoriesLoading"
        :has-error
        :options="categoryOptions"
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.sum"
      :label="$ts('transactionModal.form.sum.label')"
    >
      <TransactionFormSumInput
        :id="controlId"
        v-model="form.sum"
        :disabled="loading"
        :has-error
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.note"
      :label="$ts('transactionModal.form.note.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.note"
        :disabled="loading"
        :has-error
        :placeholder="$ts('transactionModal.form.note.placeholder')"
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.created_at"
      :label="$ts('transactionModal.form.created_at.label')"
    >
      <UiDateTimePicker
        :id="controlId"
        v-model="form.created_at"
        :disabled="loading"
        :has-error
        :placeholder="$ts('transactionModal.form.created_at.placeholder')"
      />
    </UiFormField>

    <UiCheckbox
      v-model="form.is_marked"
      class="self-start"
    >
      {{ $ts('transactionModal.form.marked.label') }}
    </UiCheckbox>
  </form>
</template>
