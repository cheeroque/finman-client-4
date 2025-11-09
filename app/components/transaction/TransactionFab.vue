<script setup lang="ts">
const { open: openTransactionModal } = useTransactionModal()
</script>

<template>
  <div class="fixed bottom-10 right-10">
    <UButton
      color="secondary"
      variant="link"
      class="p-0 text-6xl"
      @click="openTransactionModal()"
    >
      <UIcon name="solar:add-circle-bold" />
    </UButton>
  </div>
</template>
