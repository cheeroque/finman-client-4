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
  <UiDialog :title="$ts('snapshotModal.title')">
    <div
      class="
        flex flex-col gap-4
        lg:gap-6
      "
    >
      <SnapshotForm
        :id="formId"
        :loading="isLoading"
        @submit="handleSubmitForm"
      />

      <div class="flex w-full gap-4">
        <UiButton
          :disabled="isLoading"
          :form="formId"
          type="submit"
          variant="success"
          class="
            max-lg:flex-1
            lg:ml-auto
          "
        >
          {{ $ts('snapshotModal.submit') }}
        </UiButton>
      </div>
    </div>
  </UiDialog>
</template>
