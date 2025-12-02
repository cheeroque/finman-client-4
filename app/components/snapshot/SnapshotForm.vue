<script setup lang="ts">
import { required } from '@regle/rules'

import type { Snapshot } from '~~/shared/types/snapshot'

defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [Partial<Snapshot>]
}>()

const { $ts } = useI18n()

const { data: balance, status: balanceStatus } = useBalance()
const balanceLoading = useAsyncDataLoading(balanceStatus)

const form = ref(initForm())

whenever(balance, (balance) => {
  form.value.balance = balance
})

const { r$ } = useRegle(form, {
  balance: {
    required,
  },
  created_at: {
    required,
  },
})

function initForm() {
  return {
    balance: balance.value ?? 0,
    note: undefined,
    created_at: new Date().toISOString(),
  }
}

const previousBalance = ref(0)
const { data: latestSnapshot } = useLatestSnapshot()

whenever(() => latestSnapshot.value?.balance, (latestBalance) => {
  previousBalance.value = latestBalance
}, { immediate: true })

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
    :disabled="loading || balanceLoading"
    class="
      flex flex-col gap-4
      lg:gap-6
    "
    @submit.prevent="handleSubmit()"
  >
    <UiFormField :label="$ts('snapshotForm.previousBalance.label')">
      <UiInput
        :model-value="previousBalance"
        disabled
        readonly
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.balance"
      :label="$ts('snapshotForm.balance.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.balance"
        :disabled="loading || balanceLoading"
        :has-error
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.created_at"
      :label="$ts('snapshotForm.created_at.label')"
    >
      <UiDateTimePicker
        :id="controlId"
        v-model="form.created_at"
        :disabled="loading || balanceLoading"
        :has-error
        :placeholder="$ts('snapshotForm.created_at.placeholder')"
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.note"
      :label="$ts('snapshotForm.note.label')"
      name="note"
    >
      <UiInput
        :id="controlId"
        v-model="form.note"
        :disabled="loading || balanceLoading"
        :has-error
        :placeholder="$ts('snapshotForm.note.placeholder')"
      />
    </UiFormField>
  </form>
</template>
