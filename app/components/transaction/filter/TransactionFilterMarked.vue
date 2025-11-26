<script setup lang="ts">
const { $ts } = useI18n()

const { marked } = useTransactionsParams()
</script>

<template>
  <UiCheckbox v-model="marked">
    <span class="truncate">
      {{ $ts('filter.marked.label') }}
    </span>
  </UiCheckbox>
</template>
