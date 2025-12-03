<script setup lang="ts">
defineProps<{
  disabled?: boolean
  formId: string
  isEdit?: boolean
}>()

defineEmits<{
  clickDelete: []
}>()
</script>

<template>
  <div class="flex w-full justify-between gap-4">
    <template v-if="isEdit">
      <UiButton
        :disabled
        variant="danger-light"
        class="max-lg:flex-1"
        @click="$emit('clickDelete')"
      >
        {{ $ts('transactionDialog.edit.delete') }}
      </UiButton>

      <UiButton
        :disabled
        :form="formId"
        type="submit"
        variant="success"
        class="max-lg:flex-1"
      >
        {{ $ts('transactionDialog.edit.submit') }}
      </UiButton>
    </template>

    <UiButton
      v-else
      :disabled
      :form="formId"
      type="submit"
      variant="success"
      class="
        max-lg:flex-1
        lg:ml-auto
      "
    >
      {{ $ts('transactionDialog.create.submit') }}
    </UiButton>
  </div>
</template>
