<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const formId = useId()
const { $ts } = useI18n()

const snapshotStore = useSnapshotStore()

const { formatDate } = useLocaleFormatter()
const { show: showToast } = useToast()

const isLoading = ref(false)

async function handleSubmitForm(data: Partial<Snapshot>) {
  isLoading.value = true

  try {
    await snapshotStore.createSnapshot(data)

    const description = $ts('snapshotDialog.successToast.create', {
      datetime: formatDate(data.created_at ?? new Date().toISOString()),
    })

    showToast({
      description,
      variant: 'success',
    })

    emit('close')
  } catch (error) {
    const description = getErrorMessage(error, $ts('error.unknown'))
    const title = $ts('snapshotDialog.errorToast.create')

    showToast({
      description,
      title,
      variant: 'danger',
    })
  } finally {
    isLoading.value = false
  }
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
          {{ $ts('snapshotDialog.submit') }}
        </UiButton>
      </div>
    </div>
  </UiDialog>
</template>
