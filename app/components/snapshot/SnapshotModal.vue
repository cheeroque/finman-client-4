<script setup lang="ts">
import { useSnapshotCreate } from '~/composables/mutations/snapshot-create'
import type { Snapshot } from '~~/shared/types/snapshot'

const emit = defineEmits<{
  close: []
}>()

const formId = useId()
const { $ts } = useI18n()

const { mutateAsync, isLoading } = useSnapshotCreate()

async function handleSubmitForm(data: Partial<Snapshot>) {
  await mutateAsync(data)

  emit('close')
}
</script>

<template>
  <UModal :title="$ts('snapshotModal.title')">
    <template #body>
      <SnapshotForm
        :id="formId"
        :loading="isLoading"
        @submit="handleSubmitForm"
      />
    </template>

    <template #footer>
      <div class="flex w-full gap-4">
        <UButton
          :disabled="isLoading"
          :form="formId"
          type="submit"
          class="ml-auto"
        >
          {{ $ts('snapshotModal.submit') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
