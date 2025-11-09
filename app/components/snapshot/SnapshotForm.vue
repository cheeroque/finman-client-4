<script setup lang="ts">
import * as z from 'zod'

import type { Snapshot } from '~~/shared/types/snapshot'
import { useBalanceQuery } from '~/composables/queries/balance'
import { useSnapshotsLatestQuery } from '~/composables/queries/snapshots-latest'

defineProps<{
  loading?: boolean
}>()

defineEmits<{
  submit: [Partial<Snapshot>]
}>()

const { $ts } = useI18n()

const schema = z.object({
  balance: z.number($ts('snapshotModal.form.balance.error.invalid')),
  note: z.string(),
  created_at: z.iso.datetime($ts('snapshotModal.form.created_at.error.invalid')),
})

type Schema = z.output<typeof schema>

const state = ref<Partial<Schema>>(initForm())

const { state: balanceState, isLoading: isBalanceLoading } = useBalanceQuery()

whenever(() => balanceState.value.data, (balance) => {
  state.value.balance = balance
}, { immediate: true })

function initForm() {
  return {
    balance: 0,
    note: undefined,
    created_at: new Date().toISOString(),
  }
}

const previousBalance = ref(0)
const { state: queryState } = useSnapshotsLatestQuery()

whenever(() => queryState.value.data?.balance, (latestBalance) => {
  previousBalance.value = latestBalance
}, { immediate: true })
</script>

<template>
  <UForm
    v-bind="{ schema, state }"
    :disabled="loading || isBalanceLoading"
    class="flex flex-col gap-4"
    @submit="$emit('submit', $event.data)"
  >
    <UFormField :label="$ts('snapshotModal.form.previousBalance.label')">
      <UInput
        :model-value="previousBalance"
        disabled
        readonly
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$ts('snapshotModal.form.balance.label')"
      name="balance"
    >
      <UInput
        v-model="state.balance"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$ts('snapshotModal.form.created_at.label')"
      name="created_at"
    >
      <SharedDateTimePicker
        v-model="state.created_at"
        :disabled="loading"
        :placeholder="$ts('snapshotModal.form.created_at.placeholder')"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$ts('snapshotModal.form.note.label')"
      name="note"
    >
      <UInput
        v-model="state.note"
        :placeholder="$ts('snapshotModal.form.note.placeholder')"
        class="w-full"
      />
    </UFormField>
  </UForm>
</template>
