<script setup lang="ts">
const { $ts } = useI18n()

const isLoading = ref(false)

async function exportFile() {
  isLoading.value = true

  const url = await useRequestFetch()('/api/transactions/export')
  downloadFileByUrl(url)

  isLoading.value = false
}
</script>

<template>
  <LayoutNavItem
    :disabled="isLoading"
    :icon="isLoading ? 'mynaui:spinner' : 'mynaui:cloud-download'"
    :icon-class="isLoading && 'animate-spin'"
    :label="$ts('mainMenu.export')"
    @click="exportFile()"
  />
</template>
