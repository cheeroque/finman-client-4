<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const formId = useId()
const { $ts } = useI18n()

const snapshotStore = useSnapshotStore()
const loading = ref(false)

async function handleSubmitForm(data: Partial<Snapshot>) {
  loading.value = true

  await snapshotStore.createSnapshot(data)

  loading.value = false

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
