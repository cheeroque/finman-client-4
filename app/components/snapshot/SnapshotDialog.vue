<script setup lang="ts">
import type { Snapshot } from '~~/shared/types/snapshot'

const emit = defineEmits<{
  close: []
}>()

const formId = useId()
const { $ts } = useI18n()

const { execute, loading } = useSnapshotCreate()

async function handleSubmitForm(data: Partial<Snapshot>) {
  await execute(data)

  emit('close')
}
</script>

<template>
  <UiDialog :title="$ts('snapshotDialog.title')">
    <div
      class="
        flex flex-col gap-4
        lg:gap-6
      "
    >
      <SnapshotForm
        :id="formId"
        :loading
        @submit="handleSubmitForm"
      />

      <div class="flex w-full gap-4">
        <UiButton
          :disabled="loading"
          :form="formId"
          type="submit"
          variant="success"
          class="
            max-lg:flex-1
            lg:ml-auto
          "
        >
          {{ $ts('snapshotDialog.submit') }}
        </UiButton>
      </div>
    </div>
  </UiDialog>
</template>
