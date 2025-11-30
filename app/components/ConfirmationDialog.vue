<script setup lang="ts">
const {
  depth = 1,
} = defineProps<{
  captionCancel?: string
  captionConfirm?: string
  depth?: number
  message?: string
  title?: string
}>()

defineEmits<{
  close: [boolean]
}>()
</script>

<template>
  <UiDialog
    body-class="w-120"
    :depth
    :title
  >
    <div class="flex flex-col gap-8">
      <p v-if="message">
        {{ message }}
      </p>

      <div class="flex justify-between">
        <UiButton
          variant="content"
          @click="$emit('close', false)"
        >
          {{ captionCancel ?? $t('confirmationDialog.cancel') }}
        </UiButton>

        <UiButton
          variant="danger"
          @click="$emit('close', true)"
        >
          {{ captionConfirm ?? $t('confirmationDialog.confirm') }}
        </UiButton>
      </div>
    </div>
  </UiDialog>
</template>
