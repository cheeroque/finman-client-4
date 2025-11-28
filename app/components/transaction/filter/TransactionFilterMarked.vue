<script setup lang="ts">
const { $ts } = useI18n()

const { marked } = useTransactionsParams()
</script>

<template>
  <UiCheckbox
    v-model="marked"
    icon-checked="mynaui:star-solid"
    icon-class="text-2xl"
    icon-unchecked="mynaui:star"
    variant="amber"
  >
    <span class="truncate">
      {{ $ts('filter.marked.label') }}
    </span>
  </UiCheckbox>
</template>
