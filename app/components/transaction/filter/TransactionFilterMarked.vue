<script setup lang="ts">
const { marked } = useTransactionsQueryParams()
</script>

<template>
  <UiCheckbox v-model="marked">
    <span class="truncate">
      {{ $ts('filter.marked.label') }}
    </span>
  </UiCheckbox>
</template>
