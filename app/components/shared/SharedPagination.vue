<script setup lang="ts">
const { itemsPerPage = 1, total = 0 } = defineProps<{
  itemsPerPage?: number
  total?: number
}>()

function to(page: number) {
  if (page <= 1) {
    return { query: {} }
  }

  return { query: { page } }
}
</script>

<template>
  <UPagination
    :items-per-page
    :to
    :total
  />
</template>
