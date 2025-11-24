<script setup lang="ts">
import { required } from '@regle/rules'

import type { Snapshot } from '~~/shared/types/snapshot'
import { useBalanceQuery } from '~/composables/queries/balance'
import { useSnapshotsLatestQuery } from '~/composables/queries/snapshots-latest'

defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [Partial<Snapshot>]
}>()

const { $ts } = useI18n()

const { state: balanceState, isLoading: balanceLoading } = useBalanceQuery()

const form = ref(initForm())

whenever(() => balanceState.value.data, (balance) => {
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
    balance: balanceState.value.data ?? 0,
    note: undefined,
    created_at: new Date().toISOString(),
  }
}

const previousBalance = ref(0)
const { state: queryState } = useSnapshotsLatestQuery()

whenever(() => queryState.value.data?.balance, (latestBalance) => {
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
    <UiFormField :label="$ts('snapshotModal.form.previousBalance.label')">
      <UiInput
        :model-value="previousBalance"
        disabled
        readonly
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.balance"
      :label="$ts('snapshotModal.form.balance.label')"
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
      :label="$ts('snapshotModal.form.created_at.label')"
    >
      <UiDateTimePicker
        :id="controlId"
        v-model="form.created_at"
        :disabled="loading || balanceLoading"
        :has-error
        :placeholder="$ts('snapshotModal.form.created_at.placeholder')"
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.note"
      :label="$ts('snapshotModal.form.note.label')"
      name="note"
    >
      <UiInput
        :id="controlId"
        v-model="form.note"
        :disabled="loading || balanceLoading"
        :has-error
        :placeholder="$ts('snapshotModal.form.note.placeholder')"
      />
    </UiFormField>
  </form>
</template>
